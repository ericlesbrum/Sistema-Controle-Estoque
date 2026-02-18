import api from './api';
import { ProductRawMaterial, CreateAssociationDTO, UpdateAssociationDTO } from '../dtos/productRawMaterial.dto';
import { Page } from '../dtos/page';

export const associationService = {
  getAll: (page = 0, size = 10, sort = 'id,asc') =>
    api.get<Page<ProductRawMaterial>>('/product-raw-materials', {
      params: { page, size, sort },
    }),
  getByProduct: (productId: number, page = 0, size = 10, sort = 'rawMaterialName,asc') =>
    api.get<Page<ProductRawMaterial>>(`/product-raw-materials/product/${productId}`, {
      params: { page, size, sort },
    }),
  create: (data: CreateAssociationDTO) =>
    api.post<ProductRawMaterial>('/product-raw-materials', data),
  update: (id: number, data: UpdateAssociationDTO) =>
    api.put<ProductRawMaterial>(`/product-raw-materials/${id}`, data),
  delete: (id: number) =>
    api.delete(`/product-raw-materials/${id}`),
};