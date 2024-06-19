import { AccountTurnoverDTO, InventoryBalanceDTO, ProjectDTO } from "../../../types";

const todayDate = new Date();
const todayDateDay = todayDate.getDate() > 9 ? todayDate.getDate() : "0" + todayDate.getDate();
const todayDateMonth = (todayDate.getMonth() + 1) > 9 ? (todayDate.getMonth() + 1) : "0" + (todayDate.getMonth() + 1);
const todayDateYear = todayDate.getFullYear();
const todayDateString = `${ todayDateDay }.${ todayDateMonth }.${ todayDateYear }`;

export const AccountTurnoverType = {
    "turnover": "Оборотная",
    "turnover balance": "Оборотно-сальдовая"
};

export const DEFAULT_INVENTORY_BALANCE: InventoryBalanceDTO = {
    bill: 105,
    date: todayDateString,
    file: null,
    filename: ""
};

export const DEFAULT_ACCOUNT_TURNOVER: AccountTurnoverDTO = {
    bill: 105,
    year: 2024,
    quarter: Math.ceil( (todayDate.getMonth() + 1) / 3 ),
    type: "turnover",
    file: null,
    filename: ""
};

export const DEFAULT_PROJECT: ProjectDTO = {
    title: "",
    accountTurnovers: [],
    inventoryBalances: []
};
