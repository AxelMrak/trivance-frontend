"use client";

import { StarIcon } from "@/components/icons/StarIcon";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: { minutes: number };
}

interface MostUsedService {
  usage_count: number;
  service: Service;
}

interface SummaryStats {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

interface StatsProps {
  mostUsedService?: MostUsedService;
  summaryStats?: SummaryStats;
  isLoading?: boolean;
}

// Skeleton Components
const StatCardSkeleton = () => (
  <div className="rounded-xl p-6 bg-gray-200 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="w-8 h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const ChartSkeleton = ({ title }: { title: string }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
      {title}
    </h3>
    <div className="h-64 bg-gray-100 rounded animate-pulse flex items-center justify-center">
      <div className="text-gray-400">Cargando gráfico...</div>
    </div>
  </div>
);

const ServiceCardSkeleton = () => (
  <div className="bg-gray-50 rounded-lg p-4 border animate-pulse">
    <div className="flex items-center justify-between mb-2">
      <div className="bg-gray-300 h-6 w-8 rounded-full"></div>
      <div className="bg-gray-300 h-4 w-16 rounded"></div>
    </div>
    <div className="bg-gray-300 h-5 w-32 rounded mb-2"></div>
    <div className="flex items-center justify-between">
      <div className="bg-gray-300 h-4 w-12 rounded"></div>
      <div className="bg-gray-300 h-4 w-12 rounded"></div>
    </div>
  </div>
);

const Stats: React.FC<StatsProps> = ({
  mostUsedService,
  summaryStats,
  isLoading = false,
}) => {
  const cardClass = "bg-white rounded-xl p-6 border border-gray-200";

  // Default values for summaryStats
  const defaultStats = {
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  };

  const stats = summaryStats || defaultStats;

  const statusData = [
    {
      name: "Total",
      value: stats.total,
      bgColor: "bg-blue-500",
      textColor: "text-white",
      icon: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
    },
    {
      name: "Confirmados",
      value: stats.confirmed,
      bgColor: "bg-green-500",
      textColor: "text-white",
      icon: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
    },
    {
      name: "Pendientes",
      value: stats.pending,
      bgColor: "bg-yellow-500",
      textColor: "text-white",
      icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z",
    },
    {
      name: "Cancelados",
      value: stats.cancelled,
      bgColor: "bg-red-500",
      textColor: "text-white",
      icon: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
    },
  ];

  const pieData = [
    { name: "Confirmados", value: stats.confirmed, color: "#10b981" },
    { name: "Pendientes", value: stats.pending, color: "#f59e0b" },
    { name: "Cancelados", value: stats.cancelled, color: "#ef4444" },
  ];

  // Show skeleton when loading or when essential data is missing
  if (isLoading || !summaryStats) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Estadísticas
          </h2>
          <p className="text-gray-600">Resumen de turnos y servicios</p>
        </div>

        {/* Skeleton for stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>

        {/* Skeleton for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartSkeleton title="Estados de Turnos" />
          <ChartSkeleton title="Servicios Populares" />
        </div>

        {/* Skeleton for services list */}
        <div className={cardClass}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Top Servicios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full gap-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {statusData.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} ${stat.textColor} rounded-xl p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <svg
                className="w-8 h-8 opacity-80"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d={stat.icon} clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className={cardClass}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Estados de Turnos
          </h3>
          <div className="h-64">
            {stats.total > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>

        <div className={cardClass}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Servicio más Popular
          </h3>
          <div className="h-64">
            {mostUsedService ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-xl">
                <StarIcon className="w-12 h-12 text-primary-base mb-4" />
                <h4 className="font-semibold text-primary-base capitalize mb-2">
                  {mostUsedService.service.name}
                </h4>
                <p className="text-gray-600 mb-4">
                  Solicitado {mostUsedService.usage_count} veces
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium text-green-600">
                    Precio: ${mostUsedService.service.price}
                  </span>
                  <span>
                    Duración: {mostUsedService.service.duration.minutes} min
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
