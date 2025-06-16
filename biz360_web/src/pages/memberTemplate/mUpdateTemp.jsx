import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { ActiveButton } from "../../component/style/styled_button";
import { SizeBox } from "../../component/style/styled_sizebox";
import { Flex } from "../../component/style/styled_flex";
import { ULine, UnderLine } from "../../component/style/styled_uline";
import { Loading } from "../../component/Loading";
import { loadSelectedTemp } from "../template/admin_update_temp_slice";
import { loadSelectedMTempData } from "./inv_biz_temp_slice";
import UnAuthorized from "../UnAuthorized";



export const MUpdateTemplatePage = () => {
    const paramData = useParams();
    const dispatch = useDispatch();
    const invBizTempData = useSelector((state) => state.invbiztempdata);

    const [url_active, set_url_active] = useState("hfcontent");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (paramData?.id && invBizTempData.loading != "succeeded" && invBizTempData.loading != "pending") {
            dispatch(loadSelectedMTempData({ template_id: paramData?.id }));
        }
    }, [paramData])

    function onHFContentClick() {
        set_url_active("hfcontent");
    }
    function onBDContentClick() {
        set_url_active("bdcontent");
    }

    useEffect(() => {
        invBizTempData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invBizTempData.loading]);




    return invBizTempData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
        {(invBizTempData.addUpdateLoading == "idle" || invBizTempData.addUpdateLoading == "pending") ? <></> : (
            invBizTempData.addUpdateLoading == "succeeded" ? (
                <Toast msg={invBizTempData.msg} color="success" />
            ) : (
                <Toast color="error" msg={invBizTempData.msg} />
            )
        )}
        <Suspense>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    <InfoCard>
                        <CardHeaderButton start={'start'}>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "hfcontent" ? "true" : null} type="button" onClick={onHFContentClick}>
                                    Header & Footer
                                </ActiveButton>
                                {url_active == "hfcontent" && <UnderLine />}
                            </div>
                            <div>
                                <ActiveButton height="40px" color="secondaryButton" active={url_active == "bdcontent" ? "true" : null} type="button" onClick={onBDContentClick}>
                                    Body Content
                                </ActiveButton>
                                {url_active == "bdcontent" && <UnderLine />}
                            </div>
                        </CardHeaderButton>
                    </InfoCard>
                </Flex>
                <Flex padding="0 !important" md={12} sm={12} xs={12}><ULine /></Flex>
                <SizeBox />
            </Flex>
            <Flex row={"true"}>
                <Flex padding="0 !important" md={12}>
                    {/* {url_active == "hfcontent" ? <MUpdateTempNavFtPage /> : <></>} */}
                    {/* {url_active == "bdcontent" ? <UpdateTempBodyContentPage /> : <></>}  */}
                </Flex>
            </Flex>
        </Suspense>
        <Loading open={isLoading} />
    </>)
}