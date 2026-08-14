import { Routes } from '@angular/router';
import { gerenteGuard } from './shared/services/gerente.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layout/mobile-layout/mobile-layout.component').then(m => m.MobileLayoutComponent),
    canActivate: [gerenteGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'ordenes',
        loadComponent: () => import('./business/ordenes/ordenes.component').then(m => m.OrdenesComponent)
      },
      {
        path: 'inventario',
        loadComponent: () => import('./business/inventario/inventario.component').then(m => m.InventarioComponent)
      },
      {
        path: 'reportes',
        loadComponent: () => import('./business/reportes/reportes.component').then(m => m.ReportesComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
