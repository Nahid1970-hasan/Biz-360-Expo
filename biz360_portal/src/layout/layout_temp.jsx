import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPubProfileData } from "../features/pubprofile/pub_profile_data";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { MemberNotFound, TemplateNotFound } from "../pages/NotFound";
import { LayoutDemo1 } from "./temp1Shopmart/layout_demo1";
import ProgressBar from "../component/ProgressBar";
import { LayoutDemo6 } from "./temp6Seasonal/layout_demo6";
import { useTranslation } from "react-i18next";
import bizlogo from "../assets/banner-icon/icon-mini-biz360expo.png"

export const LayoutTemp = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.pubprofiledata);
    const username = location?.pathname?.split("/")[1] || "";
    const [isLoading, setIsLoading] = useState(false);
    const [tempID, setTempID] = useState("");
    const [tempUrl, setTempUrl] = useState("");
    const [fullName, setFullName] = useState("");
    const [isPublished, setIsPublished] = useState(true);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        window.addEventListener("resize", () => { });
        return () => window.removeEventListener("resize", () => { });
    }, []);

    useEffect(() => {
        if (profileData.loading == "pending") {
            setIsLoading(true);
        } else if (profileData.loading == "succeeded") {
            setTimeout(() => { setIsLoading(false) }, 2000);
        } else if (profileData.loading == "failed") {
            setTimeout(() => { setIsLoading(false) }, 4000);
        }
    }, [profileData.loading]);

    useEffect(() => {
        dispatch(loadPubProfileData({ "user_or_hash_url": username }));
    }, [username]);

    useEffect(() => {
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = profileData?.headerData?.logo || bizlogo; 
    }, [profileData?.headerData]);

    useEffect(() => { 
        setFullName(profileData?.fullname || "")
        document.title = profileData?.basicData?.biz_name ? profileData?.basicData?.biz_name : profileData?.basicData?.fullname || t('Biz 360 Expo')
        setTempID(profileData?.basicData?.template_id || "");
        setTempUrl(profileData?.basicData?.template_url || "");
        setIsPublished(profileData?.basicData?.published == 1)
    }, [profileData?.basicData]);

    return (profileData.loading == "pending" ? <ProgressBar /> :
        profileData.loading == "succeeded" ? tempUrl ? <>
            {tempUrl == "shopmart" && <LayoutDemo1 />}
            {tempUrl == "seasonal" && <LayoutDemo6 />}
        </> : <TemplateNotFound name={profileData?.fullname || "---"} /> : <MemberNotFound msg={profileData.msg} />)
}