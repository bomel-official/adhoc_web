import { Grid } from "@mui/material";
import { FC } from "react";
import { useGetRequest } from "../../api";
import { Project } from "../../types";
import { UserTablet } from "../user-tablet";
import { UserTabletListProps } from "./types";

export const UserTabletList: FC<UserTabletListProps> = ( { users, setUsers } ) => {
    const { data: projects } = useGetRequest<Project[]>(
        [],
        "/api/admin/projects" );

    return (
        <Grid container spacing={ 2 } sx={ { padding: "32px 0" } }
              flexWrap="wrap">
            { users.map( ( user, index ) => (
                <Grid item md={ 6 } key={ user.id }>
                    <UserTablet user={ user } projects={ projects } setUser={ ( newUser ) => setUsers(users.map(
                            ( prevUser, prevUserIndex ) => (prevUserIndex === index) ? newUser :
                                prevUser ) ) }/>
                </Grid>
            ) ) }
        </Grid>
    );
};
