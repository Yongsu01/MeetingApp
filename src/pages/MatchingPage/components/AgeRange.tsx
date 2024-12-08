import React, { useState } from "react";
import styled from "styled-components";

interface Option {
  label: string;
  value: string;
}

interface AgeRangeProps {
  onAgeSelect: (selectedAges: string[]) => void;
}

const AgeRange: React.FC<AgeRangeProps> = ({ onAgeSelect }) => {
  const ageRanges: Option[] = [
    { label: "10대", value: "10" },
    { label: "20대", value: "20" },
    { label: "30대", value: "30" },
    { label: "40대", value: "40" },
    { label: "50대", value: "50" },
    { label: "60대 이상", value: "60" },
  ];

  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (value: string) => {
    const updatedAges = selectedAges.includes(value)
      ? selectedAges.filter((age) => age !== value)
      : [...selectedAges, value];

    setSelectedAges(updatedAges);
    onAgeSelect(updatedAges); // 상위 컴포넌트로 선택된 값 전달
  };

  return (
    <Container>
      <DropdownContainer>
        <DropdownButton onClick={toggleDropdown}>
          연령대를 선택하세요.
        </DropdownButton>
        {isDropdownOpen && (
          <DropdownList>
            {ageRanges.map((age) => (
              <li
                key={age.value}
                onClick={() => handleSelect(age.value)}
                style={{
                  backgroundColor: selectedAges.includes(age.value)
                    ? "#e0e0e0"
                    : "white",
                }}
              >
                {age.label}
              </li>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </Container>
  );
};

export default AgeRange;

const Container = styled.div`
  max-width: 400px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 16px;
  text-align: left;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  &:hover {
    border-color: black;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  border: 1px solid gray;
  border-radius: 4px;
  overflow-y: auto;
  z-index: 10;
  li {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const SelectedList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
  li {
    font-size: 16px;
    margin: 5px 0;
  }
`;
