import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import SadRobot from "../../assets/images/sad-robot.png";
import { PageWrapper } from "../../components";

export const Page404 = () => {
    return (
        <PageWrapper>
            <Grid container component="main" spacing={2}
                  sx={ { height: "100%", maxHeight: "1016px" } }>
                <Grid
                    item
                    xs={ false }
                    md={ 7 }
                    sx={ {
                        height: "100%"
                    } }
                >
                    <img src={ SadRobot } alt="404 page" style={ {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "bottom center",
                        display: "block"
                    } }/>
                </Grid>
                <Grid
                    item
                    xs={ false }
                    md={ 5 }
                    sx={ {
                        height: "100%", display: "flex", alignItems: "center",
                        justifyContent: "center", flexDirection: "column"
                    } }
                >
                    <Typography variant="h2" textAlign="center" fontSize="32px"
                                fontWeight="700">Страница не
                        найдена...</Typography>
                    <NavLink to="/">
                        <Button variant="contained" sx={ { mt: 2 } }>Вернуться
                            на главную</Button>
                    </NavLink>
                </Grid>
            </Grid>
        </PageWrapper>
    );
};
