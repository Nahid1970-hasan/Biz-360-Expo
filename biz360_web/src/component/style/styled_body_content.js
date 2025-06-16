import styled from "styled-components";

export const BodyContent = styled.section` 
  padding-left: 270px;
  @media(max-width: ${({theme})=> theme.layout.sm}){
    padding-left: 0px;
  }
  width: 100%;  
  transition: 0.5s;
  position: relative;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};

  & > nav {
    border-bottom: 1px solid #eee;
    height: 60px;
    background-color: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.font}; 
    position: sticky;
    box-shadow: rgba(25, 89, 66, 0.3) 0px 1px 8px 0px, rgba(25, 89, 66, 0.3) 0px 1px 1px 0px;
    top: 0;
  }

  & > main {
    background: ${({ theme }) => theme.colors.bg};
    min-height: 100%; 
    padding: 10px;
    font-size: 12px;
  }
`;
