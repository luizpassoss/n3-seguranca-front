import React, { ReactNode } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface TabsProps {
  children: ReactNode;
}

export const TabSelectorRelatorio = ({ children }: TabsProps) => {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="listar">
        <TabsList className="gap-2">
          <TabsTrigger value="listar">Listar Relatórios</TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-primary"
            value="enviar"
          >
            Enviar Relatório
          </TabsTrigger>
        </TabsList>

        <Separator className="my-4" />

        {children}
      </Tabs>
    </div>
  );
};
