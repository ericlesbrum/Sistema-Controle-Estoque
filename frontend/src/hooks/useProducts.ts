import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/product.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';
import { Page } from '../dtos/page';

export const useProducts = (initialPage = 0, pageSize = 10, initialSort = 'id,asc') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchProducts = useCallback(async (pageToFetch: number, sortToUse: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(pageToFetch, pageSize, sortToUse);
      const data: Page<Product> = response.data;
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setPage(data.number);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Falha ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchProducts(0, sort);
  }, [sort, fetchProducts]);

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchProducts(newPage, sort);
    }
  };

  const handleSort = (field: string) => {
    const direction = sort.includes(field) && sort.endsWith('asc') ? 'desc' : 'asc';
    setSort(`${field},${direction}`);
  };

  const createProduct = async (data: CreateProductDTO) => {
    setLoading(true);
    setError(null);
    try {
      await productService.create(data);
      await fetchProducts(0, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Falha ao criar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, data: UpdateProductDTO) => {
    setLoading(true);
    setError(null);
    try {
      await productService.update(id, data);
      await fetchProducts(page, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Falha ao atualizar produto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await productService.delete(id);
      const newPage = products.length === 1 && page > 0 ? page - 1 : page;
      await fetchProducts(newPage, sort);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Falha ao remover produto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    sort,
    clearError,
    fetchProducts,
    goToPage,
    handleSort,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};