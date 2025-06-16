import { useEffect, useMemo, useRef } from "react";
import { useState } from "react"
import { StyledCheckboxChildren, StyledCheckboxLabel } from "./style/styled_checkbox_label";
import { StyledCheckbox } from "./style/styled_checkbox";
import { Input } from "./style/styled_input";
import { InfoCard } from "./style/styled_card";
import { InlineDiv } from "./style/styled_inlineflex";
import { Flex } from "./style/styled_flex";
import { t } from "i18next";
import { Label } from "./style/styled_label";



export const Checkbox = ({ size, checked = false, slctcolor, disabled, hvcolor, ...props }) => {
    const [icon, setIcon] = useState(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank");
    const [isChecked, setIsChecked] = useState(checked || false);

    useMemo(() => {
        setIsChecked(checked);
        setIcon(+checked == 2 ? "indeterminate_check_box" : checked ? "check_box" : "check_box_outline_blank")
    }, [checked]);

    return <StyledCheckbox slctcolor={slctcolor} hvcolor={hvcolor} size={size}>
        <input checked={isChecked} readOnly={disabled} type="checkbox" onChange={disabled? null : (e) => { setIsChecked(e.target.checked); e.target.checked ? setIcon("check_box") : setIcon("check_box_outline_blank") }} {...props} />
        <span className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "}>
            {icon}
        </span>
    </StyledCheckbox>
}


export const CheckboxLabel = ({ size, id, label, checked = false, onClick = (() => { }), slctcolor, lblsize, lblcolor, hvcolor, ...props }) => {

    return <StyledCheckboxLabel lblsize={lblsize} lblcolor={lblcolor} slctcolor={slctcolor} hvcolor={hvcolor} size={size} {...props}>
        <div>
            <span id={id} className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "} onClick={onClick || null}>
                {checked ? "check_box" : "check_box_outline_blank"}
            </span>
        </div>
        {!!label ? <span>{t(label)}</span> : <></>}
    </StyledCheckboxLabel>
}

export const CheckboxChildren = ({ children, id, size, onClick = (() => { }), cursor, checked = false, slcolor, hvcolor, ...props }) => {

    return <StyledCheckboxChildren slcolor={slcolor} hvcolor={hvcolor} cursor={cursor} size={size} {...props}>
        <div>
            <span id={id} value={+checked} className={size == "md" ? "material-icons md-18" : size == "sm" ? "material-icons md-15" : "material-icons "} onClick={onClick || null}>
                {checked ? "check_box" : "check_box_outline_blank"}
            </span>
        </div>
        {children}
    </StyledCheckboxChildren>
}


export const CheckboxLabelInput = ({ datalist = [], background = "bg", height, size, setDataList = () => { }, display }) => {
    const intRef = useRef();
    function updateCheckedRow(e) { 
        setDataList(datalist.map((d, i) => "chck" + i == e.target.id ? ({ ...d, show: !d.show }) : d));
    }
    function updateInputRow(e) {
        setDataList(datalist.map((d, i) => "inpt" + i == e.target.name ? ({ ...d, item_value: e.target.value }) : d));
    }
    return datalist.map((d, i) =>
        <InfoCard background={background} height={height} key={i} padding="5px">
            <InlineDiv display={display}>

                <Flex row="row">
                    <Flex md={5} sm={5} xs={5} padding="0 !important">
                        <div style={{ width: "230px", display: "flex", justifyContent: "flex-start" }}>
                            <CheckboxChildren padding="0" id={"chck" + i} checked={d?.show || false} size="md" onClick={d.type=="mobile"? null: updateCheckedRow}>
                                <Label>
                                    {d?.name}
                                </Label>
                            </CheckboxChildren>
                        </div>
                    </Flex>
                    <Flex md={7} sm={7} xs={7} padding="0 !important">
                        <Input app={"true"} type="text"  width={"100%"} ref={intRef} mnwidth="auto" defaultValue={d?.item_value || ""} name={"inpt" + i} disabled={d.type=="mobile" || !!!d?.show} onChange={(e) => { updateInputRow(e) }} />
                    </Flex>
                </Flex>
            </InlineDiv>
        </InfoCard>)
}

export const CheckboxRowLabelInput = ({ datalist = [], size, setDataList = () => { }, display }) => {

    function updateCheckedRow(e) {
        setDataList(datalist.map((d, i) => "chck" + i == e.target.id ? ({ ...d, show: !d.show }) : d));
    }
    function updateInputRow(e) {
        setDataList(datalist.map((d, i) => "inpt" + i == e.target.name ? ({ ...d, item_value: e.target.value }) : d));
    }
    return datalist.map((d, i) =>
        <Flex md={6} key={i} padding={i % 2 == 0 ? "0 5px 0 0  !important" : "0 0 0 5px !important"}>
            <InfoCard background="bg" padding="7px">
                <InlineDiv display={display}>
                    <Flex row="row">
                        <Flex md={5} padding={"0 !important"}>
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <CheckboxChildren padding="0" id={"chck" + i} checked={d?.show || false} size="md" onClick={updateCheckedRow}>
                                    <Label>{d?.name}</Label>
                                </CheckboxChildren>
                            </div>
                        </Flex>
                        <Flex md={7} padding={"0 !important"}>
                            <Input app={"true"} type="text" width={"100%"} mnwidth="auto" defaultValue={d?.item_value || ""} name={"inpt" + i} disabled={!!!d?.show} onChange={(e) => { updateInputRow(e) }} />
                        </Flex>
                    </Flex>
                </InlineDiv>
            </InfoCard>
        </Flex>
    )
}


export const CheckboxInput = ({ label = "", data = "", isChecked = false, size, setData = () => { }, display }) => {
    const [checked, set_checked] = useState(isChecked || false);

    function updateCheckedRow(e) {
        set_checked(!checked);
    }
    function updateInputRow(e) {
        setData(e.target.value);
    }
    return (
        <InlineDiv display={display}>
            <CheckboxLabel padding="0" checked={checked || false} size="md" onClick={updateCheckedRow} label={label || ""} />
            <Input app={"true"} type="text" width={"100%"} mnwidth="auto" defaultValue={data || ""} disabled={!checked} onChange={(e) => { updateInputRow(e) }} />
        </InlineDiv>
    );
}

export const CheckboxLabelTable = ({ datalist = [], size, setDataList = () => { }}) => {

    function updateCheckedRow(e) {
        setDataList(datalist.map((d, i) => "chck" + i == e.target.id ? ({ ...d, show: !d.show }) : d));
    }
    return datalist.map((d, i) =>
        <div key={i}>
            <CheckboxChildren padding="0" size={size || "md"} id={"chck" + i} cursor={d?.readonly?"no-drop":"pointer"} checked={d?.show || false} onClick={d?.readonly?null:updateCheckedRow}>
                <Label margin="0">{d?.title||"---"}</Label>
            </CheckboxChildren>
        </div>)
}