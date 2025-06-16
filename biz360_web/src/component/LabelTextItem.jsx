import styled from "styled-components";
import { IconButton } from "./IconButton";
import { InlineDiv, InlineFlex } from "./style/styled_inlineflex"
import { HLLabel, Label } from "./style/styled_label";
import { Typography } from "./style/styled_typography";
import { Chip, FillChip } from "./Chip";
import { ReactButton } from "./style/styled_button";
const InlineDivD = styled.div`
display: inline-flex;  
align-items: start; 
&>div {
    display: inline-flex;
    justify-content: space-between;
    align-items: start;
    font-size: 16px;
    font-weight: normal; 
    &> span {
        width:  ${({ width }) => width ?? '140px'};
        font-size: 16px;
        font-weight: 800;
    }
    &> label {
        padding: 0 4px;
    } 
}  
&> label { 
    padding: 0 4px;
    font-size: 16px;
    font-weight: normal; 
    &>span {
        display: flex;
        background: ${({ theme, background }) => !!background ? theme.colors[background] : theme.colors.success};
        color: ${({ theme, color }) => !!color ? theme.colors[color] : theme.colors.primaryFont};
        height: auto;
        vertical-align: middle;
        padding: 2px 10px;
        border-radius: 15px;
    }
}

`
export const LabelTextItem = ({ title, width, txtwidth = "60%", chilpcolor, lblfnt, lblcolor, buttontext,  txtonClick = () => { }, lblback, txtval, txtfnt, txtcolor, postfix = false }) => {
    return (<InlineDivD width={width}>
        <div>
            <span>{title}</span>
            <label>{":"}</label>
        </div>
        {<label>
            {buttontext && <div style={{textDecoration:"underline", cursor:"pointer"}} onClick={txtonClick}><span >{buttontext}</span></div>}
            {(txtval && chilpcolor)?<span>{txtval}</span>:txtval}
            {postfix && <IconButton bgcolor="modalHeader" onClick={txtonClick}><span className="material-icons md-15">content_copy</span></IconButton>}
        </label>}
    </InlineDivD>)
};