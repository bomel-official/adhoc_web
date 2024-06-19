import { Typography } from "@mui/material";
import React, { FC } from "react";
import { WithChildrenProps } from "./types";

export const H4: FC<WithChildrenProps> = ( { children } ) =>
    <Typography variant="h4" fontSize={ 16 } fontWeight={ 400 } sx={ { pb: 2 } }>{ children }</Typography>;
