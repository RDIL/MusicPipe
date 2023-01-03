import { DataSource, DataSourceOptions } from "typeorm"
import { resolve } from "path"
import { config as configureEnvironment } from "dotenv"

configureEnvironment({
    path: resolve(
        process.cwd(),
        process.env.ENV_FILE ? `.env.${process.env.ENV_FILE}` : ".env"
    ),
})

const isWin = process.platform === "win32"

const url = isWin
    ? process.env.DATABASE_URL ||
      `postgres://postgres:postgrespw@localhost:${
          process.env.POSTGRES_DEV_PORT || "49153"
      }`
    : process.env.DATABASE_URL

const config: DataSourceOptions = {
    type: "postgres",
    url,
    entities: ["src/entities.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    migrationsRun: true,
    ssl: !!process.env.DATABASE_URL,
    extra: !!process.env.DATABASE_URL
        ? {
              ssl: {
                  rejectUnauthorized: false,
              },
          }
        : {},
}

export const dataSource = new DataSource(config)
