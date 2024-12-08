import styled from "styled-components";
import React, { useState, ChangeEvent } from "react";
import AgeRange from "./components/AgeRange";
import HobbyList from "../SignUpPage/components/HobbyBox";
import axios from "axios";

  interface FormData {
    userAge: string[];
    sex: string[];
    hobbies: string[];
  }

  const Matching = () => {
    const [formData, setFormData] = useState<FormData>({
      userAge: [],
      sex: [],
      hobbies: [],
    });

  const handleAgeSelect = (ages: string[]) => {
    setFormData((prev) => ({ ...prev, userAge: ages }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedSex = checked
        ? [...prev.sex, value] 
        : prev.sex.filter((sex) => sex !== value);

      return {
        ...prev,
        sex: updatedSex,
      };
    });
  };
  const handleClearHobbies = () => {
    setFormData((prevData) => ({
      ...prevData,
      hobbies: [],
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

  const handleSearchPeopl = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인 해주세요!");
      return;
    }
  
    const params = new URLSearchParams();
    formData.sex.forEach((sex) => params.append("gender", sex));
    formData.hobbies.forEach((hobby) => params.append("hobbies", hobby));
    formData.userAge.forEach((ageRange) => params.append("ageRanges", ageRange));
    const url = `https://pzjo7nmt2j.execute-api.ap-northeast-2.amazonaws.com/Prod/matches/25?${params.toString()}`;
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("매칭 결과:", response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("매칭 정보를 불러오는 데 실패했습니다.");
      });
  };

  console.log(formData);

  return (
    <Layout>
      <p style={{ fontSize: "18px", paddingTop: "40px", paddingBottom: "40px" }}>
        매칭하고 싶은 사람 정보를 입력해주세요!
      </p>
      <Container>
        <div style={{ color: "#9062db", fontSize: "12px", marginBottom: "5px" }}>
          성별
        </div>
        <SexDiv>
          <input
            id="male"
            name="sex"
            value="MALE"
            type="checkbox"
            checked={formData.sex.includes("MALE")}
            onChange={handleChange}
          />
          <label htmlFor="male">남자</label>
          <input
            id="female"
            name="sex"
            value="FEMALE"
            type="checkbox"
            checked={formData.sex.includes("FEMALE")}
            onChange={handleChange}
          />
          <label htmlFor="female">여자</label>
        </SexDiv>

          <AgeRange onAgeSelect={handleAgeSelect} />
          <HobbyList
          hobbies={formData.hobbies}
          onHobbyChange={handleHobbyChange}
          clearAll={handleClearHobbies}
        />
      </Container>

      <SearchBTN onClick={handleSearchPeopl}>찾기</SearchBTN>
    </Layout>
  );
};

export default Matching;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 290px;
`;


const SexDiv = styled.div`
  width: 100%;
  gap:1px;
  background-color: gray;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 8px;
  border: 1px solid black;
  height: 50px;
  input {
    display: none;
    height: 100%;
  }

  label {
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: white;
    height: 50px;
    font-family: sans-serif;
    cursor: pointer;
    transition: all 0.3s;
    width: 100%;
    text-align: center;
  }

  input:checked + label {
    background: #6e2add;
    color: white;
  }
`;

const SearchBTN = styled.button`
margin-top: 50px;
  border: none;
  color: #007AFF;
  background-color: white;
  font-size: 22px;
`;