import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { CardBody, CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { Typography, ULine } from "../component/style/styled_typography";
import { ActiveButton, PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { copyText, getBNFont, getValueByLang, langs } from "../utils/helper";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { loadINDprofile, initLoader } from "../features/profile/ind_profile_Slice";
import { InvUserModal } from "../features/profile/InvUserModal";
import { InvCp_info } from "../features/profile/InvCp_info";
import { InvSubscription } from "../features/profile/InvSubscription";
import styled from "styled-components";
import { HLLabel } from "../component/style/styled_label";
import { IconButton } from "../component/IconButton";
import { config } from "../config/config";
import { useNavigate } from "react-router-dom";
import logo from "../assets/1.jpg"
import { KDImg } from "../component/style/styled_img";
import { SizeBox } from "../component/style/styled_sizebox";
import { Center } from "../component/style/styled_center";
import { ProfilePhoto } from "../features/profile/ProfilePhoto";
import { initImgLoader } from "./memberTemplate/mmb_image_upload_slice";
import { loadBizMemSubsData } from "../features/bizMemSubscription/biz_mem_subscription_slice";


const StatusTypography = styled(Typography)`
  border: 2px solid ${props => props.$isApproved ? '#4CAF50' : '#f44336'};
  padding: 2px 8px;
  border-radius: 30px;
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

export const InvProfilePage = () => {
    const user = useSelector((state) => state.invprofile);
    const userinfo = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [edituser, setEditUser] = useState(false);
    const [editcp1_info, setEditcp1_info] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const [profile, setProfile] = useState(false);

    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("user");
    const [msgText, setMsgText] = useState("");

     const [basicInfo, setBasicInfo] = useState({});
    const [cpInfo, setCPInfo] = useState({});
    const [photoData, setPhotoData] = useState({});
    const [subsInfo, setSubsInfo] = useState({});

    const { PUBURL } = config;

    const { URL } = config;
    useEffect(() => {
        setIsLoading(true);
        dispatch(loadINDprofile());
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
        set_url_active("cp1_info");
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
        mmImgUploadData.imgUploading == "pending" ? setIsLoading(true) : mmImgUploadData.imgUploading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : mmImgUploadData.imgUploading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        if (mmImgUploadData.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmImgUploadData.imgUploading == "succeeded") {
            setIsLoading(false);
            dispatch(loadINDprofile());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUploadData.imgUploading]);


    useEffect(() => {
        if (user.updateLoading == "pending") {
            setIsLoading(true)
        } else if (user.updateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadINDprofile());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [user.updateLoading]);

    return <>
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

                <Flex md={3} padding="0 !important" >
                    <InfoCard>
                        <CustTypography>
                            <CircleLogoWrapper>
                                <KDImg src={photoData?.photo || logo} alt="Logo" noborder="true" />
                            </CircleLogoWrapper>
                        </CustTypography>
                        <Typography margin="0 0 10px 0" fntsize="buttonFontSize" fntweight="bold">
                            {t(userinfo?.fullname || "{}")}
                        </Typography>
                        <Typography margin="0 0 10px 0" fntsize="buttonFontSize" fntweight="bold">
                            {t(userinfo?.mobile || "{}")}
                        </Typography>
                        <ULine /> <SizeBox />
                        <CustTypography height="40px" active={url_active == "user" ? "true" : null} color="secondaryButton" type="button" onClick={handleUserClick} justify="left">
                            {t("user")}
                        </CustTypography>

                        <CustTypography height="40px" color="secondaryButton" active={url_active == "cp1_info" ? "true" : null} type="button" onClick={handleCustomer1Click} justify="left">
                            {t("cp1_info")}
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
                                    url_active == "user" ? setEditUser(true) :
                                        url_active == "cp1_info" ? setEditcp1_info(true) : url_active == "profile" ? setProfile(true) : dispatch(loadBizMemSubsData())
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

                        {url_active == "cp1_info" ? (
                            <Flex row="row">
                                <Flex md={12} padding="0 !important">
                                    <InfoCard>
                                        <Flex row="row">
                                            <Flex padding="0 !important" md={12} sm={12}>
                                                <Typography fntsize="cardTitleFontSize" txtalign="left" margin="0 10px" fntweight="bold">
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
                                                    {user?.profile?.cp_info?.fullname || " "}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("email")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.cp_info?.email || " ")}
                                                </Typography>

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("mobile")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {(user?.profile?.cp_info?.mobile || "")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("birth_date")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp1_info?.birth_date || " "}
                                                </Typography>
                                            </Flex>

                                            <Flex md={6} padding="10px 0 !important">

                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" >
                                                    {t("gender")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp_info?.gender || " "}
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
                                                <Typography txtalign="left" fntsize="bodyTitleFontSize" fntweight="bold" margin="10px 0 0 0">
                                                    {t("country")}
                                                </Typography>
                                                <Typography txtalign="left" fntsize="bodySubTitleFontSize" margin="0 10px">
                                                    {user?.profile?.cp_info?.country || " "}
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
                                {/* <Flex padding="10px 0 !important" md={4} sm={6}>
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
                                </Flex> */}
                            </Flex>
                        ) : <></>}
                    </InfoCard>
                </Flex>

            </Flex>



        </CardBody>

        <InvSubscription open={editModal} setOpen={setEditModal} />
        <InvUserModal open={edituser} setOpen={setEditUser} />
        <InvCp_info open={editcp1_info} setOpen={setEditcp1_info} />
        <ProfilePhoto open={profile} setOpen={setProfile} />

        <Loading open={isLoading} />
    </>
}