import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import bgpic from "../assets/loginbg.jpg";
import { LightPurpleButton } from "../components/buttonStyles";
import styled from "styled-components";
import { loginUser } from "../redux/userRelated/userHandle";
import Popup from "../components/Popup";

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rollNumberError, setRollNumberError] = useState(false);
  const [guestNameError, setGuestNameError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (role === "Guest") {
      const rollNum = event.target.rollNumber.value;
      const guestName = event.target.guestName.value;
      const password = event.target.password.value;

      if (!rollNum || !guestName || !password) {
        if (!rollNum) setRollNumberError(true);
        if (!guestName) setGuestNameError(true);
        if (!password) setPasswordError(true);
        return;
      }
      const fields = { rollNum, guestName, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    } else {
      const email = event.target.email.value;
      const password = event.target.password.value;

      if (!email || !password) {
        if (!email) setEmailError(true);
        if (!password) setPasswordError(true);
        return;
      }

      const fields = { email, password };
      setLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  const handleInputChange = (event) => {
    const { name } = event.target;
    if (name === "email") setEmailError(false);
    if (name === "password") setPasswordError(false);
    if (name === "rollNumber") setRollNumberError(false);
    if (name === "guestName") setGuestNameError(false);
  };

  const guestModeHandler = () => {
    const password = "zxc";

    if (role === "Admin") {
      const email = "yogendra@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Guest") {
      const rollNum = "1";
      const guestName = "Dipesh Awasthi";
      const fields = { rollNum, guestName, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Vendor") {
      const email = "tony@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "Couple") {
      const email = "sad@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    } else if (role === "FinanceManager") {
      const email = "ash@12";
      const fields = { email, password };
      setGuestLoader(true);
      dispatch(loginUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "success" || currentUser !== null) {
      if (currentRole === "Admin") {
        navigate("/Admin/dashboard");
      } else if (currentRole === "Guest") {
        navigate("/Guest/dashboard");
      } else if (currentRole === "Vendor") {
        navigate("/Vendor/dashboard");
      } else if (currentRole === "Couple") {
        navigate("/Couple/dashboard");
      } else if (currentRole === "FinanceManager") {
        navigate("/FinanceManager/dashboard");
      }
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {role} Login
            </Typography>
            <Typography variant="h7">
              Welcome back! Please enter your details
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              {role === "Guest" ? (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="rollNumber"
                    label="Enter your Seat Number"
                    name="rollNumber"
                    autoComplete="off"
                    type="number"
                    autoFocus
                    error={rollNumberError}
                    helperText={rollNumberError && "Seat Number is required"}
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="guestName"
                    label="Enter your name"
                    name="guestName"
                    autoComplete="name"
                    autoFocus
                    error={guestNameError}
                    helperText={guestNameError && "Name is required"}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter your email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={emailError}
                  helperText={emailError && "Email is required"}
                  onChange={handleInputChange}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={toggle ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                error={passwordError}
                helperText={passwordError && "Password is required"}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <StyledLink href="#">Forgot password?</StyledLink>
              </Grid>
              <LightPurpleButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </LightPurpleButton>
              <Button
                fullWidth
                onClick={guestModeHandler}
                variant="outlined"
                sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
              >
                Login as Guest
              </Button>

              {/* {role === "Admin" && */}
              <Grid container>
                <Grid>Don't have an account?</Grid>
                <Grid item sx={{ ml: 2 }}>
                  {role === "Admin" && (
                    <StyledLink to="/Adminregister">Sign up</StyledLink>
                  )}
                  {/* {role === "Vendor" &&
                                        <StyledLink to="/Vendorregister">
                                            Sign up
                                        </StyledLink>
                                    }
                             */}
                </Grid>
              </Grid>
              {/* } */}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgpic})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={guestLoader}
      >
        <CircularProgress color="primary" />
        Please Wait
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
