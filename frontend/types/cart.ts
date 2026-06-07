export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
    image_url?: string;
    active: boolean;
  };
}