import { UserRepresentation } from "../../types";

export interface UserTabletListProps {
    users: UserRepresentation[];
    setUsers: ( users: UserRepresentation[] ) => void;
}
