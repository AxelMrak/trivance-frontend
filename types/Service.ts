export type IntervalDuration = {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  days: number | null;
  weeks: number | null;
}

export interface Service {
  id: string;
  company_id: string;
  name: string;
  description: string;
  price: number;
  duration: IntervalDuration;
  created_at: Date;
}

export interface CreateServicePayload {
  name: string;
  description: string;
  price: number;
  duration: IntervalDuration;
}
