import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  // 문구가 추가 될걸 고려한 설계
  const links = [
    {
      text: "아이디가 없으신가요?",
      link: "/signup",
      linkText: "회원가입하러 하기",
    },
  ];

  return (
    <Container>
      <Layout>
        <PageDiv>Sign in</PageDiv>
        <LoginForm />

        {links.map((item, index) => (
          <GotoSignUp key={index}>
            {item.text}
            <Link style={{ textDecoration: "none" }} to={item.link}>
              <p>{item.linkText}</p>
            </Link>
          </GotoSignUp>
        ))}
      </Layout>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  flex: 1;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 127px 0px 0px 0px;
  background: #fff;
`;

const PageDiv = styled.div`
  color: #000;
  font-size: 32px;
  margin-top: 150px;
  font-weight: bold;
`;

const GotoSignUp = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #626161;
  font-size: 11px;
  p {
    font-size: 12px;
    font-weight: bold;
    color: #000000;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 73px;
  margin-top: 36px;
  margin-bottom: 14px;
  img {
    width: 128px;
    height: 100%;
  }
`;
