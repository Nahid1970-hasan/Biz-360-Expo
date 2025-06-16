import { StyledIconButton } from "./style/styled_icon_button"

export const IconButton = ({ children,padding ,onClick, color, bgcolor, style , alignment, width, height ,display, nothover }) => {
    return <StyledIconButton bgcolor={bgcolor} height={height} nothover={nothover} padding={padding} style={style} color={color} alignment={alignment} width= {width} display={display} onClick={onClick}>
        {children}
    </StyledIconButton>
}