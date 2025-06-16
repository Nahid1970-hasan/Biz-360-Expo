import { StyledTempPopUpMenu } from "./popup_temp_dd_menu"; 

export const PopoupDDMenuTemp = ({ children, open, left, right, top, width }) => {
    return <StyledTempPopUpMenu open={open} left={left} right={right} width={width} top={top}> 
        {children}
    </StyledTempPopUpMenu>;
}