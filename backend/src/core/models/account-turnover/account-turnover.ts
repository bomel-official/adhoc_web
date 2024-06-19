import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "../project";

@Table( {
    tableName: "accountTurnovers",
    freezeTableName: true
} )
export class AccountTurnover
    extends Model<InferAttributes<AccountTurnover>, InferCreationAttributes<AccountTurnover>> {
    @Column( {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    } )
    declare id: CreationOptional<number>;

    @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare bill: number;

    @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare year: number;

    @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare quarter: number;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare type: string;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare filename: string;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare url: string;

    @ForeignKey( () => Project ) @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare projectId: Project["id"];
    @BelongsTo( () => Project )
    declare project: NonAttribute<Project>;
}
