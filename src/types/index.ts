export interface ProductList {
  id: number;
  name: string;
}

export interface Product {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  discount: number;
  rowTotal: number;
}

export interface BasketItem {
  productId: number;
  quantity: number;
}

export interface BasketRequest {
  items: BasketItem[];
}

export interface BasketResponse {
  products: Product[]
  total: number;
}