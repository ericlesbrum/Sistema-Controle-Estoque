import { useState, useEffect, useCallback } from 'react';
import { associationService } from '../services/productRawMaterial.service';
import { ProductRawMaterial, CreateAssociationDTO, UpdateAssociationDTO } from '../dtos/productRawMaterial.dto';

export const useAssociations = (productId?: number) => {
  const [associations, setAssociations] = useState<ProductRawMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssociations = useCallback(async () => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await associationService.getByProduct(productId);
      setAssociations(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load associations');
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const createAssociation = async (data: CreateAssociationDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await associationService.create(data);
      setAssociations(prev => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create association');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateAssociation = async (id: number, data: UpdateAssociationDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await associationService.update(id, data);
      setAssociations(prev => prev.map(a => (a.id === id ? response.data : a)));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update association');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAssociation = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await associationService.delete(id);
      setAssociations(prev => prev.filter(a => a.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete association');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchAssociations();
    }
  }, [productId, fetchAssociations]);

  return {
    associations,
    loading,
    error,
    fetchAssociations,
    createAssociation,
    updateAssociation,
    deleteAssociation,
  };
};