import { StyledPopUpMenu } from "./popup_dd_menu"; 

export const PopoupDDMenu = ({ children, open, left, right, top, width }) => {
    return <StyledPopUpMenu open={open} left={left} right={right} width={width} top={top}> 
        {children}
    </StyledPopUpMenu>;
}