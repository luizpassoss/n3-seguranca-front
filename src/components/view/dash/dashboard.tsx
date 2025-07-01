"use client";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { DashboardTable } from "./tableDashboard";
import { CardDashboard } from "./cardDashboard";

import { delet, get } from "@/lib/helpers/fetch.helper";
import { IUser } from "@/lib/global.types";
import { useToast } from "@/lib/hooks/use-toast";

export const Dashboard = () => {
  const [funcionarios, setFuncionarios] = useState<IUser[]>([]);
  const [notAllowed, setNotAllowed] = useState(false)
  const [date, setDate] = useState<string>("");

  const { toast } = useToast();

  useEffect(() => {
    const getFuncionarios = async () => {
      get("/funcionarios")
        .then(async (res: Response) => {

          if (!res.ok) {
            setNotAllowed(true);
            return;
          }

          const data = await res.json();
          setFuncionarios(data.funcionarios);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getFuncionarios();

    const now = new Date().toLocaleString("pt-BR");
    setDate(`Atualizado em ${now}`);
  }, []);

  const deleteFuncionario = async (id: string) => {
    delet("/funcionarios/" + id)
      .then(async (res: Response) => {
        const data = await res.json();

        toast({
          description: data.mensagem ?? "Deletado com sucesso!",
          variant: "default",
        });

        setFuncionarios((prev) => prev.filter((user) => user._id != id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full p-10 z-40">
      <div className="grid grid-cols-3 gap-4">
        <CardDashboard
          title="Funcionários"
          value={funcionarios?.length?.toString() ?? 0}
          update={date}
        />
        <CardDashboard title="Relatórios" value="290" update={date} />
        <CardDashboard title="Teste" value="666" update={date} />
      </div>

      <Separator className="my-4" />

      <DashboardTable
        data={funcionarios}
        setFuncionarios={setFuncionarios}
        deleteFuncionario={deleteFuncionario}
        notAllowed={notAllowed}
      />
    </div>
  );
};
