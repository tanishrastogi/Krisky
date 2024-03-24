import { useState } from "react";
import { authLogin } from "../../api/auth.api";
import { login } from "../../redux/reducers/authSlice.ts";
import { Input, Logo, Button } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Login.module.css";
import { Alert, Container } from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data: any) => {
    setError("");

    try {
      const response = await authLogin(data);

      if (Math.floor(response.statusCode / 100) === 4) {
        return setError(response.message);
      }

      const userData = response.data;
      if (userData) {
        dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <div className={style.CenterBody}>
        <div className={style.logo}>
          <Logo />
        </div>
        <div className={style.logoalt}>
          LOGIN
        </div>
        <h2 className={style.content}>Sign in to your account</h2>
        <p className={style.content2}>
          Don't have any account?
          <Link to="/register">Sign up</Link>
        </p>
        <form className={style.form} onSubmit={handleSubmit(handleLogin)}>
          <div className={style.Input}>
            <Input
              style={{ marginTop: "5px" }}
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Please enter a valid email address",
                },
              })}
            />
          </div>

          <div className={style.Input}>
            <Input
              style={{ marginTop: "5px" }}
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
          <div className={style.buttondiv}>
            <Button
              className={style.button}
              style={{ backgroundColor: "#131313", color: "white" }}
              type="submit"
            >
              Login
            </Button>
          </div>

        </form>
        {error ? (
          <Alert
            onClose={() => {
              setError("");
            }}
            style={{ margin: "20px 0 0 0" }}
            severity="error"
          >
            {error}
          </Alert>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default Login;
