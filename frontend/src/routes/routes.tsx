import React from "react";
import { Route, Routes } from "react-router-dom";
import { MainPage, Page404, ProjectPage } from "../pages";

export const PageRouter = () => {
    return (
        <Routes>
            <Route path="/" element={ <MainPage/> }/>
            <Route path="/project/:id" element={ <ProjectPage/> }/>
            <Route path="/project" element={ <ProjectPage/> }/>
            <Route path="*" element={ <Page404/> }/>
        </Routes>
    );
};
