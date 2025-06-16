import { StyledMenu } from "./style/styled_menu";

export const Menu = ({ children, open, left, right, top, width }) => {
    return <StyledMenu open={open} left={left} right={right} width={width} top={top}>
        <ul id="userpanel">
            {children}
        </ul>
    </StyledMenu>;
}