import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StyledTempNavbar, StyledTempNavbarLI, StyledTempNavbarUL } from "../component/style/styled_temp_navbar";
import { Container } from "../component/style/styled_contrainer";
import { KDImg } from "../component/style/styled_img";
import { TempNavMenu } from "./layout_temp_nav_menu";
import { getTextToImage } from "../utils/helper";


export const HeaderTempLayout = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const { t, i18n } = useTranslation(); 
    const location = useLocation();
    const [logo, set_logo] = useState(null);
    const [langList, set_LangList] = useState([]);
    const [moduledata, set_module_data] = useState([]);
    const userpath = location?.pathname?.split("/")[1] || "";
    const [lang, set_lang] = useState(localStorage.i18nextLng || "en");
    const tempimg = getTextToImage({width:100, height: 50, text:"Logo"});
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, []);

    useEffect(() => {  
        set_logo(profilePubData?.headerData?.logo || null);
        set_LangList(profilePubData?.langList || []);
        set_module_data(profilePubData?.moduleList?.filter((d)=>d.menu_position=="header") || []);  
    }, [profilePubData]);

    return (
        <Suspense>
            <StyledTempNavbar>
                <Container border={"none"}>
                    <div>
                        {logo?<StyledTempNavbarUL>
                            <NavLink to={"/"+userpath}><KDImg padding="5px 0" width={"70px"} height={"40px"} src={logo||tempimg} noborder="true" /></NavLink>
                        </StyledTempNavbarUL>:<></>}
                        <StyledTempNavbarUL>
                            {moduledata?.map((item, i) => (
                                <TempNavMenu key={i} item={item} />
                            ))}

                        </StyledTempNavbarUL>
                    </div>
                    <div>
                        <StyledTempNavbarUL>
                           {langList.length>0?<StyledTempNavbarLI>
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
                            </StyledTempNavbarLI>:<></>}
                        </StyledTempNavbarUL>
                    </div>
                </Container>
            </StyledTempNavbar>
        </Suspense>
    );
};
