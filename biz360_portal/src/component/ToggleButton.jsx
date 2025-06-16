import { useState } from "react";
import { StyledToggledButton } from "./style/styled_toggle_button"

export const ToggleButton = ({active, set_active=()=>{}}) => { 
    function changeName(e) {
        setTimeout(() => {
            set_active(!active);
        }, 100);
    }
    function onTransition(e) {
        if (e.target === e.currentTarget) {

        }
    }
    return (<StyledToggledButton>
        <input type="radio" id="choice2" onClick={changeName} name="choice" value="Organization" />
        <label htmlFor="choice1">Individual</label>
        <input type="radio" onClick={changeName} id="choice1" name="choice" value="Individual" />
        <label htmlFor="choice2">Organization</label>
        <div id="flap" onTransitionEnd={onTransition}><span className="content">{active ? "Individual" : "Organization"}</span></div>
    </StyledToggledButton>)
};