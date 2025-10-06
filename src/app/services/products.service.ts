import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private pb: PocketBase;
  private readonly baseUrl = 'https://db.buckapi.site:8020';
  private readonly collection = 'products';

  constructor() {
    this.pb = new PocketBase(this.baseUrl);
  }

  async createProduct(productData: any) {
    try {
      const data = {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        stock: Number(productData.stock),
        presentation: productData.presentation,
        color: productData.color,
        format: productData.format,
        brand: productData.brand,
        proveedor: productData.proveedor,
        size: productData.size ? JSON.stringify(productData.size) : null,
        expiration_date: productData.expiration_date || null,
        active: true
      };

      const record = await this.pb.collection(this.collection).create(data);
      return record;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async listProducts() {
    try {
      const products = await this.pb.collection(this.collection).getFullList();
      return products;
    } catch (error) {
      console.error('Error listing products:', error);
      throw error;
    }
  }
  getProductById(id: string): Promise<any> {
    return this.pb.collection('products').getOne(id);
  }
  async updateProduct(id: string, productData: any) {
    try {
      const data = {
        name: productData.name,
        description: productData.description,
        price: Number(productData.price),
        stock: Number(productData.stock),
        presentation: productData.presentation,
        color: productData.color,
        format: productData.format,
        brand: productData.brand,
        proveedor: productData.proveedor,
        size: productData.size ? JSON.stringify(productData.size) : null,
        expiration_date: productData.expiration_date || null,
        active: true
      };

      const record = await this.pb.collection(this.collection).update(id, data);
      return record;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      const record = await this.pb.collection(this.collection).delete(id);
      return record;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

}
