"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/components/ui/navs/sidebar";
import { TabsContent } from "@/components/ui/tabs";
import { TabSelectorRelatorio } from "@/components/view/relatorio/tabSelectorRelatorio";
import RelatorioForm from "@/components/view/relatorio/relatorioForm";
import { RelatoriosTable } from "@/components/view/relatorio/relatoriosTable";

import { get } from "@/lib/helpers/fetch.helper";
import { RelatoriosPendentesTable } from "@/components/view/relatorio/relatoriosPendentesTable";
import { Separator } from "@/components/ui/separator";
import { LockKeyhole } from "lucide-react";
import { RelatoriosAdmin } from "@/components/view/relatorio/relatoriosAdmin";

export default function PageRelatorios() {
  const [meusRelatorios, setMeusRelatorios] = useState([]);


  useEffect(() => {
    const getMeusRelatorios = async () => {
      get("/relatorios/meus-relatorios")
        .then(async (res: Response) => {
          const data = await res.json();

          setMeusRelatorios(data.relatorios);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getMeusRelatorios();
  }, []);

  return (
    <div className="relative flex flex-row w-screen h-screen ">
      <Sidebar />
      <div className="gap-2 p-5 w-full max-h-screen overflow-y-scroll">
        <TabSelectorRelatorio>
          <TabsContent value="listar">
            <RelatoriosTable data={meusRelatorios} />

            <Separator className="my-4" />

            <RelatoriosAdmin />
          </TabsContent>
          <TabsContent value="enviar">
            <RelatorioForm />
          </TabsContent>
        </TabSelectorRelatorio>
      </div>
    </div>
  );
}
