import { Grid } from "@mui/material";
import { FC } from "react";
import { ProjectCard } from "../project-card";
import { ProjectCardListProps } from "./types";

export const ProjectCardList: FC<ProjectCardListProps> = ( { projects } ) => {
    return (
        <Grid container spacing={ 2 } sx={ { padding: "32px 0" } }
              flexWrap="wrap">
            { projects.map( project => (
                <Grid item md={ 6 } key={ project.id }>
                    <ProjectCard project={ project }/>
                </Grid>
            ) ) }
        </Grid>
    );
};
