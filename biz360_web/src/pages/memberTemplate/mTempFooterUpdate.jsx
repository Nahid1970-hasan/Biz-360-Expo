
import * as feather from "feather-icons/dist/feather.min";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentYear, getTextToImage, getValueByLang, IMPORTANTLINK, SOCIALLINK, SUPPORTDATA } from "../../utils/helper";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { HLLabel, Label } from "../../component/style/styled_label";
import { PrimaryButton } from "../../component/style/styled_button";
import { StyledTempNavbar, StyledTempNavbarLI, StyledTempNavbarUL } from "../../component/style/styled_temp_navbar";
import { TempNavMenu } from "../../layout/layout_temp_nav_menu";
import { NavLink } from "react-router-dom";
import { KDImg } from "../../component/style/styled_img";
import { FooterMenu, FooterStyled } from "../../component/style/styled_footer";
import { Typography, ULine } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { Icon } from "../../component/style/styled_icon";
import { loadPage } from "../../features/page/page_slice";
import UnAuthorized from "../UnAuthorized";
import { loadSelectedMTempData } from "./inv_biz_temp_slice";
import { Input } from "../../component/style/styled_input";
import { CheckboxLabel, CheckboxLabelInput, CheckboxRowLabelInput } from "../../component/Checkbox";
import DataGrid from "../../component/DataGrid";
import { Center } from "../../component/style/styled_center";
import { initLoader, loadMTempFooterData, saveMTempFooterData } from "./inv_biz_temp_ft_slice";
import { NotNetwork } from "../NoNetwork";
import { Loading } from "../../component/Loading";
import { Toast } from "../../component/Toast";
import { MUpTempNavMenuModalPage } from "./mTempNavMenuModal";

export const MUpdateTempFooterPage = () => {
    const invBizTempFTData = useSelector((state) => state.invbiztempftdata);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [logo, set_logo] = useState(null);
    const [moduledata, set_module_data] = useState([]);
    const [langList, setLangList] = useState([]);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const tempimg = getTextToImage({ width: 100, height: 50, text: "Logo" });
    const [basicData, setBasicData] = useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [footerData, setFooterData] = useState({});
    const [activeSocial, setActiveSocial] = useState([]);
    const [activeSupportList, setActiveSupportList] = useState([]);

    const [scShowList, setSCShowList] = useState([]);
    const [spShowList, setSPShowList] = useState([]);
    const [lnShowList, setLNShowList] = useState([]);

    const [basicInfo, setBasicInfo] = useState({});
    const [tempid, set_tempid] = useState(0);
    const [tempInfo, setTempInfo] = useState({});
    const [support_title, set_support_title] = useState("");
    const [imp_link_title, set_imp_link_title] = useState("");
    const [scl_link_title, set_scl_link_title] = useState("");
    const { t, i18n } = useTranslation();
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(loadPage({ title: 'footer_content' }))
    }, []);

    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    useEffect(() => {
        if (tempInfo.template_id > 0) {
            set_tempid(tempInfo.template_id);
        }
    }, [tempInfo]);

    useEffect(() => {
        if (basicInfo.group_id > 0) {
            dispatch(loadMTempFooterData({ group_id: basicInfo.group_id }));
        }
    }, [basicInfo]);

    useEffect(() => {
        var infoData = JSON.parse(invBizTempFTData?.footerData || "{}");
        setFooterData(infoData || {});
        set_support_title(infoData?.support?.title || "");
        set_imp_link_title(infoData?.important_link?.title || "");
        set_scl_link_title(infoData?.social_media?.title || "")
        setActiveSupportList(infoData?.support?.datalist?.filter((b) => b.status == "Active")?.map((d) => ({ ...d, item_value: d.link })) || []);
        setActiveSocial(infoData?.social_media?.link?.filter((b) => b.status == "Active")?.map((d) => ({ ...d, item_value: d.link })) || []);
        setSPShowList(infoData?.support?.datalist?.filter((b) => +b.show == 1)); 
        setSCShowList(infoData?.social_media?.link?.filter((b) => +b.show == 1));
        setTimeout(() => { feather.replace(); }, 900);
    }, [invBizTempFTData.footerData]);

    useEffect(() => {
        setLNShowList(invBizTempFTData?.menuList?.filter((b) => b.visible == 1) || []);
    }, [invBizTempFTData.menuList]);

    function handleSubmit() {
        var data = {
            "support": {
                "title": support_title,
                "datalist": activeSupportList.length == 0 ? SUPPORTDATA : activeSupportList.map((d) => ({ ...d, link: d?.item_value || "" })) || []
            },
            "important_link": {
                "title": imp_link_title,
            },
            "social_media": {
                "title": scl_link_title, "link": activeSocial.length == 0 ? SOCIALLINK : activeSocial.map((d) => ({ ...d, link: d?.item_value || "" })) || []
            }
        }
        dispatch(saveMTempFooterData({ "template_id": tempid, "template_footer": JSON.stringify(data) }));
    }

    useEffect(() => {
        if (invBizTempFTData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (invBizTempFTData.addUpdateLoading == "succeeded") { 
            setTimeout(() => {
                dispatch(initLoader());
                setIsLoading(false);
                if (basicInfo.group_id > 0) {
                    dispatch(loadMTempFooterData({ group_id: basicInfo.group_id }));
                }
            }, 4000);
        } else if (invBizTempFTData.addUpdateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempFTData.addUpdateLoading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempFTData.addUpdateLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [invBizTempFTData.addUpdateLoading]);

    useEffect(() => {
        invBizTempFTData.loading == "pending" ? setIsLoading(true) : invBizTempFTData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempFTData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempFTData.loading]);

    

    const colums = [
        {
            headerName: "ID",
            field: "menu_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "30px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },

        {
            headerName: ("menu_name"),
            field: "menu_name_value",
            description: "menu_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("display_name"),
            field: "user_menu_name_value",
            description: "display_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("visibilty"),
            field: "visible_value",
            description: "visibilty",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "state",
            width: "150px"
        },

        {
            headerName: ("action"),
            field: "",
            type: "action",
            icons: ["edit"],
            colors: ["success"],
            descriptions: ["Edit"],
            callBacks: [
                (menu_id) => {
                    var rwdata = rowData.find((d) => d.menu_id == menu_id);
                    setBasicData({ "rowdata": rwdata, 'languageList': invBizTempFTData?.langList || []  }) 
                    setNavOpen(true)
                },

            ],
        },
    ];

    const rowData = invBizTempFTData?.menuList?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        group_id: basicInfo?.group_id || 0,
        visible_value: {
            label: d?.visible == 1 ? "yes" : "no",
            color: d?.visible == 1 ? "success" : "error",
        },
        menu_name_value: getValueByLang(d?.menu_name || "{}"),
        user_menu_name_value: getValueByLang(d?.user_menu_name || "{}"),
    }));
    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(invBizTempFTData.addUpdateLoading == "idle" || invBizTempFTData.addUpdateLoading == "pending") ? <></> : (
            invBizTempFTData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempFTData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempFTData.msg} />
            )
        )}
        <Suspense>
            <Flex row="true">
                <Flex padding={"5px !important"} md={12}>
                    <InfoCard background="primaryHover">
                        <Typography fntsize="cardTitleFontSize">{t("preview")}</Typography>
                        <SizeBox height="8px" />
                        <ShadowCard>
                            <FooterStyled color="font">
                                <Flex row="row">
                                    <Flex padding="10px 0 0 0 !important" md={3}>
                                        <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                            {footerData?.support?.title || "{{" + t("support") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        {
                                            spShowList?.map((d, i) => <div key={i}>
                                                {d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                    <FooterMenu><a>{d?.link ? d?.link : d?.name ? d?.name : t("mobile" + (i + 1))}</a> </FooterMenu>
                                                </Typography> : d.type == "email" ?
                                                    <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                        <FooterMenu><a >{d?.link ? d?.link : d?.name ? d?.name : t("email" + (i + 1))}</a></FooterMenu>
                                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                        <FooterMenu> {d?.link ? d?.link : d?.name ? d?.name : t("others_info")}</FooterMenu>
                                                    </Typography>}
                                            </div>)
                                        }
                                    </Flex>
                                    <Flex padding="10px 0 0 0 !important" md={3}>
                                        <Typography margin="0 0 0 10px" fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                            {footerData?.important_link?.title || "{{" + t("links") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        {
                                            lnShowList?.map((d, i) =>
                                                <Typography key={i} fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                    <FooterMenu><a target="_blank"><label>{getValueByLang(d?.user_menu_name || "{}")}</label></a></FooterMenu>
                                                </Typography>
                                            )
                                        }
                                    </Flex>
                                    <Flex padding="10px 0 0 0 !important" md={6}>
                                        <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"}>
                                            {footerData?.social_media?.title || "{{" + t("follow_us") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Flex row="row">
                                            {
                                                scShowList?.map((d, i) =>
                                                    <Flex key={i} padding="0 !important" md={scShowList.length > 2 ? 4 : scShowList?.length > 1 ? 6 : 12}>
                                                        <FooterMenu justifycenter={scShowList.length > 2 ? "start" : "center"}>
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
                                                    </Flex>

                                                )
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
                        </ShadowCard>
                    </InfoCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <DataGrid colums={colums} rows={rowData || []} />
                    </ShadowCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <Flex row="true">
                            <Flex md={4}>
                                <Label>{t("support_title")}</Label>
                                <Input
                                    type="text"
                                    name='support_title'
                                    placeholder={t("ph_support_title")}
                                    value={support_title}
                                    onChange={(e) => set_support_title(e.target.value)}
                                />
                            </Flex>
                            <Flex md={4}>

                                <Label>{t("important_link_title")}</Label>
                                <Input
                                    type="text"
                                    name='imp_link_title'
                                    placeholder={t("ph_imp_link_title")}
                                    value={imp_link_title}
                                    onChange={(e) => set_imp_link_title(e.target.value)}
                                />

                            </Flex>
                            <Flex md={4}>
                                <Label>{t("social_media_title")}</Label>
                                <Input
                                    type="text"
                                    name='scl_link_title'
                                    placeholder={t("ph_scl_link_title")}
                                    value={scl_link_title}
                                    onChange={(e) => set_scl_link_title(e.target.value)}
                                />

                            </Flex>
                        </Flex>
                        <Flex row="true">
                            <Flex md={12}>
                                <Flex row="true">
                                    <Flex md={5} padding="0 5px !important">
                                        <HLLabel margin={"8px 0 5px 0"}>{t("support")}</HLLabel>
                                        <CardBody>
                                            <CheckboxLabelInput datalist={activeSupportList || []} setDataList={setActiveSupportList} />
                                        </CardBody>
                                    </Flex>
                                    <Flex md={7} padding="0 5px !important">
                                        <HLLabel margin={"8px 0 5px 0"}>{t("social_media_link")}</HLLabel>
                                        <CardBody>
                                            <Flex row="true">
                                                <CheckboxRowLabelInput datalist={activeSocial || []} setDataList={setActiveSocial} />
                                            </Flex>
                                        </CardBody>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex md={11.99}>
                            <CardHeaderButton>
                                <PrimaryButton
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    {t("submit")}
                                </PrimaryButton>
                            </CardHeaderButton>
                        </Flex>
                    </ShadowCard>
                </Flex>
            </Flex>
        </Suspense>
        <MUpTempNavMenuModalPage open={navOpen} setOpen={setNavOpen} data={basicData || {}} type="footer" />
        <Loading open={isLoading} />
        {/* <SetupTempNavModalPage open={navOpen} setOpen={setNavOpen} data={langList || []} />
        <SetupTempFooterModalPage open={footerOpen} setOpen={setFooterOpen} data={footerData || {}} /> */}

    </>)
}

{/* 
      {
                                        activeImpLink?.map((d, i) => <CheckboxLabel id={"imp_" + d.id} key={i} checked={+d.show} onClick={(e) =>handleLNCheck(e.target.id)} label={d.name} labelcolor="font" size={"md"} />)
                                    }

    
     {
                                        activeSupportList?.map((d, i) => <CheckboxLabel id={"spp_" + d.id} key={i} checked={+d.show} onClick={(e) =>handleSPCheck(e.target.id)} label={d.name} labelcolor="font" size={"md"} />)
                                    }
    */}