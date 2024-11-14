import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

interface EmailAuthProps {
  email: string;
  codeValid: boolean;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setCodeValid: (valid: boolean) => void;
}

const EmailAuth: React.FC<EmailAuthProps> = ({
  email,
  onEmailChange,
  codeValid,
  setCodeValid,
}) => {
    const [code, setCode] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, type } = e.target;
    
        if (type === "number" && value.length > 6) {
          e.target.value = value.slice(0, 6);
        }
        setCode(e.target.value);
      };

  return (
    <Container>
    <Layout>
      <p>이메일</p>
      
      <InputWrapper>
       
        <StyledInput
          id="email"
          type="email"
          name="email" 
          value={email}
          onChange={onEmailChange}
          placeholder="example@emial.com"
          style={{width:'210px'}}
        />
        <StyledButton disabled={!(email.includes('@'))}>전송하기</StyledButton>
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          id="code"
          type="number"
          placeholder="인증번호 6자리를 입력하세요"
          style={{width:'210px'}}
          value={code}
          onChange={handleChange}
        />
         <StyledButton disabled={!(code.length === 6)} onClick={()=>setCodeValid(true)}>인증하기</StyledButton>
      </InputWrapper>

      
    </Layout>
    </Container>
  );
};

export default EmailAuth;

const Container = styled.div`
  width  :100% ;
  display: flex;
  align-items: center;

`;

const Layout = styled.div`
  width: 290px;
  p {
    margin: 0;
    font-size: 13px;
    padding-bottom: 10px;
    color: black;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 13px;
    color: black;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  padding: 0 8px 0 8px;
`;

const StyledButton = styled.button<{ disabled: boolean }>`
  width: 60px;
  height: 34px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 11px;
  font-weight: 600;
  background-color: white;
  background: ${({ disabled }) => (disabled ? "#7a7a7a" : "#6E2ADD")};
  color: white;
  border-radius: 4px;
  margin-bottom: 7px;
  border: none;
`;
