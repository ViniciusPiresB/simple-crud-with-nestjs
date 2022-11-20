import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { envConfig } from "./config/";
import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: envConfig.POSTGRES_HOST,
      port: envConfig.POSTGRES_PORT,
      username: envConfig.POSTGRES_USER,
      password: envConfig.POSTGRES_PASSWORD,
      database: envConfig.POSTGRES_DATABASE,
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
