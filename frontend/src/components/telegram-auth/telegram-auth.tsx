import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Typography } from "@mui/material";
import { LoginButton } from "@telegram-auth/react";
import React, { FC } from "react";
import { getEnv } from "../../core";
import { Loader } from "../loader";
import { TelegramAuthProps } from "./types";

export const TelegramAuth: FC<TelegramAuthProps> = ( { data, loading, handleOnAuth } ) => {
    let username = "error...";
    if ( data ) {
        const fullName = data.last_name ? data.first_name + " " + data.last_name :
            data.first_name;
        username = data.username ? `@${ data.username }` : fullName;
    }

    return (
        <>
            { loading && <Loader size={ 32 }/> }
            <Box sx={ { display: !loading && data === null ? "block" : "none" } }>
                <LoginButton
                    showAvatar={ true }
                    botUsername={ getEnv(
                        process.env.REACT_APP_TELEGRAM_BOT_USERNAME ) }
                    onAuthCallback={ handleOnAuth }
                    buttonSize="medium"
                    cornerRadius={ 5 }
                />
            </Box>
            { !loading && data !== null && <Box sx={ {
                backgroundColor: "#54A9EB", borderRadius: "4px", py: 0.5, px: 1.5,
                display: "flex", alignItems: "center", gap: 1, color: "white"
            } }>
                <TelegramIcon/>
                <Typography fontWeight="400" fontSize={ 14 } lineHeight={ "14px" }>{ username }</Typography>
            </Box> }
        </>
    );
};
