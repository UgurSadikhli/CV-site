import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import "./Logup.css";

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
  background-color: #2f72be; /* Blue tone background color */
  background-image: url(${"C:\\Users\\Ugur\\Desktop\\cvapp\\cvapp_front\\public\\assets\\img\\Avaz-Logo.png"});
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

// const Label = styled.label`
//   display: block;
//   margin-bottom: 10px;
//   font-weight: bold;
//   color: #333;
// `;

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
  transition: background-color  0.6s  ease;

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
const Logup = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
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
        <h1 className="H1LOG">Qeydiyyatdan keç</h1>
        <br></br>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          required
        />

        <Input
          type="password"
          id="password"
          placeholder="Şifrə"
          name="password"
          required
        />
        <Input
          type="password"
          id="password"
          placeholder="Şifrə"
          name="password"
          required
        />
        <Button type="submit">Davam et</Button>
        <button className="button-like-link" onClick={handleClick}>
          Hesaba daxil ol
        </button>
      </LoginContainer>
    </Main>

    <Footer>
      &copy; 2024 Avaz
      <br />
    </Footer>
  </Container>
  );
};

export default Logup;
