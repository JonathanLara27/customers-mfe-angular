import { FormGroup } from "@angular/forms";

export function isValidField(field: string, fg: FormGroup): boolean | null {
    return fg.controls[field].errors && fg.controls[field].touched;
  }

export function getFieldErrors(field: string, fg: FormGroup): string | null {
  // Verifica que el FormGroup y el control existan
  if (!fg || !fg.get(field)) {
    return null; // Devuelve null si el control no existe
  }

  const control = fg.get(field);
  const errors = control!.errors || {};

  // Itera sobre los errores y devuelve el mensaje correspondiente
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'Este campo es requerido';
      case 'email':
        return 'El email no es válido';
      case 'minlength':
        return `El mínimo de carácteres es ${errors[key].requiredLength}`;
      case 'maxlength':
        return `El máximo de carácteres es ${errors[key].requiredLength}`;
      case 'pattern':
        return 'El campo no tiene el formato correcto';
      case 'min':
        return `El mínimo es ${errors[key].min}`;
      case 'max':
        return `El máximo es ${errors[key].max}`;
      case 'atLeastOne':
        return 'Debes seleccionar al menos una opción';
      case 'maxDecimals':
        return `El número no puede tener más de ${errors[key].max} decimales (actual: ${errors[key].actual})`;
      default:
        return 'Error no identificado';
    }
  }

  return null; // Si no hay errores, devuelve null
}
