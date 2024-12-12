import React from "react";
import styled from "styled-components";

interface User {
  id: number;
  firstname: string;
  age: number;
  gender: string;
  profileImageUrl: string;
  chatroomUrl:string;
}

interface ModalProps {
  users: User[];
  totalPages: number;
  currentPage: number;
  onClose: () => void;
  onPageChange: (page: number) => void;
}

const MatchingModal: React.FC<ModalProps> = ({
  users,
  totalPages,
  currentPage,
  onClose,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2 style={{margin:'0'}}>매칭 결과</h2>
        <UserList>
          {users.map((user) => (
            <UserCard key={user.id}>
              <ProfileImage
                src={user.profileImageUrl}
                alt={`${user.firstname} 프로필`}
              />
              <UserInfo>
                <p>
                  <strong>이름:</strong> {user.firstname}
                </p>
                <p>
                  <strong>나이:</strong> {user.age}
                </p>
                <p>
                  <strong>성별:</strong>{" "}
                  {user.gender === "MALE" ? "남자" : "여자"}
                </p>
                <div><strong>카카오톡 URL :</strong> <a target="_blank" href={'https://'+user.chatroomUrl}>{user.chatroomUrl}</a></div>
              </UserInfo>
            </UserCard>
          ))}
        </UserList>
        <Pagination>
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </Button>
          <PageInfo>
            {currentPage + 1} / {totalPages}
          </PageInfo>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </Button>
        </Pagination>
      </ModalContainer>
    </Overlay>
  );
};

export default MatchingModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  p{
    margin: 0;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  border: none;
  background: #6e2add;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 14px;
`;
