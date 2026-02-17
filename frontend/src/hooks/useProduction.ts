import { useState, useCallback } from 'react';
import { productionService } from '../services/production.service';
import { ProductionResponse } from '../dtos/production.dto';

export const useProduction = () => {
  const [production, setProduction] = useState<ProductionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const calculateProduction = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productionService.calculate();
      setProduction(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to calculate production');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    production,
    loading,
    error,
    clearError,
    calculateProduction,
  };
};