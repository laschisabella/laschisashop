"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useUsers } from "@/hooks/useUsers";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/product";
import { ProductGrid } from "@/components/ProductGrid";
import { Sidebar } from "@/components/Sidebar";

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

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");

    if (savedUser) {
      setAuthUser(JSON.parse(savedUser));
    }
  }, []);

  const { items, addItem } = useCart(authUser?.id);

  if (list.isLoading || userList.isLoading) {
    return <p>Carregando...</p>;
  }

  if (!list.data) {
    return <p>Nenhum produto encontrado</p>;
  }

  const activeProducts = list.data.filter((product: Product) => product.active);

  const handleLogin = () => {
    const user = userList.data?.find(
      (u: any) =>
        u.username === loginForm.username && u.password === loginForm.password,
    );

    if (user) {
      setAuthUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));

      setEditForm({
        email: user.email,
        password: user.password,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");

    setAuthUser(null);

    setLoginForm({
      username: "",
      password: "",
    });
  };

  const handleUpdateProfile = () => {
    if (!authUser) return;

    update.mutate(
      {
        id: authUser.id,
        data: {
          email: editForm.email,
          password: editForm.password,
        },
      },
      {
        onSuccess: (updatedUser) => {
          setAuthUser(updatedUser);
          alert("Perfil atualizado com sucesso!");
        },
      },
    );
  };

  const handleAddToCart = (productId: number) => {
    if (!authUser) {
      alert("Faça login para adicionar itens ao carrinho");
      return;
    }

    addItem.mutate({
      productId,
      quantity: 1,
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        authUser={authUser}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        editForm={editForm}
        setEditForm={setEditForm}
        items={items}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />

      <ProductGrid products={activeProducts} onAddToCart={handleAddToCart} />
    </div>
  );
}
