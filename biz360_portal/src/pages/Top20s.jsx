 
import { useTranslation } from "react-i18next";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";
import useTitle from "../hooks/useTitle";

export const Top20sPage= () => {
     const { t, i18n } = useTranslation();
    useTitle(t('top_20_title'))
    return <div style={{ userSelect: "none" }}>
        <Center> 
            <Typography fntsize="headingLargeFontSize" >
               Top 20s Page
            </Typography> 
        </Center>
    </div>
}