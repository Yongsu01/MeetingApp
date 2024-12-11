import React, { useState } from "react";
import styled from "styled-components";

type Category = "sports" | "culture" | "music" | "art";

const hobbyOptions = {
  sports: [
    { label: "축구", value: "SOCCER" },
    { label: "농구", value: "BASKETBALL" },
    { label: "탁구", value: "PINGPONG" },
    { label: "배드민턴", value: "BADMINTON" },
    { label: "수영", value: "SWIMMING" },
    { label: "서핑", value: "SURFING" },
  ],
  culture: [
    { label: "독서", value: "READING" },
    { label: "만화/애니메이션", value: "COMICS" },
    { label: "영화 시청", value: "MOVIE" },
    { label: "맛집 탐방", value: "FOOD" },
  ],
  music: [
    { label: "악기 연주", value: "INSTRUMENT" },
    { label: "뮤직비디오 시청", value: "MUSIC_VIDEO" },
  ],
  art: [
    { label: "그림 그리기", value: "PAINTING" },
    { label: "사진 찍기", value: "PHOTOGRAPHY" },
    { label: "공예", value: "CRAFT" },
    { label: "영화 제작", value: "FILMMAKING" },
  ],
};

const HobbyList: React.FC<{
  hobbies: string[];
  onHobbyChange: (selectedHobbies: string[]) => void;
  clearAll: () => void;
}> = ({ hobbies, onHobbyChange, clearAll }) => {
  const [isOpen, setIsOpen] = useState<Record<Category, boolean>>({
    sports: false,
    culture: false,
    music: false,
    art: false,
  });
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(hobbies);

  const toggleCategory = (category: Category) => {
    setIsOpen((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleHobbySelect = (category: Category, hobby: string) => {
    setSelectedHobbies((prev) => {
      const isSelected = prev.includes(hobby);
      if (isSelected) {
        return prev.filter((h) => h !== hobby);
      } else {
        return [...prev, hobby];
      }
    });
  };

  const handleClear = () => {
    clearAll();
    setSelectedHobbies([]);
  };

  const handleSubmit = () => {
    onHobbyChange(selectedHobbies);
  };

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>취미</p>
        <button
          style={{
            border: "none",
            background: "white",
            padding: "0",
            color: "grey",
            fontSize: "12px",
            textDecoration: "underline",
          }}
          onClick={handleClear}
        >
          전체삭제
        </button>
      </div>
      {Object.keys(hobbyOptions).map((categoryKey) => {
        const category = categoryKey as Category;
        return (
          <CategoryWrapper key={category}>
            <CategoryButton onClick={() => toggleCategory(category)}>
              {category === "sports"
                ? "스포츠"
                : category === "culture"
                ? "문화"
                : category === "music"
                ? "음악"
                : "미술"}
            </CategoryButton>

            {isOpen[category] && (
              <Dropdown>
                {hobbyOptions[category].map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleHobbySelect(category, option.value)}
                    className={selectedHobbies.includes(option.value) ? "selected" : ""}
                  >
                    {option.label}
                  </li>
                ))}
              </Dropdown>
            )}
          </CategoryWrapper>
        );
      })}
      <p style={{color:'red'}}>취미 입력후 반드시 저장해주세요!</p>
      <button onClick={handleSubmit}>저장</button>
    </Container>
  );
};

export default HobbyList;

const Container = styled.div`
  width: 100%;
  p {
    margin: 0;
    font-size: 13px;
    padding-bottom: 5px;
  }
  margin-bottom: 25px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 5px;
`;

const CategoryButton = styled.button`
  width: 100%;
  height: 45px;
  color: black;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: white;
  font-size: 14px;
  padding-left: 15px;
  cursor: pointer;
`;

const Dropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  border: 1px solid #ccc;
  background: white;
  position: absolute;
  width: 290px;
  max-height: 200px;
  overflow-y: auto;

  li {
    padding: 8px 15px;
    cursor: pointer;
    &.selected {
      background-color: #d3d3d3;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
