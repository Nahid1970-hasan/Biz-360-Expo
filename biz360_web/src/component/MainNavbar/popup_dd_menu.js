import styled,  { css } from "styled-components";

export const StyledPopUpMenu = styled.div`
    display: block;
    position: absolute;
    z-index: 1000;
    left: 0;
    right: 0;
    background: ${({  background, theme }) => ( background ? theme.colors[background] :theme.colors.primary)};
    top: 55px;
    height: 0;
    width: 0;
    pointer-events: ${({open})=> open? 'auto' : 'none'};
    transform: ${({open})=> open? 'rotateX(-15deg)' : 'none'}; 
    transform-origin: 50% -50px;
    opacity: ${({open})=> open? '1': '0'};
    will-change: transform, opacity;
    transition-property: transform, opacity;
    transition-duration: .25s;
`;
