import { Project, UserRepresentation } from "../../types";

export interface UserTabletProps {
    user: UserRepresentation;
    projects: Project[];
    setUser: ( user: UserRepresentation ) => void;
}
