import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { HeaderTempLayout } from "./layout_temp_header";
import { FooterTempLayout } from "./layout_temp_footer";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`
export const LayoutDemo1 = () => {
    return (
        <>
            <header>
                <HeaderTempLayout />
            </header>
            <BodyArea>
                <Outlet />
            </BodyArea>
            <FooterTempLayout />
        </>)
}