import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "../project";
import { TelegramUser } from "../telegram-user";

@Table( {
    tableName: "telegramUserProjects",
    freezeTableName: true
} )
export class TelegramUserProject
    extends Model<InferAttributes<TelegramUserProject>, InferCreationAttributes<TelegramUserProject>> {
    @Column( {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    } )
    declare id: CreationOptional<number>;

    @ForeignKey( () => Project ) @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare projectId: Project["id"];

    @ForeignKey( () => TelegramUser ) @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare telegramUserId: TelegramUser["id"];
}
