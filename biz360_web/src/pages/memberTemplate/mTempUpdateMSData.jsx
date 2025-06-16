
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { ActiveButton, PrimaryButton } from "../../component/style/styled_button";
import { SizeBox } from "../../component/style/styled_sizebox";
import { loadPage } from "../../features/page/page_slice";
import { ULine, UnderLine } from "../../component/style/styled_uline";
import { MUpTempBodySC1Page } from "./mTempBDSC1Setup";
import { MUpTempBodySC2Page } from "./mTempBDSC2Setup";
import { Toast } from "../../component/Toast";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { NotNetwork } from "../NoNetwork";
import { initImgLoader } from "./mmb_image_upload_slice";
import { initBDLoader, loadMTempBodyData } from "./inv_biz_temp_bd_slice";
import { MUpTempBodySC3Page } from "./mTempBDSC3Setup";
import { MUpTempBodySC4Page } from "./mTempBDSC4Setup";
import { MUpTempBodySC5Page } from "./mTempBDSC5Setup";
import { MUpTempBodySC6Page } from "./mTempBDSC6Setup";
import { MUpTempBodySC7Page } from "./mTempBDSC7Setup";

export const MUpdateTempMSDataPage = () => {
    const dispatch = useDispatch();
    const [logo, set_logo] = useState(null);
    const userData = useSelector((state) => state.user);
    const mmImgUploadData = useSelector((state) => state.mmbimgupload);
    const invBizTempBDData = useSelector((state) => state.invbiztempbddata);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");
    const [tempInfo, setTempInfo] = useState({});
    const [basicInfo, setBasicInfo] = useState({});
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [url_active, set_url_active] = useState("section1");

    useEffect(() => {
        dispatch(loadPage({ title: 'Body Content' }))
    }, []);


    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
        setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    useEffect(() => {
        if (tempInfo.template_id > 0) {
            dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "masterdata", section_name: "", sub_section_name: "" }));
        }
    }, [tempInfo]);


    useEffect(() => {
        mmImgUploadData.imgUploading == "pending" ? setIsLoading(true) : mmImgUploadData.imgUploading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : mmImgUploadData.imgUploading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        invBizTempBDData.loading == "pending" ? setIsLoading(true) : invBizTempBDData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : invBizTempBDData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempBDData.loading]);

    useEffect(() => {
        if (mmImgUploadData.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmImgUploadData.imgUploading == "succeeded") {

            setTimeout(() => {
                dispatch(initImgLoader());
                setIsLoading(false);
                if (tempInfo.template_id > 0) {
                    dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", section_name: "", sub_section_name: "" }));
                }
            }, 2000);
        } else if (mmImgUploadData.imgUploading == "unauthorized") {
            setTimeout(() => { dispatch(initImgLoader()); setUnAthorized(true); }, 4000);
        } else if (mmImgUploadData.imgUploading == "nonetwork") {
            setTimeout(() => { dispatch(initImgLoader()); setIsAxiosError(true); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmImgUploadData.imgUploading]);

    useEffect(() => {
        if (invBizTempBDData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (invBizTempBDData.addUpdateLoading == "succeeded") {
            setTimeout(() => {
                dispatch(initBDLoader());
                setIsLoading(false);
                if (tempInfo.template_id > 0) {
                    dispatch(loadMTempBodyData({ template_id: tempInfo.template_id, page_name: "home", section_name: "", sub_section_name: "" }));
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

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> : <>
        {(mmImgUploadData.imgUploading == "idle" || mmImgUploadData.imgUploading == "pending") ? <></> : (
            mmImgUploadData.imgUploading == "succeeded" ? (
                <Toast msg={mmImgUploadData.msg} color="success" />
            ) : (
                <Toast color="error" msg={mmImgUploadData.msg} />
            )
        )}
        {(invBizTempBDData.addUpdateLoading == "idle" || invBizTempBDData.addUpdateLoading == "pending") ? <></> : (
            invBizTempBDData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempBDData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempBDData.msg} />
            )
        )}
        <Suspense>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={10}>
                    <InfoCard>
                        <CardHeaderButton start={'start'}>
                            <div>
                                <ActiveButton height="40px" active={url_active == "section1" ? "true" : null} color="secondaryButton" type="button" onClick={() => set_url_active("section1")}>
                                    Section 1
                                </ActiveButton>
                                {url_active == "section1" && <UnderLine />}
                            </div>

                        </CardHeaderButton>
                    </InfoCard>
                </Flex>
                <Flex padding="0 !important" md={2} sm={12} xs={12}><ULine />
                    <InfoCard>
                        <CardHeaderButton>
                            <PrimaryButton>{t("add_section")}</PrimaryButton>
                        </CardHeaderButton>
                    </InfoCard>
                </Flex> 
                <SizeBox />
            </Flex>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    {url_active == "section1" ? <h1>Section 1 Page</h1> : <></>}

                </Flex>
            </Flex>
        </Suspense>
        <Loading open={isLoading} />

    </>)
}