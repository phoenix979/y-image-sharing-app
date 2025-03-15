import "reflect-metadata";
import { DataSource } from "typeorm";
import { Image } from "./entity/Image";
import dotenv from "dotenv";

dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [Image],
  migrations: [],
  subscribers: [],
});
