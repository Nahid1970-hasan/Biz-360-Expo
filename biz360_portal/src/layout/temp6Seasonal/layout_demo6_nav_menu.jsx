

import { NavLink } from "react-router-dom";
import { getValueByLang } from "../../utils/helper";
import { Typography } from "../../component/style/styled_typography";
import { StyledTemp6NavbarLI } from "../../component/style/styled_temp6_navbar";

export const LayoutTemp6NavMenu = ({ item }) => {


    return (
        <> <StyledTemp6NavbarLI>
            <NavLink to={item?.page_name} end>
                <Typography
                    txtalign="left"
                    color="font"
                    fntsize="navFont"
                >
                    {getValueByLang(item.menu_name || "{}")}
                </Typography>
            </NavLink>
        </StyledTemp6NavbarLI>
        </>
    );
};
