

import { NavLink } from "react-router-dom";
import { getValueByLang } from "../../utils/helper";
import { Typography } from "../../component/style/styled_typography";
import { StyledTemp6NavbarLI } from "../../component/style/styled_temp6_navbar";
import { forwardRef, Suspense } from "react";
import styled from "styled-components";
import { Flex } from "../../component/style/styled_flex";
import { DownloadButton } from "../../component/style/styled_button";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Badge } from "../../component/Badge";
import { useSelector } from "react-redux";

const BottomNavPanel = styled.div`
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    color: #000;
    background: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 60px; 
    display: flex;
    justify-content: space-between;
    &>button {
        margin: 0;
        height: 100%;
        width: 100%;
        margin-right: 10px;
    }
    &>div {
        margin: 0;
        height: 100%;
        width: 150px; 
        justify-content: center;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            background: ${({ theme }) => theme.colors.primaryHover};
        }
    }
`
export const LayoutTemp6BottomNav = forwardRef((_, ref) => {
     const custTempOrder = useSelector((state) => state.custOrderData);

    return (
        <Suspense>
            <BottomNavPanel>
                <DownloadButton>
                    {t(custTempOrder?.dataList?.length>0?"place_order":"start_buying")}
                </DownloadButton>
                <div ref={ref}><Badge badgecontent={custTempOrder?.dataList?.length||""} bgcolor="error">
                    <span className="material-icons md-36">shopping_cart</span>
                </Badge></div>
            </BottomNavPanel>
        </Suspense>
    );
});
