 
import { useNavigate } from "react-router-dom";
import { FillChip } from "../../component/Chip";
import { LabeledCard } from "../../component/style/styled_card";
import { KDImg } from "../../component/style/styled_img";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { Typography } from "../../component/style/styled_typography";

export const CompProductDetailsCard = ({ height = "100px", width = "100%",  username, section, src, label, price, priceoff, tag, onClick=()=>{},  size = "md" }) => {
    
    return (<LabeledCard background="bg">
        {tag && <FillChip label={tag} background={"primaryBg"} color={"primaryFont"} labelfont="smFont"/>}
        <KDImg height={height} width={width} noborder="true" src={src} alt="IMG" cursor={onClick?"pointer":"auto"} onClick={onClick} />
        <Typography margin="0 0 0 5px" fntweight="bold" txtalign="left" fntsize={size == "lg" ? "cardTitleFontSize" : size == "md" ? "cardSubTitleFontSize" : "cardContentFontSize"}>
            {label}
        </Typography>
        <InlineDiv>
            <Typography margin="0 0 0 5px" fntweight="bold" txtalign="left" fntsize={size == "lg" ? "cardTitleFontSize" : size == "md" ? "cardSubTitleFontSize" : "cardContentFontSize"}>
                {price}
            </Typography>
            <Typography decoration="line-through" margin="0 0 0 5px" color="error" fntweight="bold" txtalign="left" fntsize={size == "lg" ? "cardTitleFontSize" : size == "md" ? "cardSubTitleFontSize" : "cardContentFontSize"}>
                {priceoff}
            </Typography>
        </InlineDiv> 
    </LabeledCard>)
}