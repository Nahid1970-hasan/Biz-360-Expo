
import { InfoCard } from "../../component/style/styled_card";
import { KDImg } from "../../component/style/styled_img";
import { Typography } from "../../component/style/styled_typography";
 

export const CompProductCard = ({ height = "100px", width = "100%", src, label, onClick=()=>{}, size = "md" }) => {
    return (<InfoCard>
        <KDImg height={height} width={width} cursor={onClick?"pointer":"auto"} noborder="true" onClick={onClick} src={src} alt="IMG" />
        {label && <Typography fntweight="bold" fntsize={size == "lg" ? "cardTitleFontSize" : size == "md" ? "cardSubTitleFontSize" : "cardContentFontSize"}>
            {label}
        </Typography>}
    </InfoCard>)
}