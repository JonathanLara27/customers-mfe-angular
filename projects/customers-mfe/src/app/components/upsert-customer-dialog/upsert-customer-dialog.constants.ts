import { IteratorForm } from "../../shared/interfaces";

export const TITLE_CUSTOMER_DIALOG_CREATE = 'Creacion de Cliente';
export const TITLE_CUSTOMER_DIALOG_EDIT = 'Edicion de Cliente';

export const BUTTON_CUSTOMER_DIALOG_CREATE = 'Crear Cliente';
export const BUTTON_CUSTOMER_DIALOG_EDIT = 'Guardar Cambios';

export const ITERATOR_FORM_CUSTOMERS: IteratorForm [] = [
    {
        label: 'Nombre',
        formControlName: 'name',
        placeholder: 'Ingrese el nombre del cliente',
        type: 'text',
    },
    {
        label: 'Correo Electrónico',
        formControlName: 'email',
        placeholder: 'Ingrese el correo electrónico del cliente',
        type: 'email',
    },
    {
        label: 'Teléfono',
        formControlName: 'phone',
        placeholder: '+51 987-654-321',
        type: 'text',
    },
]