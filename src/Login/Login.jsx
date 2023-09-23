import Box from "@mui/material/Box";
import axios from "axios";
import { ColumnContainer } from "../Common/Common.style";
import { Button } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css";
import { MuiTelInput } from "mui-tel-input";
import "../Common/common.css";

const LogIn = ({ userCountryCode, auth }) => {
  const [recaptchaSolved, setRecaptchaSolved] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  //const [phone, setPhone] = useState(state?.phone || "");
  const [phone, setPhone] = useState(state?.phone || "");

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "auto",
        theme: "dark",
        callback: (response) => {
          setRecaptchaSolved(true);
          console.log("recapta call back response " + response);
          console.log("test: ", window.recaptchaVerifier);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          console.log("expired call back");
          setRecaptchaSolved(false);
        },
      }
    );
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
  }, []);

  const sendVerificationSMS = async () => {
    //check if user exist by phone
    const PhonewithoutSpaces = phone.replace(/\s/g, "");
    const res = await axios.post(
      "http://localhost:8888/auth/loginIn/findUserByPhone",
      { phone: PhonewithoutSpaces }
    );
    console.log("res is : " + JSON.stringify(res));
    if (res.data == "User founded") {
      auth.useDeviceLanguage();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log(
            "confirmationResult" + JSON.stringify(confirmationResult)
          );
          const code = prompt("enter code");
          confirmationResult
            .confirm(code)
            .then((result) => {
              // User signed in successfully.
              const user = result.user;
              console.log("user " + JSON.stringify(user));
              navigate("/homePage");
            })
            .catch((error) => {
              // User couldn't sign in (bad verification code)
              alert("verification code is not correct");
              console.log("error", error);
            });
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log("err", error);
        });
    } else {
      console.log("user not exist");
      window.recaptchaVerifier.recaptcha.reset();
      setPhone("");
      alert("Phone doesnt Exist");
    }
  };

  return (
    <div className="Login">
      <ColumnContainer>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "36ch" },
            backgroundColor: "black",
            marginTop: "5%",
            borderRadius: "5px",
            color: "white",
          }}
          noValidate
          autoComplete="off"
        >
          <ColumnContainer>
            <h2>Log In</h2>

            <MuiTelInput
              defaultCountry={userCountryCode}
              size="small"
              variant="standard"
              inputProps={{
                style: {
                  color: "white", // Text color
                },
              }}
              label="Phone Number"
              value={phone}
              onChange={setPhone}
            />

            <div
              style={{ marginTop: "10%"}}
              id="recaptcha-container"
            ></div>
            <Button
              disabled={!recaptchaSolved}
              style={{ marginTop: "10%", color: "white" }}
              variant="contained"
              onClick={sendVerificationSMS}
            >
              Send verification SMS
            </Button>
          </ColumnContainer>
        </Box>
      </ColumnContainer>
    </div>
  );
};

export default LogIn;
