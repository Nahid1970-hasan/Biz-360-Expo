import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Loading } from "../component/Loading";
import { useEffect, useState } from "react";
import { addProfileData } from "../features/pubprofile/pub_profile_data";
import { porfileData } from "../utils/helper"
import styled from "styled-components";
import { theme } from "../styles/theme";
import { PageNotFound } from "../pages/NotFound";
import { loadDFProfileData } from "../features/pubprofile/default_profile_data";
import { DVHeaderTempLayout } from "./layout_default_header";
import { DVFooterTempLayout } from "./layout_default_footer";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`

export const LayoutDefaultTemp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.dfprofiledata);
    const userpath = location?.pathname?.split("/d/")[1] || "";
    const username = userpath?.split("/")[0] || "";
    const [isLoading, setIsLoading] = useState(false);
    const [tempReady, setTempReady] = useState(0);

    useEffect(() => {
        if (profileData.loading == "pending") {
            setIsLoading(true);
        } else if (profileData.loading == "succeeded") {
            dispatch(addProfileData(porfileData))
            setTimeout(() => { setIsLoading(false) }, 2000);
        } else if (profileData.loading != "failed" || profileData.loading != "idle") {
            setTimeout(() => { setIsLoading(false) }, 2000);
        }
    }, [profileData.loading]);

    useEffect(() => {
        var infoBodyData = JSON.parse(profileData?.bodyData || "{}")?.home || {};
        setTempReady(Object.keys(infoBodyData).length);
    }, [profileData?.bodyData]);

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
        dispatch(loadDFProfileData({ "hash_url": username }));
    }, [username]);

    return (isLoading ? <Loading open={isLoading} /> :
        profileData?.loading == "succeeded" ? tempReady > 0 ? <>
            <header>
                <DVHeaderTempLayout />
            </header>
            <BodyArea>
                <Outlet />
            </BodyArea>
            <DVFooterTempLayout />
        </> : <PageNotFound msg={"Template Not Ready to View"} /> : <PageNotFound msg={profileData.msg} />)
}