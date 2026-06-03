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
  - You are about to drop the `insignia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `insignia_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modulos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `progresso_trilha_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ranking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rankings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respostas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respostas_usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trilhas_aprendizado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
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
ALTER TABLE "insignia_usuario" DROP CONSTRAINT "insignia_usuario_insigniaId_fkey";

-- DropForeignKey
ALTER TABLE "insignia_usuario" DROP CONSTRAINT "insignia_usuario_temaId_fkey";

-- DropForeignKey
ALTER TABLE "insignia_usuario" DROP CONSTRAINT "insignia_usuario_trilhaId_fkey";

-- DropForeignKey
ALTER TABLE "insignia_usuario" DROP CONSTRAINT "insignia_usuario_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "modulos" DROP CONSTRAINT "modulos_track_id_fkey";

-- DropForeignKey
ALTER TABLE "progresso_trilha_usuario" DROP CONSTRAINT "progresso_trilha_usuario_track_id_fkey";

-- DropForeignKey
ALTER TABLE "progresso_trilha_usuario" DROP CONSTRAINT "progresso_trilha_usuario_user_id_fkey";

-- DropForeignKey
ALTER TABLE "questoes" DROP CONSTRAINT "questoes_module_id_fkey";

-- DropForeignKey
ALTER TABLE "ranking" DROP CONSTRAINT "ranking_usuarioId_fkey";

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
DROP TABLE "insignia";

-- DropTable
DROP TABLE "insignia_usuario";

-- DropTable
DROP TABLE "modulos";

-- DropTable
DROP TABLE "progresso_trilha_usuario";

-- DropTable
DROP TABLE "questoes";

-- DropTable
DROP TABLE "ranking";

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

-- DropEnum
DROP TYPE "TipoInsignia";
