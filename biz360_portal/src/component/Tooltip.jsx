import { useState } from "react"  
import { Center } from "./style/styled_center";
import { TooltipBox, TooltipListBox, TooltipTarget, TooltipWrapper } from "./style/styled_tooltip";
import { Label } from "./style/styled_label";
import { Typography } from "./style/styled_typography";
import { getValueByLang } from "../utils/helper";

export const Tooltip = ({ title, children, position,headertitlefont, background, color, width, tbwidth }) => {
    const [isHover, setIsHover] = useState(false);

    return <TooltipWrapper>
        <TooltipTarget  background={background} width={width} color={color} headertitlefont={headertitlefont}  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {children}
        </TooltipTarget>
        {
            isHover &&
            (<Center>
                <TooltipBox position={position} tbwidth={tbwidth}>{title}</TooltipBox>
            </Center>)
        }

    </TooltipWrapper>
}

export const ListTooltip = ({ title, children, position, headertitlefont, background, color, width }) => {
    const [isHover, setIsHover] = useState(false);

    return <TooltipWrapper  width={width} >
        <TooltipTarget  background={background} width={width} color={color} headertitlefont={headertitlefont}  onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {children}
        </TooltipTarget>
        {
            isHover &&
            (<Center>
                <TooltipListBox position={position}>
                    {title?.map((d,i)=><Typography txtalign="left" key={i} lnheight={2}>{getValueByLang(d.main_name || "{}")}</Typography>)} 
                </TooltipListBox>
            </Center>)
        }

    </TooltipWrapper>
}