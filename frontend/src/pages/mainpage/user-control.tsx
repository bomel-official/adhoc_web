import { Alert, Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { useCreateUser } from "../../api/hooks/use-create-user";
import { useGetUsers } from "../../api/hooks/use-get-users";
import { H2 } from "../../components";
import { UserTabletList } from "../../components/user-tablet-list";

export const UserControl = () => {
    const [ searchQuery, setSearchQuery ] = useState( "" );
    const { data: users, setData: setUsers, loading: loadingUsers } = useGetUsers( searchQuery );
    const {
        data: newUser, submit: submitNewUser, setData: setNewUser, error: errorNewUser,
        isSucceeded: isSucceededNewUser
    } = useCreateUser( ( user ) => setUsers( ( prevState ) => [ ...prevState, user ] ) );

    return (
        <>
            <H2>Добавить пользователя</H2>
            <Box component="form" sx={ { pb: 5 } }>
                <Grid container spacing={ 2 } flexWrap="wrap" sx={ { p: "16px 0" } }>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                name="username"
                                required
                                id="user-username"
                                label="Username"
                                variant="outlined"
                                value={ newUser.username }
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({ ...prevState, username: e.target.value }) ) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                name="password"
                                required
                                id="user-password"
                                label="Пароль"
                                variant="outlined"
                                value={ newUser.password }
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({ ...prevState, password: e.target.value }) ) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                name="firstName"
                                required
                                id="user-firstName"
                                label="Имя"
                                variant="outlined"
                                value={ newUser.firstName }
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({ ...prevState, firstName: e.target.value }) ) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                name="lastName"
                                required
                                id="user-lastName"
                                label="Фамилия"
                                variant="outlined"
                                value={ newUser.lastName }
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({ ...prevState, lastName: e.target.value }) ) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <TextField
                                name="email"
                                required
                                id="user-email"
                                label="Email"
                                variant="outlined"
                                value={ newUser.email }
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({ ...prevState, email: e.target.value }) ) }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={ 6 }>
                        <FormControl fullWidth>
                            <InputLabel id="user-role-select-label">Роль</InputLabel>
                            <Select
                                labelId="user-role-select-label"
                                id="user-role-select"
                                value={ newUser.role }
                                label="Роль"
                                onChange={ ( e ) => setNewUser(
                                    ( prevState ) => ({
                                        ...prevState,
                                        role: e.target.value as "user" | "admin"
                                    }) ) }
                            >
                                <MenuItem value={ "user" }>Пользователь</MenuItem>
                                <MenuItem value={ "admin" }>Администратор</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                { errorNewUser && <Alert severity="error">{ errorNewUser }</Alert> }
                { isSucceededNewUser && <Alert severity="success">Пользователь добавлен!</Alert> }
                <Button
                    sx={ { mt: 2 } }
                    size="large"
                    variant="contained"
                    onClick={ ( e ) => {
                        e.preventDefault();
                        submitNewUser();
                    } }
                >
                    Добавить
                </Button>
            </Box>
            <H2>Просмотр пользователей</H2>
            <TextField
                fullWidth
                name="s"
                required
                id="users-s"
                label="Email пользователя"
                variant="outlined"
                value={ searchQuery }
                onChange={ ( e ) => setSearchQuery( e.target.value ) }
            />
            <UserTabletList users={ users } setUsers={ ( newUsers ) => setUsers( newUsers ) }/>
        </>
    );
};
