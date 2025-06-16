
import { Chip, FillChip } from "../Chip";
import { InfoCard, LabeledCard } from "../style/styled_card";
import { KDImg } from "../style/styled_img";
import { InlineDiv } from "../style/styled_inlineflex";
import { Typography } from "../style/styled_typography";

export const CompProductDetailsCard = ({ height = "100px", width = "100%", noborder="true", src, label, price, priceoff, tag, size = "md" }) => {
    return (<LabeledCard background="bg">
        {tag && <FillChip label={tag} background={"primaryBg"} color={"primaryFont"} labelfont="smFont"/>}
        <KDImg height={height} width={width} noborder={noborder} src={src} alt="IMG" />
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