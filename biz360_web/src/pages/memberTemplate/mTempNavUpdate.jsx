
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { daysLeftCount, getTextToImage, getValueByLang } from "../../utils/helper";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { StyledTempNavbar, StyledTempNavbarLI, StyledTempNavbarUL } from "../../component/style/styled_temp_navbar";
import { TempNavMenu } from "../../layout/layout_temp_nav_menu";
import { NavLink } from "react-router-dom";
import { KDImg } from "../../component/style/styled_img";
import { Typography } from "../../component/style/styled_typography";
import { SizeBox } from "../../component/style/styled_sizebox";
import { loadPage } from "../../features/page/page_slice";
import UnAuthorized from "../UnAuthorized";
import { Loading } from "../../component/Loading";
import DataGrid from "../../component/DataGrid";
import { MUpTempNavMenuModalPage } from "./mTempNavMenuModal";
import { Toast } from "../../component/Toast";
import { initLoader, loadMTempHeaderData, saveMTempMenuNameData } from "./inv_biz_temp_hd_slice";
import { NotNetwork } from "../NoNetwork";
import { KDTable, KDTDw, KDTHDw, KDTRw } from "../../component/style/styled_kdrl_table";
import { Input } from "../../component/style/styled_input";
import { Checkbox } from "../../component/Checkbox";
import { KDRLTableGrid } from "../../component/KDRLTable/KDRLTableData";
import { PrimaryButton } from "../../component/style/styled_button";
import { Center } from "../../component/style/styled_center";
import { saveMTempFTMenuData } from "./inv_biz_temp_ft_slice";

export const MUpdateTempNavPage = () => {
    const invBizTempHDData = useSelector((state) => state.invbiztemphddata);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [logo, set_logo] = useState(null);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const tempimg = getTextToImage({ width: 100, height: 50, text: "Logo" });
    const [basicData, setBasicData] = useState({});
    const [navOpen, setNavOpen] = useState(false);
    const [basicInfo, setBasicInfo] = useState({});
    const [menuData, setMenuData] = useState([]);
    const [headerInfo, setHeaderInfo] = useState({});
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [daysLeft, setDaysLeft] = useState(-1);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        dispatch(loadPage({ title: 'Header Content' }));
    }, []);

     useEffect(() => {
            setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
        }, [userData?.dashboard]);

    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
    }, [userData]);

    useEffect(() => {
        setHeaderInfo(invBizTempHDData?.headerData || {});
    }, [invBizTempHDData?.headerData]);

    useEffect(() => {
        if (basicInfo.group_id > 0) {
            dispatch(loadMTempHeaderData({ group_id: basicInfo.group_id }));
        }
    }, [basicInfo]);

    useEffect(() => {
        setMenuData(invBizTempHDData?.menuList?.map((d) => ({ ...d, menu_name: d.user_menu_name || d.menu_name })))
        setRowData(invBizTempHDData?.menuList?.map((d, i) => ({ ...d, "sl": i + 1, group_id: basicInfo?.group_id || 0, menu_name_en: getValueByLang(d?.user_menu_name || "{}", "en"), menu_name_bn: getValueByLang(d?.user_menu_name || "{}", "bn"), menu_name_value: getValueByLang(d?.menu_name || "{}"), })));
    }, [invBizTempHDData?.menuList]);


    useEffect(() => {
        invBizTempHDData.loading == "pending" ? setIsLoading(true) : invBizTempHDData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempHDData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempHDData.loading]);

    const colums = [
        {
            title: "#",
            width: "80px",
            field: "sl"
        },
        {
            title: "suggested_title",
            field: "menu_name_value",
            width: "auto",
            type: "string"
        },
        {
            title: "display_title_en",
            width: "auto",
            field: "menu_name_en",
            type: "input"
        },
        {
            title: "display_title_bn",
            field: "menu_name_bn",
            width: "auto",
            type: "input"
        },
        {
            title: "visible",
            field: "visible",
            width: "auto",
            type: "checkbox"
        },
    ];


    useEffect(() => {
        if (invBizTempHDData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (invBizTempHDData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            if (basicInfo.group_id > 0) {
                dispatch(loadMTempHeaderData({ group_id: basicInfo.group_id }));
            }
            setTimeout(() => {
                dispatch(initLoader());
            }, 4000);
        } else if (invBizTempHDData.addUpdateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (invBizTempHDData.addUpdateLoading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (invBizTempHDData.addUpdateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [invBizTempHDData.addUpdateLoading]);


    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(invBizTempHDData.addUpdateLoading == "idle" || invBizTempHDData.addUpdateLoading == "pending") ? <></> : (
            invBizTempHDData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempHDData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempHDData.msg} />
            )
        )}
        <Suspense>
            <Flex row="true">
                <Flex padding={"5px !important"} md={12}>
                    <InfoCard background="primaryHover">
                        <Typography fntsize="cardTitleFontSize">{t("Preview", { lng: menuLang })}</Typography>
                        <SizeBox height="8px" />
                        <ShadowCard>
                            <StyledTempNavbar>
                                <div>
                                    <StyledTempNavbarUL>
                                        <NavLink><KDImg padding="5px 0" width={"70px"} height={"40px"} src={headerInfo?.logo || tempimg} onError={(e) => e.currentTarget.src = tempimg} noborder="true" /></NavLink>
                                    </StyledTempNavbarUL>
                                    <StyledTempNavbarUL>
                                        {menuData?.map((item, i) => (
                                            <TempNavMenu key={i} item={item} devs="true" />
                                        ))}

                                    </StyledTempNavbarUL>
                                </div>
                                <div>
                                    {/* <StyledTempNavbarUL>
                                        {invBizTempHDData?.langList?.length > 0 ? <StyledTempNavbarLI>
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
                                                    invBizTempHDData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                                }
                                            </select>
                                        </StyledTempNavbarLI> : <></>}
                                    </StyledTempNavbarUL> */}
                                </div>
                            </StyledTempNavbar>
                        </ShadowCard>
                    </InfoCard>
                </Flex>
                <Flex md={12} sm={8} xs={12} padding="0 !important">
                    <KDRLTableGrid colums={colums} rows={rowData} setRows={setRowData} />
                </Flex>
                <Flex md={12} sm={12} xs={12}padding="0 !important">
                    <Center>
                        <PrimaryButton
                            type="button"
                            disabled={daysLeft<0}
                            onClick={daysLeft<0? null : () => {
                                var datad = {};
                                datad.group_id = basicInfo.group_id || 0;
                                datad.template_menu = rowData.map((d) => ({ menu_id: d.menu_id, visible: d.visible, user_menu_name: JSON.stringify({ en: d.menu_name_en || JSON.parse(d.menu_name)["en"], bn: d.menu_name_bn || JSON.parse(d.menu_name)["bn"] }) }));
                                dispatch(saveMTempMenuNameData(datad));
                            }}
                        >
                            {t("Update")}
                        </PrimaryButton>
                    </Center>
                </Flex>
            </Flex>
        </Suspense>
        <MUpTempNavMenuModalPage open={navOpen} setOpen={setNavOpen} data={basicData || {}} type="header" />
        <Loading open={isLoading} />
    </>)
}