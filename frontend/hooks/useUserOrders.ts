import { useQuery } from "@tanstack/react-query";
import { OrdersService } from "@/services/orders";

export function useUserOrders(userId: number) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => OrdersService.findByUser(userId),
    enabled: !!userId,
  });
}