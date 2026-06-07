"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfilePanelProps {
  authUser: {
    id: number;
    username: string;
    email: string;
    password: string;
  };
  itemsCount: number;
  onLogout: () => void;
}

export function ProfilePanel({
  authUser,
  itemsCount,
  onLogout,
}: ProfilePanelProps) {
  const { update } = useUsers();

  const [email, setEmail] = useState(
    authUser.email
  );

  const [password, setPassword] =
    useState(authUser.password);

  const handleUpdate = () => {
    update.mutate(
      {
        id: authUser.id,
        data: {
          email,
          password,
        },
      },
      {
        onSuccess: () => {
          alert(
            "Perfil atualizado com sucesso!"
          );
        },
      }
    );
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">
        Meu Perfil
      </h2>

      <p>
        <strong>Username:</strong>{" "}
        {authUser.username}
      </p>

      <p>
        <strong>Itens no carrinho:</strong>{" "}
        {itemsCount}
      </p>

      <Input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <Input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <Button
        onClick={handleUpdate}
        disabled={update.isPending}
      >
        Atualizar Perfil
      </Button>

      <Button
        variant="destructive"
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}