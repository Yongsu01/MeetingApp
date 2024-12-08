import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const fields = [
    {
      label: "ID",
      type: "text",
      value: userId,
      setValue: setUserId,
      placeholder: "아이디",
    },
    {
      label: "Password",
      type: "password",
      value: password,
      setValue: setPassword,
      placeholder: "비밀번호",
    },
  ];

  const LoginHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      username:userId,
      password,
    };
    try {
      const res = await axios.post(
        "https://pzjo7nmt2j.execute-api.ap-northeast-2.amazonaws.com/Prod/login",
        body
      );
      console.log(res);
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.token);
        navigate("/matching");
      }
    } catch (error) {
      alert("유효하지 않은 ID 혹은 PW입니다.");
      console.log(error);
    }
  };

  return (
    <Layout>
      <Form onSubmit={LoginHandler}>
        {fields.map((field, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                paddingBottom: "0",
                marginBottom: "10px",
                marginTop: "0",
                paddingLeft: "5px",
                fontSize: "16px",
                color: "#5E5E5E",
                fontWeight: "400",
              }}
            >
              {field.label}
            </p>
            <StyledInput
              type={field.type}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              placeholder={field.placeholder}
            />
            <StyledMargin />
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StyledBTN type="submit" style={{ marginTop: "30px" }}>
            로그인
          </StyledBTN>
        </div>
      </Form>
      <LineDiv />
    </Layout>
  );
};

export default LoginForm;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 265px;
  font-size: 20px;
  font-weight: 550;
  padding-top: 30px;
`;

const Form = styled.form`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 296px;
  height: 50px;
  padding: 0 15px;
  font-size: 17px;
`;

const StyledMargin = styled.div`
  margin-top: 15px;
`;

const StyledBTN = styled.button`
  width: 330px;
  height: 65px;
  background: #6e2add;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: none;
`;


const LineDiv = styled.div`
  height: 1.5px;
  width: 330px;
  background-color: #989898;
  margin-top: 25px;
  margin-bottom: 54px;
`;
