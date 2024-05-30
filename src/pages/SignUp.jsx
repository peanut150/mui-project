import { Box, Container, Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function SignUp() {
    const [isError, setIsError] = useState(false);

    const validate = () => {
        setIsError(true);
    }

  return (
    <>
        <Box sx={{ alignContent: "center", height: "97vh" }}>
            <Container maxWidth="xs" component={Paper} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ p: 1 }}>Sign Up</Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Box sx={{ p: 1 }}>
                                <TextField
                                    required
                                    error={isError}
                                    helperText={isError ? "First name should not be blank." : ""}
                                    label="First Name"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Box sx={{ p: 1 }}>
                                <TextField
                                    required
                                    error={isError}
                                    helperText={isError ? "Last name should not be blank." : ""}
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>

                        <Grid item sm={12}>
                            <Box sx={{ p: 1 }}>
                                <TextField
                                    required
                                    error={isError}
                                    helperText={isError ? "Invalid Email" : ""}
                                    fullWidth
                                    label="Email Address"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>

                        <Grid item sm={12}>
                            <Box sx={{ p: 1 }}>
                                <TextField
                                    required
                                    error={isError}
                                    helperText={isError ? "Invalid Password" : ""}
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>

                        <Grid item sm={12}>
                            <Box sx={{ p: 1 }}>
                                <TextField
                                    required
                                    error={isError}
                                    helperText={isError ? "Passwords do not match" : ""}
                                    fullWidth
                                    label="Confirm Password"
                                    variant="outlined"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ p: 1 }}>
                        <Button
                            size="large"
                            fullWidth
                            onClick={validate}
                            variant="contained"
                            endIcon={<PersonAddAltRoundedIcon />}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">Already have an account? Login</Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    </>
  )
}
