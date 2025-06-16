import { forwardRef, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StyledTempNavbar, StyledTempNavbarLI, StyledTempNavbarUL } from "../../component/style/styled_temp_navbar";
import { Container } from "../../component/style/styled_contrainer";
import { KDImg } from "../../component/style/styled_img";
import bizlogo from "../../assets/Icone-Medium-100x79.png"
import { LayoutTemp6NavMenu } from "./layout_demo6_nav_menu";
import { StyledTemp6Navbar, StyledTemp6NavbarLI, StyledTemp6NavbarUL } from "../../component/style/styled_temp6_navbar";
import { Typography } from "../../component/style/styled_typography";

export const HeaderTemp6Layout = forwardRef((_, ref) => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [logo, set_logo] = useState("");
    const [langList, set_LangList] = useState([]);
    const [moduledata, set_module_data] = useState([]);
    const [allowPage, setAllowPage] = useState([]);
    const userpath = location?.pathname?.split("/")[1] || "";
    const [lang, set_lang] = useState(localStorage.i18nextLng || "en");
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, []);

    useEffect(() => {
        set_logo(profilePubData?.headerData?.logo || "");
        set_LangList(profilePubData?.langList || []);
        set_module_data(profilePubData?.moduleList?.filter((d) => d.menu_position == "header") || []);
    }, [profilePubData]);

    return (
        <Suspense>
            <StyledTemp6Navbar>
                <Container border={"none"}>
                    <div>
                        <StyledTemp6NavbarUL>
                            <span ref={ref}  className="material-icons md-36">menu</span>
                            <NavLink to={"/" + userpath}><KDImg padding="5px 0" width={"70px"} height={"40px"} src={logo || bizlogo} noborder="true" /></NavLink>
                        </StyledTemp6NavbarUL>
                    </div>
                    <div>
                        <StyledTemp6NavbarUL>
                            {moduledata?.map((item, i) => (
                                <LayoutTemp6NavMenu key={i} item={item} />
                            ))}
                        </StyledTemp6NavbarUL>
                         <StyledTemp6NavbarUL>
                            <Typography txtalign="end" fntsize="titleLargeFontSize" fntweight="bold">{profilePubData?.basicData?.biz_name||""}</Typography>
                        </StyledTemp6NavbarUL>
                        {/* <StyledTemp6NavbarUL>
                            {langList.length > 0 ? <StyledTemp6NavbarLI>
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
                                        langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                    }
                                </select>
                            </StyledTemp6NavbarLI> : <></>} 
                        </StyledTemp6NavbarUL>*/}
                    </div>
                </Container>
            </StyledTemp6Navbar>
        </Suspense>
    );
});
