import styled from "styled-components";

export const InlineFlex = styled.div`
  width: 100%;
  display: inline-flex; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "space-between")};
  align-items: center;
  cursor: pointer;
  &> div{
    display: flex;
    align-items: center;
  }
  &> img {
    display: flex; 
    margin-right: 10px;
    cursor: pointer;
  }
  &> button {
    display: flex; 
    margin-left: 10px;
  }
`;

export const InlineDiv = styled.div`
  width: 100%;
  display: inline-flex; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "space-between")};
  align-items: center; 
  &>:first-child {
    margin-right: 10px;
  } 
`;