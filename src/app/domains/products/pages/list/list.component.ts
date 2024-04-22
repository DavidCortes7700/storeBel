import { Component, Input, SimpleChange, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent,RouterLink],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private carService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;


  ngOnInit(){
    this.getCategories();
  }

  ngOnChanges(){
    this.getProducts()
  }

  addToCart(product:Product){
    this.carService.addToCart(product);
  }

  private getProducts(){
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: ()=>{
        console.error('Error al llamar los productos');
      }
    })
  }

  private getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(categories) => {
        this.categories.set(categories);
      },
      error:()=>{
        console.error('Error al llamar a las categorias');
      }
    })
  }
}
