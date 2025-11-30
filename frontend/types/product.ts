export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image_url: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}
