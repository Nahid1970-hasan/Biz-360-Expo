import { StyledCheckboxChildren, StyledCheckboxLabel } from "./style/styled_checkbox_label"
import { t } from "i18next";
export const RadioLabel = ({ size, id, label, checked = false, onClick = (() => { }), slctcolor, lblsize, lblcolor, hvcolor, ...props }) => {

    return <StyledCheckboxLabel lblsize={lblsize} lblcolor={lblcolor} onClick={onClick || null}  slctcolor={slctcolor} hvcolor={hvcolor} size={size} {...props}>
        <div>
            <span id={id} className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "} onClick={onClick || null}>
                {checked ? "radio_button_checked" : "radio_button_unchecked"}
            </span>
        </div>
        {!!label ? <span>{t(label)}</span> : <></>}
    </StyledCheckboxLabel>
}

export const RadioChildren = ({ children, width, size, onClick = (() => { }), justifycontent, checked = false, slcolor, hvcolor, ...props }) => {

    return <StyledCheckboxChildren onClick={onClick || null} slcolor={slcolor} justifycontent={justifycontent} width={width} hvcolor={hvcolor} size={size} {...props}>
        <div>
            <span className={size == "lg" ? "material-icons md-36" : size == "md" ? "material-icons md-24" : size == "sm" ? "material-icons md-20" : "material-icons"} >
                {checked ? "radio_button_checked" : "radio_button_unchecked"}
            </span>
        </div>
        {children}
    </StyledCheckboxChildren>
}
