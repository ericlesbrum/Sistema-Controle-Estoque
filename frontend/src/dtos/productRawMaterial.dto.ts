export interface ProductRawMaterial {
  id: number;
  productId: number;
  productName: string;
  rawMaterialId: number;
  rawMaterialName: string;
  quantity: number;
}

export interface CreateAssociationDTO {
  productId: number;
  rawMaterialId: number;
  quantity: number;
}

export type UpdateAssociationDTO = CreateAssociationDTO;