import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories-service';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-detail.html',
  styleUrl: './shop-detail.scss'
})
export class ShopDetail {
 
  product: any = null; // Asegúrate de inicializarlo como null
  images: string[] = [];
  mainImage: string | null = null; // Inicializa como null
  category: any = null;
  categoriesNames: string[] = [];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductById(id).then((product) => {
        this.product = product;
        this.categoriesService.getCategoryById(product.category).subscribe((category) => {
          this.product.category = category;
        });

        // Asegurarse de que product y product.images no sean null/undefined
        if (this.product && this.product.images && this.product.images.length > 0) {
          this.mainImage = this.product.images[0]; // Inicializa la primera imagen
        }
      }).catch(error => {
        console.error('Error al cargar el producto', error);
      });
    }
  }

  updateMainImage(index: number): void {
    // Verifica si la imagen está disponible antes de cambiarla
    if (this.product && this.product.images && this.product.images[index]) {
      this.mainImage = this.product.images[index];
    }
  }

}
