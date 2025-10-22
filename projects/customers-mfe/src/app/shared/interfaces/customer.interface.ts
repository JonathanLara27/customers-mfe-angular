export interface Customer {
    id: number;
    name: string;
    email: string;
}

export interface CreateCustomerDTO extends Omit<Customer, 'id'> {}

export interface UpdateCustomerDTO extends Partial<CreateCustomerDTO> {}

export interface CustomerResponse {
    data: Customer[];
    total: number;
}

export interface StateCustomers {
    customers: Customer[];
    total: number;
    loading: boolean;
    error: string | null;
}