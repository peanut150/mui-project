import { Container, Box, Paper, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import supabase from "../services/Supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    setIsError(true);
  }

  const navigate = useNavigate();
  const params = useLocation();

  console.log(params);

  const login = async () => {
   
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    if(error !== null){
      setIsError(true);
      setErrorMessage(error.message);
      return
    }

    if(data !== null){
      navigate("/dashboard");
    }
  }

  return (
    <>
    <Box sx={{ alignContent: "center", height: "97vh" }}>
      <Container maxWidth="xs" component={Paper} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ p: 1 }}>MUI Project</Typography>
            {
              isError &&
              <Box>
                <Typography color="red" align="center">{errorMessage}</Typography>
              </Box>
            }
            <Box sx={{ p: 1 }}>
                <TextField
                  error={isError}
                  helperText={isError ? "Invalid Email" : ""}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Box sx={{ p: 1 }}>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  error={isError}
                  helperText={isError ? "Invalid Password" : ""}
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
              
                <Button
                  size="large"
                  fullWidth
                  onClick={login}
                  variant="contained"
                  endIcon={<LoginIcon />}
                >
                  Login
                </Button>
             
            </Box>
            <Typography align="center">or</Typography>
            <Box sx={{ p: 1 }}>
              <Link to="/signup">
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  endIcon={<PersonAddAltRoundedIcon />}
                >
                  Sign up
                </Button>
              </Link>
            </Box>
      </Container>
    </Box>
      
    </>
  );
}
