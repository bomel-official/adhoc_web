import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "../project";

@Table( {
    tableName: "inventoryBalances",
    freezeTableName: true
} )
export class InventoryBalance
    extends Model<InferAttributes<InventoryBalance>, InferCreationAttributes<InventoryBalance>> {
    @Column( {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    } )
    declare id: CreationOptional<number>;

    @Column( {
        type: DataTypes.INTEGER, allowNull: false
    } )
    declare bill: number;

    @Column( {
        type: DataTypes.STRING, allowNull: false
    } )
    declare date: string;

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
