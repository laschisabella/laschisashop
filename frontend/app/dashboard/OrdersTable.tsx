"use client";

import { useOrders } from "@/hooks/useOrders";

export default function OrdersTable() {
  const { list } = useOrders();

  if (list.isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Todos os Pedidos
      </h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Pedido</th>
            <th className="p-2 text-left">Usuário</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Qtd. Itens</th>
          </tr>
        </thead>

        <tbody>
          {list.data?.map((order: any) => {
            const total = order.orderItems.reduce(
              (acc: number, item: any) =>
                acc + item.price * item.quantity,
              0,
            );

            const itemsCount = order.orderItems.reduce(
              (acc: number, item: any) =>
                acc + item.quantity,
              0,
            );

            return (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="p-2">
                  #{order.id}
                </td>

                <td className="p-2">
                  {order.user?.username ??
                    order.userId}
                </td>

                <td className="p-2">
                  R$ {total.toFixed(2)}
                </td>

                <td className="p-2">
                  {new Date(
                    order.createdAt,
                  ).toLocaleDateString("pt-BR")}
                </td>

                <td className="p-2">
                  {itemsCount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}