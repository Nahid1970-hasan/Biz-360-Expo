import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getValueByLang, useOutsideClicker } from "../utils/helper";
import { StyledTempNavbarLI, StyleTempDDArrow, StyleTempDDBackground, StyleTempDDContainer } from "../component/style/styled_temp_navbar";
import { NavLink } from "react-router-dom";
import { Typography } from "../component/style/styled_typography";
import { HoverCard } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { PopoupDDMenuTemp } from "../component/shopTempNavbar/PopupTempDDMenu";

 
 

export const DVTempNavMenu = ({ item }) => {
    const [subMod, setSubMod] = useState(false);

    const subModRef = useRef(null);
    const { t, i18n } = useTranslation();
    useOutsideClicker(subModRef, () => { setSubMod(false) });

    return (
        <>
            {
                !item?.sub_module ?
                    <StyledTempNavbarLI><NavLink to={item?.page_name} end> <Typography
                        txtalign="left"
                        color="font"
                        fntsize="navFont"
                    >
                        {getValueByLang(item.menu_name || "{}")}
                    </Typography></NavLink></StyledTempNavbarLI>
                    : (<StyledTempNavbarLI cursor="default">
                        <div ref={subModRef} onMouseEnter={() => setSubMod(true)} onMouseLeave={() => setSubMod(false)}>
                            <NavLink
                                onClick={() => (
                                    setSubMod(!subMod)
                                )}
                            >
                                <Typography
                                    txtalign="left"
                                    color="font"
                                    fntsize="navFont"
                                > {getValueByLang(item.menu_name || "{}")}</Typography>
                            </NavLink>
                            <PopoupDDMenuTemp open={subMod} >
                                <StyleTempDDBackground   size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 290)+""}></StyleTempDDBackground>
                                <StyleTempDDArrow background="bg" transform={(subModRef?.current?.offsetLeft + 25)+""}></StyleTempDDArrow>
                                <StyleTempDDContainer size={item?.sub_module?.length} transform={(subModRef?.current?.offsetLeft - 290)+""}>
                                    <HoverCard background="bg">
                                        <Flex row="row">{
                                            item?.sub_module?.map((item, k) => (
                                                <Flex key={k} md={6}>
                                                    <a href={"/#/p/"+item.page_name||"/#/p/"}>
                                                        <InlineDiv justifycontent="start">
                                                            <div>
                                                                <Typography  fntweight="bold" txtalign="left">{item.sub_name || "{}"}</Typography>
                                                                <Typography margin="6px 0 0 0"  txtalign="left" fntsize="smFont">{item.sub_desc || "{}"}</Typography>
                                                            </div>
                                                        </InlineDiv>
                                                    </a>
                                                </Flex>
                                            ))
                                        }
                                        </Flex>
                                    </HoverCard>
                                </StyleTempDDContainer>
                            </PopoupDDMenuTemp>
                        </div>
                    </StyledTempNavbarLI>)
            }

        </>
    );
};
