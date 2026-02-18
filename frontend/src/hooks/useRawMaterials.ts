import { useState, useEffect, useCallback } from 'react';
import { rawMaterialService } from '../services/rawMaterial.service';
import { RawMaterial, CreateRawMaterialDTO, UpdateRawMaterialDTO } from '../dtos/rawMaterial.dto';
import { Page } from '../dtos/page';

export const useRawMaterials = (initialPage = 0, pageSize = 10, initialSort = 'id,asc') => {
  const [materials, setMaterials] = useState<RawMaterial[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchMaterials = useCallback(async (pageToFetch: number, sortToUse: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await rawMaterialService.getAll(pageToFetch, pageSize, sortToUse);
      const data: Page<RawMaterial> = response.data;
      setMaterials(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load raw materials');
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchMaterials(0, sort);
  }, [sort, fetchMaterials]);

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchMaterials(newPage, sort);
    }
  };

  const handleSort = (field: string) => {
    const direction = sort.includes(field) && sort.endsWith('asc') ? 'desc' : 'asc';
    setSort(`${field},${direction}`);
  };

  const createMaterial = async (data: CreateRawMaterialDTO) => {
    setLoading(true);
    setError(null);
    try {
      await rawMaterialService.create(data);
      await fetchMaterials(0, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Falha ao criar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMaterial = async (id: number, data: UpdateRawMaterialDTO) => {
    setLoading(true);
    setError(null);
    try {
      await rawMaterialService.update(id, data);
      await fetchMaterials(page, sort);
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
      const newPage = materials.length === 1 && page > 0 ? page - 1 : page;
      await fetchMaterials(newPage, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    materials,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    sort,
    clearError,
    fetchMaterials,
    goToPage,
    handleSort,
    createMaterial,
    updateMaterial,
    deleteMaterial,
  };
};