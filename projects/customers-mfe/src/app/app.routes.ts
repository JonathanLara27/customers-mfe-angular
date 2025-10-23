import { Routes } from '@angular/router';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
    {
        path: 'table',
        loadComponent: () => import('./pages/customer-table/customer-table.component')
    },
    {
        path: 'list',
        loadComponent: () => import('./pages/customer-list/customer-list.component'),
        canActivate: [loginGuard]
    },
    {
        path: '**',
        redirectTo: 'table'
    }
];
