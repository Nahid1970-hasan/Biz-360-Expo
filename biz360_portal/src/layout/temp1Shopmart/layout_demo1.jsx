import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { HeaderTempLayout } from "./layout_temp_header";
import { FooterTempLayout } from "./layout_temp_footer";
import { useEffect, useRef } from "react";
import { LayoutDemoSideBar } from "./layout_temp_sidebar";
import useMediaQuery from "../../component/MediaQuery";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 0px; 
        margin-top: 60px;
    }
`
export const LayoutDemo1 = () => {
    const sideLBarRef = useRef(null);
    const sliderLRef = useRef(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

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

    return (
        <>
            <LayoutDemoSideBar ref={sideLBarRef} />
            <header>
                <HeaderTempLayout ref={sliderLRef} />
            </header>
            <BodyArea>
                <Outlet />
            </BodyArea>
            <FooterTempLayout />
        </>)
}