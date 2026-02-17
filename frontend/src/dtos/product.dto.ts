export interface Product {
  id: number;
  name: string;
  price: number;
}

export type CreateProductDTO = Omit<Product, 'id'>;
export type UpdateProductDTO = Product;