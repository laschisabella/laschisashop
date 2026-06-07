"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductsTable from "./ProductsTable";
import UsersTable from "./UsersTable";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTable />
        </TabsContent>

        <TabsContent value="users">
          <UsersTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
