import styled from "styled-components";
import { getBNFont } from "../../utils/helper";
export const KDTable = styled.table`  
  width: 100%;   
`;

export const KDTRw = styled.tr`   
    background: ${({ rwcolor, theme }) => theme.colors[rwcolor ? rwcolor : "bg"]};  
    text-align: ${({ rwalign, theme }) => (rwalign ? rwalign : "left")};
`;

export const KDTHDw = styled.td`   
    padding: 5px 10px; 
    width: ${({ width }) => (width ? width : "auto")}; 
    text-align: ${({ txtalign }) => (txtalign ? txtalign : "center")};
    font-size :  ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'modalHeaderFontSize'])};
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)};
`;

export const KDTDw = styled.td`   
    padding: 5px 8px; 
    width: ${({ width }) => (width ? width : "auto")}; 
    font-size :  ${({ fntsize, theme }) => getBNFont(theme.fontSize[fntsize ? fntsize : 'modalBodyFontSize'])};
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.font)};
    text-align: ${({ txtalign }) => (txtalign ? txtalign : "center")};
`;

