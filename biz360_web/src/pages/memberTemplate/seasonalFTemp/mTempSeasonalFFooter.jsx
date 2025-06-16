
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../../../component/style/styled_flex";
import { InfoCard, ShadowCard } from "../../../component/style/styled_card";
import { Typography } from "../../../component/style/styled_typography";
import { HLLabel, Label } from "../../../component/style/styled_label";
import { Input } from "../../../component/style/styled_input";
import { SizeBox } from "../../../component/style/styled_sizebox";
import { CheckboxChildren, CheckboxLabel, CheckboxLabelInput, CheckboxLabelTable, CheckboxRowLabelInput } from "../../../component/Checkbox";
import { daysLeftCount, getCurrentYear, getValueByLang, SOCIALLINK } from "../../../utils/helper";
import { Center } from "../../../component/style/styled_center";
import { PrimaryButton } from "../../../component/style/styled_button";
import { loadMTempFooterData, saveMTempFooterData, initLoader } from "../inv_biz_temp_ft_slice";
import { Loading } from "../../../component/Loading";
import UnAuthorized from "../../UnAuthorized";
import { NotNetwork } from "../../NoNetwork";
import { Toast } from "../../../component/Toast";
import * as feather from "feather-icons/dist/feather.min";
import { FooterStyled } from "../../../component/style/styled_footer";
import { FooterMenu } from "../../../layout/footer";
import { Icon } from "../../../component/style/styled_icon";

export const MUpdateTempSeasonalFFooterPage = () => {
    const invBizTempFTData = useSelector((state) => state.invbiztempftdata);
    const userData = useSelector((state) => state.user);
    const [tempInfo, setTempInfo] = useState({});
    const [tempid, set_tempid] = useState(0);
    const [basicInfo, setBasicInfo] = useState({});
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [footerData, setFooterData] = useState({});
    const [activeSocial, setActiveSocial] = useState([]);
    const [activeSupport, setActiveSupport] = useState([]);
    const [activeImpLinks, setActiveImpLinksl] = useState([]);

    const [scShowList, setSCShowList] = useState([]);
    const [spShowList, setSPShowList] = useState([]);
    const [lnShowList, setLNShowList] = useState([]);

    const [support_title, set_support_title] = useState("");
    const [imp_link_title, set_imp_link_title] = useState("");
    const [scl_link_title, set_scl_link_title] = useState("");
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [daysLeft, setDaysLeft] = useState(-1);
    const SCLINK = [{
        "icon_id": 1,
        "status": "Active",
        "name": "Facebook",
        "icon": "facebook",
        "hvcolor": "white",
        "hvback": "blue",
        "color": "black",
        "hover": "true",
        "type": "icon",
        "link": "https://www.facebook.com",
    },

    {
        "icon_id": 3,
        "status": "Active",
        "name": "YouTube",
        "icon": "youtube",
        "color": "white",
        "hvcolor": "red",
        "hvback": "red",
        "hover": "true",
        "type": "icon",
        "link": "https://www.youtube.com/",
    },
    {
        "icon_id": 5,
        "status": "Active",
        "name": "WhatsApp",
        "icon": "whatsapp",
        "color": "black",
        "hvcolor": "white",
        "hvback": "green",
        "hover": "true",
        "type": "file",
        "link": "https://www.google.com/search?q=biz360expo.com",
    }]
    const IMPOLINK = [
        {
            "id": 1,
            "status": "Active",
            "readonly": true,
            "show": true,
            "title": "Biz 360 Expo",
            "link": "http://biz360expo.com/",
        },
        {
            "id": 2,
            "status": "Active",
            "readonly": true,
            "show": true,
            "title": "Member Admin",
            "link": "http://member.biz360expo.com/",
        },
        {
            "id": 3,
            "status": "Active",
            "readonly": false,
            "show": false,
            "page_name":"faqs",
            "title": "FAQs",
            "link": "",
        },
        {
            "id": 4,
            "status": "Active",
            "readonly": false,
            "show": false,
            "page_name":"termscon", 
            "title": "Terms & Condition",
            "link": "",
        },
    ]
    const SPPLINK = [
        {
            "id": 1,
            "status": "Active",
            "type": "mobile",
            "readonly": true,
            "show": true,
            "name": "Mobile",
            "name_en": "",
        },
        {
            "id": 3,
            "status": "Active",
            "type": "email",
            "readonly": false,
            "show": true,
            "name": "Email",
            "name_en": "",
        },
        {
            "id": 5,
            "status": "Active",
            "type": "present_address",
            "show": true,
            "readonly": false,
            "name": "Address",
            "name_en": "",
        }
    ]
    useEffect(() => {
        dispatch(loadMTempFooterData({}));
        setActiveSocial(SCLINK);
        setActiveImpLinksl(IMPOLINK);
        setActiveSupport(SPPLINK);
    }, []);

    useEffect(() => {
        setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
    }, [userData?.dashboard]);
    
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
        var infoData = JSON.parse(invBizTempFTData?.footerData || "{}"); 
        setFooterData(infoData || {});
        set_support_title(infoData?.support?.title || "");
        set_imp_link_title(infoData?.important_link?.title || "");
        set_scl_link_title(infoData?.social_media?.title || "")

        setActiveImpLinksl(infoData?.important_link?.datalist?.filter((b) => b.status == "Active") || IMPOLINK);
        setActiveSupport(infoData?.support?.datalist?.filter((b) => b.status == "Active")?.map((d)=>({...d, show: d.type=="mobile"?true:d.show, item_value: d.name_en || ""} )) || SPPLINK);
        setActiveSocial(infoData?.social_media?.datalist?.filter((b) => b.status == "Active") || SCLINK);

        setLNShowList(infoData?.important_link?.datalist?.filter((b) => +b.show == 1) || []);
        setSPShowList(infoData?.support?.datalist?.filter((b) => +b.show == 1));
        setSCShowList(infoData?.social_media?.datalist?.filter((b) => +b.show == 1));
        setTimeout(() => { feather.replace(); }, 900);
    }, [invBizTempFTData.footerData]);

    useEffect(() => {
        if (invBizTempFTData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (invBizTempFTData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                dispatch(initLoader());
                setIsLoading(false);
                dispatch(loadMTempFooterData({}));
            }, 4000);
        } else if (invBizTempFTData.addUpdateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempFTData.addUpdateLoading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempFTData.addUpdateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [invBizTempFTData.addUpdateLoading]);

    useEffect(() => {
        if (invBizTempFTData.loading == "pending") {
            setIsLoading(true)
        } else if (invBizTempFTData.loading == "succeeded") {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else if (invBizTempFTData.loading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (invBizTempFTData.loading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (invBizTempFTData.loading == "failed") {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }
    }, [invBizTempFTData.loading]);

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(invBizTempFTData.addUpdateLoading == "idle" || invBizTempFTData.addUpdateLoading == "pending") ? <></> : (
            invBizTempFTData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempFTData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempFTData.msg} />
            )
        )}
        <Suspense>
            <Flex padding={"5px !important"} md={12}>
                <InfoCard background="primaryHover">
                    <Typography fntsize="cardTitleFontSize">{t("preview")}</Typography>
                    <SizeBox height="8px" />
                    <ShadowCard>
                        <FooterStyled color="font">
                            <Flex row="row">
                                <Flex padding="10px 0 0 0 !important" md={3}>
                                    <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        {footerData?.support?.title || t("support")}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        spShowList?.map((d, i) => <div key={i}>
                                            {d.type == "biz_mobile" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                <FooterMenu><a>{d?.name_en ? d?.name_en : t("mobile" + (i + 1))}</a> </FooterMenu>
                                            </Typography> : d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                <FooterMenu><a>{d?.name_en ? d?.name_en : t("mobile" + (i + 1))}</a> </FooterMenu>
                                            </Typography> : d.type == "biz_email" ?
                                                <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                    <FooterMenu><a >{d?.name_en ? d?.name_en : t("email" + (i + 1))}</a></FooterMenu>
                                                </Typography> : d.type == "email" ?
                                                    <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                        <FooterMenu><a >{d?.email ? d?.email : d?.name_en ? d?.name_en : t("email" + (i + 1))}</a></FooterMenu>
                                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                        <FooterMenu> {d?.name_en ? d?.name_en : t("others_info")}</FooterMenu>
                                                    </Typography>}
                                        </div>)
                                    }
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={3}>
                                    <Typography margin="0 0 0 10px" fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        {footerData?.important_link?.title || t("links")}
                                    </Typography>
                                    <SizeBox />
                                    {
                                        lnShowList?.map((d, i) =>
                                            <Typography key={i} fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                                <FooterMenu><a href={d?.link || "#"} target="_blank"><label>{d?.title || "---"}</label></a></FooterMenu>
                                            </Typography>
                                        )
                                    }
                                </Flex>
                                <Flex padding="10px 0 0 0 !important" md={6}>
                                    <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"}>
                                        {footerData?.social_media?.title || t("follow_us")}
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
                                         All Rights Reserved to Biz 360 Expo
                                    </Typography>
                                </Flex>
                            </Flex>
                        </FooterStyled>
                    </ShadowCard>
                </InfoCard>
            </Flex>
            <InfoCard>
                <Flex row="row">
                    <Flex md={1.5} padding="0">
                        <Typography txtalign="left" fntweight="bold">{t("footer_title")}</Typography>
                        <HLLabel fntweight="bold" padding={"5px 0"} bgcolor="infoCardContent" color="font">{t("suggested_title")}</HLLabel>
                        <HLLabel fntweight="bold" padding={"5px 0"} bgcolor="infoCardContent" color="font">{t("display_title")}</HLLabel>
                    </Flex>
                    <Flex md={4} padding="0">
                        <Typography txtalign="left" fntweight="bold">{t("customer_support_title")}</Typography>
                        <HLLabel bgcolor="girdHeaderalter" color="font">{t("support")}</HLLabel>
                        <Input
                            app="app"
                            name="support_title_en"
                            value={support_title || ""}
                            placeholder={t("not_set")}
                            onChange={(e) => set_support_title(e.target.value)} />
                    </Flex>
                    <Flex md={2.5} padding="0">
                        <Typography txtalign="left" fntweight="bold">{t("other_links")}</Typography>
                        <HLLabel bgcolor="girdHeaderalter" color="font">{t("links")}</HLLabel>
                        <Input
                            app="app"
                            name="other_links_title_en"
                            value={imp_link_title || ""}
                            placeholder={t("not_set")}
                            onChange={(e) => set_imp_link_title(e.target.value)} />
                    </Flex>
                    <Flex md={4} padding="0">
                        <Typography txtalign="left" fntweight="bold">{t("social_media_links")}</Typography>
                        <HLLabel bgcolor="girdHeaderalter" color="font">{t("connect_us")}</HLLabel>
                        <Input
                            app="app"
                            name="social_title_en"
                            value={scl_link_title || ""}
                            placeholder={t("not_set")}
                            onChange={(e) => set_scl_link_title(e.target.value)} />
                    </Flex>
                </Flex>
                <SizeBox />
                <Flex row="row">
                    <Flex md={1.5} padding="0">
                    </Flex>
                    <Flex md={4} padding="0">
                        <CheckboxLabelInput datalist={activeSupport || []} background="infoCardContent" height={"auto"} setDataList={setActiveSupport} />
                    </Flex>
                    <Flex md={2.5} padding="0">
                        <CheckboxLabelTable datalist={activeImpLinks || []} setDataList={setActiveImpLinksl} />
                    </Flex>
                    <Flex md={4} padding="0">
                        <CheckboxLabelInput datalist={activeSocial || []} background="infoCardContent" height={"auto"} setDataList={setActiveSocial} />
                    </Flex>
                </Flex>
                <Flex row="row">
                    <Flex md={12} sm={12} xs={12} padding="0 !important">
                        <Center>
                            <PrimaryButton
                                type="button"
                                 disabled={daysLeft<0}
                                onClick={daysLeft<0? null : () => {
                                    var data = {
                                        "support": {
                                            "title": support_title || t("support"),
                                            "datalist": activeSupport.map((d) => ({ ...d, name_en: d?.item_value || "" })) || []
                                        },
                                        "important_link": {
                                            "title": imp_link_title || t("links"),
                                            "datalist": activeImpLinks || []
                                        },
                                        "social_media": {
                                            "title": scl_link_title || t("connect_us"),
                                            "datalist": activeSocial.map((d) => ({ ...d, link: d?.item_value || "" })) || []
                                        }
                                    }
                                     
                                  dispatch(saveMTempFooterData({ "template_id": tempid, "template_footer": JSON.stringify(data) }));

                                }}
                            >
                                {t("Update")}
                            </PrimaryButton>
                        </Center>
                    </Flex>
                </Flex>
            </InfoCard>
        </Suspense>
        <Loading open={isLoading} />
    </>)
}