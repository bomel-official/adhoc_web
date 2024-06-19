import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useTelegramAuth } from "../../api";
import { getEnv, keycloak } from "../../core";
import { TelegramAuth } from "../telegram-auth";
import { TelegramPopup } from "../telegram-popup";
import Logo from "./../../assets/images/logo.png";

export const Header: FC = () => {
    const { data, handleOnAuth, loading } = useTelegramAuth();

    return (
        <AppBar
            position="fixed"
            sx={ {
                boxShadow: 0,
                bgcolor: "#ffffff",
                backgroundImage: "none",
                mt: 0,
            } }
        >
            <Toolbar
                variant="regular"
                sx={ ( theme ) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                    bgcolor:
                        theme.palette.mode === "light"
                            ? "rgba(255, 255, 255, 0.4)"
                            : "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(24px)",
                    maxHeight: 40,
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow:
                        theme.palette.mode === "light"
                            ?
                            `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                            :
                            "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
                }) }
            >
                <Box
                    sx={ {
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        mr: "auto",
                        px: 0,
                    } }
                >
                    <NavLink to="/">
                        <img
                            src={ Logo }
                            alt="logo"
                            style={ {
                                width: "121px",
                                height: "26px",
                                objectFit: "contain",
                                objectPosition: "left center"
                            } }
                        />
                    </NavLink>
                </Box>
                <Box sx={ { mx: 3 } }>
                    <TelegramAuth handleOnAuth={ handleOnAuth } loading={ loading } data={ data }/>
                    <TelegramPopup isAuthed={ !!data && !loading } auth={ { handleOnAuth, loading, data } }/>
                </Box>
                <Box
                    sx={ {
                        display: { xs: "none", md: "flex" },
                        gap: 0.5,
                        alignItems: "center",
                    } }
                >
                    <Button
                        color="info"
                        variant="outlined"
                        size="small"
                        component="button"
                        onClick={ () => keycloak.logout( {
                            redirectUri: getEnv(
                                process.env.REACT_APP_CLIENT_URL )
                        } ) }
                    >
                        Выйти
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
