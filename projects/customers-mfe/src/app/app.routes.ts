import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/customer-list/customer-list.component').then(m => m.CustomerListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./pages/customer-form/customer-form.component').then(m => m.CustomerFormComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
