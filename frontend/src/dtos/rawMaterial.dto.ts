export interface RawMaterial {
  id: number;
  name: string;
  stockQuantity: number;
}

export type CreateRawMaterialDTO = Omit<RawMaterial, 'id'>;
export type UpdateRawMaterialDTO = RawMaterial;