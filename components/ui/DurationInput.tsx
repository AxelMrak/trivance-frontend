'use client';

import type React from 'react';
import { useState } from 'react';
import ClockIcon from '../icons/ClockIcon';
import CalendarIcon from '../icons/CalendarIcon';
import ChevronIcon from '../icons/ChevronIcon';

type IntervalUnit =
	| 'seconds'
	| 'minutes'
	| 'hours'
	| 'days'
	| 'weeks'
	| 'months';

interface DurationValue {
	type: 'interval';
	notNull: true;
	value: number;
	unit: IntervalUnit;
	formatted: string;
}

interface DurationInputProps {
	value?: DurationValue;
	onChange: (val: DurationValue) => void;
	className?: string;
	defaultUnit?: IntervalUnit;
}

const unitTranslations = {
	seconds: { singular: 'segundo', plural: 'segundos', abbr: 'seg' },
	minutes: { singular: 'minuto', plural: 'minutos', abbr: 'min' },
	hours: { singular: 'hora', plural: 'horas', abbr: 'h' },
	days: { singular: 'día', plural: 'días', abbr: 'd' },
	weeks: { singular: 'semana', plural: 'semanas', abbr: 'sem' },
	months: { singular: 'mes', plural: 'meses', abbr: 'mes' },
};

export default function DurationInput({
	value,
	onChange,
	className,
	defaultUnit = 'hours',
}: DurationInputProps) {
	const [isTimeMode, setIsTimeMode] = useState(
		defaultUnit === 'hours' ||
			defaultUnit === 'minutes' ||
			defaultUnit === 'seconds'
	);

	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [val, setVal] = useState(1);
	const [unit, setUnit] = useState<IntervalUnit>(defaultUnit);

	const formatValue = (
		val: number,
		unitType: IntervalUnit,
		h = 0,
		m = 0,
		s = 0
	): string => {
		if (['hours', 'minutes', 'seconds'].includes(unitType)) {
			const parts = [];
			if (h > 0) parts.push(`${h}${unitTranslations.hours.abbr}`);
			if (m > 0) parts.push(`${m}${unitTranslations.minutes.abbr}`);
			if (s > 0) parts.push(`${s}${unitTranslations.seconds.abbr}`);
			return parts.length > 0 ? parts.join(' ') : '0 segundos';
		} else {
			const t = unitTranslations[unitType];
			return `${val} ${val === 1 ? t.singular : t.plural}`;
		}
	};

	const emitValue = () => {
		let totalSeconds = 0;
		let formatted = '';

		if (isTimeMode) {
			totalSeconds = hours * 3600 + minutes * 60 + seconds;
			formatted = formatValue(0, unit, hours, minutes, seconds);
		} else {
			const multipliers = {
				days: 86400,
				weeks: 604800,
				months: 2592000,
			};
			totalSeconds = val * multipliers[unit];
			formatted = formatValue(val, unit);
		}

		onChange({
			type: 'interval',
			notNull: true,
			value: totalSeconds,
			unit,
			formatted,
		});
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setter: React.Dispatch<React.SetStateAction<number>>,
		max = Number.POSITIVE_INFINITY
	) => {
		const val = parseInt(e.target.value || '0', 10);
		if (!isNaN(val)) {
			setter(Math.max(0, Math.min(max, val)));
		}
	};

	return (
		<div className={`space-y-2 ${className || ''}`}>
			<div className="flex items-center gap-4 mb-4">
				<button
					type="button"
					onClick={() => setIsTimeMode(true)}
					className={`flex items-center gap-2 px-4 py-2 rounded-md ${
						isTimeMode
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					<ClockIcon className="w-4 h-4" />
					<span>Tiempo</span>
				</button>
				<button
					type="button"
					onClick={() => setIsTimeMode(false)}
					className={`flex items-center gap-2 px-4 py-2 rounded-md ${
						!isTimeMode
							? 'bg-primary text-primary-foreground'
							: 'bg-muted text-muted-foreground'
					}`}
				>
					<CalendarIcon className="w-4 h-4" />
					<span>Calendario</span>
				</button>
			</div>

			{isTimeMode ? (
				<div
					className="flex items-center justify-center gap-4"
					onBlur={emitValue}
				>
					{[
						['Horas', hours, setHours],
						['Minutos', minutes, setMinutes, 59],
						['Segundos', seconds, setSeconds, 59],
					].map(([label, val, setter, max = undefined], i) => (
						<div key={i} className="flex flex-col items-center">
							<button
								type="button"
								onClick={() =>
									setter((prev: number) =>
										max ? Math.min(max, prev + 1) : prev + 1
									)
								}
								className="p-1 rounded-full hover:bg-muted"
							>
								<ChevronIcon className="w-5 h-5" />
							</button>
							<input
								type="text"
								value={val as number}
								onChange={(e) =>
									handleInputChange(e, setter as any, max as number)
								}
								onBlur={emitValue}
								className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
							/>
							<button
								type="button"
								onClick={() => setter((prev: number) => Math.max(0, prev - 1))}
								className="p-1 rounded-full hover:bg-muted"
							>
								<ChevronIcon className="w-5 h-5 rotate-180" />
							</button>
							<span className="text-xs text-muted-foreground mt-1">
								{label}
							</span>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center" onBlur={emitValue}>
					<div className="flex items-center gap-4 mb-2">
						<div className="flex flex-col items-center">
							<button
								type="button"
								onClick={() => setVal((prev) => prev + 1)}
								className="p-1 rounded-full hover:bg-muted"
							>
								<ChevronIcon className="w-5 h-5" />
							</button>
							<input
								type="text"
								value={val}
								onChange={(e) => handleInputChange(e, setVal)}
								onBlur={emitValue}
								className="w-16 h-16 text-center text-2xl font-medium border rounded-lg"
							/>
							<button
								type="button"
								onClick={() => setVal((prev) => Math.max(1, prev - 1))}
								className="p-1 rounded-full hover:bg-muted"
							>
								<ChevronIcon className="w-5 h-5 rotate-180" />
							</button>
						</div>
						<select
							value={unit}
							onChange={(e) => {
								setUnit(e.target.value as IntervalUnit);
								emitValue();
							}}
							className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
						>
							<option value="days">Días</option>
							<option value="weeks">Semanas</option>
							<option value="months">Meses</option>
						</select>
					</div>
				</div>
			)}
		</div>
	);
}
