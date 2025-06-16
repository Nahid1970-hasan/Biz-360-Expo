import styled from "styled-components";
import { theme } from "../../styles/theme";

export const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`;

export const GallerImg = styled.div`  
height: ${({ height }) => !!height ? height : "200px"}; 
align-items: center;
display: inline-flex;
width: auto;
border: ${({ noborder, theme }) => (noborder ? 'none' : '1px solid ' + theme.colors.primaryBorder)}; 
&>img{
  height: auto;
  width: auto;
}
@media (max-width: ${({ theme }) => theme.layout.sm}) {
  height: 250px;
}
`;