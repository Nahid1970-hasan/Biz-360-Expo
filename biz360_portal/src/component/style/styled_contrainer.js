import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  width: ${({ width }) => (!!width ? width : (window.innerWidth - (window.innerWidth > 1500 ? 200: window.innerWidth > 900 ? 150 : window.innerWidth > 800 ? 100 : 0)) + "px")};
  max-width: 100%; 
  margin: 0 auto;   
  box-sizing: border-box;  
`;

export const ContainerBody = styled.div` 
  padding: ${({ padding }) => (padding ? padding : "10px")};
`;
