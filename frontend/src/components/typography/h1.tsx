import { Typography } from "@mui/material";
import React, { FC } from "react";
import { WithChildrenProps } from "./types";

export const H1: FC<WithChildrenProps> = ( { children } ) =>
    <Typography variant="h1" fontSize={ 32 } fontWeight={ 700 } sx={ { pb: 2 } }>{ children }</Typography>;
