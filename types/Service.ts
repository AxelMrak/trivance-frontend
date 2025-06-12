import { IntervalObject } from "./Interval";

export interface Service {
  id: string;
  company_id: string;
  name: string;
  description: string;
  price: number | string;
  duration: IntervalObject | string;
  created_at: Date | string;
  location?: string | null;
}

export interface CreateServicePayload {
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface UpdateServicePayload {
  id: string;
  name: string;
  description: string;
  price: number | string;
  duration: string | IntervalObject;
}
