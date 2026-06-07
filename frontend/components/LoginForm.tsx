"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  loginForm: {
    username: string;
    password: string;
  };
  setLoginForm: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
    }>
  >;
  onLogin: () => void;
}

export function LoginForm({
  loginForm,
  setLoginForm,
  onLogin,
}: LoginFormProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">
        Login
      </h2>

      <Input
        placeholder="Username"
        value={loginForm.username}
        onChange={(e) =>
          setLoginForm((prev) => ({
            ...prev,
            username: e.target.value,
          }))
        }
      />

      <Input
        type="password"
        placeholder="Password"
        value={loginForm.password}
        onChange={(e) =>
          setLoginForm((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />

      <Button onClick={onLogin}>
        Entrar
      </Button>
    </div>
  );
}