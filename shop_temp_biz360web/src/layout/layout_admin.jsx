import { useEffect, useRef } from "react"
import { Outlet } from "react-router-dom" 
import { theme } from "../styles/theme" 
import { SideBarAdmin } from "./sidebar_admin"
import { AdminDashboardHeader } from "./dashboard_header_admin"
import { BodyContent } from "../component/style/styled_body_content"
import { Dashboard } from "./Dashboard"

export const LayoutAdmin = () => {
    const sideBarRef = useRef(null);
    const sliderRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        let element = sliderRef.current;
        let obsDom = sideBarRef.current.nextElementSibling;
        
        let toggle = window.innerWidth < +theme.layout.sm.replace("px", '');

        function collapsedSidebar() {
            obsDom.classList.remove("obscure");
            sideBarRef.current.style.marginLeft = "-271px";
            toggle = true;
        }
        function clickSlider() {
            sideBarRef.current.style.marginLeft = toggle ? "0px" : "-271px";
            bodyRef.current.style.paddingLeft = toggle && window.innerWidth > +theme.layout.sm.replace("px", '')
            ? "270px" : "10px";
            
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

    return (
        <>
            <SideBarAdmin ref={sideBarRef} /> 
            <BodyContent ref={bodyRef}>
                <AdminDashboardHeader ref={sliderRef} /> 
                <main>
                    <Outlet />
                </main>
            </BodyContent>
        </>)
}