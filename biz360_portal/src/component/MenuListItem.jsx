import { NavLink } from "react-router-dom";
import { Typography } from "./style/styled_typography";

export const MenuListItem = ({ title, link, icon }) => {
    return (
        <li>
            <NavLink to={link} end>
                <Typography txtalign="left" color="font"> {title} </Typography>
            </NavLink>
        </li>);
}