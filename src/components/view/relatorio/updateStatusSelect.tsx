import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { put } from "@/lib/helpers/fetch.helper";
import { useToast } from "@/lib/hooks/use-toast";


export const UpdateStatusSelect = ({ status, id }: { status: string, id: string }) => {
    const { toast } = useToast();

    async function handleChange(newStatus: string) {
        try {
            const res = await put(`/relatorios/validar/${id}`, {
                status: newStatus
            });

            if (!res.ok) {
                throw new Error(`Erro ao atualizar status: ${res.status}`);
            }

            const data = await res.json();

            toast({
                description: data.mensagem || "Atualizado com sucesso!",
                variant: "default",
            });
        } catch (error) {
            console.error(error);


            toast({
                description: "Ocorreu um erro!",
                variant: "default",
            });
        }
    }

    return (
        <Select defaultValue={status} onValueChange={handleChange}>
            <SelectTrigger className="w-[150px] capitalize">
                <SelectValue placeholder="Selecionar status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="pendente" className="capitalize">pendente</SelectItem>
                <SelectItem value="rejeitado" className="capitalize">rejeitado</SelectItem>
                <SelectItem value="validado" className="capitalize">validado</SelectItem>
                <SelectItem value="assinado" className="capitalize">assinado</SelectItem>
            </SelectContent>
        </Select>
    )
}