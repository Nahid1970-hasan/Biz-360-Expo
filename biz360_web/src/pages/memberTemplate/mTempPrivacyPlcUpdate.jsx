
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton, ShadowCard } from "../../component/style/styled_card";
import { PrimaryButton } from "../../component/style/styled_button";
import { SizeBox } from "../../component/style/styled_sizebox";
import { loadPage } from "../../features/page/page_slice";
import { Toast } from "../../component/Toast";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { NotNetwork } from "../NoNetwork";
import { initBDLoader, loadMTempBodyData, saveMTempBodyData } from "./inv_biz_temp_bd_slice";

import DisplayTheOutput from "rich-text-editor-for-react/display-output"
import RichTextEditor from 'rich-text-editor-for-react'
import useRichTextEditor from 'rich-text-editor-for-react/hook'
import { daysLeftCount, TEMPCONST } from "../../utils/helper";
export const MUpdateTempPrivacyPlcPage = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata); 
    const [tempInfo, setTempInfo] = useState({});
    const [sectionPrvcData, setSectionPrvcData] = useState({});
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false); 
    const { output, fetchOutput } = useRichTextEditor(); 
   const [daysLeft, setDaysLeft] = useState(TEMPCONST.dayleft);
    useEffect(() => {
        dispatch(loadPage({ 
            title: 'privacy_policy_template', 
            button: false
        }))
    }, []);


    useEffect(() => {
        var scData = JSON.parse(invBizTempBDData?.homeData?.section1 || "{}") || {}; 
        setSectionPrvcData(scData);
    }, [invBizTempBDData?.homeData]);

      useEffect(() => {
            setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
        }, [userData?.dashboard]);

    useEffect(() => {
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    useEffect(() => {
        if (tempInfo.template_id > 0) {
            dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "privacy-policy", section_name: "", sub_section_name: "" }));
        }
    }, [tempInfo]);


    useEffect(() => {
        invBizTempBDData.loading == "pending" ? setIsLoading(true) : invBizTempBDData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempBDData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempBDData.loading]);

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                setOpen(false)
                dispatch(initBDLoader());
                setIsLoading(false);
                if (tempInfo.template_id > 0) {
                    dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "about_us", section_name: "", sub_section_name: "" }));
                }
            }, 2000);
        } else if (invBizTempBDData.addUpdateLoading == "unauthorized") {
            setTimeout(() => { dispatch(initBDLoader()); setUnAthorized(true); }, 4000);
        } else if (invBizTempBDData.addUpdateLoading == "nonetwork") {
            setTimeout(() => { dispatch(initBDLoader()); setIsAxiosError(true); }, 4000);
        } else {
            setTimeout(() => { dispatch(initBDLoader()); setIsLoading(false); }, 4000);
        }
    }, [invBizTempBDData.addUpdateLoading]);

    const handleOnSubmit = (e) => {
        dispatch(saveMTempBodyData({ template_id: tempInfo.template_id, page_name: "privacy-policy", photo_name: '', sub_section_name: "", section_name: "section1", 'content': JSON.stringify({ 'page_data': output }) }))

    };

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(invBizTempBDData.addUpdateLoading == "idle" || invBizTempBDData.addUpdateLoading == "pending") ? <></> : (
            invBizTempBDData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempBDData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempBDData.msg} />
            )
        )}
        <Suspense>

            <Flex row={"true"}>
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <CardHeaderButton><PrimaryButton type="button" disabled={daysLeft<0} onClick={daysLeft<0? null : () => { setOpen(!open); }}>{t(!open?"update":"close")}</PrimaryButton></CardHeaderButton>
                    <SizeBox />
                </Flex>
                {!open ? <Flex md={12} sm={12} xs={12} padding="0">
                    <ShadowCard>
                        <DisplayTheOutput
                            html={sectionPrvcData?.page_data}
                            backgroundColor='#fff'
                            primaryColor='#30b256'
                        />
                    </ShadowCard>
                </Flex> :
                    <Flex md={12} sm={12} xs={12} padding="0">
                        <RichTextEditor
                            toolbarOptions={['clear_format', 'undo', 'redo', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'blockquote', 'code_block', 'sub_script', 'super_script']}
                            fetchOutput={fetchOutput}
                            initialValue={sectionPrvcData?.page_data}
                            customizeUI={{
                                backgroundColor: '#fff',
                                primaryColor: '#30b256',
                            }}
                        />
                        <CardHeaderButton top="10px" padding="0 10px">
                            <PrimaryButton
                                type="button"
                                onClick={(e) => handleOnSubmit(e)}
                            >
                                {t("submit")}
                            </PrimaryButton>
                        </CardHeaderButton>
                    </Flex>}
            </Flex>
        </Suspense>

        <Loading open={isLoading} />

    </>)
}