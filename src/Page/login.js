import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const dataLogin = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (loginData.username === "admin" && loginData.password === "admin") {
      login(loginData.username, 'admin');
      navigate("/users");
    } else if (loginData.username && loginData.password) {
      login(loginData.username, 'user');
      navigate("/users");
    } else {
      console.log("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ backgroundColor: "#1976d2", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
                Iniciar sesión
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  name="username"
                  margin="normal"
                  type="text"
                  fullWidth
                  label="Email"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  onChange={dataLogin}
                />
                <TextField
                  name="password"
                  margin="normal"
                  type="password"
                  fullWidth
                  label="Password"
                  sx={{ mt: 1.5, mb: 1.5 }}
                  required
                  onChange={dataLogin}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1.5, mb: 3 }}
                >
                  Iniciar sesión
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoginPage;
