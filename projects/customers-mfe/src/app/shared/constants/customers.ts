import { StateCustomers } from "../interfaces";
import { TableColumn } from "../table/table.interface";

export const INITIAL_CUSTOMER_STATE : StateCustomers = {
    customers: [],
    total: 0,
    loading: false,
    error: null
};

export const COLUMNS_CUSTOMERS : TableColumn[] = [
    { header: 'ID', field: 'id', cellClass: 'text-center' },
    { header: 'Nombre', field: 'name', cellClass: 'text-center' },
    { header: 'Correo Electrónico', field: 'email', cellClass: 'text-center' },
];