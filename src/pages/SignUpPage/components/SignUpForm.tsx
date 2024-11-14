import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Field {
  label?: string;
  name: keyof FormData;
  type: string;
  placeholder: string;
  space?: string;
}

interface FormData {
  password: string;
  pwConfirm: string;
}

const InputField: React.FC<{
  field: Field;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}> = ({ field, value, onChange }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
    }}
  >
    <p style={{ padding: "0 0 5px 5px", margin: "0" }}>{field.label}</p>
    <StyledInput
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton: React.FC<{
  visible: boolean;
  formData: FormData;
  userId: string;
}> = ({ visible, formData, userId }) => {
  const navigate = useNavigate();
  const navigateToInfoPage = () => {
    if (visible) {
      navigate("/userinfo", {
        state: { userId, password: formData.password },
      });
    }
  };

  return (
    <ButtonWrapper>
      <StyledBTN disabled={!visible} type="button" onClick={navigateToInfoPage}>
        다음
      </StyledBTN>
    </ButtonWrapper>
  );
};

const SignUpForm: React.FC = () => {
  const [pwValid, setPwvalid] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: "",
    pwConfirm: "",
  });
  const [userId, setUserId] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const fields: Field[] = [
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "비밀번호",
    },
    {
      name: "pwConfirm",
      type: "password",
      placeholder: "비밀번호 확인",
    },
  ];

  useEffect(() => {
    setPwvalid(formData.password === formData.pwConfirm);
  }, [formData.password, formData.pwConfirm]);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );
    setIsButtonVisible(allFieldsFilled && pwValid);
  }, [formData, pwValid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <p style={{ padding: "0 0 5px 5px", margin: "0" }}>ID</p>
          <StyledInput
            placeholder="아이디"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </div>
        {fields.map((field, index) => (
          <InputField
            key={index}
            field={field}
            value={formData[field.name]}
            onChange={handleChange}
          />
        ))}
        <SubmitButton
          visible={isButtonVisible}
          formData={formData}
          userId={userId}
        />
      </Form>
    </Layout>
  );
};

export default SignUpForm;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 265px;
  font-size: 20px;
  font-weight: 550;
  padding-top: 50px;
  height: 100%;
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

const StyledBTN = styled.button<{ disabled: boolean }>`
  width: 330px;
  height: 65px;
  font-size: 18px;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
  border: none;
  background: ${({ disabled }) => (disabled ? "#7a7a7a" : "#6E2ADD")};
  color: white;
  margin-top: 20px;
  transition: 0.5s ease-in-out;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
