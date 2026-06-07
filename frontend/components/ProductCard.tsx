"use client";

import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}

export function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
        )}

        <p>{product.description}</p>

        <p className="font-semibold">
          R$ {product.price}
        </p>

        <p className="text-sm text-gray-500">
          Categoria: {product.category}
        </p>

        <p className="text-sm text-gray-500">
          Estoque: {product.stock}
        </p>

        <Button
          disabled={product.stock === 0}
          onClick={() =>
            onAddToCart(product.id)
          }
        >
          Adicionar ao Carrinho
        </Button>
      </CardContent>
    </Card>
  );
}