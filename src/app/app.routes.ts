import { NotFoundComponent } from './shared/not-found/not-found.component';
import { StoreComponent } from './pages/store/store.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', component:StoreComponent},
    {path:'404', component:NotFoundComponent},
    {path:'**', redirectTo:"404"},
];
