import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { InfoCard } from "../component/style/styled_card";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { loadPubBizGroupData } from "../features/membership/biz_pub_group_slice";
import { Loading } from "../component/Loading";
import UnAuthorized from "./UnAuthorized";
import { initPreLoader, updateUserInfo, initLoader, initPostLoader } from "../features/pubRegistration/pub_registration_slice";
import { MembershipStep2Page } from "./MembershipStep2";
import { MembershipStep3Page } from "./MembershipStep3";
import { MembershipStep4Page } from "./MembershipStep4";
import { MembershipStep5Page } from "./MembershipStep5";
import styled from "styled-components";
import useTitle from "../hooks/useTitle";

export const Typography = styled.div`
  height: ${(props) => props.height || "auto"};
  width: ${(props) => (props.full ? "100%" : "auto")};
  cursor: pointer;
  padding: 10px 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
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


export const Membership = () => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [url_active, set_url_active] = useState("membertype"); 
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
        <>
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
                    <Flex row="row">
                        <Flex md={3} sm={4} padding="10px 0!important">
                            <InfoCard height="80vh">
                                <Typography 
                                    full="true"
                                    margin="10px"
                                    highlight={"hl_success"} 
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button" 
                                    tabIndex={0} 
                                   
                                >
                                    {t("guidelines")}
                                </Typography>

                                <Typography 
                                    full="true"
                                    margin="10px"
                                    highlight={url_pos > 1 ? "hl_success" : ""}
                                    active={url_active === "membertype" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {t("member_type_step1")}
                                </Typography>

                                <Typography 
                                    full="true"
                                    highlight={url_pos > 2 ? "hl_success" : ""}
                                    active={url_active === "categorypanel" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {t("choose_groupstep")}
                                </Typography>

                                <Typography 
                                    full="true"
                                    highlight={url_pos > 3 ? "hl_success" : ""}
                                    active={url_pos == 3 ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {t("member_infostep")}
                                </Typography>

                                <Typography 
                                    full="true"
                                    highlight={url_pos > 4 ? "hl_success" : ""}
                                    active={url_pos == 4 ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {t("agreetermStep")}
                                </Typography>

                                <Typography 
                                    full="true"
                                    active={url_active === "verification" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    type="button"
                                    role="button"
                                    tabIndex={0}
                                >
                                    {t("verifistep")}
                                </Typography>
                            </InfoCard>
                        </Flex>
                        <Flex md={9} sm={8}>
                                {url_active == "membertype" && <MembershipStep2Page set_url_active={set_url_active} />}
                                {url_active == "categorypanel" && <MembershipStep3Page set_url_active={set_url_active} />}
                                {url_active == "memberinfo" && <MembershipStep4Page set_url_active={set_url_active} />} 
                                {url_active == "verification" && <MembershipStep5Page set_url_active={set_url_active} />}
                         
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
            <Loading open={isLoading} />
        </>

    );
};
