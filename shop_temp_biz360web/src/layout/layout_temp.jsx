import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../component/Loading";
import Footer from "./footer";
import { HeaderTempLayout } from "./layout_temp_header";
import { useEffect, useState } from "react";
import { addProfileData, loadPubProfileData } from "../features/pubprofile/pub_profile_data";
import { RESDATA, porfileData } from "../utils/helper"
import styled from "styled-components";
import { theme } from "../styles/theme";
import { MemberNotFound } from "../pages/NotFound";
import { FooterTempLayout } from "./layout_temp_footer";
import { LayoutDemo1 } from "./layout_demo1";
import { LayoutDemo2 } from "./layout_demo2";
import ProgressBar from "../component/ProgressBar";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`

export const LayoutTemp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.pubprofiledata);
    // const userpath = location?.pathname?.split("/p/#/")[1] || "";
    const username = location?.pathname?.split("/")[1] || "";
    const [isLoading, setIsLoading] = useState(false);
    const [tempID, setTempID] = useState("");

    useEffect(() => {
        if (profileData.loading == "pending") {
            setIsLoading(true);
        } else if (profileData.loading == "succeeded") { 
            setTimeout(() => { setIsLoading(false) }, 2000);
        } else if (profileData.loading != "failed" || profileData.loading != "idle") {
            setTimeout(() => { setIsLoading(false) }, 4000);
        }
    }, [profileData.loading]);
 
    useEffect(() => {
        // setIsLoading(true); 
        // setTimeout(() => {
        //     if (username == "fahim") {
        //         dispatch(addProfileData(RESDATA))
        //     } else {
        //         dispatch(addProfileData({}))
        //     }
        //     setIsLoading(false);
        // }, 2000);
        dispatch(loadPubProfileData({ "user_or_hash_url": username})); 
    }, [username]);

    useEffect(() => {
       setTempID(profileData?.basicData?.template_id||""); 
    }, [profileData?.basicData]);

    return (profileData.loading == "pending" ? <ProgressBar/> :
        profileData.loading == "succeeded" ? <>
             { tempID==2 && <LayoutDemo1/>}
             {tempID==4 && <LayoutDemo2/>}
        </> : <MemberNotFound msg={profileData.msg} />)
}