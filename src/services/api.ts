import axios from 'axios';
import { BasketRequest, BasketResponse, ProductList } from '../types';

const API_BASE = 'https://localhost:44395/api';

export const fetchProducts = async (): Promise<ProductList[]> => {
  const res = await axios.get(`${API_BASE}/Product/products`);
  return res.data || [];
};

export const addBasket = async (basket: BasketRequest): Promise<BasketResponse> => {
  const res = await axios.post(`${API_BASE}/Basket/addBasket`, basket);
  return res.data;
};