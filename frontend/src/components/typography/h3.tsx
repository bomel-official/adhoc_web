import { Typography } from "@mui/material";
import React, { FC } from "react";
import { WithChildrenProps } from "./types";

export const H3: FC<WithChildrenProps> = ( { children } ) =>
    <Typography variant="h3" fontSize={ 24 } fontWeight={ 400 } sx={ { pb: 2 } }>{ children }</Typography>;
