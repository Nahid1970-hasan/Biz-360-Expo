import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterStyled = styled.div`  
    bottom: 0px; 
    user-select: none;
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)};  
    max-width: 100%;
    padding: 10px ; 
    display: block; 
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.pubFooter}; 
    @media(max-width:${theme.layout.xs}){
        height:250px;
      }

    
`