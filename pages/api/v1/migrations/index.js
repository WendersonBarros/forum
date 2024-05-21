import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

async function migrations(request, response) {
  const dbClient = await database.getNewClient();
  const defaultMigrationOpitions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations"
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOpitions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOpitions,
      dryRun: false,
    });

    await dbClient.end();

    if (migratedMigrations.length) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  if (request.method !== "GET" && request.method !== "POST") {
    await dbClient.end();
    return response.status(400).send("Operation not permitted!");
  }


  return response.status(405).end();
}

export default migrations;
