import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Typography, ULine } from "../component/style/styled_typography";
import { PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { copyText, formatGridDate, getBNFont, getValueByLang, langs } from "../utils/helper";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import styled from "styled-components";
import { HLLabel, Label } from "../component/style/styled_label";
import { IconButton } from "../component/IconButton";
import { config } from "../config/config";
import logo from "../assets/1.jpg"
import { KDImg } from "../component/style/styled_img";
import { initLoader, loadSeasonalProfile } from "../features/profile/seasonal_profile_slice";
import { SubCPInfopage } from "./Profile/SubCPInfopage";
import { SubUserInfoPage } from "./Profile/SubUserInfo";
import { SizeBox } from "../component/style/styled_sizebox";
import { Center } from "../component/style/styled_center";
import { SubPhotoInfopage } from "../features/profile/SubPhotoInfopage";
import { initImgLoader } from "./memberTemplate/mmb_image_upload_slice";
import { InlineDiv } from "../component/style/styled_inlineflex";
import UnAuthorized from "./UnAuthorized";
import { Chip } from "../component/Chip";

export const CustTypography = styled.div`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  padding: 10px  8px;
  border-radius: 4px;
  display: flex;
  font-size: ${({ fntsize, ntresize, theme }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyContentFontSize'], "lng")};
  text-align:${({ txtalign }) => (txtalign ? txtalign : "center")};
  justify-content:${({ justify }) => (justify ? justify : "center")};
  transition: background 0.3s;
  margin-bottom: 0;  
  background: ${(props) => {
        if (props.active) return props.theme.colors.primaryActive;
        if (props.highlight === "hl_success") return props.theme.colors.hl_success;
        return "transparent";
    }}; 
  &:hover {
    background: ${({ theme }) =>theme.colors.primaryHover};
  }
  border-left: ${(props) =>
        props.highlight === "hl_success"
            ? `4px solid ${props.theme.colors.hl_success}`
            : "none"};

  color: ${(props) => props.theme.colors[props.color] || "inherit"};


`;
const CircleLogoWrapper = styled.div`
  width: 100px;  // Adjust size as needed
  height: 100px; // Must match width for perfect circle
  border-radius: 50%;
  overflow: hidden;
  padding:"0 20px";
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.colors.primary}; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const DemoProfilePage = () => {
    const user = useSelector((state) => state.seasonalprofile);
    const userinfo = useSelector((state) => state.user);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const dispatch = useDispatch();
    const [edituser, setEditUser] = useState(false);
    const [editcp1_info, setEditcp1_info] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [profile, setProfile] = useState(false);
    const [msgText, setMsgText] = useState("");
    const [url_active, set_url_active] = useState("user");
    const [basicInfo, setBasicInfo] = useState({});
    const [cpInfo, setCPInfo] = useState({});
    const [photoData, setPhotoData] = useState({});
    const [subsInfo, setSubsInfo] = useState({});
    const { PUBURL } = config;
    useEffect(() => {
        setIsLoading(true);
        dispatch(loadSeasonalProfile());
        dispatch(loadPage({
            title: "profile", button: false, buttonText: "update_profile",
        }))
    }, []);


    useEffect(() => {
        setBasicInfo(user?.profile?.user || {});
        setCPInfo(user?.profile?.cp_info || {});
        setSubsInfo(user?.profile?.subscription || {});
        setPhotoData(user?.profile?.photo || {})
    }, [user.profile]);

    const handleUserClick = () => {
        set_url_active("user");
    };

    const handleCustomer1Click = () => {
        set_url_active("cp_info");
    };


    const handleSubscriptionClick = () => {
        set_url_active("subscription");
    };
    const handleProfileClick = () => {
        set_url_active("profile");
    };



    useEffect(() => {
        user.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [user.loading]);

    useEffect(() => {
        if (mmImgUploadData.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmImgUploadData.imgUploading == "succeeded") {
            setTimeout(() => {
                dispatch(initImgLoader());
                setIsLoading(false);
                dispatch(loadSeasonalProfile());
            }, 4000);
        } else if (mmImgUploadData.imgUploading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (mmImgUploadData.imgUploading == "failed") {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        if (user.updateLoading == "pending") {
            setIsLoading(true)
        } else if (user.updateLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); dispatch(loadSeasonalProfile()); setIsLoading(false); }, 4000);
        } else if (user.updateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { setIsLoading(false); }, 4000);
        } else if (user.updateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [user.updateLoading]);

    return (isUnAuthorized ? <UnAuthorized /> : <>
        {(user.updateLoading == "idle" || user.updateLoading == "pending") ? <></> : (
            user.updateLoading == "succeeded" ? (
                <Toast msg={user.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={user.msg} />
            )
        )}
        {(mmImgUploadData.imgUploading == "idle" || mmImgUploadData.imgUploading == "pending") ? <></> : (
            mmImgUploadData.imgUploading == "succeeded" ? (
                <Toast msg={mmImgUploadData.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={mmImgUploadData.msg} />
            )
        )}
        {
            msgText && <Toast msg={msgText} hidebar="true" color="success" />
        }
        <CardBody>
            <Flex row="row">
                <Flex md={3} padding="0 !important" >
                    <InfoCard>
                        <CustTypography>
                            <CircleLogoWrapper>
                                <KDImg src={photoData?.logo? photoData?.logo :(photoData?.photo || logo)} alt="Logo" noborder="true" />
                            </CircleLogoWrapper>
                        </CustTypography>
                        <Typography fntsize="bodySubTitleFontSize" fntweight="bold">
                            {cpInfo?.fullname || "{}"}                            </Typography>
                        <Typography fntsize="bodySubTitleFontSize" fntweight="bold">
                            {cpInfo?.mobile || "{}"}  </Typography>
                        <InlineDiv>
                            <Typography margin="0 0 10px 0" fntsize="bodySubTitleFontSize" fntweight="bold">
                                {t("seasonal")}</Typography>
                            <Label margin="0"> {userinfo?.basicInfo?.seasonal_trader || t("no")}</Label>
                        </InlineDiv>
                        <ULine />   <SizeBox />
                        <CustTypography height="40px" active={url_active == "user" ? "true" : null} color="secondaryButton" type="button" onClick={handleUserClick} justify="left" >
                            {t("user")}
                        </CustTypography>

                        <CustTypography height="40px" color="secondaryButton" active={url_active == "cp_info" ? "true" : null} type="button" onClick={handleCustomer1Click} justify="left" >
                            {t("cp_info")}
                        </CustTypography>

                        <CustTypography height="40px" color="secondaryButton" active={url_active == "subscription" ? "true" : null} type="button" onClick={handleSubscriptionClick} justify="left" >
                            {t("subscription")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "profile" ? "true" : null} type="button" onClick={handleProfileClick} justify="left">
                            {t("photo")}
                        </CustTypography>
                    </InfoCard>

                </Flex>
                <Flex md={9} padding="0 10px!important">
                    <InfoCard>
                        {url_active == "user" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <CardHeaderButton>
                                        <PrimaryButton
                                            onClick={() => setEditUser(true)}>
                                            {t("update")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 9 20px 0!important" md={12} sm={12}>
                                                <Typography fntweight="bold" ntresize="true" fntsize="cardTitleFontSize" txtalign="left">
                                                    {t("user")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("group_name")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {getValueByLang(basicInfo?.group_name || "{}")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("def_lang")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {langs[basicInfo?.default_lang?.toLowerCase() || 'en'].nativeName}
                                                </Typography>



                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="0">
                                                    {t("status")}
                                                </Typography>
                                                <Chip label={basicInfo?.status || ""} color={basicInfo?.status?.toLowerCase() == "approved" ? "success" : "error"} />

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("url")}
                                                </Typography>
                                                <HLLabel width="auto">
                                                    {PUBURL}{"/#/"}
                                                    {basicInfo?.user_url ? (basicInfo?.user_url || "") : (basicInfo?.hash_url || " ")}
                                                    <IconButton
                                                        onClick={() => {
                                                            const textToCopy = PUBURL + "/#/" + (basicInfo?.user_url ? (basicInfo?.user_url || "") : (basicInfo?.hash_url || " "));
                                                            copyText(textToCopy);
                                                            setMsgText("Copied");
                                                            setTimeout(() => { setMsgText(""); }, 2000);
                                                        }}
                                                    >
                                                        <span className="material-icons md-15">content_copy</span>

                                                    </IconButton>

                                                </HLLabel>

                                            </Flex>
                                        </Flex>

                                    </InfoCard>
                                </Flex>

                            </Flex>
                        ) : <></>}

                        {url_active == "cp_info" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <CardHeaderButton>
                                        <PrimaryButton
                                            onClick={() => setEditcp1_info(true)}>
                                            {t("update")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                                <Flex md={12} padding="0 !important">
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography fntsize="cardTitleFontSize" txtalign="left" margin="0 0 10px 0" fntweight="bold">
                                                    {t("cp_info")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={12} padding="0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("biz_name")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(basicInfo?.biz_name || "")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("fullname")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(cpInfo?.fullname || "")}
                                                </Typography>



                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("mobile")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(cpInfo?.mobile || "")}
                                                </Typography>


                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("email")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(cpInfo?.email || " ")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("present_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(cpInfo?.present_address || "")}
                                                </Typography>


                                            </Flex>

                                        </Flex>

                                    </InfoCard>
                                </Flex>
                            </Flex>
                        ) : <></>}
                        {url_active == "subscription" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <InfoCard >
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography ntresize="true" fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                                    {t("subscription")}
                                                </Typography>
                                            </Flex>

                                        </Flex>

                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("sn_name")}                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {getValueByLang(subsInfo?.sn_name || "{ }")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("sn_start_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {subsInfo?.sn_start_date ? formatGridDate(subsInfo?.sn_start_date) : " "}
                                                </Typography>
                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("sn_desc")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {getValueByLang(subsInfo?.sn_desc || "{ }")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("sn_expiry_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {subsInfo?.sn_expiry_date ? formatGridDate(subsInfo?.sn_expiry_date) : " "}
                                                </Typography>
                                            </Flex>
                                        </Flex>

                                    </InfoCard>
                                </Flex>
                            </Flex>
                        ) : <></>}
                        {url_active == "profile" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <CardHeaderButton>
                                        <PrimaryButton
                                            onClick={() => setProfile(true)}>
                                            {t("update")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                                <Flex padding="10px 0 !important" md={4} sm={6}>
                                    <InfoCard >
                                        <Typography fntweight="bold" ntresize="true" fntsize="bodyTitlefntsize">
                                            {t("photo")}
                                        </Typography>
                                        <SizeBox />
                                        <ShadowCard>
                                            <Center>
                                                <KDImg height={"200px"} src={photoData?.photo || ""} />
                                            </Center>
                                        </ShadowCard>
                                    </InfoCard >
                                </Flex>
                                {/* <Flex padding="10px 0 !important" md={4} sm={6}>
                                    <InfoCard >
                                        <Typography fntweight="bold" ntresize="true" fntsize="bodyTitlefntsize">
                                            {t("nid")}
                                        </Typography>
                                        <SizeBox />
                                        <ShadowCard>
                                            <Center>
                                                <KDImg height={"200px"} src={photoData?.nid || ""} />
                                            </Center>
                                        </ShadowCard>
                                    </InfoCard >
                                </Flex> */}
                                <Flex padding="10px 0 !important" md={4} sm={6}>
                                    <InfoCard >
                                        <Typography fntweight="bold" ntresize="true" fntsize="bodyTitlefntsize">
                                            {t("Logo")}
                                        </Typography>
                                        <SizeBox />
                                        <ShadowCard>
                                            <Center>
                                                <KDImg height={"200px"} src={photoData?.logo || ""} />
                                            </Center>
                                        </ShadowCard>
                                    </InfoCard >
                                </Flex>
                            </Flex>
                        ) : <></>}
                    </InfoCard>
                </Flex>
            </Flex>

        </CardBody>
        <SubUserInfoPage open={edituser} setOpen={setEditUser} />
        <SubCPInfopage open={editcp1_info} setOpen={setEditcp1_info} />
        <SubPhotoInfopage open={profile} setOpen={setProfile} />
        <Loading open={isLoading} />
    </>)
}