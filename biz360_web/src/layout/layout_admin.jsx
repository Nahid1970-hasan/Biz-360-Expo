import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "../styles/theme";
import { SideBarAdmin } from "./sidebar_admin";
import { BodyContent } from "../component/style/styled_body_content";
import { useSelector } from "react-redux";
import { AdminDashboardHeader } from "./dashboard_header_admin";

export const LayoutAdmin = () => { 
    const sideBarRef = useRef(null);
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        const element = sliderRef.current;
        const obsDom = sideBarRef.current?.nextElementSibling;
     


        if (!element || !obsDom) {
            console.error("Ref elements are not available.");
            return;
        }

        let toggle = window.innerWidth < +theme.layout.sm.replace("px", '');

        const collapsedSidebar = () => {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginLeft = "-271px";
            toggle = true;
        };

        const clickSlider = () => {
            sideBarRef.current.style.marginLeft = toggle ? "0px" : "-271px";
            bodyRef.current.style.paddingLeft = toggle && window.innerWidth > +theme.layout.sm.replace("px", '')
                ? "270px" : "10px";

            toggle = !toggle;
            obsDom.classList.toggle('obscure');
        };

        element.addEventListener("click", clickSlider);
        obsDom.addEventListener("click", collapsedSidebar);

        return () => {
            element.removeEventListener("click", clickSlider);
            obsDom.removeEventListener("click", collapsedSidebar);
        };
    }, [sliderRef, sideBarRef]);

    return (
        <>
            <SideBarAdmin ref={sideBarRef} /> 
            <BodyContent ref={bodyRef}> 
                <AdminDashboardHeader ref={sliderRef}/>
                <main>
                    <Outlet />
                </main>
            </BodyContent>
        </>
    );
};