import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/product.service';
import { Product } from '../dtos/product.dto';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
};