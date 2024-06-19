import Button from "@mui/material/Button";
import React from "react";
import { NavLink } from "react-router-dom";
import { useGetProjects } from "../../api";
import { H1, ProjectCardList } from "../../components";

export const OwnProjects = () => {
    const { data } = useGetProjects();
    return (
        <>
            <H1>Ваши проекты</H1>
            <ProjectCardList
                projects={ data }
            />
            <NavLink to={ `/project/` }>
                <Button variant="contained">Создать проект</Button>
            </NavLink>
        </>
    );
};
