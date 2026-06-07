import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrdersService } from "@/services/orders";

export function useOrders() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["orders"],
    queryFn: OrdersService.findAll,
  });

  const create = useMutation({
    mutationFn: OrdersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return {
    list,
    create,
  };
}