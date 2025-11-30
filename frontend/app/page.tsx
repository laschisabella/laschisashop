"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { list } = useProducts();
  const { list: userList, update } = useUsers();
  const [authUser, setAuthUser] = useState<any | null>(null);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [editForm, setEditForm] = useState({
    email: "",
    password: "",
  });

  if (list.isLoading || userList.isLoading) return <p>Carregando...</p>;
  if (!list.data) return <p>Nenhum produto encontrado</p>;

  const activeProducts = list.data.filter((product: Product) => product.active);

  const handleLogin = () => {
    const user = userList.data?.find(
      (u: any) =>
        u.username === loginForm.username && u.password === loginForm.password
    );
    if (user) {
      setAuthUser(user);
      setEditForm({ email: user.email, password: user.password });
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const handleLogout = () => {
    setAuthUser(null);
    setLoginForm({ username: "", password: "" });
  };

  const handleUpdateProfile = () => {
    if (!authUser) return;
    update.mutate(
      {
        id: authUser.id,
        data: { email: editForm.email, password: editForm.password },
      },
      {
        onSuccess: (updatedUser) => {
          setAuthUser(updatedUser);
          alert("Perfil atualizado com sucesso!");
        },
      }
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar de perfil */}
      <aside className="w-64 bg-gray-100 p-6 border-r flex-shrink-0">
        {!authUser ? (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Login</h2>
            <Input
              placeholder="Username"
              value={loginForm.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <Button onClick={handleLogin}>Entrar</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Meu Perfil</h2>
            <p>
              <strong>Username:</strong> {authUser.username}
            </p>
            <Input
              placeholder="Email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
            />
            <Input
              placeholder="Senha"
              type="password"
              value={editForm.password}
              onChange={(e) =>
                setEditForm({ ...editForm, password: e.target.value })
              }
            />
            <Button onClick={handleUpdateProfile}>Atualizar Perfil</Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </aside>

      {/* Lista de produtos */}
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
