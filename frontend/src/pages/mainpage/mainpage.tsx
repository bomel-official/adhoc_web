import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../components";
import { keycloak } from "../../core";
import { AdminControl } from "./admin-control";
import { OwnProjects } from "./own-projects";

export const MainPage = () => {

    return (
        <PageWrapper>
            {keycloak.hasRealmRole('admin') ?
                <AdminControl/> :
                <OwnProjects/>
            }
        </PageWrapper>
    );
};
