"use client";

import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";

export default function HomePage() {
  const { list } = useProducts();

  if (list.isLoading) return <p>Carregando produtos...</p>;
  if (!list.data) return <p>Nenhum produto encontrado</p>;

  // Filtra apenas produtos ativos
  const activeProducts = list.data.filter((product: Product) => product.active);

  return (
    <div className="flex h-screen">
      {/* Sidebar de perfil */}
      <aside className="w-64 bg-gray-100 p-6 border-r flex-shrink-0">
        <div className="space-y-4 sticky top-0">
          <h2 className="text-xl font-bold">Perfil do Cliente</h2>
          <div className="space-y-2">
            <p>
              <strong>Nome:</strong> João Silva
            </p>
            <p>
              <strong>Email:</strong> joao.silva@email.com
            </p>
            <p>
              <strong>Telefone:</strong> (11) 99999-9999
            </p>
          </div>
          <Button>Editar Perfil</Button>
        </div>
      </aside>

      {/* Lista de produtos com scroll independente */}
      <main className="flex-1 p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeProducts.map((product: Product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-semibold">R$ {product.price}</p>
              <p className="text-sm text-gray-500">
                Categoria: {product.category}
              </p>
              <p className="text-sm text-gray-500">Estoque: {product.stock}</p>
              <Button disabled={product.stock === 0}>
                Adicionar ao Carrinho
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
