import api from './api';
import { ProductionResponse } from '../dtos/production.dto';

export const productionService = {
  calculate: () =>
    api.get<ProductionResponse>('/production'),
};