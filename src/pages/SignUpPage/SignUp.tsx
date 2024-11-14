import React from "react";
import styled from "styled-components";

import SignUpForm from "./components/SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <Layout>
        <LOGO>Sign up</LOGO>
        <SignUpForm />
      </Layout>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LOGO = styled.div`
  color: #000;
  font-size: 32px;
  font-weight: bold;
  margin-top: 150px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 123px;
  img {
    width: 221px;
    height: 100%;
  }
`;
