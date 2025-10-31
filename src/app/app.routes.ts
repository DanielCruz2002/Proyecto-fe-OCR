import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FacturaComponent  } from './pages/factura/factura';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'factura', component: FacturaComponent  },
];
