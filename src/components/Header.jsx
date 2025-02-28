import React from 'react';
import { useSelector } from 'react-redux';
import { HeaderContainer,MenuButton ,UserInfo,UserEmail} from '../assets/Header.styled';



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