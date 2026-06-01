import { type Insignia, type TipoInsignia} from "../prisma/generated/prisma";
import { InsigniaRepository } from "../Repositories/insigniaRepository";

export class InsigniaService {
    constructor(
        private readonly insigniaRepository: InsigniaRepository
    ) {}

    async listarTodas(): Promise<Insignia[]> {
        return await this.insigniaRepository.listarTodas();
    }

    async buscarPorId(id: string): Promise<Insignia> {
        const insignia =
            await this.insigniaRepository.buscarPorId(id);

        if (!insignia) {
            throw new Error("Insígnia não encontrada.");
        }

        return insignia;
    }

    async buscarPorTitulo(
        titulo: string
    ): Promise<Insignia> {
        const insignia =
            await this.insigniaRepository.buscarPorTitulo(
                titulo
            );

        if (!insignia) {
            throw new Error("Insígnia não encontrada.");
        }

        return insignia;
    }

    async listarPorTipo(
        tipo: TipoInsignia
    ): Promise<Insignia[]> {
        return await this.insigniaRepository.listarPorTipo(
            tipo
        );
    }
}