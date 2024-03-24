import { useState } from "react";
import {
  authRegister,
  sendEmailOtp,
  sendMobileOtp,
  verifyEmailOtp,
  verifyMobileOtp,
} from "../../api/auth.api";
import { Input, Button, Select, Container } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Alert } from "@mui/material";
import { findByEmail } from "../../api/user.api.ts";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);


  const [messages, setMessage] = useState({
    email: "",
    mobile:""
  });

  const onEmailAlertClose = ()=>{
    setMessage((prevState) => ({
      ...prevState,
      email: "",
    }));
  }
  const onMobileAlertClose = ()=>{
    setMessage((prevState) => ({
      ...prevState,
      mobile: "",
    }));
  }

  const showPasswordError = (mssg:String)=>{
    return <Alert
    onClose={() => {setPasswordError("")}}
    style={{ margin: "15px 0", fontSize: "0.8rem", padding: "0px 20px" }}
    severity="error"
  >
    {mssg}
  </Alert>
  }

  const [EmailAlertType, setEmailAlertType] = useState("");
  const [mobileAlertType, setMobileAlertType] = useState("");

  const showEmailMessage = (mssg: String, type: any) => {
    return (
      <Alert
        onClose={() => {onEmailAlertClose()}}
        style={{ margin: "15px 0", fontSize: "0.8rem", padding: "0px 20px" }}
        severity={type}
      >
        {mssg}
      </Alert>
    );
  };

  const showMobileMessage = (mssg: String, type: any) => {
    return (
      <Alert
        onClose={() => {onMobileAlertClose()}}
        style={{ margin: "15px 0", fontSize: "0.8rem", padding: "0px 20px" }}
        severity={type}
      >
        {mssg}
      </Alert>
    );
  };

  const handleEmailChange = (e) => {
    const email = e.target.value ;
    const isValidEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    if (!isEmailValid) {return setError("Enter a valid email address")}
    else{
      return isEmailValid
    }
    setIsEmailValid(isValidEmail);
  };
  
  const handleEmail = (e) => {
    const email =  e.email;
    const isValidEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    if(isValidEmail) return isValidEmail
   
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const isValidPhone = phone.match(/^[0-9]{10}$/g);
    setIsPhoneValid(isValidPhone);
  };

  const handleSendEmailOtp = async (email: String) => {
    if (!email) {
      setMessage((prevState) => ({
        ...prevState,
        email: "cannot send otp to empty email",
      }));
      setEmailAlertType("error")
      return;
    }

    if(!handleEmail({email})){
      setMessage((prevState) => ({
        ...prevState,
        email: "enter a valid email",
      }));
      setEmailAlertType("error")
      return
    }

    const user = await findByEmail({ email });

    console.log(user)

    

    if (user.statusCode!==404) {
      setMessage((prevState) => ({
        ...prevState,
        email: "user with this email already exists!",
      }));
      setEmailAlertType("error")
      return;
    }
    

    const response = await sendEmailOtp({ email });
    if (response.statusCode === 200) {
      setEmailOtpSent(true);
      setMessage((prevState) => ({
        ...prevState,
        email: "OTP sent to your email",
      }));
      setEmailAlertType("info");
    }
    else setError(response.message);
  };

  const handleVerifyEmailOtp = async (email: String, otp: String) => {
    const response = await verifyEmailOtp({ email, otp });
    console.log(response)

    if(Math.floor(response.statusCode/100) === 4){
      setMessage((prevState) => ({
        ...prevState,
        email:response.data,
      }));
      setEmailAlertType("error");
    }

    if (response.statusCode === 200) {
      setEmailOtpVerified(true);
      alert("Email Verified");
    } else setError(response.message);
  };

  const handleSendPhoneOtp = async (mobile, countryCode) => {
    

    if(!mobile.match(/^[0-9]{10}$/g)){
      setMessage((prevState) => ({
        ...prevState,
        mobile:"Enter a valid mobile number",
      }))
      setMobileAlertType("error")
      return
    }

    const response = await sendMobileOtp({ mobile, countryCode });
    console.log(response)

    if(Math.floor(response.statusCode/100) === 4){
      setMessage((prevState) => ({
        ...prevState,
        mobile:response.data || response.message,
      }))
      setMobileAlertType("error")

      return
    }


    if (response.statusCode === 200) {
      
      setPhoneOtpSent(true);
      setMessage((prevState) => ({
        ...prevState,
        mobile:"OTP sent to your mobile number",
      }))
      setMobileAlertType("info")

    } else setError(response.message);
  };

  const handleVerifyPhoneOtp = async (countryCode, mobile, otp) => {
    const response = await verifyMobileOtp({ countryCode, mobile, otp });
    if (response.statusCode === 200) {
      setPhoneOtpVerified(true);
      alert("Phone Verified");
    } else setError(response.message);
  };

  const handleRegister = async (data: object) => {
    setError("");
    try {
      if (!emailOtpVerified || !phoneOtpVerified) {
        alert("Please verify your email and phone");
        setError("Please verify your email and phone");
        return;
      }


      const response = await authRegister(data);
      if (response.statusCode === 201) {
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.CenterBody}>
        <div className={style.logoalt}>REGISTER</div>
        <div className={style.loginbtn}>
          <Link to="/login">LOGIN</Link>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} className={style.form}>
          <div className={style.Input}>
            <Input
              style={{ marginTop: "5px" }}
              label="Full Name"
              type="text"
              placeholder="Enter your Full Name"
              {...register("username", { required: true })}
            />
          </div>

          <div className={style.Input}>
            <Input
              style={{ marginTop: "5px" }}
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: (value) => {
                  const isValidEmail = value.match(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                  );
                  setIsEmailValid(isValidEmail);
                  return true; // Always return true to avoid validation error
                },
              })}
              onChange={handleEmailChange} // Call handleEmailChange on input change
              showImage={emailOtpVerified ? <CheckCircleRoundedIcon /> : null}
            />
            {!emailOtpVerified ? (
              !emailOtpSent ? (
                <button
                  className={style.OTPbutton}
                  onClick={() => handleSendEmailOtp(watch("email"))}
                >
                  Send OTP
                </button>
              ) : (
                <div>
                  <Input
                    style={{ marginTop: "5px" }}
                    type="text"
                    placeholder="Enter OTP"
                    onChange={(e) => setEmailOtp(e.target.value)}
                  />
                  <button
                    className={style.OTPbutton}
                    onClick={() =>
                      handleVerifyEmailOtp(watch("email"), emailOtp)
                    }
                  >
                    Verify
                  </button>
                </div>
              )
            ) : null}
            {messages.email ? showEmailMessage(messages.email, EmailAlertType) : ""}

          </div>
          <div className={style.mobile}>
            <Select

              border="1px solid var(--Border-2, #CCC)"
              height="100%"
              options={["+91", "+92", "+93", "+94", "+95", "+96", "+97", "+98"]}
              {...register("countryCode", { required: true })}
            />
            <Input
              width="90%"
              type="number"
              placeholder="Enter your mobile number"
              {...register("mobile", {
                required: true,
                validate: (value) => {
                  const isValidPhone = value.match(/^[0-9]{10}$/g);
                  setIsPhoneValid(isValidPhone);
                  return true; // Always return true to avoid validation error
                },
              })}
              onChange={handlePhoneChange} // Call handlePhoneChange on input change
              showImage={phoneOtpVerified ? <CheckCircleRoundedIcon /> : null}
            />
          </div>

          {!phoneOtpVerified ? (
            !phoneOtpSent ? (
              <button
                className={style.OTPbutton}
                onClick={() =>
                  handleSendPhoneOtp(watch("mobile"), watch("countryCode"))
                }
              >
                Send OTP
              </button>
            ) : (
              <div>
                <Input
                  style={{ marginTop: "5px" }}
                  type="text"
                  placeholder="Enter OTP"
                  onChange={(e) => setPhoneOtp(e.target.value)}
                />
                <button
                  className={style.OTPbutton}
                  onClick={() =>
                    handleVerifyPhoneOtp(
                      watch("countryCode"),
                      watch("mobile"),
                      phoneOtp
                    )
                  }
                >
                  Verify
                </button>
              </div>
            )
          ) : null}
          {messages.mobile?showMobileMessage(messages.mobile , mobileAlertType):""}
          <div className={style.Input}>
            <div style={{ position: "relative" }}>
              <Input
                style={{ marginTop: "5px" }}
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <div
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "56%",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={style.Input}>
            <Input
              style={{ marginTop: "5px" }}
              label="Confirm Password"
              type="password"
              placeholder="Enter confirmation password"
              {...register("confirm-password", {
                required: true,
                validate: (value) => {
                  if (value !== watch("password")) {
                    setPasswordError("Password does not match");
                    return "Password does not match";
                  } else {
                    setPasswordError("");
                  }
                  return true;
                },
              })}
            />
            {passwordError && showPasswordError(passwordError)}
          </div>

          <Button
            className={style.button}
            style={{ backgroundColor: "#131313", color: "white" }}
            type="submit"
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Register;
