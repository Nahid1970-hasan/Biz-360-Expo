import styled from "styled-components";

export const StyledCheckbox = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  user-select: none; 
  border: 0;
  margin: 0;
  padding: ${({size})=> size == "sm"? "5px": "9px"};
  cursor: pointer;
  background-color: transparent;
  position: relative; 
  &> div {
    border-radius: 50%;
    &:hover {
        background:  ${({ theme, hvcolor }) => hvcolor ? theme.colors[hvcolor] : theme.colors.primaryHover}; 
    }
    &:active {
        background-color: #c7c4c4;
        background-size: 100%;
        transition: background 0s;
    }
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
    color: ${({ theme, slctcolor }) =>
      !!slctcolor ? theme.colors[slctcolor] : theme.colors.font};
  }
`;
