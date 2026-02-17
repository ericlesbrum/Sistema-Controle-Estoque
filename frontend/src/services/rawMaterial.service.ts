import api from './api';
import { RawMaterial, CreateRawMaterialDTO, UpdateRawMaterialDTO } from '../dtos/rawMaterial.dto';

export const rawMaterialService = {
  getAll: () =>
    api.get<RawMaterial[]>('/raw-materials'),
  getById: (id: number) =>
    api.get<RawMaterial>(`/raw-materials/${id}`),
  create: (data: CreateRawMaterialDTO) =>
    api.post<RawMaterial>('/raw-materials', data),
  update: (id: number, data: UpdateRawMaterialDTO) =>
    api.put<RawMaterial>(`/raw-materials/${id}`, data),
  delete: (id: number) =>
    api.delete(`/raw-materials/${id}`),
};