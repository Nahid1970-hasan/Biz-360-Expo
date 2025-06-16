import { StyledBadge } from "./style/styled_badge"

export const Badge = ({ children, badgecontent, bgcolor }) => {
    return (<StyledBadge badgecontent={badgecontent} bgcolor={bgcolor}>
        {children}
        <span>{badgecontent}</span>
    </StyledBadge>);
}