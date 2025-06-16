import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getValueByLang, useOutsideClicker } from "../../utils/helper";
import { StyledTempNavbarLI, StyleTempDDArrow, StyleTempDDBackground, StyleTempDDContainer } from "../../component/style/styled_temp_navbar";
import { NavLink } from "react-router-dom";
import { Typography } from "../../component/style/styled_typography";
import { HoverCard } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PopoupDDMenuTemp } from "../../component/shopTempNavbar/PopupTempDDMenu";

 
 

export const TempNavMenu = ({ item }) => {
    const [subMod, setSubMod] = useState(false);

    const subModRef = useRef(null);
    const { t, i18n } = useTranslation();
    useOutsideClicker(subModRef, () => { setSubMod(false) });

    return (
        <>
             <StyledTempNavbarLI>
                         <NavLink to={item?.page_name} end>
                             <Typography
                                 txtalign="left"
                                 color="font"
                                 fntsize="navFont"
                             >
                                 {getValueByLang(item.menu_name || "{}")}
                             </Typography>
                         </NavLink>
                     </StyledTempNavbarLI>

        </>
    );
};
