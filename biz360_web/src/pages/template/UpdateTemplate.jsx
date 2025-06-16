import { useParams } from "react-router-dom"
import {  useEffect, useState } from "react";
import { loadSelectedTemp } from "./admin_update_temp_slice";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../component/Loading";
import { initLoader } from "../../features/bizTemplate/template_slice";
import { Toast } from "../../component/Toast";
import { initFTLoader } from "./temp_footer_setup_data_slice";
import { initBDCLoader } from "./temp_body_setup_data_slice";
import { UpdateDemo2TemplatePage } from "./TemplateDemo2"; 
import { UpdateSeasonalFTempPage } from "../tempSeasonalF/TempDemoSeasonalF";
import UnAuthorized from "../UnAuthorized";


export const UpdateTemplatePage = () => {
    const paramData = useParams();
    const dispatch = useDispatch();
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admFTTmpListData = useSelector((state) => state.admfttempsetupdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);   
    const biztempdata = useSelector((state) => state.biztempdata); 
    const [isLoading, setIsLoading] = useState(false);
    const [tempId, setTempId] = useState(0);
    useEffect(() => { 
        if (paramData?.id) { 
            setTempId(paramData?.id);
            dispatch(loadSelectedTemp({ template_id: paramData?.id }));
        } 
    }, [paramData])
 
    useEffect(() => {
        admTempData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [admTempData.loading]); 

    useEffect(() => {
        if (admFTTmpListData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (admFTTmpListData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            if (paramData?.id) {
                dispatch(loadSelectedTemp({ template_id: paramData?.id }));
            }
            setTimeout(() => { dispatch(initFTLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initFTLoader()); setIsLoading(false); }, 4000);
        }
    }, [admFTTmpListData.addUpdateLoading]);

    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (admTempBDCData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            if (paramData?.id) {
                dispatch(loadSelectedTemp({ template_id: paramData?.id }));
            }
            setTimeout(() => { dispatch(initBDCLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initBDCLoader()); setIsLoading(false); }, 4000);
        }
    }, [admTempBDCData.addUpdateLoading]);

    useEffect(() => {
        if (biztempdata.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (biztempdata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            if (paramData?.id) {
                dispatch(loadSelectedTemp({ template_id: paramData?.id }));
            }
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [biztempdata.addUpdateLoading]);

    return admTempData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (<>
        {(biztempdata.addUpdateLoading == "idle" || biztempdata.addUpdateLoading == "pending") ? <></> : (
            biztempdata.addUpdateLoading == "succeeded" ? (
                <Toast msg={biztempdata.msg} color="success" />
            ) : (
                <Toast color="error" msg={biztempdata.msg} />
            )
        )}
         {(admFTTmpListData.addUpdateLoading == "idle" || admFTTmpListData.addUpdateLoading == "pending") ? <></> : (
            admFTTmpListData.addUpdateLoading == "succeeded" ? (
                <Toast msg={admFTTmpListData.msg} color="success" />
            ) : (
                <Toast color="error" msg={admFTTmpListData.msg} />
            )
        )}
         {
            tempId==2 && <UpdateDemo2TemplatePage/> 
         }
         {
            tempId==6 && <UpdateSeasonalFTempPage/> 
         }
         {/* {
             tempId==4 && <UpdateDemoTemplate2/>
         } */}
        
        <Loading open={isLoading} />
    </>)
}