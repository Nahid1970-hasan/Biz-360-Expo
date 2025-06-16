import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
export const Typography = styled.span`
  display: block;
  text-transform: ${({ transform }) => (transform ? transform : "initial")};
  text-decoration: ${({ decoration }) => (decoration ? decoration : "auto")};
  width: ${({ width }) => (width ? width : "auto")};
  font-size: ${({ fntsize, ntresize, theme  }) =>!!ntresize? theme.fontSize[fntsize ? fntsize:'bodyContentFontSize'] :getBNFont(theme.fontSize[fntsize ? fntsize:'bodyContentFontSize'], "lng")};
  font-weight: ${({ fntweight }) => (fntweight ? fntweight : 500)};
  line-height: ${({ lnheight }) => (lnheight ? lnheight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  text-align:${({  txtalign }) => ( txtalign ? txtalign : "center")};
  margin: ${({  margin }) => ( margin ? margin : "0")};
  &>p {
    display:inline-block;
    font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : "var(--dashboard-font)")};
    font-size: ${({ntresize , fntsize, theme }) =>!!ntresize? theme.fontSize[fntsize ? fntsize:'bodyContentFontSize'] :getBNFont(theme.fontSize[fntsize ? fntsize:'bodyContentFontSize'])};
  }
  &>a{
    display:inline-flex;
    color: ${({theme,color }) => (color ? theme.colors[color] : theme.colors.bodyContentFont)};
    text-decoration: ${({ decoration }) => (decoration ? decoration : "auto")};
  }
  &>b{
    display:inline-flex;
    color: ${({theme }) => theme.colors.success};
  }
`;

export const ULine = styled.div`
    display:block;
    height:  ${({ h }) => ( h ? h : "1.6px")};
    width: 100%;
    margin: 2px 0;
    background-color: #a7a4a4;
`;
export const GL = styled.div`
  display:inline-flex;
  color: ${({ theme }) => theme.colors.green} !important; 
`;
