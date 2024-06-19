import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { AccountTurnover } from "../account-turnover";
import { InventoryBalance } from "../inventory-balance";
import { TelegramUser } from "../telegram-user";
import { TelegramUserProject } from "../telegram-user-project";

@Table( {
    tableName: "projects",
    freezeTableName: true
} )
export class Project
    extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {

    @Column( {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    } )
    declare id: CreationOptional<number>;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare title: string;

    @HasMany( () => AccountTurnover )
    declare accountTurnovers: NonAttribute<AccountTurnover[]>;

    @HasMany( () => InventoryBalance )
    declare inventoryBalances: NonAttribute<InventoryBalance[]>;

    @BelongsToMany( () => TelegramUser, () => TelegramUserProject )
    declare users: NonAttribute<TelegramUser[]>;
}
