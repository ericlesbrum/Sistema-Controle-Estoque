import { useState, useEffect, useCallback } from 'react';
import { associationService } from '../services/productRawMaterial.service'; // ajuste o caminho se necessário
import { ProductRawMaterial, CreateAssociationDTO, UpdateAssociationDTO } from '../dtos/productRawMaterial.dto';
import { Page } from '../dtos/page';

export const useAssociations = (productId?: number, initialPage = 0, pageSize = 10, initialSort = 'rawMaterialName,asc') => {
  const [associations, setAssociations] = useState<ProductRawMaterial[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchAssociations = useCallback(async (pageToFetch: number, sortToUse: string) => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await associationService.getByProduct(productId, pageToFetch, pageSize, sortToUse);
      const data: Page<ProductRawMaterial> = response.data;
      setAssociations(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load associations');
    } finally {
      setLoading(false);
    }
  }, [productId, pageSize]);

  useEffect(() => {
    if (productId) {
      fetchAssociations(0, sort);
    }
  }, [sort, fetchAssociations, productId]);

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchAssociations(newPage, sort);
    }
  };

  const handleSort = (field: string) => {
    const direction = sort.includes(field) && sort.endsWith('asc') ? 'desc' : 'asc';
    setSort(`${field},${direction}`);
  };

  const createAssociation = async (data: CreateAssociationDTO) => {
    setLoading(true);
    setError(null);
    try {
      await associationService.create(data);
      await fetchAssociations(0, sort);
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
      await associationService.update(id, data);
      await fetchAssociations(page, sort);
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
      const newPage = associations.length === 1 && page > 0 ? page - 1 : page;
      await fetchAssociations(newPage, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete association');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    associations,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    sort,
    clearError,
    fetchAssociations,
    goToPage,
    handleSort,
    createAssociation,
    updateAssociation,
    deleteAssociation,
  };
};