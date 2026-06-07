"use client";

import { CartPanel } from "./CartPanel";
import { LoginForm } from "./LoginForm";
import { ProfilePanel } from "./ProfilePanel";

interface SidebarProps {
  authUser: any;
  loginForm: any;
  setLoginForm: any;
  editForm: any;
  setEditForm: any;
  items: any[];
  onLogin: () => void;
  onLogout: () => void;
  onUpdateProfile: () => void;
}

export function Sidebar({
  authUser,
  loginForm,
  setLoginForm,
  onLogin,
  onLogout,
  items,
}: SidebarProps) {
  return (
    <aside className="w-80 bg-gray-100 p-6 border-r overflow-y-auto">
      {!authUser ? (
        <LoginForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          onLogin={onLogin}
        />
      ) : (
        <>
          <ProfilePanel
            authUser={authUser}
            itemsCount={items.length}
            onLogout={onLogout}
          />

          <CartPanel userId={authUser.id} items={items} />
        </>
      )}
    </aside>
  );
}
