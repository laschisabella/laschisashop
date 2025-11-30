import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function UsersTable() {
  const { list, create, update, remove } = useUsers();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [updatedId, setUpdatedId] = useState<number | null>(null);

  if (list.isLoading) return <p>Carregando...</p>;
  if (!list.data) return <p>Nenhum usuário encontrado</p>;

  const handleCreate = () => {
    create.mutate(
      {
        username: form.username || "Sem username",
        email: form.email || "",
        password: form.password || "",
      },
      {
        onSuccess: () =>
          setForm({
            username: "",
            email: "",
            password: "",
          }),
      }
    );
  };

  const applyHighlight = (id: number) => {
    setUpdatingId(null);
    setUpdatedId(id);
    setTimeout(() => setUpdatedId(null), 800);
  };

  const handleEdit = (id: number, field: string, value: any) => {
    setUpdatingId(id);

    update.mutate(
      { id, data: { [field]: value } },
      {
        onSuccess: (updatedUser) => {
          queryClient.setQueryData(["users"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((u: any) =>
              u.id === updatedUser.id ? updatedUser : u
            );
          });
          applyHighlight(id);
        },
        onError: () => setUpdatingId(null),
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Form de criação */}
      <div className="grid grid-cols-3 gap-2">
        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      <Button onClick={handleCreate}>Adicionar Usuário</Button>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.data.map((user) => {
            const updating = updatingId === user.id;
            const updated = updatedId === user.id;

            return (
              <TableRow
                key={user.id}
                className={
                  updating
                    ? "bg-gray-100 transition-all"
                    : updated
                    ? "bg-green-100 transition-all"
                    : ""
                }
              >
                <TableCell>
                  <Input
                    defaultValue={user.username}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(user.id, "username", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Input
                    defaultValue={user.email}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) => handleEdit(user.id, "email", e.target.value)}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    disabled={updating}
                    onClick={() => remove.mutate(user.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
