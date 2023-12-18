import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'editor',
    loadComponent: () => import('./pages/editor/editor.component'),
  },
];
