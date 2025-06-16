import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Typography, ULine } from "../../component/style/styled_typography";
import { LayoutDemo6RSideBar } from "./layout_demo6_RSidebar";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HeaderTemp6Layout } from "./layout_demo6_header";
import { FooterTemp6Layout } from "./layout_demo6_footer";
import { LayoutTemp6BottomNav } from "./layout_demo6_bottom_nav";
import { BottomNavPanel } from "../../component/styled_bottom_nav_panel";
import { DownloadButton } from "../../component/style/styled_button";
import { Badge } from "../../component/Badge";
import useMediaQuery from "../../component/MediaQuery";
import { LayoutDemo6SideBar } from "./layout_demo6_sidebar";
import { numberWithCommas } from "../../utils/helper";

const MediaArea = styled.div`
    position: fixed;
    z-index: 2;
    top: 35%;
    height: auto;
    display: grid;
    bottom: auto;
    cursor: pointer;
    align-content: space-around;
    right: 10px; 
    padding: 8px;
    border-radius: 5px;
    background: ${({ theme }) => (theme.colors.download)}; 
    opacity: 0.8;
    width: 100px;
    max-width: 120px;
    @media (max-width: 768px) {
        display: none;  
    }
    &:hover { 
        box-shadow: 0px 0px 12px 0px #888888; 
        opacity: 0.9; 
    }
    &>span { 
        text-align: center;
    }
`;

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 70px; 
        margin-top: 60px;
    }
`

export const LayoutDemo6 = () => {
    const sideBarRef = useRef(null);
    const sideLBarRef = useRef(null);
    const sliderRef = useRef(null);
    const sliderLRef = useRef(null);
    const sliderRRef = useRef(null);
    const bodyRef = useRef(null);
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const username = location?.pathname.split("/")[1] || "";
    const isMobile = useMediaQuery("(max-width: 768px)");
    const custTempOrder = useSelector((state) => state.custOrderData);

    useEffect(() => { 
        const handleResize = () => {
            sideBarRef.current.style.marginLeft = "0px";
            sideLBarRef.current.style.marginLeft = isMobile ? "-431px" : "-301px";
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        let element = sliderRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;
        let toggle = true;
        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginRight = isMobile ? "-431px" : "-301px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginRight = sideBarRef.current.style.marginRight != "0px" ? "0px" : isMobile ? "-431px" : "-301px";
            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        }

        element.addEventListener("click", clickSlider);+
        obsDom.addEventListener("click", collapsedSidebar);


        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        }

    }, [sliderRef]);

    const gotoPage = (e) => {
        if(custTempOrder?.dataList?.length>0){
            nevigate("/" + username + "/orders");
        }else{
           nevigate("/" + username);
        }
        
    }

    useEffect(() => {
        let element = sliderRRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;
        let toggle = true;
        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginRight = isMobile ? "-431px" : "-301px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginRight = sideBarRef.current.style.marginRight != "0px" ? "0px" : isMobile ? "-431px" : "-301px";
            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        }

        element.addEventListener("click", clickSlider);
        obsDom.addEventListener("click", collapsedSidebar);


        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        }

    }, [sliderRRef]);


    useEffect(() => {
        let element = sliderLRef.current;
        let obsDom = sideLBarRef.current.nextElementSibling;
        let toggle = true;
        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideLBarRef.current.style.marginLeft = isMobile ? "-431px" : "-301px";
            toggle = true;
        }
        function clickSlider() {
            sideLBarRef.current.style.marginLeft = sideLBarRef.current.style.marginLeft != "0px" ? "0px" : isMobile ? "-431px" : "-301px";
            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        }

        element.addEventListener("click", clickSlider);
        obsDom.addEventListener("click", collapsedSidebar);


        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        }

    }, [sliderLRef]);


    const getTotalTaka = (data) => {
        var tt = 0;
        var tt = data.length > 0 ? data?.map(item => parseFloat(item.total_price))?.reduce((prev, next) => prev + next) || 0 : 0;
        return tt;
    }
    return (
        <>
            <LayoutDemo6RSideBar ref={sideBarRef} />
            <LayoutDemo6SideBar ref={sideLBarRef} />
            <header>
                <HeaderTemp6Layout ref={sliderLRef} />
            </header>
            <main ref={bodyRef}>
                <div style={{ position: "relative" }}>
                    <BodyArea>
                        <Outlet />
                    </BodyArea>
                </div>
                <div style={{ position: "absolute" }}>
                    <MediaArea ref={sliderRRef}>
                        <span className="material-icons md-24">shopping_cart</span>
                        <Typography fntweight="bold">{custTempOrder?.dataList?.length || 0} {t(custTempOrder?.dataList?.length<2?"item":"items")}</Typography>
                        <ULine />
                        <Typography fntweight="bold">&#x9F3; {numberWithCommas(getTotalTaka(custTempOrder?.dataList))} </Typography>
                    </MediaArea>
                </div>
            </main>
            <FooterTemp6Layout />
            <BottomNavPanel>
                <DownloadButton onClick={(e) => gotoPage(e)}>
                    {t(custTempOrder?.dataList?.length>0?"place_order":"start_buying")}
                </DownloadButton>
                <div ref={sliderRef}><Badge badgecontent={custTempOrder?.dataList?.length || ""} bgcolor="error">
                    <span className="material-icons md-36">shopping_cart</span>
                </Badge></div>
            </BottomNavPanel>
        </>)
}