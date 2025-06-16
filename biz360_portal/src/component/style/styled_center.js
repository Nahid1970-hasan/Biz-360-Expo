import styled from "styled-components";
export const Center = styled.div` 
  justify-content: space-around;
  display: flex;
  align-items: ${({ row }) => (row ? "flex-start" : "center")}; 
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`;
