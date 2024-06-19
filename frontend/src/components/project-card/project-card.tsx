import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { H3 } from "../typography";
import { ProjectCardProps } from "./types";

export const ProjectCard: FC<ProjectCardProps> = ( { project } ) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <H3>{ project.title }</H3>
            </CardContent>
            <CardActions>
                <NavLink to={ `/project/${ project.id }` }>
                    <Button variant="outlined">Перейти</Button>
                </NavLink>
            </CardActions>
        </Card>
    );
};
