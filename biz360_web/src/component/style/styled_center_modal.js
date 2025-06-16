import styled from "styled-components";
import { Flex } from "./styled_flex";
import { getBNFont } from "../../utils/helper";
import { StyledIconButton } from "./styled_icon_button";
import { Card } from "./styled_card";

 

export const StyledCenterModal = styled.div`
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
    display:flex;  
    position: relative;
    top: 20%;
    justify-content: center;  
  }
`;
