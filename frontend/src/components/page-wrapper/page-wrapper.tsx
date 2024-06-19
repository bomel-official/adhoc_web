import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";
import { Header } from "../header";
import { PageWrapperProps } from "./types";

export const PageWrapper: FC<PageWrapperProps> = ( { children } ) => {
    return (
        <Box sx={ { pt: 8 } }>
            <Header/>
            <Box>
                <Container sx={ { padding: "32px 20px" } }>
                    { children }
                </Container>
            </Box>
        </Box>
    );
};
