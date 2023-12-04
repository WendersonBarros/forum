import database from "infra/database.js"

const status = async (request, response) => {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SELECT version()")
  const postgresMaxConnections = await database.query("SHOW MAX_CONNECTIONS")
  const postgresUsedConnections = await database.query("SELECT numbackends FROM pg_stat_database")

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: postgresVersion?.rows[0].version,
    max_connections: postgresMaxConnections?.rows[0].max_connections,
    used_connections: postgresUsedConnections?.rows[0].numbackends,
  });
}

export default status;
