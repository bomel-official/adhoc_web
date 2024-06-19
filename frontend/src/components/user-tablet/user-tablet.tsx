import TelegramIcon from "@mui/icons-material/Telegram";
import { Autocomplete, Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useAddAccess } from "../../api/hooks/use-add-access";
import { useRemoveAccess } from "../../api/hooks/use-remove-access";
import { Project } from "../../types";
import { H3, H4 } from "../typography";
import { UserTabletProps } from "./types";

export const UserTablet: FC<UserTabletProps> = ( { user, projects, setUser } ) => {
    let username = "";
    if ( user.telegramUser ) {
        const fullName = user.telegramUser.last_name ?
            user.telegramUser.first_name + " " + user.telegramUser.last_name :
            user.telegramUser.first_name;
        username = user.telegramUser.username ? `@${ user.telegramUser.username }` : fullName;
    }

    const [ toAddValue, setToAddValue ] = useState<Project | null>( null );
    const userProjectIds = (user.telegramUser && user.telegramUser.projects && user.telegramUser.projects.length) ?
        user.telegramUser.projects.map( project => project.id ) : [];

    const removeAccess = useRemoveAccess();
    const addAccess = useAddAccess();

    return (
        <Card variant="outlined" sx={ { height: "100%" } }>
            <CardContent>
                <p>Информация о пользователе:</p>
                <H3><b>{ user.username }</b> { user.email }</H3>
                <H4>{ user.firstName } { user.lastName }</H4>
                { user.telegramUser && username && <>
                    <Box sx={ { display: "inline-block" } }><Box sx={ {
                        backgroundColor: "#54A9EB", borderRadius: "4px", py: 0.5, px: 1.5,
                        display: "flex", alignItems: "center", gap: 1, color: "white"
                    } }>
                        <TelegramIcon/>
                        <Typography fontWeight="400" fontSize={ 14 } lineHeight={ "14px" }>{ username }</Typography>
                    </Box></Box>
                    { user.telegramUser.projects && !!user.telegramUser.projects.length && <>
                        <p>Проекты пользователя:</p>
                        { user.telegramUser.projects.map( project => (
                            <Stack direction="row" alignItems="center" spacing={ 2 }>
                                <b style={ {
                                    maxWidth: "calc(100% - 170px)", wordBreak: "break-word"
                                } }>{ project.title }</b>
                                <Button color="error" onClick={ async () => {
                                    if ( user.telegramUser ) {
                                        const newTelegramUser = await removeAccess( project.id, user.telegramUser.id );
                                        setUser( { ...user, telegramUser: newTelegramUser } );
                                    }
                                } }>Закрыть доступ</Button>
                            </Stack>
                        ) ) }
                    </> }
                    <Autocomplete
                        sx={ { mt: 3, mb: 2 } }
                        getOptionLabel={ ( project ) => project.title }
                        options={ projects.filter( project => !userProjectIds.includes( project.id ) ) }
                        id="autocomplete-projects"
                        value={ toAddValue }
                        onChange={ ( event: any, newValue: Project | null ) => {
                            setToAddValue( newValue );
                        } }
                        renderInput={ ( params ) => (
                            <TextField { ...params } label="Название" variant="standard"/>
                        ) }
                    />
                    <Button variant="contained" onClick={ async () => {
                        if ( user.telegramUser && toAddValue ) {
                            const newTelegramUser = await addAccess( toAddValue.id, user.telegramUser.id );
                            setUser( { ...user, telegramUser: newTelegramUser } );
                        }
                    } }>Предоставить доступ</Button>
                </> }
            </CardContent>
        </Card>
    );
};
