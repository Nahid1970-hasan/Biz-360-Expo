import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
import { Link } from "react-router-dom";
export const Typography = styled.span`
  display: block;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  text-decoration: ${({ decoration }) => (decoration ? decoration : "auto")};
  width: ${({ width }) => (width ? width : "auto")}; 
  font-size: ${({ fntsize, ntresize, theme, incnum, incnumtype }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'], "lng", incnum || 3, incnumtype)};
  font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)};
  line-height: ${({ lnheight }) => (lnheight ? lnheight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
  text-align:${({ txtalign }) => (txtalign ? txtalign : "center")};
  margin: ${({ margin }) => (margin ? margin : "0")};
  &>p {
    display:inline-block;
    font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : "var(--dashboard-font)")};
    font-size: ${({ ntresize, fntsize, theme }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'])};
  }
  &>a{
    display:inline-flex;
    color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
    text-decoration: ${({ decoration }) => (decoration ? decoration : "auto")};
  }
  &>b{
    display:inline-flex;
    color: ${({ theme }) => theme.colors.success};
  }
`;

export const TypographyOl = styled.ol`
    margin-left: 0;
    list-style-type: none;
    padding: 10px 0; 
    &>li { 
        padding: 5px 0;
        font-size: ${({ fntsize, ntresize, theme, incnum, incnumtype }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'], "lng", incnum || 3, incnumtype)};
        font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)}; 
        color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
        font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
        text-align:${({ txtalign }) => (txtalign ? txtalign : "left")};   
    }
`;
export const ULine = styled.div`
    display:block;
    height:  ${({ h }) => (h ? h : "1.6px")};
    width: 100%;
    margin: 2px 0;
    background-color:rgb(243, 52, 52);
`;

export const HL = styled.div`
  display:inline-flex;
  color: ${({ theme }) => theme.colors.primary} !important; 
`;
export const WL = styled.div`
  display:inline-flex;
  color: ${({ theme }) => theme.colors.wlabel} !important; 
`;
export const GL = styled.div`
  display:inline-flex;
  color: ${({ theme }) => theme.colors.green} !important; 
`;
export const GreenBox = styled.div`
  display: inline-flex;
  border: 1px solid ${({ theme }) => theme.colors.green};
  padding: ${({ padding }) => (padding ? padding : "5px 10px")};
  border-radius: 4px;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  background-color: transparent;
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  &>a:hover {
    color: #4285f4;
    text-decoration: underline; 
  }
`;
export const GreenBoxLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin:"0  0 0 5px"
  transition: all 0.2s ease;

  &:hover {
    color: #4285f4;
    text-decoration: underline;
  }
`;



