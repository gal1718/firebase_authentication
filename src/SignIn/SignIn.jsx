import Box from "@mui/material/Box";
import { StyledTextField, ColumnContainer } from "../Common/Common.style";
import { Button } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MuiTelInput } from "mui-tel-input";
import '../Common/common.css'

const signInUrl = "http://localhost:8888/auth/signIn";

const SignIn = ({ userCountryCode }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    console.log(`userName ${userName} `);
    const PhonewithoutSpaces = phone.replace(/\s/g, "");
    const signInData = {
      userName,
      password,
      phone: PhonewithoutSpaces,
    };
    try {
      const res = await axios.post(signInUrl, signInData);
      console.log("res ", res);
      if (res.status === 200) {
        //localStorage.setItem("phoneNumber", phone);
        navigate("/login", { state: { phone } });
      }
    } catch (err) {
      console.log("err", err);
      alert(
        `${err.response.data.code.substring(
          err.response.data.code.indexOf("/") + 1
        )}\n${err.response.data.message}`
      );
    }
  };

  return (
    <div className="SignIn">
      <ColumnContainer>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
            backgroundColor: "black",
            marginTop: "5%",
            borderRadius: "5px",
            color: "white",
          }}
          noValidate
          autoComplete="off"
        >
          <ColumnContainer>
            <h2>Sign In</h2>
            <AdbIcon />
            <StyledTextField
              onChange={(event) => setUserName(event.target.value)}
              label="UserName"
              variant="standard"
            />
            <StyledTextField
              onChange={(event) => setPassword(event.target.value)}
              label="Password"
              variant="standard"
              sx={{ marginTop: "10%" }}
            />

            <MuiTelInput
              defaultCountry={userCountryCode}
              style={{ marginTop: "15%", width: "78%"}}
              inputProps={{
                style: {
                  color: "white", // Text color
                },
              }}
              size="small"
              variant="standard"
              value={phone}
              onChange={setPhone}
            />

            <Button
              disabled={!(userName && password && phone)}
              style={{ marginTop: "10%", color: "white" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </ColumnContainer>
        </Box>
      </ColumnContainer>
    </div>
  );
};

export default SignIn;
