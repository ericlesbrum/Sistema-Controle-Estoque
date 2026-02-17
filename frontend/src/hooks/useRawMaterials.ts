import { useState, useEffect, useCallback } from 'react';
import { rawMaterialService } from '../services/rawMaterial.service';
import { RawMaterial, CreateRawMaterialDTO, UpdateRawMaterialDTO } from '../dtos/rawMaterial.dto';

export const useRawMaterials = () => {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await rawMaterialService.getAll();
      setMaterials(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load raw materials');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMaterial = async (data: CreateRawMaterialDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rawMaterialService.create(data);
      setMaterials(prev => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMaterial = async (id: number, data: UpdateRawMaterialDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rawMaterialService.update(id, data);
      setMaterials(prev => prev.map(m => (m.id === id ? response.data : m)));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await rawMaterialService.delete(id);
      setMaterials(prev => prev.filter(m => m.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return {
    materials,
    loading,
    error,
    fetchMaterials,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
};