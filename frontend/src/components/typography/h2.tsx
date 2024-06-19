import { Typography } from "@mui/material";
import React, { FC } from "react";
import { WithChildrenProps } from "./types";

export const H2: FC<WithChildrenProps> = ( { children } ) =>
    <Typography variant="h2" fontSize={ 24 } fontWeight={ 700 } sx={ { pb: 2 } }>{ children }</Typography>;
