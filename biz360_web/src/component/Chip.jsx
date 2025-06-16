import { StyledChip, StyledFillChip } from "./style/styled_chip";
import { ChipInput } from "./style/styled_input";

export const Chip = ({ label, color }) => {
    return <StyledChip color={color}>
        <span>{label}</span>
    </StyledChip>;
}

export const FillChip = ({ label, color,labelfont, fntweight, background }) => {
    return <StyledFillChip color={color} fntsize={labelfont} fntweight={fntweight} background={background}>
        <span>{label}</span>
    </StyledFillChip>;
}

export const ColorChip = ({color }) => {
    return <ChipInput  
    type="color"
    name="color_code_grid" 
    value={color || "#000"} 
    disabled
  />;
}