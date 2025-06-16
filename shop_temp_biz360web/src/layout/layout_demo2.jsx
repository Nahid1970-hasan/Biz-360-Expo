import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { SidebarTemp2Layout } from "./layout_demo2_sidebar";
import { HeaderTemp2Layout } from "./layout_demo2_header";
import FooterTemp2Layout from "./layout_demo2_footer";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`
export const LayoutDemo2 = () => {
    return (
        <>
           <SidebarTemp2Layout ref={sideBarRef} />
            <div ref={bodyRef}>
                <HeaderTemp2Layout ref={sliderRef} />
                <main>
                    <div style={{ position: "relative" }}>
                        <Outlet />
                    </div>
                    {/* <div style={{ position: "absolute" }}>
                        <MediaArea>

                            <ChatButton call ><a href="/#/contact" target="_blank"><img src={call} alt="whatsapp"></img></a></ChatButton>
                            <ChatButton call ><a href="https://m.me/100075877677192" target="_blank"><img src={messenger} alt="messenger"></img></a></ChatButton>
                            <ChatButton call ><a href="https://api.whatsapp.com/send?phone=01711662065" target="_blank"><img src={whatsapp} alt="messenger"></img></a></ChatButton>

                        </MediaArea>
                    </div> */}
                </main>
            </div>
            <FooterTemp2Layout />
        </>)
}