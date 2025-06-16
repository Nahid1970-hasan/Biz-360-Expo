
import { InfoCard } from "../style/styled_card";
import { KDImg } from "../style/styled_img";
import { Typography } from "../style/styled_typography";

export const CompProductCard = ({ height = "100px", width = "100%", src, label, size = "md" }) => {
    return (<InfoCard>
        <KDImg height={height} width={width} noborder={src?"true":null} src={src} alt="IMG" />
        {label && <Typography fntweight="bold" fntsize={size == "lg" ? "cardTitleFontSize" : size == "md" ? "cardSubTitleFontSize" : "cardContentFontSize"}>
            {label}
        </Typography>}
    </InfoCard>)
}