"use client";

import { useEffect, useState } from "react";
import { useUserOrders } from "@/hooks/useUserOrders";

export default function OrdersPage() {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("authUser");

    if (user) {
      setAuthUser(JSON.parse(user));
    }
  }, []);

  const { data: orders, isLoading } = useUserOrders(
    authUser?.id,
  );

  if (!authUser) {
    return <p>Carregando...</p>;
  }

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Meus Pedidos
      </h1>

      {!orders?.length && (
        <p>Nenhum pedido encontrado.</p>
      )}

      {orders?.map((order) => {
        const total = order.orderItems.reduce(
          (acc: number, item: any) =>
            acc + item.price * item.quantity,
          0,
        );

        return (
          <div
            key={order.id}
            className="border p-4 rounded mb-4"
          >
            <p>
              <strong>Pedido #{order.id}</strong>
            </p>

            <p>
              <strong>Total:</strong> R$ {total.toFixed(2)}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString(
                "pt-BR",
              )}
            </p>

            <div className="mt-3">
              <strong>Itens:</strong>

              <ul className="mt-2 space-y-1">
                {order.orderItems.map((item: any) => (
                  <li key={item.id}>
                    {item.product.name} ({item.quantity}x)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}