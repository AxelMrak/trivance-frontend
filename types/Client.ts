
export interface Client {
	id: string;
	company_id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
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
