import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { ProfileModal } from "../features/profile/ProfileModal";
import { initLoader, loadBizprofile } from "../features/profile/profile_slice";
import { ProfileUserModal } from "../features/profile/ProfileUserModal";
import { ProfileBussModal } from "../features/profile/ProfileBussModal";
import { ProfileCp_1Modal } from "../features/profile/ProfileCp_1Modal";
import { ProfileCp_2Modal } from "../features/profile/ProfileCp_2Modal";
import styled from "styled-components";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Typography, ULine } from "../component/style/styled_typography";
import { ActiveButton, PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { copyText, getBNFont, getValueByLang, langs } from "../utils/helper";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { ProfilInfoModal } from "../features/profile/ProfilInfoModal";
import { KDImg } from "../component/style/styled_img";
import { NotNetwork } from "./NoNetwork";
import UnAuthorized from "./UnAuthorized";
import { initImgLoader } from "../pages/memberTemplate/mmb_image_upload_slice";
import { SizeBox } from "../component/style/styled_sizebox";
import { Center } from "../component/style/styled_center";
import { HLLabel } from "../component/style/styled_label";
import { config } from "../config/config";
import { IconButton } from "../component/IconButton";
import { Input } from "../component/style/styled_input";
import logo from "../assets/1.jpg"
import { loadBizMemSubsData } from "../features/bizMemSubscription/biz_mem_subscription_slice";


const StatusTypography = styled(Typography)`
  border: 2px solid ${props => props.$isApproved ? '#4CAF50' : '#f44336'};
  padding: 2px 8px;
  border-radius: 20px;
  display: inline-block;
  background-color: ${props => props.$isApproved ? '#e8f5e9' : '#ffebee'};
`;

export const CustTypography = styled.div`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  padding:10px  5px;
  border-radius: 4px;
  display: flex;
  font-size: ${({ fntsize, ntresize, theme }) => !!ntresize ? theme.fontSize[fntsize ? fntsize : 'bodyTitleFontSize'] : getBNFont(theme.fontSize[fntsize ? fntsize : 'bodyTitleFontSize'], "lng")};
  text-align:${({ txtalign }) => (txtalign ? txtalign : "center")};
  justify-content:${({ justify }) => (justify ? justify : "center")};
  transition: background 0.3s;
  margin-bottom: 10px;
    &:last-child {
    margin-bottom: 0;
  }
  background: ${(props) => {
        if (props.active) return props.theme.colors.primaryActive;
        if (props.highlight === "hl_success") return props.theme.colors.hl_success;
        return "transparent";
    }};

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

export const ProfilePage = () => {
    const user = useSelector((state) => state.bizprofile);
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const userinfo = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [edituser, setEditUser] = useState(false);
    const [editBuss, setEditBuss] = useState(false);
    const [editcp1_info, setEditcp1_info] = useState(false);
    const [editcp2_info, setEditcp2_info] = useState(false);
    const [profile, setProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("user");
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [basicInfo, setBasicInfo] = useState({});
    const [cpInfo, setCPInfo] = useState({});
    const [photoData, setPhotoData] = useState({});
    const [subsInfo, setSubsInfo] = useState({});
    const [msgText, setMsgText] = useState("");
    const { PUBURL } = config;
    useEffect(() => {
        dispatch(loadBizprofile());
        dispatch(loadPage({
            title: "profile", button: false, buttonText: "update",
        }))
    }, []);

    const handleUserClick = () => {
        set_url_active("user");
    };

    const handleBusinessClick = () => {
        set_url_active("business");
    };

    const handleCustomer1Click = () => {
        set_url_active("cp1_info");
    };

    const handleCustomer2Click = () => {
        set_url_active("cp2_info");
    };
    const handleSubscriptionClick = () => {
        set_url_active("subscription");
    };
    const handleProfileClick = () => {
        set_url_active("profile");
    };

    useEffect(() => {
        setBasicInfo(user?.profile?.user || {});
        setCPInfo(user?.profile?.cp_info || {});
        setSubsInfo(user?.profile?.subscription || {});
        setPhotoData(user?.profile?.photo || {})
    }, [user.profile]);

    useEffect(() => {
        user.loading == "pending" ? setIsLoading(true) : user.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : user.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [user.loading]);

    useEffect(() => {
        mmImgUploadData.imgUploading == "pending" ? setIsLoading(true) : mmImgUploadData.imgUploading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : mmImgUploadData.imgUploading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        if (user.updateLoading == "pending") {
            setIsLoading(true)
        } else if (user.updateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadBizprofile());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [user.updateLoading]);

    useEffect(() => {
        if (mmImgUploadData.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmImgUploadData.imgUploading == "succeeded") {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); dispatch(loadBizprofile()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUploadData.imgUploading]);

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(user.updateLoading == "idle" || user.updateLoading == "pending") ? <></> : (
            user.updateLoading == "succeeded" ? (
                <Toast msg={user.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={user.msg} />
            )
        )}
        {(mmImgUploadData.imgUploading == "idle" || mmImgUploadData.imgUploading == "pending") ? <></> : (
            mmImgUploadData.imgUploading == "succeeded" ? (
                <Toast msg={mmImgUploadData.msg} color="success" />
            ) : (
                <Toast color="error" msg={mmImgUploadData.msg} />
            )
        )}

        {
            msgText && <Toast msg={msgText} hidebar="true" color="success" />
        }
        <CardBody>

            <Flex row="row">


                <Flex md={3} padding="0 10px !important" >
                    <InfoCard>
                        <CustTypography>
                            <CircleLogoWrapper>
                                <KDImg src={photoData?.logo? photoData?.logo :(photoData?.photo || logo)} alt="Logo" noborder="true" />
                            </CircleLogoWrapper>
                        </CustTypography>
                        <Typography margin="0 0 10px 0" fntsize="buttonFontSize" fntweight="bold">
                            {t(userinfo?.fullname || "{}")}
                        </Typography>
                        <Typography margin="0 0 10px 0" fntsize="buttonFontSize" fntweight="bold">
                            {t(userinfo?.mobile || "{}")}                            </Typography>

                        <ULine />
                        <SizeBox />
                        <CustTypography height="40px" active={url_active == "user" ? "true" : null} color="secondaryButton" type="button" onClick={handleUserClick} justify="left" >
                            {t("user")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "business" ? "true" : null} type="button" onClick={handleBusinessClick} justify="left">
                            {t("business")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "cp1_info" ? "true" : null} type="button" onClick={handleCustomer1Click} justify="left">
                            {t("cp1_info")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "cp2_info" ? "true" : null} type="button" onClick={handleCustomer2Click} justify="left">
                            {t("cp2_info")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "subscription" ? "true" : null} type="button" onClick={handleSubscriptionClick} justify="left">
                            {t("subscription")}
                        </CustTypography>
                        <CustTypography height="40px" color="secondaryButton" active={url_active == "profile" ? "true" : null} type="button" onClick={handleProfileClick} justify="left">
                            {t("photo")}
                        </CustTypography>

                    </InfoCard>
                </Flex>
                <Flex md={9} padding="0 10px!important">
                    <InfoCard>
                        <CardHeaderButton>
                            <PrimaryButton
                                onClick={() => {
                                    url_active == "user" ? setEditUser(true) : url_active == "business" ? setEditBuss(true) :
                                        url_active == "cp1_info" ? setEditcp1_info(true) :
                                            url_active == "cp2_info" ? setEditcp2_info(true) : url_active == "profile" ? setProfile(true) : dispatch(loadBizMemSubsData())
                                }}>
                                {t("update")}
                            </PrimaryButton>
                        </CardHeaderButton>
                        {url_active == "user" ? (
                            <Flex row="row">
                                <Flex md={12} padding="0 !important">
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 9 20px 0!important" md={12} sm={12}>
                                                <Typography fntweight="bold" ntresize="true" fntsize="bodyHeader" txtalign="left">
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
                                                    {getValueByLang(user?.profile?.user?.group_name || "{}")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("def_lang")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {langs[user?.profile?.user?.default_lang?.toLowerCase() || 'en'].nativeName}
                                                </Typography>



                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="0">
                                                    {t("status")}
                                                </Typography>

                                                <StatusTypography
                                                    margin="5px 10px "
                                                    txtalign="left"
                                                    fntsize="bodySubTitleFontSize"
                                                    $isApproved={user?.profile?.user?.status?.toLowerCase() === 'approved'}
                                                >
                                                    {user?.profile?.user?.status || " "}
                                                </StatusTypography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("url")}
                                                </Typography>
                                                <HLLabel width="auto">
                                                    {PUBURL}{"/#/"}
                                                    {user?.profile?.user?.user_url ? (user?.profile?.user?.user_url || "") : (user?.profile?.user?.hash_url || " ")}
                                                    <IconButton
                                                        onClick={() => {
                                                            const textToCopy = PUBURL + "/#/" + (user?.profile?.user?.user_url ? (user?.profile?.user?.user_url || "") : (user?.profile?.user?.hash_url || " "));
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

                        {url_active == "business" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography fntweight="bold" ntresize="true" fntsize="bodyHeader" txtalign="left">
                                                    {t("business")}
                                                </Typography>
                                            </Flex>

                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("biz_name")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_name || "")}
                                                </Typography>


                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("biz_email")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_email || " ")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("biz_structure")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_structure || " ")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("biz_size")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_size || "")}
                                                </Typography>
                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("mobile")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_mobile || "")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("biz_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.biz_address || "")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("country")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.country || "")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("keywords")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.business?.keywords || "")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                    </InfoCard>
                                </Flex>
                            </Flex>
                        ) : <></>}

                        {url_active == "cp1_info" ? (
                            <Flex row="row">
                                <Flex md={12}>
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography fntsize="bodyHeader" txtalign="left" fntweight="bold" >
                                                    {t("cp1_info")}
                                                </Typography>
                                            </Flex>

                                        </Flex>

                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("fullname")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.fullname || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("email")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.email || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("mobile")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.mobile || " "}
                                                </Typography>
                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("birth_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.birth_date || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("present_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.present_address || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("permanent_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.permanent_address || " "}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                    </InfoCard>
                                </Flex>
                            </Flex>
                        ) : <></>}

                        {url_active == "cp2_info" ? (
                            <Flex row="row">

                                <Flex md={12}>
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography fntsize="bodyHeader" txtalign="left" fntweight="bold" >
                                                    {t("cp2_info")}
                                                </Typography>
                                            </Flex>

                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("fullname")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_fullname || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("email")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_email || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("mobile")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_mobile || " "}
                                                </Typography>
                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("birth_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_birth_date || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("present_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_present_address || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("permanent_address")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp2_info?.cp2_permanent_address || " "}
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
                                                <Typography fntweight="bold" ntresize="true" fntsize="bodyHeader" txtalign="left">
                                                    {t("subscription")}
                                                </Typography>
                                            </Flex>

                                        </Flex>

                                        <Flex row="row">
                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("sn_name")}                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {getValueByLang(user?.profile?.subscription?.sn_name || "{ }")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("sn_start_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.subscription?.sn_start_date || " "}
                                                </Typography>


                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("sn_desc")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {getValueByLang(user?.profile?.subscription?.sn_desc || "{ }")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("sn_expiry_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.subscription?.sn_expiry_date || " "}
                                                </Typography>
                                            </Flex>
                                        </Flex>

                                    </InfoCard>
                                </Flex>
                            </Flex>
                        ) : <></>}
                        {url_active == "profile" ? (
                            <Flex row="row">
                                <Flex padding="10px 0 !important" md={4} sm={6}>
                                    <InfoCard >
                                        <Typography fntweight="bold" ntresize="true" fntsize="bodyTitlefntsize">
                                            {t("photo")}
                                        </Typography>
                                        <SizeBox />
                                        <ShadowCard>
                                            <Center>
                                                <KDImg height={"200px"} src={user?.profile?.photo?.photo || ""} />
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
                                                <KDImg height={"200px"} src={user?.profile?.photo?.nid || ""} />
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
                                                <KDImg height={"200px"} src={user?.profile?.photo?.logo || ""} />
                                            </Center>
                                        </ShadowCard>
                                    </InfoCard >
                                </Flex>
                            </Flex>
                        ) : <></>}
                    </InfoCard></Flex>

            </Flex>




        </CardBody>

        <ProfileModal open={editModal} setOpen={setEditModal} />
        <ProfileUserModal open={edituser} setOpen={setEditUser} />
        <ProfileBussModal open={editBuss} setOpen={setEditBuss} />
        <ProfileCp_1Modal open={editcp1_info} setOpen={setEditcp1_info} />
        <ProfileCp_2Modal open={editcp2_info} setOpen={setEditcp2_info} />
        <ProfilInfoModal open={profile} setOpen={setProfile} />
        <Loading open={isLoading} />
    </>)
}