"use client"

import { useEffect, useState } from "react"
import { LockKeyhole } from "lucide-react"

import { RelatoriosPendentesTable } from "./relatoriosPendentesTable"
import { TabSelectorAdmin } from "./tabSelectorAdmin"
import { TabsContent } from "@/components/ui/tabs"

import { get } from "@/lib/helpers/fetch.helper"

export const RelatoriosAdmin = () => {
    const [relatoriosPendentes, setRelatoriosPendentes] = useState([]);
    const [relatoriosValidados, setRelatoriosValidados] = useState([]);
    const [notAllowed, setNotAllowed] = useState(false)


    useEffect(() => {
        const getRelatoriosPendentes = async () => {
            get("/relatorios/pendentes")
                .then(async (res: Response) => {

                    if (!res.ok) {
                        setNotAllowed(true);
                        return;
                    }

                    const data = await res.json();
                    setRelatoriosPendentes(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        const getRelatoriosValidados = async () => {
            get("/relatorios/validados")
                .then(async (res: Response) => {

                    if (!res.ok) {
                        setNotAllowed(true);
                        return;
                    }

                    const data = await res.json();
                    setRelatoriosValidados(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        getRelatoriosPendentes();
        getRelatoriosValidados();
    })

    return (
        <div className="flex flex-col gap-4">
            {notAllowed ? (<h2 className="flex flex-row gap-2 ml-2"><LockKeyhole />Não autorizado, entre como gerente ou diretor.</h2>) :
                (
                    <div className="flex flex-col gap-4">
                        <TabSelectorAdmin>
                            <TabsContent value="pendentes">
                                <RelatoriosPendentesTable data={relatoriosPendentes} />
                            </TabsContent>
                            <TabsContent value="validados">
                                <RelatoriosPendentesTable data={relatoriosValidados} />
                            </TabsContent>
                        </TabSelectorAdmin>
                    </div>
                )}
        </div>
    )
}