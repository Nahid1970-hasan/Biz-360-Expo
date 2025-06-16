import { StyledBadge } from "./style/styled_badge"

export const Badge = ({ children, badgeContent }) => {
    return (<StyledBadge badgeContent={badgeContent}>
        {children}
        <span>{badgeContent}</span>
    </StyledBadge>);
}