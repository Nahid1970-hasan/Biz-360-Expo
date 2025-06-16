import styled, { css } from 'styled-components';

export const Icon = styled.i` 
  display: inline-flex;
  margin: ${({margin})=> !!margin? margin: "0px"};
  padding: 8px; 
  height: ${({size})=> !!size? size+"px": "24px"};
  width: ${({size})=> !!size? size+"px": "24px"};
  border-radius: ${({size})=> !!size? (size/2)+"px": "12px"};
  background: ${({theme})=> theme.colors.bg};
  color: ${({theme, color})=> !!color? color : theme.colors.bg}; 
  fill: ${({theme})=> theme.colors.font}; 
  vertical-align: middle;  
  align-items:center;
  ${({hover})=> hover && css` &:hover {
    border-radius: ${({size})=> !!size? (size/2)+"px": "12px"}; 
    color:  ${({theme, hvcolor})=> !!hvcolor? hvcolor :theme.colors.bg};
    background:  ${({theme, hvback})=> !!hvback? hvback :theme.colors.bg};
    fill:  ${({theme, hvfill})=> !!hvfill? hvfill :theme.colors.bg};
  }`};
`;