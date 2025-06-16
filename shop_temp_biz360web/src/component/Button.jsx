import styled from "styled-components";
import { Button } from "./style/styled_button";

export const HeaderButton = styled(Button)`
  border-radius: 10px;
  padding: 6px 12px;
  font-size: ${({theme})=> theme.fontSize[localStorage.i18nextLng=='en'?'font':'fontBn']};
  color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.primaryFont)};
  & > span {
    vertical-align: middle;
  }
  & span:first-child{
    margin-right:5px;
  }
`;