export interface TableColumn {
    header: string;
    field: string;
    cellClass?: string;
    cellClass2?: (row: any) => void;
    type?: 'date' | 'datetime' | 'number';
}

export interface ActionButton {
    label: (row: any) => string; // Etiqueta del botón, puede ser una función para personalizar
    icon: (row: any) => string; // Icono de Material, puede ser una función para personalizar
    action: (row: any) => void;
    buttonClass?: string; // Clase CSS opcional para el botón
    // show: (row: any) => boolean;
}

export interface ButtonColumn {
    header: string;
    field: string;
    buttons: ActionButton[];
    // add?: boolean;
}