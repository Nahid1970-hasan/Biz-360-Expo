import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { NavHeader } from "./navHeader";
import Footer from "./footer";
import { PubNavSideBar } from "./PubNavSidebar";
import { useEffect, useRef } from "react";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`
export const LayoutHome = () => {

    const sideBarRef = useRef(null);
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        let element = sliderRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;
        let toggle = true;
        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginRight = "-271px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginRight = sideBarRef.current.style.marginRight != "0px" ? "0px" : "-271px";
            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        }

        element.addEventListener("click", clickSlider);
        obsDom.addEventListener("click", collapsedSidebar);


        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        }

    }, [sliderRef]);

    

    useEffect(() => { 
        window.addEventListener("resize", ()=>{});
        return () => window.removeEventListener("resize", ()=>{});
    }, []);
    
    return (
        <>
            <PubNavSideBar ref={sideBarRef} />
            <div ref={bodyRef}> 
                <NavHeader ref={sliderRef}  />
                <BodyArea>
                    <Outlet />
                </BodyArea>
            </div> 
            <Footer />
        </>)
}