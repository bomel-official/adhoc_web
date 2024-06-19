import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProject } from "../../api";
import { H1, Loader, PageWrapper } from "../../components";
import { PostPutProject } from "./post-put-project";

export const ProjectPage = () => {
    const { id } = useParams();
    const { data, loading, setData } = useGetProject( id );

    if ( loading ) {
        return (
            <PageWrapper>
                <Stack alignItems="center">
                    <Loader/>
                </Stack>
            </PageWrapper>
        );
    }

    if ( !data ) {
        return (
            <PageWrapper>
                <PostPutProject defaultValues={ data }/>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <H1>{ data.title }</H1>
            <PostPutProject defaultValues={ data } onSuccess={ ( project ) => setData( project ) }/>
        </PageWrapper>
    );
};
