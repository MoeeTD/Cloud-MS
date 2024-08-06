import React from "react";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/system';
import authService from "./../../services/authService";


// Styled Components
const FormStyled = styled('form')(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default function SignInSide() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authService.isLoggedIn()){
      navigate("/edit");
    }

  });

  const [account, setAccount] = React.useState({ username: "", password: "" });
  const [loginState, setLogingState] = React.useState('')

  const handleAccount = (property, event) => {
    const accountCopy = { ...account };
    accountCopy[property] = event.target.value;
    setAccount(accountCopy);
  };

  const isVerifiedUser = async (username, password) => {
    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      return data.token
    } catch (error) {
      console.error('Error verifying user:', error);
      return false;
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const token = await isVerifiedUser(account.username, account.password);
    if (token) {
      authService.doLogIn(account.username, token);
      setAccount({ username: "", password: "" });
      navigate("/edit")
    } else {
      console.error("Invalid username or password");
      setLogingState('Invalid username or password')
    }
  };

  return (
    
      <Box sx={{
      height: "100vh",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      alignContent: 'center',
    }}>
        <Box sx={{
          backgroundColor: 'white',
          padding: 5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: 5
        }}>

            <Avatar sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundPosition: "center",
            }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h5" color='black' m='20px' fontSize='30px' fontWeight='bold'>
              Sign in
            </Typography>
            <FormStyled noValidate onSubmit={handleLogin}>
              <TextField
                onChange={(event) => handleAccount("username", event)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                onChange={(event) => handleAccount("password", event)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography sx={{ color: 'red'}}>{loginState}</Typography>
              <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: 50, fontSize: 17}}
              >
                Sign In
              </SubmitButton>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </FormStyled>
        </Box>
      </Box>
  );
}
