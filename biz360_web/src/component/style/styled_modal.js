import styled from "styled-components"; 
import { Card } from "./styled_card";
import { Flex } from "./styled_flex";
import { StyledIconButton } from "./styled_icon_button";
import { getBNFont } from "../../utils/helper";

export const StyledModal = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100%;
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  z-index: 1030;
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  transition: opacity 0.15s linear;

  & > ${Flex} {
    align-items: center;
    justify-content: center;
    // height: 100%;
    margin-top:${({ modalTop }) => (modalTop ? modalTop : "48px")}; 
    & > ${Flex} {
       position: relative;
       top: 50%;
       //left: 50%;
      //transform: translate(-50%, -10px);
      transition: transform 0.3s ease-out;
      box-sizing: border-box;

      & ${Card} > header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #aaa; 
        background: ${({  titleBackground, theme }) => ( titleBackground ? theme.colors[titleBackground] :theme.colors.girdHeaderalter)};
        padding:5px 10px;
        margin: 0;
        font-size :  ${({  fontSize, theme }) =>  getBNFont(theme.fontSize[fontSize ? fontSize:'modalHeaderFontSize'])};
        color: ${({  color, theme }) => ( color ? theme.colors[color] :theme.colors.font)};

        & > ${StyledIconButton} {
          margin-top: 0;
        }
      }
    }
  }
`;
