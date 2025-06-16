import styled from "styled-components";
import { getBNFont } from "../../utils/helper";

export const StyledCheckboxLabel = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  user-select: none; 
  border: 0;
  margin: 0; 
   padding: 2px 0px;
  cursor: pointer;
  background-color: transparent;
  position: relative;
  
  &> div {
    border-radius: 50%;  
    padding: ${({ padding }) => padding ? padding : "5px"};
    background: ${({ disabled }) => disabled? '#c7c4c4' : 'transparent'};
    &:hover {
        background:  c
    }
    &:active {
        background-color: #c7c4c4;
        background-size: 100%;
        transition: background 0s;
    } 
    & > input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        padding: 0;
        top: 0;
        left: 0;
        margin: 0;
        z-index: 1;
    } 
    & > span.material-icons {
      color: ${({ theme, slcolor }) => !!slcolor ? theme.colors[slcolor] : theme.colors.font}; 
    }
  } 
  
  & > span {
    color: ${({ theme, lblcolor }) => !!lblcolor ? theme.colors[lblcolor] : theme.colors.font};
    font-size: ${({ lblsize, notResize, theme }) => !!notResize ? theme.fontSize[lblsize ? lblsize : 'font'] : getBNFont(theme.fontSize[lblsize ? lblsize : 'font'])};
     
  }

  
`;


export const StyledCheckboxChildren = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  user-select: none; 
  border: 0;
  margin: 0; 
  padding: ${({ padding }) => (padding ? padding : "0")};
  cursor: ${({ cursor }) => (cursor ? cursor : "pointer")}; 
  background-color: transparent;
  position: relative;
  
  &>:first-child {
    border-radius: 50%;
    padding: 5px 8px; 

    &:hover {
        background:  ${({ theme, hvcolor }) => hvcolor ? theme.colors[hvcolor] : theme.colors.primaryHover}; 
    }
    &:active {
        background-color: #c7c4c4;
        background-size: 100%;
        transition: background 0s;
    } 
    & > input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
        padding: 0;
        top: 0;
        left: 0;
        margin: 0;
        z-index: 1;
    } 
    & > span.material-icons {
      color: ${({ theme, slcolor }) => !!slcolor ? theme.colors[slcolor] : theme.colors.font};
      margin-top: 3px;
    }
  }  
`;
