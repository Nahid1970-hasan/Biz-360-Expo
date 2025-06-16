import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { ActiveButton, PrimaryButton } from "../component/style/styled_button";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { SizeBox } from "../component/style/styled_sizebox";
import 'react-international-phone/style.css';
import { Toast } from "../component/Toast";
import { NotNetwork } from "./NoNetwork";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MembershipStep1Page } from "./MembershipStep1";
import { MembershipStep5Page } from "./MembershipStep5";
import { MembershipStep4Page } from "./MembershipStep4";
import { MembershipStep3Page } from "./MembershipStep3";
import { MembershipStep2Page } from "./MembershipStep2";
import { loadPubBizGroupData } from "../features/membership/biz_pub_group_slice";
import { initLoader, initPreLoader, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { Loading } from "../component/Loading";
import UnAuthorized from "./UnAuthorized";

export const MembershipPage = () => {
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
    useEffect(() => {
        dispatch(updateUserInfo({ "tabpos": 0, "info": {} }))
        dispatch(loadPubBizGroupData())
    }, []);

    useEffect(() => { set_url_pos(regDataPub?.tabpos || 0) }, [regDataPub.tabpos]);

    useEffect(() => {
        regDataPub.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [regDataPub.loading]);

    useEffect(() => {
        regDataPub.preloading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [regDataPub.preloading]);

    useEffect(() => {
        if (regDataPub.preloading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.preloading == "succeeded") {
            setTimeout(() => { dispatch(initPreLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.preloading == "unauthorized") {
            setTimeout(() => { dispatch(initPreLoader()); setUnAthorized(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.preloading == "nonetwork") {
            setTimeout(() => { dispatch(initPreLoader()); setIsAxiosError(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "failed"){
            setTimeout(() => { dispatch(initPreLoader()); setIsLoading(false); }, 4000);
        }
    }, [regDataPub.preloading]);

    useEffect(() => {
        if (regDataPub.loading == "pending") {
            setIsLoading(true)
        } else if (regDataPub.loading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "unauthorized") {
            setTimeout(() => { dispatch(initLoader()); setUnAthorized(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "nonetwork") {
            setTimeout(() => { dispatch(initLoader()); setIsAxiosError(true); setIsLoading(false); }, 4000);
        } else if (regDataPub.loading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
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
            <Suspense>
                <Container>
                    <Flex row="row">
                        <Flex md={3} sm={4}>
                            <InfoCard height="68vh">
                                <ActiveButton
                                    height="40px"
                                    full="true"
                                    highlight={url_pos > 0 ? "hl_success" : ""}
                                    active={url_active == "quidelines" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    disabled={true}
                                    type="button">
                                    {t("quidelines")}
                                </ActiveButton>

                                <ActiveButton
                                    height="40px"
                                    full="true"
                                    highlight={url_pos > 1 ? "hl_success" : ""}
                                    active={url_active == "membertype" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    disabled={true}
                                    type="button">
                                    {t("member_type")}
                                </ActiveButton>

                                <ActiveButton
                                    height="40px"
                                    full="true"
                                    highlight={url_pos > 2 ? "hl_success" : ""}
                                    active={url_active == "categorypanel" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    disabled={true}
                                    type="button">
                                    {t("choose_group")}
                                </ActiveButton>
                                <ActiveButton
                                    height="40px"
                                    full="true"
                                    highlight={url_pos > 3 ? "hl_success" : ""}
                                    active={url_active == "memberinfo" ? "true" : null}
                                    color="secondaryButton"
                                    onClick={null}
                                    disabled={true}
                                    type="button">
                                    {t("member_information")}
                                </ActiveButton>
                                <ActiveButton
                                    height="40px"
                                    full="true"
                                    active={url_active == "verification" ? "true" : null}
                                    color="secondaryButton" 
                                    onClick={null}
                                    disabled={true}
                                    type="button">
                                    {t("verification")}
                                </ActiveButton>
                            </InfoCard>
                        </Flex>
                        <Flex md={9} sm={8}>
                            <InfoCard height="68vh">
                                {url_active == "quidelines" && <MembershipStep1Page set_url_active={set_url_active} />}
                                {url_active == "membertype" && <MembershipStep2Page set_url_active={set_url_active} />}
                                {url_active == "categorypanel" && <MembershipStep3Page set_url_active={set_url_active} />}
                                {url_active == "memberinfo" && <MembershipStep4Page set_url_active={set_url_active} />}
                                {url_active == "verification" && <MembershipStep5Page set_url_active={set_url_active} />}
                            </InfoCard>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
            <Loading open={isLoading} />
        </>

    );
};
