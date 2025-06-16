import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "../component/style/styled_typography";
const MenuLabel = styled(Typography)`
    display: flex;
`
export const SidebarMenuDemo2 = ({ item }) => {
 
  return (
    <>
      <li><NavLink to={item.page_name} end><MenuLabel 
        textAlign="left" 
        color="font"
        fontSize={"navbarFontSize"}
      > {item.module_name_en}</MenuLabel>
      </NavLink>
      </li>
    </>
  );
};
