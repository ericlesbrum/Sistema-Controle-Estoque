import api from './api';
import { Product, CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { Page } from '../dtos/page';

export const productService = {
  getAll: (page = 0, size = 10, sort = 'id,asc') =>
    api.get<Page<Product>>('/products', {
      params: { page, size, sort },
    }),
  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),
  create: (data: CreateProductDTO) =>
    api.post<Product>('/products', data),
  update: (id: number, data: UpdateProductDTO) =>
    api.put<Product>(`/products/${id}`, data),
  delete: (id: number) =>
    api.delete(`/products/${id}`),
};