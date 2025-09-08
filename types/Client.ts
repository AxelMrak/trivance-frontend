
export interface Client {
	id: string;
	company_id: string | null;
	name: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	contact_email?: string | null;
	contact_phone?: string | null;
	created_at: Date | string;
}

export interface CreateClientPayload {
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface UpdateClientPayload {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
}
