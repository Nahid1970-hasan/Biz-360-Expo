import { Link, NavLink, useNavigate } from "react-router-dom";
import bizexpo from "../assets/banner-icon/banner-biz360expo.png";

import { KDImg } from "../component/style/styled_img";
import { Typography, ULine } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { useTranslation } from "react-i18next";
import { PublicMenu } from "../component/PublicMenu";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useRef, useState } from "react";
import { loadPage } from "../features/page/page_slice";
import { StyledMainNavbar, StyledMainNavbarLI, StyledMainNavbarUL } from "../component/MainNavbar/mainNavbar";

import { Loading } from "../component/Loading";
import { loadPubMenu } from "../features/mainNav/main_nav_slice";
import { Flex } from "../component/style/styled_flex";
import { PublicLngMenu } from "../component/PubLngMenu";




export const NavHeader = forwardRef((_, ref) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const pubMenuData = useSelector((state) => state.pubmenu);
    const user = useSelector((state) => state.user);
    const nevigate = useNavigate();
    const [lang, set_lang] = useState(localStorage.i18nextLng || "en");
    const [position, set_postion] = useState("sticky");

    useEffect(() => {
        i18n.changeLanguage(lang);
        dispatch(loadPubMenu())
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                set_postion("fixed")
            } else {
                set_postion("sticky")
            }
        })
    }, []);

    useEffect(() => {
        if (user.login) {
            dispatch(loadPage({ title: "dashboard" }));
            nevigate("/app");
        }
    }, [user]);

    const menuData = [

        {
            "module_id": 110,
            "page_name": "/portal/pabout",
            "module_name": "{\"bn\": \"আমাদের সম্পর্কে\", \"en\": \"About Us\"}"
        },
        {
            "module_id": 150,
            "page_name": "/portal/pmember",
            "module_name": "{\"bn\": \"সদস্যপদ\", \"en\": \"Member\"}"
        },
        {
            "module_id": 130,
            "page_name": "/portal/ppricing",
            "module_name": "{\"bn\": \"মূল্য নির্ধারণ\", \"en\": \"Pricing\"}"
        },
        {
            "module_id": 140,
            "page_name": "/portal/ptop20",
            "module_name": "{\"bn\": \"শীর্ষ 20\", \"en\": \"Top 20s\"}"
        },

    ];

    return (
        <>
         <div style={{ userSelect: "none" }}>
            <StyledMainNavbar position={position}>
                <Container border={"none"}>

                    <Flex row="row" >
                        <Flex md={3} padding=" 0 !important">
                            <div>

                                <NavLink to="/" style={{ textDecoration: 'none' }}>
                                    <KDImg
                                        width="auto"
                                        height="auto"
                                        src={bizexpo}
                                        noborder="true"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </NavLink>
                                <Typography
                                    fntsize="cardContentFontSize"
                                    fntweight="bold"
                                    margin="5px 0 0 0"
                                    fnfamily="Agency"
                                    txtalign="end"
                                    incnum={5}
                                    incnumtype="decr"

                                >
                                    {t("head_title")}
                                </Typography>
                            </div>
                            <span ref={ref} className="material-icons md-36">menu</span>
                        </Flex>
                        <Flex md={9} padding="0!important" >

                            <Typography
                                txtalign="left"
                                fntsize="navtitleFontSize"
                                fntweight="bold"
                                incnumtype="inc"
                                incnum={5}
                            >
                                {t("head_title")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={10} padding="0 !important">
                            <div>
                                <StyledMainNavbarUL>
                                    {pubMenuData?.moduleList?.map((item, i) => (
                                        <PublicMenu key={i} item={item} />
                                    ))}

                                </StyledMainNavbarUL>
                            </div>
                        </Flex>
                        <Flex md={2} padding="0!important" >
                            <div>
                                <PublicLngMenu />
                            </div>
                        </Flex>
                    </Flex>



                </Container>
            </StyledMainNavbar>
            </div>
            <Loading open={pubMenuData.loading == "pending"} />
        </>
    );
})