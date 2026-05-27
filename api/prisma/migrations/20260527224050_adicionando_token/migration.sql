/*
  Warnings:

  - You are about to drop the `assuntos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avaliacoes_resposta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bloqueios_trilha_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conquistas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conquistas_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `criterios_avaliacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `habilidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `habilidades_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modulos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `progresso_trilha_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rankings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respostas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respostas_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trilhas_aprendizado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NivelDificuldade" AS ENUM ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO');

-- CreateEnum
CREATE TYPE "StatusTrilhaUsuario" AS ENUM ('EM_ANDAMENTO', 'CONCLUIDA', 'AGUARDANDO_REVISAO', 'BLOQUEADA');

-- CreateEnum
CREATE TYPE "TipoInsignia" AS ENUM ('CONCLUSAO_TRILHA', 'APROVACAO_TRILHA', 'MESTRE_TEMA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('ACCESS', 'REFRESH');

-- DropForeignKey
ALTER TABLE "avaliacoes_resposta" DROP CONSTRAINT "avaliacoes_resposta_criteria_id_fkey";

-- DropForeignKey
ALTER TABLE "avaliacoes_resposta" DROP CONSTRAINT "avaliacoes_resposta_user_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "bloqueios_trilha_usuario" DROP CONSTRAINT "bloqueios_trilha_usuario_track_id_fkey";

-- DropForeignKey
ALTER TABLE "bloqueios_trilha_usuario" DROP CONSTRAINT "bloqueios_trilha_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "conquistas_usuario" DROP CONSTRAINT "conquistas_usuario_achievement_id_fkey";

-- DropForeignKey
ALTER TABLE "conquistas_usuario" DROP CONSTRAINT "conquistas_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "habilidades_usuario" DROP CONSTRAINT "habilidades_usuario_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "habilidades_usuario" DROP CONSTRAINT "habilidades_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "modulos" DROP CONSTRAINT "modulos_track_id_fkey";

-- DropForeignKey
ALTER TABLE "progresso_trilha_usuario" DROP CONSTRAINT "progresso_trilha_usuario_track_id_fkey";

-- DropForeignKey
ALTER TABLE "progresso_trilha_usuario" DROP CONSTRAINT "progresso_trilha_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "questoes" DROP CONSTRAINT "questoes_module_id_fkey";

-- DropForeignKey
ALTER TABLE "rankings" DROP CONSTRAINT "rankings_user_id_fkey";

-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_question_id_fkey";

-- DropForeignKey
ALTER TABLE "respostas_usuario" DROP CONSTRAINT "respostas_usuario_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "respostas_usuario" DROP CONSTRAINT "respostas_usuario_question_id_fkey";

-- DropForeignKey
ALTER TABLE "respostas_usuario" DROP CONSTRAINT "respostas_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "trilhas_aprendizado" DROP CONSTRAINT "trilhas_aprendizado_subject_id_fkey";

-- DropTable
DROP TABLE "assuntos";

-- DropTable
DROP TABLE "avaliacoes_resposta";

-- DropTable
DROP TABLE "bloqueios_trilha_usuario";

-- DropTable
DROP TABLE "conquistas";

-- DropTable
DROP TABLE "conquistas_usuario";

-- DropTable
DROP TABLE "criterios_avaliacao";

-- DropTable
DROP TABLE "habilidades";

-- DropTable
DROP TABLE "habilidades_usuario";

-- DropTable
DROP TABLE "modulos";

-- DropTable
DROP TABLE "progresso_trilha_usuario";

-- DropTable
DROP TABLE "questoes";

-- DropTable
DROP TABLE "rankings";

-- DropTable
DROP TABLE "respostas";

-- DropTable
DROP TABLE "respostas_usuario";

-- DropTable
DROP TABLE "trilhas_aprendizado";

-- DropTable
DROP TABLE "usuarios";

-- DropEnum
DROP TYPE "NameAssunto";

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "pontuacaoTotal" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tema" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tema_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "temaId" TEXT NOT NULL,
    "pontuacaoTotal" INTEGER NOT NULL DEFAULT 0,
    "trilhasConcluidas" INTEGER NOT NULL DEFAULT 0,
    "nivelAtual" "NivelDificuldade" NOT NULL DEFAULT 'INICIANTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tema_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trilha" (
    "id" TEXT NOT NULL,
    "temaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "nivel" "NivelDificuldade" NOT NULL,
    "ordem" INTEGER NOT NULL,
    "pontuacaoMinima" INTEGER NOT NULL,
    "trilhaAnteriorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trilha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulo" (
    "id" TEXT NOT NULL,
    "trilhaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "ordem" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questao" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dificuldade" INTEGER NOT NULL,
    "xpRecompensa" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resposta_questao" (
    "id" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "codigoResposta" TEXT NOT NULL,
    "explicacao" TEXT,
    "pontuacao" INTEGER NOT NULL,
    "cleanCodeScore" INTEGER NOT NULL,
    "performanceScore" INTEGER NOT NULL,
    "legibilidadeScore" INTEGER NOT NULL,
    "pontosPositivos" TEXT,
    "pontosNegativos" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resposta_questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resposta_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "questaoId" TEXT NOT NULL,
    "respostaQuestaoId" TEXT NOT NULL,
    "pontuacaoRecebida" INTEGER NOT NULL,
    "respondidaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resposta_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trilha_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "trilhaId" TEXT NOT NULL,
    "status" "StatusTrilhaUsuario" NOT NULL DEFAULT 'EM_ANDAMENTO',
    "pontuacaoAtual" INTEGER NOT NULL DEFAULT 0,
    "pontuacaoNecessaria" INTEGER NOT NULL,
    "percentualConclusao" INTEGER NOT NULL DEFAULT 0,
    "podeDesbloquear" BOOLEAN NOT NULL DEFAULT false,
    "moduloAtualId" TEXT,
    "questaoAtualId" TEXT,
    "iniciadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidaEm" TIMESTAMP(3),

    CONSTRAINT "trilha_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conquista" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "icone" TEXT,
    "xpRecompensa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conquista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conquista_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "conquistaId" TEXT NOT NULL,
    "desbloqueadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conquista_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "habilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "habilidade_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "habilidadeId" TEXT NOT NULL,
    "pontuacao" INTEGER NOT NULL DEFAULT 0,
    "nivel" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "habilidade_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insignia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "icone" TEXT,
    "tipo" "TipoInsignia" NOT NULL,
    "xpRecompensa" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insignia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insignia_usuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "insigniaId" TEXT NOT NULL,
    "temaId" TEXT,
    "trilhaId" TEXT,
    "desbloqueadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "insignia_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranking" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "xpTotal" INTEGER NOT NULL,
    "posicao" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TypeToken" NOT NULL DEFAULT 'ACCESS',
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tema_nome_key" ON "tema"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tema_usuario_usuarioId_temaId_key" ON "tema_usuario"("usuarioId", "temaId");

-- CreateIndex
CREATE UNIQUE INDEX "resposta_usuario_usuarioId_questaoId_key" ON "resposta_usuario"("usuarioId", "questaoId");

-- CreateIndex
CREATE UNIQUE INDEX "trilha_usuario_usuarioId_trilhaId_key" ON "trilha_usuario"("usuarioId", "trilhaId");

-- AddForeignKey
ALTER TABLE "tema_usuario" ADD CONSTRAINT "tema_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tema_usuario" ADD CONSTRAINT "tema_usuario_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha" ADD CONSTRAINT "trilha_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha" ADD CONSTRAINT "trilha_trilhaAnteriorId_fkey" FOREIGN KEY ("trilhaAnteriorId") REFERENCES "trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "modulo_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questao" ADD CONSTRAINT "questao_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_questao" ADD CONSTRAINT "resposta_questao_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_questaoId_fkey" FOREIGN KEY ("questaoId") REFERENCES "questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta_usuario" ADD CONSTRAINT "resposta_usuario_respostaQuestaoId_fkey" FOREIGN KEY ("respostaQuestaoId") REFERENCES "resposta_questao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_usuario" ADD CONSTRAINT "trilha_usuario_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_usuario" ADD CONSTRAINT "conquista_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conquista_usuario" ADD CONSTRAINT "conquista_usuario_conquistaId_fkey" FOREIGN KEY ("conquistaId") REFERENCES "conquista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidade_usuario" ADD CONSTRAINT "habilidade_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habilidade_usuario" ADD CONSTRAINT "habilidade_usuario_habilidadeId_fkey" FOREIGN KEY ("habilidadeId") REFERENCES "habilidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insignia_usuario" ADD CONSTRAINT "insignia_usuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insignia_usuario" ADD CONSTRAINT "insignia_usuario_insigniaId_fkey" FOREIGN KEY ("insigniaId") REFERENCES "insignia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insignia_usuario" ADD CONSTRAINT "insignia_usuario_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "tema"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "insignia_usuario" ADD CONSTRAINT "insignia_usuario_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
