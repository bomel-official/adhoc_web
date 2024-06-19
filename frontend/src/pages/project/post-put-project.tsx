import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, { FC } from "react";
import { AccountTurnoverType, useCreateProject } from "../../api";
import { H1, H3, H4 } from "../../components";
import { PostPutProjectProps } from "./types";

export const PostPutProject: FC<PostPutProjectProps> = ( { defaultValues, onSuccess } ) => {
    const createProject = useCreateProject( defaultValues, onSuccess );

    return (
        <>
            { defaultValues === null && <H1>Создать проект</H1> }
            <Box component="form" sx={ { pt: 3, pb: 5 } }>
                <H3>Общие настройки</H3>
                <FormControl sx={ { width: "100%", mb: 2 } }>
                    <TextField
                        name="title"
                        required
                        id="project-title"
                        label="Название проекта"
                        variant="outlined"
                        value={ createProject.data.title }
                        onChange={ ( e ) => createProject.setDataField( "title", e.target.value ) }
                    />
                </FormControl>
                <H3>Данные для обрабоки</H3>
                <Grid container spacing={ 4 } flexWrap="wrap" sx={ { p: "16px 0" } }>
                    <Grid item md={ 6 }>
                        <H4>Обороты по счёту</H4>
                        <Stack direction="column" gap={ 2 }>
                            { createProject.data.accountTurnovers.map( ( accountTurnover, index ) => (
                                <Card variant="outlined" key={ index }>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Box>
                                                <H4>{ accountTurnover.filename ??
                                                    <Typography color="red">Файл не указан!</Typography>
                                                }</H4>
                                                <Typography>Счёт: <b>{ accountTurnover.bill }</b></Typography>
                                                <Typography>Год: <b>{ accountTurnover.year }</b></Typography>
                                                <Typography>Квартал: <b>{ accountTurnover.quarter }</b></Typography>
                                                <Typography>Тип: <b>{ AccountTurnoverType[accountTurnover.type] }</b></Typography>
                                            </Box>
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={ () => {
                                                    createProject.removeAccountTurnoverFile( index );
                                                } }
                                            >
                                                Удалить
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ) ) }
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid container spacing={ 2 } flexWrap="wrap">
                                        <Grid item md={ 6 }>
                                            <Button variant="contained" component="label"
                                                    sx={ { width: "100%", mt: 1.5 } }>
                                                { createProject.newAccountTurnover.filename || "Файл" }
                                                <input
                                                    hidden
                                                    type="file"
                                                    accept=".xlsx"
                                                    onChange={ ( e ) => {
                                                        const files = e.target.files;
                                                        if ( files && files[0] ) {
                                                            createProject.setNewAccountTurnover(
                                                                ( prevState ) => ({
                                                                    ...prevState,
                                                                    file: files[0],
                                                                    filename: files[0].name
                                                                }) );
                                                        }
                                                    } }
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item md={ 6 }>
                                            <TextField
                                                required
                                                id="project-new-account-turnover-bill"
                                                label="Номер счёта"
                                                variant="standard"
                                                type="number"
                                                sx={ { width: "100%" } }
                                                value={ createProject.newAccountTurnover.bill }
                                                onChange={ ( e ) => createProject.setNewAccountTurnover(
                                                    ( prevState ) => ({
                                                        ...prevState,
                                                        bill: parseInt( e.target.value ) ||
                                                            0
                                                    }) ) }
                                            />
                                        </Grid>
                                        <Grid item md={ 6 }>
                                            <TextField
                                                required
                                                id="project-new-account-turnover-year"
                                                label="Год"
                                                variant="standard"
                                                type="number"
                                                sx={ { width: "100%" } }
                                                value={ createProject.newAccountTurnover.year }
                                                onChange={ ( e ) => createProject.setNewAccountTurnover(
                                                    ( prevState ) => ({
                                                        ...prevState,
                                                        year: parseInt( e.target.value ) ||
                                                            0
                                                    }) ) }
                                            />
                                        </Grid>
                                        <Grid item md={ 6 }>
                                            <TextField
                                                required
                                                id="project-new-account-turnover-quarter"
                                                label="Квартал"
                                                variant="standard"
                                                type="number"
                                                sx={ { width: "100%" } }
                                                value={ createProject.newAccountTurnover.quarter }
                                                onChange={ ( e ) => createProject.setNewAccountTurnover(
                                                    ( prevState ) => ({
                                                        ...prevState,
                                                        quarter: parseInt( e.target.value ) ||
                                                            0
                                                    }) ) }
                                            />
                                        </Grid>
                                        <Grid item md={ 12 }>
                                            <FormControl fullWidth>
                                                <InputLabel id="project-new-account-turnover-type">Тип
                                                    ведомости</InputLabel>
                                                <Select
                                                    labelId="project-new-account-turnover-type"
                                                    id="project-new-account-turnover-type-select"
                                                    value={ createProject.newAccountTurnover.type }
                                                    label="Тип ведомости"
                                                    onChange={ ( e ) => createProject.setNewAccountTurnover(
                                                        ( prevState ) => ({
                                                            ...prevState,
                                                            type: (e.target.value === "turnover" ||
                                                                e.target.value === "turnover balance") ?
                                                                e.target.value :
                                                                "turnover"
                                                        }) ) }
                                                >
                                                    <MenuItem value={ "turnover" }>Оборотная</MenuItem>
                                                    <MenuItem
                                                        value={ "turnover balance" }>Оборотно-сальдовая</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={ 12 }>
                                            <Button
                                                variant="contained"
                                                sx={ { width: "100%", mt: 1.5 } }
                                                color="success"
                                                onClick={ createProject.addAccountTurnoverFile }
                                            >
                                                Добавить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                    <Grid item md={ 6 }>
                        <H4>Складские остатки</H4>
                        <Stack direction="column" gap={ 2 }>
                            { createProject.data.inventoryBalances.map( ( inventoryBalance, index ) => (
                                <Card variant="outlined" key={ index }>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Box>
                                                <H4>{ inventoryBalance.filename ??
                                                    <Typography color="red">Файл не указан!</Typography>
                                                }</H4>
                                                <Typography>Счёт: <b>{ inventoryBalance.bill }</b></Typography>
                                                <Typography>Дата: <b>{ inventoryBalance.date }</b></Typography>
                                            </Box>
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={ () => {
                                                    createProject.removeInventoryBalancesFile( index );
                                                } }
                                            >
                                                Удалить
                                            </Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ) ) }
                            <Card variant="outlined">
                                <CardContent>
                                    <Grid container spacing={ 2 } flexWrap="wrap">
                                        <Grid item md={ 6 }>
                                            <Button variant="contained" component="label"
                                                    sx={ { width: "100%", mt: 1.5 } }>
                                                { createProject.newInventoryBalance.filename || "Файл" }
                                                <input
                                                    hidden
                                                    type="file"
                                                    accept=".xlsx"
                                                    onChange={ ( e ) => {
                                                        const files = e.target.files;
                                                        if ( files && files[0] ) {
                                                            createProject.setNewInventoryBalance(
                                                                ( prevState ) => ({
                                                                    ...prevState,
                                                                    file: files[0],
                                                                    filename: files[0].name
                                                                }) );
                                                        }
                                                    } }
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item md={ 6 }>
                                            <TextField
                                                required
                                                id="project-new-inventory-balance-bill"
                                                label="Номер счёта"
                                                variant="standard"
                                                type="number"
                                                sx={ { width: "100%" } }
                                                value={ createProject.newInventoryBalance.bill }
                                                onChange={ ( e ) => createProject.setNewInventoryBalance(
                                                    ( prevState ) => ({
                                                        ...prevState,
                                                        bill: parseInt( e.target.value ) ||
                                                            0
                                                    }) ) }
                                            />
                                        </Grid>
                                        <Grid item md={ 12 }>
                                            <TextField
                                                required
                                                id="project-new-inventory-balance-date"
                                                label="Дата"
                                                variant="standard"
                                                sx={ { width: "100%" } }
                                                value={ createProject.newInventoryBalance.date }
                                                onChange={ ( e ) => createProject.setNewInventoryBalance(
                                                    ( prevState ) => ({
                                                        ...prevState,
                                                        date: e.target.value
                                                    }) ) }
                                            />
                                        </Grid>
                                        <Grid item md={ 12 }>
                                            <Button
                                                variant="contained"
                                                sx={ { width: "100%", mt: 1.5 } }
                                                color="success"
                                                onClick={ createProject.addInventoryBalancesFile }
                                            >
                                                Добавить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
                { createProject.error && <Alert severity="error">{ createProject.error }</Alert> }
                { createProject.isSucceeded && <Alert severity="success">Проект успешно обновлён!</Alert> }
                <Button
                    sx={ { mt: 2 } }
                    size="large"
                    variant="contained"
                    onClick={ ( e ) => {
                        e.preventDefault();
                        createProject.submit();
                    } }
                >
                    Сохранить
                </Button>
            </Box>
        </>
    );
};
