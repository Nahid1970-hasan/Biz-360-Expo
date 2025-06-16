import styled from "styled-components";

export const Select = styled.select`
  display: block;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
  padding: ${({ padding }) => (padding ? padding : "0.375rem 0.75rem")};
  margin-top: ${({ app }) => (app ? ".15rem" : "0.55rem")};
  border:  ${({ color, theme }) => (color ? "1px solid " + theme.colors[color] : "1px solid " + theme.colors.inputBorder)};
  border-radius: ${({ app }) => (app ? "0.3rem" : 0)}; 
  font-size: ${({ fntsize, theme }) => theme.fontSize[fntsize ? fntsize : 'font']};
  font-weight: 400;
  line-height: 1.5;
  color:  ${({ theme }) => theme.colors.inputFont} ;
  background-color: ${({ theme }) => theme.colors.inputBackground} ;
  background-clip: padding-box;
  appearance: menulist-button;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: inherit;
  font-family:  ${({ fntfamily }) => (!!fntfamily ? fntfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
   
  &:focus {
    outline: none;
    border:  ${({ theme }) => ("2px solid " + theme.colors.inputBorder)};
  }
  &:disabled {
    cursor: default;
    background-color: #dfdfdf;
    border-radius: 0.3rem; 
  }
`;
