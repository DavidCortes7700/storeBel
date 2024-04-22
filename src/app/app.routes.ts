import { Routes } from '@angular/router';
import { ListComponent } from './domains/products/pages/list/list.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: ()=>import('./domains/products/pages/list/list.component').then(list => list.ListComponent)
      },
      {
        path: 'about',
        loadComponent: ()=>import('./domains/info/pages/about/about.component').then(about => about.AboutComponent)
      },
      {
        path: 'product/:id',
        loadComponent: ()=>import('@products/pages/product-detail/product-detail.component').then(detail => detail.ProductDetailComponent)
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
