import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "./Login.css";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #2f72be;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HeaderImage = styled.img`
  animation: ${slideIn} 1s ease-in-out;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  margin-top: -130px;
`;

const LoginContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 300px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #2e7eed;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.6s ease;

  &:hover {
    background-color: #4fa3ff;
    color: #white;
  }
`;

const Footer = styled.footer`
  background-color: #2e7eed;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 14px;
`;

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    navigate("/register");
  };

  const handleClick3 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://avazdg.tech:7201/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userId = data.userID;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userId);
        onLogin();
        if (token && userId) {
          navigate("/CV");
        } else {
    
          console.error("Token or user ID not found in the response");
        }
      } else {

        console.error("Authentication failed");
      }
    } catch (error) {

      console.error("Error during authentication:", error);
    }
  };

  return (
    <Container>
      <Main>
        <LoginContainer>
          <HeaderImage
            src={"./assets/img/Avaz-Logo.png"}
            alt="Your Logo"
            className="img-fluid"
          />
          <h1 className="H1LOG">Hesaba daxil ol</h1>
          <br></br>
          <form onSubmit={handleClick3}>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              id="password"
              placeholder="Şifrə"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit">Daxil ol</Button>
          </form>
          <button className="button-like-link" onClick={handleClick}>
            Yeni hesab yarat
          </button>
        </LoginContainer>
      </Main>

      <Footer>
        &copy; 2024 AvazDG
        <br />
      </Footer>
    </Container>
  );
};

export default Login;
