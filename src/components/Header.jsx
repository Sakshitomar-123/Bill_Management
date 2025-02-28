import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserEmail = styled.span`
  font-weight: 500;
`;

function Header({ toggleMobileSidebar }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <HeaderContainer>
      <MenuButton onClick={toggleMobileSidebar}>
        ☰
      </MenuButton>
      
      <UserInfo>
        <UserEmail>{user?.email}</UserEmail>
      </UserInfo>
    </HeaderContainer>
  );
}

export default Header;