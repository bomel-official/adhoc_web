export interface AccountTurnoverDTO {
    id?: number;
    bill: number;
    year: number;
    quarter: number;
    type: "turnover" | "turnover balance";
    file: File | null;
    filename: string;
}

export interface InventoryBalanceDTO {
    id?: number;
    bill: number;
    date: string;
    file: File | null;
    filename: string;
}

export interface AccountTurnover {
    id: number;
    bill: number;
    year: number;
    quarter: number;
    type: "turnover" | "turnover balance";
    url: string;
    filename: string;
}

export interface InventoryBalance {
    id: number;
    bill: number;
    date: string;
    url: string;
    filename: string;
}

export interface Project {
    id: number;
    title: string;
    accountTurnovers: AccountTurnover[];
    inventoryBalances: InventoryBalance[];
}

export interface ProjectDTO {
    id?: number;
    title: string;
    accountTurnovers: AccountTurnoverDTO[];
    inventoryBalances: InventoryBalanceDTO[];
}
