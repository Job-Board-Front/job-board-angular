import { Routes } from '@angular/router';
import { authRoutes } from './components/pages/auth/routes/auth.routes';

export const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' }, ...authRoutes];
