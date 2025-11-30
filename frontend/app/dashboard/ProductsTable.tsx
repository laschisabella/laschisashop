"use client";

import { useProducts } from "@/hooks/useProducts";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductsTable() {
  const { list, create, update, remove } = useProducts();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    image_url: "",
  });

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updatedId, setUpdatedId] = useState<string | null>(null);

  if (list.isLoading) return <p>Carregando...</p>;
  if (!list.data) return <p>Nenhum produto encontrado</p>;

  const handleCreate = () => {
    create.mutate(
      {
        name: form.name || "Sem nome",
        price: Number(form.price) || 0,
        description: form.description || "",
        category: form.category || "",
        stock: Number(form.stock) || 0,
        image_url: form.image_url || "",
        active: true,
      },
      {
        onSuccess: () =>
          setForm({
            name: "",
            price: "",
            description: "",
            category: "",
            stock: "",
            image_url: "",
          }),
      }
    );
  };

  const applyHighlight = (id: string) => {
    setUpdatingId(null);
    setUpdatedId(id);
    setTimeout(() => setUpdatedId(null), 800);
  };

  const handleEdit = (id: string, field: string, value: any) => {
    setUpdatingId(id);

    update.mutate(
      {
        id,
        data:
          field === "price" || field === "stock"
            ? { [field]: Number(value) }
            : { [field]: value },
      },
      {
        onSuccess: (updatedProduct) => {
          queryClient.setQueryData(["products"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((p: any) =>
              p.id === updatedProduct.id ? updatedProduct : p
            );
          });
          applyHighlight(id);
        },
        onError: () => setUpdatingId(null),
      }
    );
  };

  const handleToggleActive = (id: string, value: boolean) => {
    setUpdatingId(id);

    update.mutate(
      { id, data: { active: value } },
      {
        onSuccess: (updatedProduct) => {
          queryClient.setQueryData(["products"], (oldData: any) => {
            if (!oldData) return oldData;
            return oldData.map((p: any) =>
              p.id === updatedProduct.id ? updatedProduct : p
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
      <div className="grid grid-cols-6 gap-2">
        <Input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Preço"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <Input
          placeholder="Descrição"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <Input
          placeholder="Categoria"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <Input
          placeholder="Estoque"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <Input
          placeholder="URL da imagem"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
        />
      </div>

      <Button onClick={handleCreate}>Adicionar Produto</Button>

      {/* Tabela */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Imagem</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {list.data.map((product) => {
            const updating = updatingId === product.id;
            const updated = updatedId === product.id;

            return (
              <TableRow
                key={product.id}
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
                    defaultValue={product.name}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(product.id, "name", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type="number"
                    defaultValue={product.price}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(product.id, "price", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Input
                    defaultValue={product.description}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(product.id, "description", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Input
                    defaultValue={product.category}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(product.id, "category", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Input
                    type="number"
                    defaultValue={product.stock}
                    className={`w-20 ${updating ? "opacity-50" : ""}`}
                    onBlur={(e) =>
                      handleEdit(product.id, "stock", e.target.value)
                    }
                  />
                </TableCell>

                {/* Visualização da imagem */}
                <TableCell className="flex items-center gap-2">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Sem imagem</span>
                  )}
                  <Input
                    defaultValue={product.image_url}
                    className={updating ? "opacity-50" : ""}
                    onBlur={(e) =>
                      handleEdit(product.id, "image_url", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <Checkbox
                    checked={product.active}
                    className={updating ? "opacity-50" : ""}
                    onCheckedChange={(value) =>
                      handleToggleActive(product.id, Boolean(value))
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    disabled={updating}
                    onClick={() => remove.mutate(product.id)}
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
