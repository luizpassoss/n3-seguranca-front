

import React, { ReactNode } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface TabsProps {
    children: ReactNode;
}

export const TabSelectorAdmin = ({ children }: TabsProps) => {
    return (
        <div className="flex w-full flex-col gap-6">
            <Tabs defaultValue="pendentes">
                <TabsList className="gap-2 mb-4">
                    <TabsTrigger value="pendentes">Relatórios Pendentes</TabsTrigger>
                    <TabsTrigger value="validados">
                        Repositórios Validados
                    </TabsTrigger>
                    <TabsTrigger value="assinados">Relatórios Assinado</TabsTrigger>
                </TabsList>

                {children}
            </Tabs>
        </div>
    );
};
