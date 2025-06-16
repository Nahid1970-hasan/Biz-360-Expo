
import { NavLink, useParams } from "react-router-dom";
import { Container } from "../../component/style/styled_contrainer"
import { Suspense, useEffect, useState } from "react";
import { KDImg } from "../../component/style/styled_img";
import { StyledTempNavbar, StyledTempNavbarLI, StyledTempNavbarUL } from "../../component/style/styled_temp_navbar";
import { TempNavMenu } from "../../layout/layout_temp_nav_menu";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentYear, getTextToImage, getValueByLang } from "../../utils/helper";
import { Flex } from "../../component/style/styled_flex";
import { FooterMenu, FooterStyled } from "../../component/style/styled_footer";
import { Typography } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { Icon } from "../../component/style/styled_icon";
import { loadSelectedTemp } from "./admin_update_temp_slice";
import { useTranslation } from "react-i18next";
import * as feather from "feather-icons/dist/feather.min";
import { InfoCard, ShadowCard } from "../../component/style/styled_card";
import { BodyArea } from "../../component/style/styled_temp_body";
import { Loading } from "../../component/Loading";
import { CompBannerSection } from "../../component/TempContent/BannerSection";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard";
import { Center } from "../../component/style/styled_center";
import { Frame } from "../../component/style/styled_iframe";

export const PreviewTemplatePage = () => {
    const paramData = useParams();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [bodyPannel, setBodyPannel] = useState("home");
    const [moduledata, set_module_data] = useState([]);
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const tempimg = getTextToImage({ width: 100, height: 50, text: "Logo" });
    const [abtData, setAbtData] = useState({});
    const [basicData, setBasicData] = useState({});
    const [cntDataList, setCntDataList] = useState({});
    const [langList, setLangList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [footerData, setFooterData] = useState({});
    const [tempId, setTempId] = useState(0);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const [activeSocial, setActiveSocial] = useState([]);
    const [section1data, setSection1Data] = useState({});
    const [section2data, setSection2Data] = useState({});
    const [section3data, setSection3Data] = useState({});
    const [section4data, setSection4Data] = useState({});
    const [sectio5data, setSection5Data] = useState({});
    const [section6data, setSection6Data] = useState({});
    const [section7data, setSection7Data] = useState({});
    useEffect(() => {
        if (paramData?.id) {
            setTempId(paramData?.id);
            dispatch(loadSelectedTemp({ template_id: paramData?.id }));
        }
    }, [paramData]);

    useEffect(() => {
        var infoData = JSON.parse(admTempData?.tempInfoData?.template_footer || "{}");
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.home || {};
        var infoPG1Data = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page1 || {};
        var infoPG2Data = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page2 || {};
        setAbtData(infoPG1Data);
        setCntDataList(infoPG2Data)
        set_module_data(admTempData?.menuList || []);
        setLangList(admTempData?.langList || []);
        setFooterData(infoData|| {})
        setActiveSocial(infoData?.social_media?.link?.filter((b) => b.status == "Active") || []);
        setSection1Data(infoBodyData?.section1 || {});
        setSection2Data(infoBodyData?.section2 || {});
        setSection3Data(infoBodyData?.section3 || {});
        setSection4Data(infoBodyData?.section4 || {});
        setSection5Data(infoBodyData?.section5 || {});
        setSection6Data(infoBodyData?.section6 || {});
        setSection7Data(infoBodyData?.section7 || {});
        setTimeout(() => { feather.replace(); }, 900);
    }, [admTempData]);

    useEffect(() => {
        admTempData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [admTempData.loading]);

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }

    return (<>
        <Suspense>
            <Flex row="true">
                <Flex md={12}>
                    {tempId == 2 ? <ShadowCard>
                        <StyledTempNavbar>
                            <div>
                                <StyledTempNavbarUL>
                                    <NavLink><KDImg padding="5px 0" width={"70px"} height={"40px"} src={tempimg} noborder="true" /></NavLink>
                                </StyledTempNavbarUL>
                                <StyledTempNavbarUL>
                                    {moduledata?.map((item, i) => (<div key={i}>
                                        {!item?.sub_module ?
                                            <StyledTempNavbarLI key={i}>
                                                {
                                                    <a onClick={() => setBodyPannel(item?.page_name || "home")}>
                                                        <Typography
                                                            txtalign="left"
                                                            color="font"
                                                            fntsize="navFont"
                                                        >
                                                            {getValueByLang(item.menu_name || "{}")}
                                                        </Typography>
                                                    </a>
                                                }
                                            </StyledTempNavbarLI>
                                            : <></>}
                                    </div>
                                    ))}

                                </StyledTempNavbarUL>
                            </div>
                            <div>
                                <StyledTempNavbarUL>
                                    {langList?.length > 0 ? <StyledTempNavbarLI>
                                        <select
                                            app="true"
                                            name="lang"
                                            onChange={(e) => { setMenuLang(e.target.value) }}
                                            value={menuLang || "en"}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select")}
                                            </option>
                                            {
                                                langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </select>
                                    </StyledTempNavbarLI> : <></>}
                                </StyledTempNavbarUL>
                            </div>
                        </StyledTempNavbar>
                        <BodyArea>
                            {bodyPannel == "home" && <><Flex row="true">
                                <Flex md={12}>
                                    <CompBannerSection height="400px" bannerData={section1data?.data || []} slideLabel={false} />
                                </Flex>
                            </Flex>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section2data?.section2_title || t("browse_by_category")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <CompBannerSection height="150px" bannerData={section2data?.data || []} responsive={catResponsive} labelsize="lg" />
                                    </Flex>
                                </Flex>
                                <SizeBox />
                                <Flex row="True">
                                    {
                                        section3data?.data?.map((d, i) =>
                                            <Flex md={4} key={i}>
                                                <InfoCard>  <KDImg noborder="true" height={"250px"} width={"100%"} src={d.url || ""}></KDImg></InfoCard>
                                            </Flex>)
                                    }
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section4data?.section4_title || t("trandy_collection_title")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <InfoCard>
                                            <Flex row="true">
                                                {section4data?.data?.map((d, i) =>
                                                    <Flex key={i} md={3}>
                                                        <CompProductDetailsCard height={"200px"} src={d.url || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                                    </Flex>)}
                                            </Flex>
                                        </InfoCard>
                                    </Flex>
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {sectio5data?.section5_title || t("most_popular_title")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <InfoCard>
                                            <Flex row="true">
                                                {sectio5data?.data?.map((d, i) =>
                                                    <Flex key={i} md={3}>
                                                        <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                                    </Flex>)}
                                            </Flex>
                                        </InfoCard>
                                    </Flex>
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section6data?.section6_title || t("most_popular_title")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12} padding="10px 0 0 0!important">
                                        <InfoCard>
                                            <Flex row="true">
                                                {section6data?.data?.map((d, i) =>
                                                    <Flex key={i} md={3}>
                                                        <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                                    </Flex>)}
                                            </Flex>
                                        </InfoCard>
                                    </Flex>
                                </Flex>
                                <Flex row="true">
                                    <Flex md={12}>
                                        <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                            {section7data?.section7_title || t("popular_brands")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={12}>
                                        <CompBannerSection bannerData={section7data?.data || []} responsive={catResponsive} labelsize="md" />
                                    </Flex>
                                </Flex></>}
                            {
                                bodyPannel == "about-us" &&
                                <>
                                    <Typography fntsize="cardTitleFontSize" fntweight="bold">{abtData?.page_title || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.page_subtitle || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section1_title || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section1_subtitle || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section2_title || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section2_subtitle || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">{abtData?.section3_title || ""}</Typography>
                                    <SizeBox />
                                    <Typography fntsize="cardContentFontSize" txtalign="left">{abtData?.section3_subtitle || ""}</Typography>
                                </>
                            }
                            {
                                bodyPannel == "contact-us" &&
                                <>
                                    <Typography fntsize="cardTitleFontSize" fntweight="bold">{cntDataList?.page_title || "{{" + t("contact_us") + "}}"}</Typography>
                                    <Flex row="true">
                                        <Flex md={11.99}>
                                            <Typography fntsize="cardContentFontSize" txtalign="left">{cntDataList?.page_subtitle || "{{" + t("contact_us_subtitle") + "}}"}</Typography>
                                            <SizeBox />
                                        </Flex>
                                        <Flex md={6}>
                                            <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                                {cntDataList?.section1_title || "{{" + t("support") + "}}"}
                                            </Typography>
                                            <SizeBox />
                                            {
                                                cntDataList?.section1_info?.map((d, i) => <div key={i}>
                                                    {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                        <a>{d.name || "mobile" + (i + 1)}</a>
                                                    </Typography> : d.type == "email" ?
                                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                            <a >{d.name || "email" + (i + 1)}</a>
                                                        </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                            {d.name || "other_info"}
                                                        </Typography> : <></>}
                                                </div>)
                                            }
                                            <Flex row="true">
                                                <Flex md={6}>
                                                    <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                                        {cntDataList?.section2_title || "{{" + t("location_1") + "}}"}
                                                    </Typography>
                                                    <SizeBox />
                                                    {
                                                        cntDataList?.section2_info?.map((d, i) => <div key={i}>
                                                            {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                <a>{d.name || "mobile" + (i + 1)}</a>
                                                            </Typography> : d.type == "email" ?
                                                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                    <a >{d.name || "email" + (i + 1)}</a>
                                                                </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                    {d.name || "other_info"}
                                                                </Typography> : <></>}
                                                        </div>)
                                                    }
                                                </Flex>
                                                <Flex md={6}>
                                                    <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                                        {cntDataList?.section3_title || "{{" + t("location_2") + "}}"}
                                                    </Typography>
                                                    <SizeBox />
                                                    {
                                                        cntDataList?.section3_info?.map((d, i) => <div key={i}>
                                                            {d.status == "Active" ? d.type == "address" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                <a>{d.name || t("address")}</a>
                                                            </Typography> : d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                <a>{d.name || t("mobile" + (i + 1))}</a>
                                                            </Typography> : d.type == "email" ?
                                                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                    <a >{d.name || t("email" + (i + 1))}</a>
                                                                </Typography> : <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                                                    {d.name || t("other_info")}
                                                                </Typography> : <></>}
                                                        </div>)
                                                    }
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex md={6}>
                                            {cntDataList?.section4_info?.status == "Active" ? <Frame
                                                height={"400px"}
                                                width={"100%"}
                                                src={"https://maps.google.com/maps?q=House%2020,%20Road%20no%2012,%20PC%20Culture%20Society&t=&z=19&ie=UTF8&iwloc=&output=embed"}
                                            ></Frame> : <></>}
                                        </Flex>
                                    </Flex>
                                </>
                            }
                        </BodyArea>
                        <SizeBox height="20px" />
                        <FooterStyled color="font">
                            <Flex row="row">
                                <Flex padding="10px 0 0 0 !important" md={3}>
                                    <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        {footerData?.support?.title || "Support"}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        footerData?.support?.datalist?.map((d, i) => <div key={i}>
                                            {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                <FooterMenu><a>{d.name || "mobile" + (i + 1)}</a> </FooterMenu>
                                            </Typography> : d.type == "email" ?
                                                <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                    <FooterMenu><a >{d.name || "email" + (i + 1)}</a></FooterMenu>
                                                </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                    <FooterMenu> {d.name || "other_info"}</FooterMenu>
                                                </Typography> : <></>}
                                        </div>)
                                    }
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={3}>
                                    <Typography margin="0 0 0 10px" fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        {footerData?.important_link?.title || "Support"}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        footerData?.important_link?.link?.map((d, i) =>
                                            d.status == "Active" ? <Typography key={i} fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                <FooterMenu><a target="_blank"><label>{d.name || "Link " + (i + 1)}</label></a></FooterMenu>
                                            </Typography> : "")
                                    }
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={6}>
                                    <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"}>
                                        {footerData?.social_media?.title || "Follow US"}
                                    </Typography>
                                    <SizeBox />
                                    <Flex row="row">
                                        {
                                            activeSocial.map((d, i) =>
                                                <Flex key={i} padding="0 !important" md={activeSocial.length > 2 ? 4 : activeSocial?.length > 1 ? 6 : 12}>
                                                    <FooterMenu justifycenter={activeSocial.length > 2 ? "start" : "center"}>
                                                        <a target="_blank">
                                                            {
                                                                d.type == "icon" ? <Icon hvcolor={d.hvcolor} hvfill="white" hvback={d.hvback} color={d.color} data-feather={d.icon} hover={d.hover} size={40} />
                                                                    : <Icon hvcolor={d.hvcolor} hvfill="white" hvback={d.hvback} color={d.color} hover={d.hover} size={40}>
                                                                        {d.icon == "google" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M25.997,48C13.312,48,2.992,37.683,2.992,25c0-12.682,10.32-23,23.005-23c5.746,0,11.247,2.13,15.491,5.997l0.774,0.706l-7.588,7.585l-0.703-0.602c-2.226-1.906-5.058-2.956-7.975-2.956c-6.767,0-12.273,5.504-12.273,12.27s5.506,12.27,12.273,12.27c4.879,0,8.733-2.491,10.549-6.737H24.997V20.176l22.549,0.031L47.713,21c1.179,5.582,0.235,13.793-4.528,19.667C39.238,45.533,33.456,48,25.997,48z" /></svg>}
                                                                        {d.icon == "whatsapp" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="Outlined"><path d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985c-0.001,1.76,0.459,3.478,1.333,4.992L2,22l5.233-1.237c1.459,0.796,3.101,1.215,4.773,1.216h0.004c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.816,19.077,4.928z M12.007,19.979c-1.333-0.001-2.653-0.337-3.816-0.972L7.518,18.64l-0.745,0.176l-1.968,0.465l0.481-1.784l0.216-0.802l-0.415-0.719c-0.698-1.208-1.066-2.588-1.065-3.991C4.024,7.583,7.607,4,12.01,4c2.136,0.001,4.143,0.833,5.652,2.341c1.509,1.51,2.339,3.517,2.337,5.651C19.997,16.396,16.413,19.979,12.007,19.979z" /><path d="M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767c-0.125-0.167-1.019-1.353-1.019-2.581S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006c0.178,0.007,0.375,0.016,0.562,0.431c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416c-0.125,0.146-0.262,0.325-0.374,0.437c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728c0.954,0.85,1.757,1.113,2.007,1.239c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812c0.25,0.125,0.416,0.187,0.478,0.291C17.106,14.471,17.106,14.971,16.898,15.554z" /></g></svg>}
                                                                        {d.icon == "telegram" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z" /></svg>}
                                                                        {d.icon == "messenger" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="outlined"><path d="M12,2C6.486,2,2,6.262,2,11.5c0,2.545,1.088,4.988,3,6.772v4.346l4.08-2.039C10.039,20.858,11.02,21,12,21c5.514,0,10-4.262,10-9.5S17.514,2,12,2z M12,19c-0.789,0-1.584-0.115-2.361-0.341l-0.753-0.219L8.185,18.79L7,19.382v-1.11v-0.869L6.364,16.81C4.862,15.408,4,13.472,4,11.5C4,7.365,7.589,4,12,4s8,3.365,8,7.5S16.411,19,12,19z" /><polygon points="13,14 10.5,12 6,14 11,9 13.5,11 18,9 " /></g></svg>}
                                                                    </Icon>
                                                            } <label>{d.name}</label>
                                                        </a>
                                                    </FooterMenu >
                                                </Flex>)
                                        }
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex row="row" justifycenter="true">
                                <Flex md={12} padding="0!important">
                                    <Typography fnfamily="var(--dashboard-font)" fntsize="bodyTitleFontSize" color="primaryFont" width={"100%"} margin="5px 0">
                                        Copyright © {getCurrentYear()} {basicData?.biz_name || ""} | All Rights Reserved to BIZ360Expo
                                    </Typography>
                                </Flex>
                            </Flex>
                        </FooterStyled>
                    </ShadowCard> : <Center>
                        <h2><b>{t('template_not_ready')}</b> </h2>
                    </Center>}
                </Flex>
            </Flex>
        </Suspense>
        <Loading open={isLoading} />
    </>)
}