import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { loadPubBizGroupData } from "../features/membership/biz_pub_group_slice";
import { Loading } from "../component/Loading";
import UnAuthorized from "./UnAuthorized";
import { initPreLoader, updateUserInfo, initLoader, initPostLoader } from "../features/pubRegistrastion/pub_registration_slice";
import useTitle from "../hooks/useTitle";
import { KDImg } from "../component/style/styled_img";
import signImg from "../assets/sign-up/sign-up-process-icon-biz360expo.png";
import { PrimaryButton } from "../component/style/styled_button";
import { Typography, ULine } from "../component/style/styled_typography";
import styled from "styled-components";
import start from "../assets/small-icon/start-icon-biz360expo.png";
import { Center } from "../component/style/styled_center";


export const CustSpan = styled.span`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : "0")};
`;

export const MemberSignup = () => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("quidelines");
    const [url_pos, set_url_pos] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    useTitle(t('mem_title'))
    useEffect(() => {
        dispatch(updateUserInfo({ "tabpos": 0, "info": {} }))
        dispatch(loadPubBizGroupData())
    }, []);

    useEffect(() => { set_url_pos(regDataPub?.tabpos || 0) }, [regDataPub.tabpos]);

    useEffect(() => {
        if (regDataPub.preloading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.preloading == "succeeded") {
            setTimeout(() => { dispatch(initPreLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.preloading == "unauthorized") {
            setTimeout(() => { dispatch(initPreLoader()); setUnAthorized(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.preloading == "nonetwork") {
            setTimeout(() => { dispatch(initPreLoader()); setIsAxiosError(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.preloading == "failed") {
            setTimeout(() => { dispatch(initPreLoader()); setIsLoading(false); }, 4000);
        }
    }, [regDataPub.preloading]);

    useEffect(() => {
        if (regDataPub.postloading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.postloading == "succeeded") {
            setTimeout(() => { dispatch(initPostLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.postloading == "unauthorized") {
            setTimeout(() => { dispatch(initPostLoader()); setUnAthorized(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.postloading == "nonetwork") {
            setTimeout(() => { dispatch(initPostLoader()); setIsAxiosError(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.postloading == "failed") {
            setTimeout(() => { dispatch(initPostLoader()); setIsLoading(false); }, 4000);
        }
    }, [regDataPub.postloading]);

    useEffect(() => {
        if (regDataPub.loading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.loading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "unauthorized") {
            setTimeout(() => { dispatch(initLoader()); setUnAthorized(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "nonetwork") {
            setTimeout(() => { dispatch(initLoader()); setIsAxiosError(true); setIsLoading(false); }, 4000);
        }
    }, [regDataPub.loading]);

    return isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : (
        <div style={{ userSelect: "none" }}>
            {(regDataPub.loading == "idle" || regDataPub.loading == "pending") ? <></> : (
                regDataPub.loading == "succeeded" ? (
                    <Toast msg={regDataPub.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={regDataPub.msg} />
                ))}

            {(regDataPub.postloading == "idle" || regDataPub.postloading == "pending") ? <></> : (
                regDataPub.postloading == "succeeded" ? (
                    <Toast msg={regDataPub.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={regDataPub.msg} />
                ))}
            <Suspense>
                <Container>
                    <Flex row="row" >
                        <Flex md={12} sm={12} padding="10px 0!important">

                            <Flex row="row">

                                <Flex md={3} xs={12} padding="0 5px!important">
                                    <InfoCard>


                                        <Typography margin="0 0 10px 0" fntweight="bold" fntsize="dsTextFontSize" >
                                            {t("signup")}
                                        </Typography>
                                        <ULine />
                                        <KDImg src={signImg} width={"auto"} height={"auto"} noborder="true" padding="0!important"></KDImg>

                                        <CardHeaderButton start="true" padding="5px 0 0 60px">
                                            <PrimaryButton
                                                onClick={() => { navigate("/memsup") }} >

                                                {t("go_to_signup")}
                                                <KDImg
                                                    src={start}
                                                    height={"auto"}
                                                    width={"auto"}
                                                    noborder="true"
                                                />
                                                {/* <CustSpan margin="5px 0 0 2px" color="font" className="material-icons">play_circle</CustSpan> */}

                                            </PrimaryButton>

                                        </CardHeaderButton>
                                    </InfoCard>
                                </Flex>



                                <Flex md={9} xs={12} padding="0 0 0 5px!important">
                                    <InfoCard>

                                        <Typography fntweight="bold" txtalign="left" fntsize="buttonFontSize" margin="5px 0">
                                            {t("guidelines_title")} 
                                        </Typography>


                                        <Typography txtalign="left">
                                            {t("guidelines_key1")}
                                        </Typography>


                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="5px 0 0 0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_1")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="5px 0  0 0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key2")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("step_2")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key3")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding=" 0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_3")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key4")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_4")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key5")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding=" 0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_5")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding=" 0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key6")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_6")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key7")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_7")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding=" 0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key8")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_8")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key9")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("step_9")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key10")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_10")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0   !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key11")}
                                                </Typography>
                                            </Flex>
                                        </Flex>

                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_11")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key13")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0 !important">
                                                <Typography txtalign="left">
                                                    {t("step_12")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding=" 0 !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key14")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("step_13")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key15")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                        <Flex row="row">
                                            <Flex md={.4} xs={1} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("step_14")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={11.6} xs={11} padding="0  !important">
                                                <Typography txtalign="left">
                                                    {t("guidelines_key16")}
                                                </Typography>
                                            </Flex>
                                        </Flex>
                                    </InfoCard>
                                </Flex>
                            </Flex>

                            {/* <Flex md={12} sm={12} padding="0!important">

                                <CardHeaderButton>
                                    <PrimaryButton
                                        onClick={() => { navigate("/memsup") }}                                         >
                                        {t("next")}
                                    </PrimaryButton>

                                </CardHeaderButton>
                            </Flex> */}

                        </Flex>
                    </Flex>
                </Container>


            </Suspense>
            <Loading open={isLoading} />
        </div>

    );
};
