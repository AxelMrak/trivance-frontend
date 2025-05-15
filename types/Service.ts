import { IntervalObject } from "./Interval";

export interface Service {
  id: string;
  company_id: string;
  name: string;
  description: string;
  price: number | string;
  duration: IntervalObject;
  created_at: Date | string;
}

export interface CreateServicePayload {
  name: string;
  description: string;
  price: number;
  duration: string;
}
