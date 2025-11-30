import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UsersService } from "@/services/users";

export function useUsers() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.findAll,
  });

  const create = useMutation({
    mutationFn: UsersService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      UsersService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const remove = useMutation({
    mutationFn: UsersService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const login = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      UsersService.login(email, password),
  });

  const me = useQuery({
    queryKey: ["me"],
    queryFn: UsersService.getMe,
  });

  return { list, create, update, remove, login, me };
}
