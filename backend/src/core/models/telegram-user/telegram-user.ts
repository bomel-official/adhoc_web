import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Project } from "../project";
import { TelegramUserProject } from "../telegram-user-project";

@Table( {
    tableName: "telegramUsers",
    freezeTableName: true
} )
export class TelegramUser
    extends Model<InferAttributes<TelegramUser>, InferCreationAttributes<TelegramUser>> {
    @Column( {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    } )
    declare id: CreationOptional<number>;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare keycloakId: string;

    @Column( {
        type: DataTypes.FLOAT, allowNull: false
    } )
    declare telegramId: number;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare firstName: string;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare authDate: number;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare hash: string;

    @Column( {
        type: DataTypes.STRING, allowNull: true
    } )
    declare lastName?: CreationOptional<string>;

    @Column( {
        type: DataTypes.STRING, allowNull: true
    } )
    declare photoUrl?: CreationOptional<string>;

    @Column( {
        type: DataTypes.STRING, allowNull: true
    } )
    declare username?: CreationOptional<string>;

    @BelongsToMany( () => Project, () => TelegramUserProject )
    declare projects: NonAttribute<Project[]>;
}
