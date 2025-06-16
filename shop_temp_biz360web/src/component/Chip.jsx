import { StyledChip, StyledFillChip } from "./style/styled_chip";
import { ChipInput } from "./style/styled_input";

export const Chip = ({ label, color }) => {
    return <StyledChip color={color}>
        <span>{label}</span>
    </StyledChip>;
}

export const ColorChip = ({color }) => {
    return <ChipInput  
    type="color"
    name="color_code_grid" 
    value={color || "#000"} 
    disabled
  />;
}

export const FillChip = ({ label, color,labelfont, background }) => {
    return <StyledFillChip color={color} fntsize={labelfont} background={background}>
        <span>{label}</span>
    </StyledFillChip>;
}