import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CartsService } from "@/services/carts";

export function useCart(userId: number) {
  const queryClient = useQueryClient();

  const cart = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => CartsService.getByUser(userId),
    enabled: !!userId,
  });

  const addItem = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      let currentCart = cart.data;

      if (!currentCart) {
        currentCart = await CartsService.create(userId);
      }

      return CartsService.addItem(
        currentCart.id,
        productId,
        quantity,
      );
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      }),
  });

  const updateItem = useMutation({
    mutationFn: ({
      itemId,
      quantity,
    }: {
      itemId: number;
      quantity: number;
    }) => CartsService.updateItem(itemId, quantity),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      }),
  });

  const removeItem = useMutation({
    mutationFn: (itemId: number) =>
      CartsService.removeItem(itemId),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      }),
  });

  return {
    cart,
    items: cart.data?.items ?? [],
    addItem,
    updateItem,
    removeItem,
  };
}