import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Jobs } from './pages/jobs/jobs';
import { authRoutes } from './components/pages/auth/routes/auth.routes';
import { TestPageComponent } from './components/test-page.component';


export const routes: Routes = [
    { path: "", component: Home },
    { path: "jobs", component: Jobs },
    //added route for testing the services
  { path: 'test', component: TestPageComponent },
  ...authRoutes

];
