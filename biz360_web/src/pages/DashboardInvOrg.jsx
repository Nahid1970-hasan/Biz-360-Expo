import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import { GL, Typography } from "../component/style/styled_typography";
import { useTranslation } from "react-i18next";
import { copyText, daysLeftCount, formatGridDate, getTextToImage, getValueByLang, langs, numberWithCommas } from "../utils/helper";
import { Card, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { KDImg } from "../component/style/styled_img";
import { loadPage } from "../features/page/page_slice";
import { HLLabel, Label } from "../component/style/styled_label";
import { ALinkButton, DownloadButton, PrimaryButton } from "../component/style/styled_button";
import { Link, useNavigate } from "react-router-dom";
import { initLoader, saveSelectedMTempData } from "./memberTemplate/inv_biz_temp_slice";
import { Loading } from "../component/Loading";
import { Toast } from "../component/Toast";
import UnAuthorized from "./UnAuthorized";
import { updateDashboard } from "../features/user/user_slice";
import { NotNetwork } from "./NoNetwork";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import { initReLoader, refreshOrderData } from "./memberOrder/member_temp_order_slice";
import { IconButton } from "../component/IconButton";
import { config } from "../config/config";
import { DateTime } from "luxon";
import { loadDashboardData } from "../features/dashboard/dashboard_Slice";
import { LabelTextItem } from "../component/LabelTextItem";
import DataGrid from "../component/DataGrid";
import guidlines from "../assets/website-guideline/web-content-icon-biz360expo.png"
import { Center } from "../component/style/styled_center";
import { SizeBox } from "../component/style/styled_sizebox";
import { GuidelineModal } from "./GuidelineModal";
import see_more from "../assets/small-icon/read-more-icon-biz360expo.png";
import { MemSubsDetailsModalPage } from "./MemberSubDetailsModal";

export const IndOrgDashboardPage = () => {
    const user = useSelector((state) => state.user);
    const invBizTempData = useSelector((state) => state.invbiztempdata);
    const mOrderData = useSelector((state) => state.memberorderdata);
    const mmDashboardData = useSelector((state) => state.memberdashboarddata);
    const tempimg = getTextToImage({ width: 250, height: 200, text: "Image" });
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [basic_info, set_basic_info] = useState({});
    const [urlInfo, setUrlInfo] = useState({});
    const [tempList, setTempList] = useState([]);
    const [tempInfo, setTempInfo] = useState({});
    const [subsInfo, setSubsInfo] = useState({});
    const [subsPendingInfo, setSubsPendingInfo] = useState({});
    const [orderSummary, setOrderSummary] = useState([]);
    const [bizGroupData, setBizGroupData] = useState({});
    const [memStatus, setMemStatus] = useState("");
    const [daysLeft, setDaysLeft] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [msgText, setMsgText] = useState("");
    const [pageList, setPageList] = useState([]);
    const [invalidPage, setInvalidPage] = useState(true);
    const { HTTP, PUBURL } = config;
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);

    useEffect(() => {
        setOrderSummary([])
        dispatch(loadPage({
            title: 'dashboard',
            button: true,
            buttonText: 'refresh',
            onClick: () => {
                var dd = { "group_id": user?.basicInfo?.group_id };
                dispatch(loadDashboardData(dd));
            }
        }));
    }, []);

    useEffect(() => {
        setInvalidPage(!!(pageList?.find((d) => d == "orders") || ""));
    }, []);

    useEffect(() => {
        set_basic_info(user?.basicInfo || {});
    }, [user?.basicInfo]);

    useEffect(() => {
        setDaysLeft(daysLeftCount(user?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
        setTempList(user?.dashboard?.template_list || []);
        setTempInfo(user?.dashboard?.selected_template || {});
        setSubsInfo(user?.dashboard?.subscription || {});
        setPageList(user?.dashboard?.menu_list?.page_list || []);
        setInvalidPage(!!(user?.dashboard?.menu_list?.page_list?.find((d) => d == "orders") || ""));
        setSubsPendingInfo(user?.dashboard?.pending_invoice || {})
        const items = user?.dashboard?.order_summary?.length > 0 ? [...user?.dashboard?.order_summary]?.sort((a, b) => a.id - b.id) : [];
        setOrderSummary(items);
        setBizGroupData(user?.dashboard?.biz_group?.length > 0 ? user?.dashboard?.biz_group[0] : {});
        setMemStatus(user?.dashboard?.status)
    }, [user?.dashboard]);


    function handleUpdate(id) {
        nevigate("/app/intheader")
    }

    function handleOrder() {
        nevigate("/app/orders")
    }
    function refeshOrder() {
        dispatch(refreshOrderData())
    }

    function handlePreview(id) {
        window.open(HTTP + PUBURL + id, "_blank")
    }

    function handleDemo(id) {
        window.open(HTTP + PUBURL + id, "_blank")
    }

    useEffect(() => {
        invBizTempData.loading == "pending" ? setIsLoading(true) : invBizTempData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempData.loading]);

    useEffect(() => {
        if (mmDashboardData.loading == "pending") {
            setIsLoading(true)
        } else if (mmDashboardData.loading == "succeeded") {
            dispatch(updateDashboard(mmDashboardData?.data || {}));
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (mmDashboardData.loading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (mmDashboardData.loading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (mmDashboardData.loading != "idle") {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }
    }, [mmDashboardData.loading]);


    useEffect(() => {
        if (mOrderData.reLoading == "pending") {
            setIsLoading(true)
        } else if (mOrderData.reLoading == "succeeded") {
            const items = mOrderData?.rList?.length > 0 ? [...mOrderData?.rList]?.sort((a, b) => a.id - b.id) : [];
            setOrderSummary(items);
            setTimeout(() => { dispatch(initReLoader()); setIsLoading(false); }, 4000);
        } else {
            setTimeout(() => { dispatch(initReLoader()); setIsLoading(false); }, 4000);
        }
    }, [mOrderData.reLoading]);


    useEffect(() => {
        if (invBizTempData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (invBizTempData.addUpdateLoading == "succeeded") {
            dispatch(updateDashboard(invBizTempData?.userData || {}));
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (invBizTempData.addUpdateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempData.addUpdateLoading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (invBizTempData.addUpdateLoading != "idle") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 5000);
        }
    }, [invBizTempData.addUpdateLoading]);


    const odcolums = [
        {
            headerName: "ID",
            field: "id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("status"),
            field: "delivery_status",
            description: "status",
            type: "string",
            sortable: false,
            width: "100px"
        },
        {
            headerName: ("order"),
            field: "order_count",
            description: "order",
            alignment: "center",
            sortable: false,
            type: "string",
            width: "100px"
        },
        {
            headerName: ("amount"),
            field: "odamount",
            description: "amount",
            sortable: false,
            type: "number",
        },
    ];

    const orderData = orderSummary?.map((d, i) => ({
        ...d,
        "odamount": numberWithCommas(d?.order_total_price || 0),
    })) || [];

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> :
        <>
            {(invBizTempData.addUpdateLoading == "idle" || invBizTempData.addUpdateLoading == "pending") ? <></> : (
                invBizTempData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={invBizTempData.msg} color="success" />
                ) : (
                    <Toast color="error" msg={invBizTempData.msg} />
                )
            )}
            {
                msgText && <Toast msg={msgText} hidebar="true" color="success" />
            }
            <Suspense>
                {/* {
                    subsPendingInfo?.due_amount > 0 ? <Flex row="row">
                        <Flex md={11.99} padding="0">
                            <InfoCard padding="2px 5px" background="error">
                                <InlineDiv justifycontent="center">
                                    <Typography txtalign="center" color="primaryFont">{"You have chosen "} {getValueByLang(subsPendingInfo?.sn_name || "{}")}</Typography>
                                    <ALinkButton onClick={() => { nevigate("/app/ininv") }} margin="4px 0" fntsize="smFont">{t("pay_now")}</ALinkButton>
                                </InlineDiv>
                            </InfoCard>
                        </Flex>
                    </Flex> : <></>
                } */}

                {/* <Flex row="row">
                    {invalidPage ?
                        <Flex md={11.99}>
                            <ShadowCard>
                                <Flex row="true">
                                    {
                                        orderSummary?.map((d, i) => <Flex md={3} sm={6} xs={12} key={i} >
                                            <HLLabel fntweight="bold" txtalign="center" bgcolor={d?.color || "booked"}>
                                                {d?.delivery_status || "Status " + (i + 1)}
                                            </HLLabel>
                                            <InlineFlex>
                                                <Typography margin="5px 10px" fntweight="bold" txtalign="left" fntsize="cardSubTitleFontSize">{t("orders")}{":"} {d?.order_count || 0} </Typography>
                                                <Typography margin="5px 10px" fntweight="bold" txtalign="left" fntsize="cardSubTitleFontSize">{t("amount")}{":"} &#x9F3; {d?.order_total_price || 0} </Typography>
                                            </InlineFlex>
                                        </Flex>)
                                    }
                                    <Flex md={11.99} >
                                        <InlineFlex justifycontent="right" >
                                            <DownloadButton onClick={() => refeshOrder()}>Refresh</DownloadButton>
                                            <DownloadButton onClick={() => handleOrder()}>See Orders</DownloadButton>
                                        </InlineFlex>
                                    </Flex>
                                </Flex>
                            </ShadowCard>
                        </Flex> : <></>}


                </Flex> */}
                <Flex row="row">
                    <Flex md={4} padding="0 !important" sm={4} xs={12} >
                        <InfoCard height="100%">
                            <Flex row="row">
                                <Flex md={12} padding="0 0 5px 0!important">
                                    <HLLabel fntweight="bold" txtalign="center">
                                        {t("member_profile")}
                                    </HLLabel>
                                </Flex>
                                <Flex md={12} padding="0 0 5px 0!important">
                                    {basic_info?.biz_name && <LabelTextItem title={t("biz_name")} width="134px" lblback={"bg"} lblcolor={"font"} txtval={(basic_info?.biz_name || " ")} />}
                                    <div><LabelTextItem title={t("member_type")} width="134px" lblback={"bg"} lblcolor={"font"} txtval={(basic_info?.user_type == "BIZ" ? t("commercial") : basic_info?.user_type == "IND" ? t('individual') : "---")} /></div>
                                    <div> <LabelTextItem title={t("trade_type")} width="134px" lblback={"bg"} lblcolor={"font"} txtval={(basic_info?.seasonal_trader == "No" ? t("regular") : t("seasonal_occasional"))} /></div>
                                    <div> <LabelTextItem title={t("feildof_member")} lblback={"bg"} lblcolor={"font"} width={"134px"} txtval={getValueByLang(bizGroupData?.group_codename || "{}")} /></div>
                                    <div> <LabelTextItem title={t("field_detail")} lblback={"bg"} lblcolor={"font"} width={"134px"} txtonClick={() => setView(true)} buttontext={t("show_details")} /></div>

                                    <div> <LabelTextItem title={t("web_lang")} width="134px" lblback={"bg"} lblcolor={"font"} txtval={(langs[basic_info?.default_lang || "en"].nativeName || " ")} /></div>
                                    <SizeBox height="5px" />
                                    <div> <LabelTextItem title={t("member_status")} width="134px" lblback={"bg"} lblcolor={"font"} chilpcolor={memStatus == "Approved" ? "success" : "error"} txtval={(memStatus || " ")} /></div>

                                    <div> <LabelTextItem title={t("web_address")} width="134px" lblback={"bg"} lblcolor={"font"} txtval={(" ")} /></div>
                                    <Typography txtalign="left" >
                                        {PUBURL + (subsInfo.user_url ? (subsInfo?.user_url || "") : (subsInfo?.hash_url || " "))}
                                        {" "} {" "}
                                        <IconButton bgcolor="modalHeader" onClick={() => {
                                            copyText(HTTP + PUBURL + (subsInfo.user_url ? (subsInfo.user_url || "") : (subsInfo?.hash_url || " ")))
                                            setMsgText("Copied");
                                            setTimeout(() => { setMsgText(""); }, 2000);
                                        }} style={{ margin: "0 5px" }}><span className="material-icons md-15">content_copy</span></IconButton>

                                    </Typography>
                                </Flex>

                            </Flex>
                        </InfoCard>
                    </Flex>
                    <Flex md={4} padding="0 10px !important" sm={4} xs={12}>
                        <InfoCard height={"100%"}>
                            <Flex row="row">
                                <Flex md={12} sm={12} xs={12} padding="0 0 5px 0!important">
                                    <HLLabel fntweight="bold" txtalign="center">
                                        {t("membership_information")}
                                    </HLLabel>
                                </Flex>
                                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                    <div> <LabelTextItem title={t("membership")} lblback={"bg"} lblcolor={"font"} width={"95px"} txtval={(getValueByLang(subsInfo?.sn_name || "{ }")) + " - " + (getValueByLang(subsInfo?.sn_desc || "{ }"))} /></div>
                                    <div> <LabelTextItem title={t("sn_start_date")} lblback={"bg"} lblcolor={"font"} width={"95px"} txtval={(subsInfo?.sn_start_date ? formatGridDate(subsInfo?.sn_start_date) : "")} /></div>
                                    <div> <LabelTextItem title={t("sn_expiry_date")} lblback={"bg"} lblcolor={daysLeft < 0 ? "error" : "font"} width={"95px"} txtval={(subsInfo?.sn_expiry_date ? formatGridDate(subsInfo?.sn_expiry_date, "time") + (daysLeft < 0 ? " (" + t("expired") + ")" : "") : " ")} /></div>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>
                    {<Flex md={4} padding="0 !important" sm={4} xs={12}>
                        <InfoCard height={"100%"}>
                            <Flex row="row">
                                <Flex md={12} sm={12} xs={12} padding="0 0 5px 0!important">
                                    <HLLabel fntweight="bold" txtalign="center">
                                        {t("guidelines")}
                                    </HLLabel>
                                </Flex>
                                <Flex md={12} sm={12} xs={12} padding="0 !important">
                                    <Center><KDImg height={"200px"} src={guidlines} onError={(e) => e.currentTarget.src = tempimg} />
                                        <Center>
                                            <Typography margin="10px 0 0 0" fntweight="bold" onClick={() => setOpen(true)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                }}>
                                                <a> <GL> {t("see_more")}</GL>
                                                    <KDImg
                                                        src={see_more}
                                                        height={"auto"}
                                                        width={"auto"}
                                                        noborder="true"
                                                    /></a>
                                            </Typography>
                                        </Center>
                                    </Center>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </Flex>}
                </Flex>
                <Flex row="row">
                    {tempInfo?.template_id > 0 ? <Flex md={12} sm={12} xs={12}>
                        <Flex row="row">
                            <Flex md={8} padding="0 10px 0 0 !important" sm={6} xs={12}>
                                <InfoCard>
                                    <Flex row="row">
                                        <Flex md={12} sm={12} xs={12} padding="0 0 5px 0!important">
                                            <HLLabel fntweight="bold" txtalign="center">
                                                {t("selected_template")}
                                            </HLLabel>
                                        </Flex>
                                        <Flex md={6}>
                                            <InfoCard padding="4px">
                                                <KDImg height={"200px"} width={"100%"} noborder="true" src={tempInfo?.template_image || tempimg} onError={(e) => e.currentTarget.src = tempimg} />
                                            </InfoCard>
                                        </Flex>
                                        <Flex md={6}>
                                            {/* <Label margin="0">{tempInfo?.template_name}</Label> */}
                                            <Label margin="0">{getValueByLang(tempInfo?.template_desc || "{}")}</Label>
                                            <CardHeaderButton start="true" top="10px">
                                                <PrimaryButton disabled={daysLeft < 0} onClick={() => daysLeft < 0 ? null : handleUpdate(tempInfo?.template_id)}>{t('customize')}</PrimaryButton>
                                                <PrimaryButton onClick={() => handlePreview(subsInfo?.user_url ? subsInfo?.user_url : subsInfo?.hash_url || " ")} >{t('preview')}</PrimaryButton>
                                            </CardHeaderButton>
                                        </Flex>
                                    </Flex>
                                </InfoCard>
                            </Flex>
                            <Flex md={4} padding="0 !important" sm={6} xs={12}>
                                <InfoCard height={"100%"}>
                                    <Flex row="row">
                                        <Flex md={12} sm={12} xs={12} padding="0 0 5px 0!important">
                                            <HLLabel fntweight="bold" txtalign="center">
                                                {t("order_detail")}
                                            </HLLabel>
                                        </Flex>
                                        <Flex padding="0 !important" md={12} sm={12} xs={12}>
                                            <DataGrid colums={odcolums} rows={orderData || []} />
                                        </Flex>
                                        <Flex md={11.99} padding="0 !important" >
                                            <InlineFlex justifycontent="end">
                                                {/* <DownloadButton onClick={() => refeshOrder()}>{t("refresh")}</DownloadButton> */}
                                                <DownloadButton disabled={daysLeft < 0} onClick={() => daysLeft < 0 ? null : handleOrder()}>{t("view_details")}</DownloadButton>
                                            </InlineFlex>
                                        </Flex>
                                    </Flex>
                                </InfoCard>
                            </Flex>

                        </Flex>
                    </Flex> : <></>}
                    {tempList?.length > 0 ?
                        <Flex md={11.99}>
                            <InfoCard>
                                <Flex row="row">
                                    {
                                        tempList.map((d, i) =>
                                            <Flex key={i} md={4}>
                                                <InfoCard  >
                                                    <KDImg height={"200px"} width={"100%"} noborder="true" src={d.template_image||tempimg} onError={(e) => e.currentTarget.src = tempimg} />
                                                    {/* <Label margin="0">{d.template_name || ""}</Label> */}
                                                    <Label margin="0">{getValueByLang(d.template_desc || "{}")}</Label>
                                                    <CardHeaderButton top="10px">
                                                        <PrimaryButton onClick={() => { dispatch(saveSelectedMTempData({ "template_id": d.template_id, "group_id": basic_info?.group_id || 0 },)) }}>{t('select_template')}</PrimaryButton>
                                                        <PrimaryButton onClick={() => { handleDemo("demo") }} >{t('demo')}</PrimaryButton>
                                                    </CardHeaderButton>
                                                </InfoCard>
                                            </Flex>)
                                    }
                                </Flex>
                            </InfoCard>
                        </Flex> : <></>
                    }
                </Flex>
            </Suspense>
            <GuidelineModal open={open} setOpen={setOpen} />
            <MemSubsDetailsModalPage open={view} setOpen={setView} data={bizGroupData} />
            <Loading open={isLoading} />
        </>
    );
};