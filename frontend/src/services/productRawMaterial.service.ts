import api from './api';
import { ProductRawMaterial, CreateAssociationDTO, UpdateAssociationDTO } from '../dtos/productRawMaterial.dto';

export const associationService = {
  getAll: () =>
    api.get<ProductRawMaterial[]>('/product-raw-materials'),
  getByProduct: (productId: number) =>
    api.get<ProductRawMaterial[]>(`/product-raw-materials/product/${productId}`),
  create: (data: CreateAssociationDTO) =>
    api.post<ProductRawMaterial>('/product-raw-materials', data),
  update: (id: number, data: UpdateAssociationDTO) =>
    api.put<ProductRawMaterial>(`/product-raw-materials/${id}`, data),
  delete: (id: number) =>
    api.delete(`/product-raw-materials/${id}`),
};