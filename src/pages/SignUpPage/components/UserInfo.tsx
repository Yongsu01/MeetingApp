import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState, useEffect, ChangeEvent } from "react";
import EmailAuth from "./EmailAuth";
import HobbyList from "./HobbyBox";
import axios from "axios";

interface Field {
  label?: string;
  name: keyof FormData;
  type: string;
  placeholder?: string;
}

interface FormData {
  userName: string;
  userBtd: string;
  sex: string;
  kakaoURL: string;
  email: string;
  hobbies: string[];
  userId: string;
  password: string;
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
    <p
      style={{
        padding: "0 0 5px",
        margin: "0",
        fontSize: "13px",
        color: "black",
      }}
    >
      {field.label}
    </p>
    <StyledInput
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const InfoPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, password } = location.state || {};
  const [isFilled, setIsFilled] = useState(true);
  const [codeValid, setCodeValid] = useState(false);

  const fields: Field[] = [
    { label: "이름", name: "userName", type: "text" },
    {
      label: "생년월일",
      name: "userBtd",
      type: "number",
      placeholder: "생년월일 8자리",
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    userName: "",
    userBtd: "",
    sex: "",
    kakaoURL: "",
    email: "",
    hobbies: [],
    userId: userId || "",
    password: password || "",
  });

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) =>
        field !== "" && (Array.isArray(field) ? field.length > 0 : true)
    );
    setIsFilled(allFieldsFilled && codeValid);
  }, [formData, codeValid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "number" && value.length > 8) {
      e.target.value = value.slice(0, 8);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? e.target.value : value,
    }));
  };

  const handleHobbyChange = (selectedHobbies: string[]) => {
    setFormData((prev) => {
      let newHobbies = [...prev.hobbies];

      selectedHobbies.forEach((hobby) => {
        if (newHobbies.includes(hobby)) {
          newHobbies = newHobbies.filter((h) => h !== hobby);
        } else {
          newHobbies.push(hobby);
        }
      });

      return {
        ...prev,
        hobbies: newHobbies,
      };
    });
  };

  const handleClearHobbies = () => {
    setFormData((prevData) => ({
      ...prevData,
      hobbies: [],
    }));
  };

  const SignUphandler = async () => {
    const formattedData = {
      username: formData.userId,
      password: formData.password,
      firstName: formData.userName,
      email: formData.email,
      birthDate: formData.userBtd,
      gender: formData.sex,
      chatRoomUrl: formData.kakaoURL,
      hobbies: formData.hobbies,
    };

    try {
      const res = await axios.post(
        "https://pzjo7nmt2j.execute-api.ap-northeast-2.amazonaws.com/Prod/signup",
        formattedData
      );
   if(res.status === 200){
    navigate("/")
    alert("회원가입 완료!")
   }
    } catch (error) {
      console.log(error)
    }
  };

  console.log(formData);
  return (
    <Container>
      <Layout>
        <p style={{ color: "rgba(0,0,0,0.4)" }}>정보입력</p>
        {fields.map((field, index) => (
          <InputField
            key={index}
            field={field}
            value={formData[field.name] as string}
            onChange={handleChange}
          />
        ))}
        <p style={{ color: "black" }}>성별</p>
        <SexDiv>
          <input
            type="radio"
            id="male"
            name="sex"
            value="MALE" 
            checked={formData.sex === "MALE"}
            onChange={handleChange}
          />
          <label htmlFor="male">남자</label>
          <input
            type="radio"
            id="female"
            name="sex"
            value="FEMALE"
            checked={formData.sex === "FEMALE"}
            onChange={handleChange}
          />
          <label htmlFor="female">여자</label>
        </SexDiv>

        <p style={{ color: "black" }}>카카오 오픈채팅방 링크</p>
        <StyledInput
          type="text"
          name="kakaoURL"
          value={formData.kakaoURL}
          onChange={handleChange}
        />
        <EmailAuth
          email={formData.email}
          onEmailChange={handleChange}
          codeValid={codeValid}
          setCodeValid={setCodeValid}
        />
        <HobbyList
          hobbies={formData.hobbies}
          onHobbyChange={handleHobbyChange}
          clearAll={handleClearHobbies}
        />
        <SignupBTN disabled={!isFilled} onClick={SignUphandler}>
          가입하기
        </SignupBTN>
      </Layout>
    </Container>
  );
};
export default InfoPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = styled.div`
  width: 290px;
  margin-top: 30px;
  p {
    margin: 0;
    font-size: 13px;
    padding-bottom: 5px;
  }
`;

const StyledInput = styled.input`
  width: 256px;
  height: 30px;
  padding: 0 15px;
  margin-bottom: 7px;
`;

const SexDiv = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  input {
    display: none;
  }

  label {
    font-family: sans-serif;
    padding: 3.5px 5px;
    cursor: pointer;
    transition: all 0.3s;
    width: 100%;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
    margin-bottom: 7px;
    &:hover {
      background: #9062db;
      color: white;
    }
  }

  input:checked + label {
    background: #6e2add;
    color: white;
  }
`;

const SignupBTN = styled.button<{ disabled: boolean }>`
  width: 100%;
  background: ${({ disabled }) => (disabled ? "#7a7a7a" : "#6E2ADD")};
  height: 65px;
  color: white;
  font-weight: bold;
  margin-bottom: 50px;
`;
