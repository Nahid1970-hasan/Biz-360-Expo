import { t } from "i18next"
import { RadioLabel } from "../component/RadioButton"
import { ShadowCard } from "../component/style/styled_card"
import { Center } from "../component/style/styled_center"
import { SizeBox } from "../component/style/styled_sizebox"
import { Typography, ULine } from "../component/style/styled_typography"
import { getValueByLang } from "../utils/helper"
import { useState } from "react"

export const MembershipPckItem = ({ size, sndata, checked = false, invoiceid, setSnData = (() => { }), }) => {
    const [isChecked, setIsChecked] = useState(checked || false);
   
    return (<ShadowCard>
        <Typography fntsize="cardTitleFontSize"> {getValueByLang(sndata?.sn_name || "{}")}</Typography>
        <SizeBox />
        <ULine />
        <Typography fntsize="dsFontSize" fntweight="bold"> {sndata?.sn_duration || "0"} {t("days")} {"/"} &#x9F3;{sndata?.sn_rate || "0"}</Typography>
        <SizeBox />
        <Typography txtalign="left" fntsize="cardSubTitleFontSize"> {t("description")}</Typography>
        <Typography margin="4px 0" txtalign="left" fntsize="cardContentFontSize"> {getValueByLang(sndata?.sn_desc || "{}")}</Typography>
        <Center> <RadioLabel size={size || "lg"} disabled={invoiceid} checked={ isChecked} onClick={(invoiceid ||sndata?.selected != 0 )? null : () => (setIsChecked(!isChecked), setSnData(sndata))} /></Center>
    </ShadowCard>)
}
