import api from './api';
import { Product, CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';

export const productService = {
  getAll: () =>
    api.get<Product[]>('/products'),
  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),
  create: (data: CreateProductDTO) =>
    api.post<Product>('/products', data),
  update: (id: number, data: UpdateProductDTO) =>
    api.put<Product>(`/products/${id}`, data),
  delete: (id: number) =>
    api.delete(`/products/${id}`),
};