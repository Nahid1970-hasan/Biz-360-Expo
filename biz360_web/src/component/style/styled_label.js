import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
import { theme } from "../../styles/theme";

export const Label = styled.span`
  display: flex; 
  align-items: center; 
  font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)};
  text-align:${({ txtalign }) => (txtalign ? txtalign : "left")};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "left")}; 
  margin: ${({ margin }) => (margin ? margin : "4px 0 10px 0")};
  font-size : ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'labelFontSize'])};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.font}; 
  & input {
    margin-top: 0;
  } 
  &>b { 
    margin-left: 5px;
  } 
  &>a {
    font-size : ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'])};
    margin: 0 5px;
  } 
`;

export const ErrLabel = styled.span`
  display: flex; 
  align-items: center; 
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "left")}; 
  margin: ${({ margin }) => (margin ? margin : "4px 0 10px 0")};
  font-size : ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'font'])};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.error};  
`;

export const HLLabel = styled.div`
  display: inline-block; 
  background: ${({ theme, bgcolor }) => bgcolor ? theme.colors[bgcolor] : theme.colors.bodyTitle};   
  padding: ${({ padding }) => padding ? padding : "5px"};
  width: ${({ width }) => (width ? width : "100%")};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  font-size: ${({ fntsize, ntresize, theme }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodySubTitleFontSize'], "lng")};
  font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)};
  line-height: ${({ lnheight }) => (lnheight ? lnheight : "normal")};
  text-align:${({ txtalign }) => (txtalign ? txtalign : "left")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodySubTitleFont)};
  margin: ${({ margin }) => margin ? margin : "0"}
`;

export const RedMark = styled.span` 
  display: inline-flex; 
  align-items: center; 
  margin: 4px 0 0 2px;
  font-size: 14px;
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.error};  
`;