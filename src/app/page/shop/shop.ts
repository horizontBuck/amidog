import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories-service';
import { ProductsService } from '../../services/products.service';
@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shop.html',
  styleUrl: './shop.scss'
})
export class Shop {
  categories: Category[] = [];
  products: any[] = [];
  constructor(private router: Router, private categoriesService: CategoriesService, private productsService: ProductsService) {
    this.categoriesService.listTop().subscribe((categories) => {
      this.categories = categories;
    });
    this.productsService.listProducts().then((products) => {
      this.products = products;
    });
  }
/*   navigateTo(path: string) {
    this.router.navigate([path]);
  } */
  navigateTo(path: string, productId?: string) {
    if (productId) {
      this.router.navigate([path, productId]);
    } else {
      this.router.navigate([path]);
    }
  }
}
