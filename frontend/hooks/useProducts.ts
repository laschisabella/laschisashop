import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductsService } from "@/services/products";

export function useProducts() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.findAll,
  });

  const create = useMutation({
    mutationFn: ProductsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ProductsService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const remove = useMutation({
    mutationFn: ProductsService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { list, create, update, remove };
}
