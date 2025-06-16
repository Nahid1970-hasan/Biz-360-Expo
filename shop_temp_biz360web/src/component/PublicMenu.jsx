import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getValueByLang, useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { Typography } from "./style/styled_typography";
import { Menu } from "./Menu";
import { MenuItem } from "./style/Styled_pub_menu_item";
import { StyleDDArrow, StyleDDBackground, StyleDDContainer, StyledMainNavbarLI } from "./MainNavbar/mainNavbar";
import { PopoupDDMenu } from "./MainNavbar/PopupDDMenu";
import { HoverCard } from "./style/styled_card";
import { InlineDiv, InlineFlex } from "./style/styled_inlineflex";
import { Label } from "./style/styled_label";
import bazar from "../assets/hat_bazar.jpg";
import { KDImg } from "./style/styled_img";
import { Flex } from "./style/styled_flex";
import { Loading } from "./Loading";

export const PublicMenu = ({ item }) => {
    const [subMod, setSubMod] = useState(false);

    const subModRef = useRef(null);
    const { t, i18n } = useTranslation();
    useOutsideClicker(subModRef, () => { setSubMod(false) });

    return (
        <>
            {
                !item?.sub_module ?
                    <StyledMainNavbarLI><NavLink to={item?.page_name} end> <Typography
                        txtalign="left"
                        color="font"
                        fntsize="navFont"
                    >
                        {getValueByLang(item.module_name || "{}")}
                    </Typography></NavLink></StyledMainNavbarLI>
                    : (<StyledMainNavbarLI cursor="default">
                        <div ref={subModRef} onMouseEnter={() => setSubMod(true)}>
                            <NavLink
                                onClick={() => (
                                    setSubMod(!subMod)
                                )}
                            >
                                <Typography
                                    txtalign="left"
                                    color="font"
                                    fntsize="navFont"
                                > {getValueByLang(item.module_name || "{}")}</Typography>
                            </NavLink>
                            <PopoupDDMenu open={subMod} >
                                <StyleDDBackground   size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 290)+""}></StyleDDBackground>
                                <StyleDDArrow background="bg" transform={(subModRef?.current?.offsetLeft + 25)+""}></StyleDDArrow>
                                <StyleDDContainer size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 290)+""}>
                                    <HoverCard background="bg" onMouseLeave={() => setSubMod(false)}>
                                        <Flex row="row">{
                                            item?.sub_module?.map((item, k) => (
                                                <Flex key={k} md={6}>
                                                    <NavLink to={item.page_name}>
                                                        <InlineDiv justifycontent="start">
                                                            <KDImg noborder="true" src={item?.sub_image ? item?.sub_image : bazar} height={"60px"} />
                                                            <div>
                                                                <Typography  fntweight="bold" txtalign="left">{getValueByLang(item.sub_name || "{}")}</Typography>
                                                                <Typography margin="6px 0 0 0"  txtalign="left" fntsize="smFont">{getValueByLang(item.sub_desc || "{}")}</Typography>
                                                            </div>
                                                        </InlineDiv>
                                                    </NavLink>
                                                </Flex>
                                            ))
                                        }
                                        </Flex>
                                    </HoverCard>
                                </StyleDDContainer>
                            </PopoupDDMenu>
                        </div>
                    </StyledMainNavbarLI>)
            }

        </>
    );
};
