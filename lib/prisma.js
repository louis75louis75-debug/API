/**
 * ============================================================================
 *  lib/prisma.js — Connexion à la base de données via Prisma
 * ============================================================================
 *
 *  Prisma est un ORM (Object-Relational Mapping) : il permet de manipuler la
 *  base de données avec du code JavaScript (prisma.user.create(), findMany()...)
 *  plutôt qu'avec des requêtes SQL écrites à la main.
 *
 *  Le schéma des tables est défini dans le fichier prisma/schema.prisma.
 *
 *  Documentation officielle :
 *   - Prisma Client      : https://www.prisma.io/docs/orm/prisma-client
 *   - Bonnes pratiques   : https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
 *   - Logging            : https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging
 * ============================================================================
 */

const { PrismaClient } = require("@prisma/client")

// Instance unique de Prisma Client, partagée par toute l'application.
// On évite ainsi de créer une connexion par requête (ce qui sature la base,
// surtout sur Neon/Postgres serverless).
//
// `log: ["warn", "error"]` affiche dans la console uniquement les
// avertissements et les erreurs de Prisma (pratique pour déboguer).
const prisma = new PrismaClient({
  log: ["warn", "error"],
})

// On exporte cette instance pour la réutiliser partout (controllers, middlewares).
module.exports = prisma
