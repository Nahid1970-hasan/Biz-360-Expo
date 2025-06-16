import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getValueByLang, useOutsideClicker } from "../utils/helper";
import { StyledTempNavbarLI } from "../component/style/styled_temp_navbar";
import { NavLink } from "react-router-dom";
import { Typography } from "../component/style/styled_typography";

export const TempNavMenu = ({ item, devs, setBodyPannel = () => { } }) => {
    const [subMod, setSubMod] = useState(false);

    const subModRef = useRef(null);
    const { t, i18n } = useTranslation();
    useOutsideClicker(subModRef, () => { setSubMod(false) });

    return (
        <>
            {
                !item?.sub_module ?
                    <StyledTempNavbarLI>
                        {
                            devs ? <a onClick={setBodyPannel(item?.page_name||"home")}>
                                <Typography
                                    txtalign="left"
                                    color="font"
                                    fntsize="navFont"
                                >
                                    {getValueByLang(item.menu_name || "{}")}
                                </Typography>
                            </a> : <NavLink to={item?.page_name} end> <Typography
                                txtalign="left"
                                color="font"
                                fntsize="navFont" >
                                {getValueByLang(item.menu_name || "{}")}
                            </Typography>
                            </NavLink>
                        }
                    </StyledTempNavbarLI>
                    : <></>
            }

        </>
    );
};
