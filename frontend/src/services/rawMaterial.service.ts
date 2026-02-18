import api from './api';
import { RawMaterial, CreateRawMaterialDTO, UpdateRawMaterialDTO } from '../dtos/rawMaterial.dto';
import { Page } from '../dtos/page';

export const rawMaterialService = {
  getAll: (page = 0, size = 10, sort = 'id,asc') =>
    api.get<Page<RawMaterial>>('/raw-materials', {
      params: { page, size, sort },
    }),
  getById: (id: number) =>
    api.get<RawMaterial>(`/raw-materials/${id}`),
  create: (data: CreateRawMaterialDTO) =>
    api.post<RawMaterial>('/raw-materials', data),
  update: (id: number, data: UpdateRawMaterialDTO) =>
    api.put<RawMaterial>(`/raw-materials/${id}`, data),
  delete: (id: number) =>
    api.delete(`/raw-materials/${id}`),
};