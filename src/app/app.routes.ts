import { NotFoundComponent } from './shared/not-found/not-found.component';
import { StoreComponent } from './pages/store/store.component';
import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
    {path:'', component:StoreComponent},
    {path:'product/:id/:name', component:ProductPageComponent, title:'Product'},
    {path:'404', component:NotFoundComponent},
    {path:'**', redirectTo:"404"},
];
