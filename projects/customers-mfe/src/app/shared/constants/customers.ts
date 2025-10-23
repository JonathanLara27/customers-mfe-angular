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
    { header: 'Teléfono', field: 'phone', cellClass: 'text-center' },
];

export const CUSTOMERS_TITLE = 'Gestión de Clientes';

export const CUSTUMERS_SUBTITLE = 'Administra la información de tus clientes de manera eficiente y segura.';

export const CUSTOMER_ADD_TOOLTIP = 'Agregar Nuevo Cliente';

export const CUSTOMER_ROUTE_LIST = 'customers/list';

export const CUSTOMER_ROUTE_TABLE = 'customers/table';

export const TITLE_DELETE_CUSTOMER_DIALOG = 'Eliminar Cliente';
export const MESSAGE_DELETE_CUSTOMER_DIALOG = '¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.';