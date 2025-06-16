import styled from "styled-components";
import { theme } from "../../styles/theme";

export const FooterTemp6Styled = styled.div`  
    bottom: 0px; 
    user-select: none;
    color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)};  
    max-width: 100%;
    padding: 10px ; 
    display: block; 
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.footercolor}; 
    height: auto; 

    &>div>div>div a{ 
        text-decoration: none; 
        & label{
            color: ${({ theme }) => theme.colors.bodyContent};
            font-size: ${({ theme }) => theme.fontSize.bodySubTitleFontSize}; 
            margin-left: 5px;
            padding: 0 5px;
            text-decoration: none; 
            cursor: pointer;
            &:hover { 
                text-decoration: underline; 
            }
        } 
    }
    @media(max-width:${theme.layout.xs}){
      margin-bottom: 60px;
       &>div>div>div span {
            text-align: center;
       }
    }
`;
export const FooterTemp6Menu = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
  justify-content: ${({ justifycenter }) => justifycenter ? justifycenter : "start"};  
  align-items: center;
  color: ${({ theme }) => theme.colors.bodyContent};  
  &>a{   
    text-decoration: none; 
    cursor: pointer;
    color:${({ theme }) => theme.colors.primaryFont} ; 
    width: ${({ awidth }) => awidth ? awidth : "auto"};  
    &:hover {
      color:${({ theme }) => theme.colors.primaryHover} ;  
    }
  }
   & label{
    color: ${({ theme }) => theme.colors.bodyContent};
    font-size: ${({ theme }) => theme.fontSize.bodySubTitleFontSize}; 
    margin-left: 5px;
    padding: 0 5px;
    text-decoration: none; 
    cursor: pointer;
    &:hover { 
      text-decoration: underline; 
    }
  }
    @media(max-width:${theme.layout.xs}){
      justify-content: center;  
    }

`;