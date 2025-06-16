import { NavLink, useNavigate } from "react-router-dom";
import bizportal from "../assets/biz360portal.jpg";
import bizexpo from "../assets/Banner.-1000x240png.png";

import { KDImg } from "../component/style/styled_img";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { useTranslation } from "react-i18next";
import { PublicMenu } from "../component/PublicMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadPage } from "../features/page/page_slice";
import { StyledMainNavbar, StyledMainNavbarLI, StyledMainNavbarUL } from "../component/MainNavbar/mainNavbar";

import { Loading } from "../component/Loading";
import { loadPubMenu } from "../features/mainNav/main_nav_slice";

export const NavHeader = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const pubMenuData = useSelector((state) => state.pubmenu);
    const user = useSelector((state) => state.user);
    const nevigate = useNavigate();
    const [lang, set_lang] = useState(localStorage.i18nextLng || "en");

    useEffect(() => {
        i18n.changeLanguage(lang);
        dispatch(loadPubMenu())
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

            <StyledMainNavbar>
                <Container border={"none"}>
                    <div>
                        <StyledMainNavbarUL>
                            <NavLink to={"/"}><KDImg padding="5px 0" width={"300px"} height={"80px"} src={bizexpo} noborder="true" /></NavLink>
                        </StyledMainNavbarUL>
                        <StyledMainNavbarUL>
                            {pubMenuData?.moduleList?.map((item, i) => (
                                <PublicMenu key={i} item={item} />
                            ))}

                        </StyledMainNavbarUL>
                    </div>
                    <div>
                        <StyledMainNavbarUL>
                            <StyledMainNavbarLI>
                                <select
                                    app="true"
                                    name="lang"
                                    onChange={(e) => { set_lang(e.target.value), i18n.changeLanguage(localStorage.i18nextLng == "bn" ? "en" : "bn"); }}
                                    value={lang || "en"}
                                >
                                    <option disabled value={0}>
                                        {t("ph_select")}
                                    </option>
                                    {
                                        pubMenuData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                    }
                                </select>
                            </StyledMainNavbarLI>
                            {/* <StyledMainNavbarLI>

                                <NavLink to={"/login"} end>
                                    <Typography
                                        txtalign="left"
                                        color="font"
                                    >
                                        {t("login")}
                                    </Typography>
                                </NavLink>
                            </StyledMainNavbarLI>

                            <KDImg padding="5px 0" width={"100px"} height={"60px"} src={bizportal} noborder="true" /> */}

                        </StyledMainNavbarUL>
                    </div>
                </Container>
            </StyledMainNavbar>
            <Loading open={pubMenuData.loading == "pending"} />
        </>
    );
}