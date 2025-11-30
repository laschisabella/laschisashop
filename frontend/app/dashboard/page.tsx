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
          <TabsTrigger value="settings">Test</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTable />
        </TabsContent>

        <TabsContent value="users">
          <UsersTable />
        </TabsContent>

        <TabsContent value="settings">
          <div className="p-4 border rounded-md bg-gray-50">Test</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
