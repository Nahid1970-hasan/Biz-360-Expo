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
                    <StyledMainNavbarLI><NavLink to={"/" + item?.page_name} end>
                        <Typography
                            incnum={5}
                            incnumtype="incr"
                            txtalign="center"
                            color="font"
                            fntsize="navFont"
                        >
                            {getValueByLang(item.module_name || "{}")}
                        </Typography></NavLink></StyledMainNavbarLI>
                    : (<StyledMainNavbarLI cursor="default">
                        <div ref={subModRef} onMouseEnter={() => setSubMod(true)}>
                            <a
                                onClick={() => (
                                    setSubMod(!subMod)
                                )}
                            >
                                <Typography
                                    incnum={5}
                                    incnumtype="incr"
                                    txtalign="left"
                                    color="font"
                                    fntsize="navFont"
                                > {getValueByLang(item.module_name || "{}")}</Typography>
                            </a>
                            <PopoupDDMenu open={subMod} >
                                <StyleDDBackground size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 260) + ""}></StyleDDBackground>
                                <StyleDDArrow background="bg" transform={(subModRef?.current?.offsetLeft + 45) + ""} ></StyleDDArrow>
                                <StyleDDContainer size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 265) + ""} margin="35px  0 0 150px">
                                    <HoverCard background="bg" onMouseLeave={() => setSubMod(false)}>
                                        <Flex row="row">{
                                            item?.sub_module?.map((item, k) => (
                                                <Flex key={k} md={6} padding="0!important">
                                                    <NavLink to={"/" + item.page_name}>
                                                        <InlineDiv justifycontent="start">
                                                            <div>
                                                                <Flex row="row">
                                                                    <Flex md={1} padding="0!important">
                                                                        <KDImg src={item?.sub_image} height={"auto"} width={"auto"} noborder="true" />
                                                                    </Flex>
                                                                    <Flex md={11} padding="0 0 0 15px !important" style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'flex-end'
                                                                    }}>
                                                                        <Typography txtalign="right" fntsize="bodyContentFontSize" margin="0 0 0 40px" >
                                                                            {getValueByLang(item.sub_name || "{}")}</Typography>

                                                                    </Flex>
                                                                </Flex>

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
