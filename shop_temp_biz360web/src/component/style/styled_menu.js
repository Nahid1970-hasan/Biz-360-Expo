import styled,  { css } from "styled-components";

export const StyledMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  ${({left})=> left  && css`left: ${({ left }) => (left ? left : "0")};`}
   ${({right})=> right && css`right: ${({ right }) => (right ? right : "0")};`} 
  top: ${({ top }) => (top ? top : "50%")}; 
  width: ${({ width }) => (width ? width : "auto")}; 
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.font};
  border-radius: 4px;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  & > ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    text-transform: capitalize !important;

    & a {
      color: ${({ theme }) => theme.colors.font} !important; 
      text-decoration: none;
      &::before {
        height: 0% !important;
      }
    }
  }
`;
