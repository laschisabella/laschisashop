"use client";

import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import { useRouter } from "next/dist/client/components/navigation";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

interface CartPanelProps {
  userId: number;
  items: CartItem[];
}

export function CartPanel({ userId, items }: CartPanelProps) {
  const { updateItem, removeItem } = useCart(userId);
  const router = useRouter();
  const { create } = useOrders();
  const { list } = useProducts();
  const products = list.data ?? [];

  const productMap = new Map(
    products.map((product: any) => [product.id, product]),
  );

  const handleIncrease = (item: CartItem) => {
    updateItem.mutate({
      itemId: item.id,
      quantity: item.quantity + 1,
    });
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity <= 1) {
      removeItem.mutate(item.id);
      return;
    }

    updateItem.mutate({
      itemId: item.id,
      quantity: item.quantity - 1,
    });
  };

  const handleRemove = (itemId: number) => {
    removeItem.mutate(itemId);
  };

  const handleCreateOrder = () => {
    create.mutate(userId, {
      onSuccess: () => {
        router.push(`/orders/${userId}`);
      },
    });
  };

  const total = items.reduce((sum, item) => {
    const product = productMap.get(item.productId);

    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-lg font-semibold mb-3">Carrinho</h2>

      {items.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const product = productMap.get(item.productId);

            return (
              <div key={item.id} className="border rounded-md p-3">
                <p>{product?.name ?? "Produto não encontrado"}</p>

                <p>R$ {product?.price ?? 0}</p>

                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </Button>

                  <span>{item.quantity}</span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full mt-2"
                  onClick={() => handleRemove(item.id)}
                >
                  Remover
                </Button>
              </div>
            );
          })}

          <div className="border-t pt-3">
            <p className="font-semibold">Total: R$ {total.toFixed(2)}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleCreateOrder}
        disabled={!items.length || create.isPending}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
      >
        {create.isPending ? "Criando..." : "Finalizar Pedido"}
      </button>
    </div>
  );
}
