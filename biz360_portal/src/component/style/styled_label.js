import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
import { theme } from "../../styles/theme";

export const Label = styled.span`
  display: flex; 
  align-items: center;
 // line-height: 1;
  font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)};
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "left")}; 
  margin: ${({ margin }) => (margin ? margin : "4px 0 10px 0")};
  font-size : ${({ fntsize, theme ,incnum, incnumtype }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'], "lng", incnum || 3, incnumtype)};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.font}; 
  & input {
    margin-top: 0;
  } 
  &>a {
    font-size : ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'labelFontSize'])};
    margin: 0 5px;
  } 
`;

export const ErrLabel = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "left")}; 
  margin: ${({ margin }) => (margin ? margin : "4px 0 10px 0")};
  font-size : ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'font'])};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.error};  
`;

export const HLLabel = styled.div`
  background: ${theme.colors.bodySubTitle};
  color: ${getBNFont(theme.colors.bodySubTitleFont)};
  font-size : ${theme.fontSize.bodySubTitleFontSize};
  padding: 5px;
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  margin: ${({ margin }) => margin ? margin : "0"}
`;