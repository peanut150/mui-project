import { Container, Box, Paper, TextField, Button, Typography, InputAdornment, IconButton, Select, MenuItem } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import supabase from "../services/Supabase";
import { LoadingButton } from "@mui/lab";
export default function SignUpPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        repassword: "",
    });

    const [profile, setProfile] = useState({
        fullname: "",
        gender: "",
        address: "",
        contact_no: "",
        birthdate: "",
        schoolid: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something wen't wrong!");
    const [loading, setLoading] = useState(false);

    const setUserDetails = (key, value) => {
        setIsError(false);
        setErrorMessage("");
        const oldDetails = user;
        oldDetails[key] = value;
        setUser({ ...oldDetails });
        console.log(user);
    }

    const setProfileDetails = (key, value) => {
        setIsError(false);
        setErrorMessage("");
        const oldDetails = profile;
        oldDetails[key] = value;
        setProfile({ ...oldDetails });
        console.log(profile);
    }

    const validate = (obj) => {
        let status = false;
        let msg = "";
        for (const [key, value] of Object.entries(obj)) {
            console.log({ key, value });
            if (value === "") {
                status = true;
                msg = "Please fill in all inputs";
                break;
            }

            if (key === "contact_no" && value.length < 11) {
                msg = "Please use 11 digit for contact number";
                status = true;
            }
        }
        return { status, msg };
    }
    const signUp = async () => {
        try {
            setLoading(true);
            let resultUser = validate(user);
            if (resultUser.status) {
                setIsError(true);
                setErrorMessage(resultUser.msg)
                return
            }

            let resultProfile = validate(profile);
            if (resultProfile.status) {
                setIsError(true);
                setErrorMessage(resultProfile.msg)
                return
            }

            if (user.password !== user.repassword) {
                setIsError(true);
                setErrorMessage("Password doesn't match")
                return
            }

            let { data, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password
            })

            if (error != null) {
                setIsError(true);
                setErrorMessage(error.message);
                return
            }

            if (data != null) {
                const { data, error } = await supabase
                    .from('profiles')
                    .insert([profile])
                    .select()

                if (error != null) {
                    setIsError(true);
                    setErrorMessage(error.message);
                    return
                }

                if (data != null) {
                    alert("Successfully created profile!")
                }
            }

        } catch (e) {
            console.debug(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Box sx={{ alignContent: 'center', height: '100vh' }}>
                <Container maxWidth="xs" component={Paper} sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ p: 1 }}>Sign Up on Demo Project</Typography>
                    {
                        isError &&
                        <Box>
                            <Typography color="red" align="center">{errorMessage}</Typography>
                        </Box>
                    }
                    <Box sx={{ p: 1 }}>
                        <TextField fullWidth label="Email" value={user.email} variant="outlined" onChange={(e) => setUserDetails("email", e.target.value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => setUserDetails("password", e.target.value)}
                            value={user.password}
                            fullWidth
                            label="Password"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField
                            type={showRePassword ? "text" : "password"}
                            onChange={(e) => setUserDetails("repassword", e.target.value)}
                            value={user.repassword}
                            fullWidth
                            label="Re-type Password"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowRePassword(!showRePassword)}>
                                        {showRePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField fullWidth label="Fullname" value={profile.fullname} variant="outlined" onChange={(e) => setProfileDetails("fullname", e.target.value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField fullWidth label="School ID" value={profile.schoolid} variant="outlined" onChange={(e) => setProfileDetails("schoolid", e.target.value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Select
                            fullWidth
                            value={profile.gender}
                            label="Gender"
                            onChange={(e) => setProfileDetails("gender", e.target.value)}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <DatePicker sx={{ width: "100%" }} onChange={(value) => setProfileDetails("birthdate", value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField fullWidth label="Contact number" value={profile.contact_no} variant="outlined" onChange={(e) => setProfileDetails("contact_no", e.target.value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField maxRows={3} multiline rows={3} fullWidth label="Address" value={profile.address} variant="outlined" onChange={(e) => setProfileDetails("address", e.target.value)} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <LoadingButton loading={loading} onClick={signUp} sx={{ p: 1 }} fullWidth variant="contained" endIcon={<PersonAddAltRoundedIcon />}>Sign up</LoadingButton>
                    </Box>
                    <Typography align="center">or</Typography>
                    <Box sx={{ p: 1 }}>
                        <Link to="/">
                            <Button size="large" fullWidth variant="contained" endIcon={<LoginIcon />}>Login</Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </>
    )
}