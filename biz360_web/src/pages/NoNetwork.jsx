 
import { useTranslation } from "react-i18next";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";

export const NotNetwork= () => {
     const { t, i18n } = useTranslation();
    
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="extraLargeFontSize" color="font">404</Typography>
            <Typography fntsize="headingLargeFontSize" >
                {t("network_error_msg")}
            </Typography> 
        </Center>
    </div>
}