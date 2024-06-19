import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { keycloak } from "../../core";
import { TelegramAuth } from "../telegram-auth";
import { TelegramPopupProps } from "./types";

export const TelegramPopup: FC<TelegramPopupProps> = ( { isAuthed, auth } ) => {
    const [ open, setOpen ] = useState( false );

    const handleClose = () => {
        setOpen( false );
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setOpen( !isAuthed && !keycloak.hasRealmRole('admin') );
        }, 1000)

        return () => clearTimeout(timeOut)
    }, [isAuthed])

    return (
        <Dialog
            open={ open }
            onClose={ handleClose }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Для работы с сервисом нужно подключить телеграм</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Сервису потребуется ваш ник и ID Telegram, а также имя и фамилия, чтобы мы знали как к Вам обращаться ;)
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Я только посмотреть</Button>
                <TelegramAuth handleOnAuth={ auth.handleOnAuth } loading={ auth.loading } data={ auth.data }/>
            </DialogActions>
        </Dialog>
    );
};
