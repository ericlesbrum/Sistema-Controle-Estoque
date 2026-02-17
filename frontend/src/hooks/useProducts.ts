import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/product.service';
import { Product, CreateProductDTO, UpdateProductDTO } from '../dtos/product.dto';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (data: CreateProductDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.create(data);
      setProducts(prev => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: number, data: UpdateProductDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.update(id, data);
      setProducts(prev => prev.map(p => (p.id === id ? response.data : p)));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update');
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
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to delete');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    clearError,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};