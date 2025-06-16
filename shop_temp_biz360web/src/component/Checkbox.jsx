import { useEffect, useMemo } from "react";
import { useState } from "react"
import { StyledCheckboxChildren, StyledCheckboxLabel } from "./style/styled_checkbox_label";
import { StyledCheckbox } from "./style/styled_checkbox";



export const Checkbox = ({ size, checked = false, slctcolor, hvcolor, ...props }) => {
    const [icon, setIcon] = useState(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank");
    const [isChecked, setIsChecked] = useState(checked || false);

    useMemo(() => {
        setIsChecked(checked);
        setIcon(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank")
    }, [checked]);

    return <StyledCheckbox slctcolor={slctcolor} hvcolor={hvcolor} size={size}>
        <input checked={isChecked} type="checkbox" onChange={(e) => { setIsChecked(e.target.checked); e.target.checked ? setIcon("check_box") : setIcon("check_box_outline_blank") }} {...props} />
        <span className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "}>
            {icon}
        </span>
    </StyledCheckbox>
}


export const CheckboxLabel = ({ size, label, checked = false, selectColor, labelSize, labelColor, hoverColor, ...props }) => {

    return <StyledCheckboxLabel labelSize={labelSize} labelColor={labelColor} selectColor={selectColor} hoverColor={hoverColor} size={size} {...props}>
        <div>
            <span className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "}>
                {checked ? "check_box" : "check_box_outline_blank"}
            </span>
        </div>
        {!!label ? <span>{label}</span> : <></>}
    </StyledCheckboxLabel>
}

export const CheckboxChildren = ({ children, size, checked = false, selectColor, labelSize, labelColor, hoverColor, ...props }) => {

    return <StyledCheckboxChildren selectColor={selectColor} hoverColor={hoverColor} size={size} {...props}>
        <div>
            <span className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "}>
                {checked ? "check_box" : "check_box_outline_blank"}
            </span>
        </div> 
        {children} 
    </StyledCheckboxChildren>
}