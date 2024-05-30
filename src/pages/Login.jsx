import { Container, Box, Paper, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    setIsError(true);
  }

  return (
    <>
    <Box sx={{ alignContent: "center", height: "97vh" }}>
      <Container maxWidth="xs" component={Paper} sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ p: 1 }}>MUI Project</Typography>
            <Box sx={{ p: 1 }}>
                <TextField
                  error={isError}
                  helperText={isError ? "Invalid Email" : ""}
                  fullWidth
                  label="Email"
                  variant="outlined"
                />
            </Box>
            <Box sx={{ p: 1 }}>
                <TextField
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
              <Link to="/dashboard">
                <Button
                  size="large"
                  fullWidth
                  onClick={validate}
                  variant="contained"
                  endIcon={<LoginIcon />}
                >
                  Login
                </Button>
              </Link>
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
