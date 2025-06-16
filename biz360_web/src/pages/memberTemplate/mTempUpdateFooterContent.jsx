
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";  
import { useSelector } from "react-redux";  
import { MUpdateTempFooterPage } from "./mTempFooterUpdate";
import { MUpdateTempSeasonalFFooterPage } from "./seasonalFTemp/mTempSeasonalFFooter";
import { Center } from "../../component/style/styled_center";
import { Typography } from "../../component/style/styled_typography";

export const MUpdateTempFooterContentPage = () => {
    const userData = useSelector((state) => state.user);
    const [tempInfo, setTempInfo] = useState({}); 
    const { t } = useTranslation(); 
    
    useEffect(() => {
     setTempInfo(userData?.dashboard?.selected_template || {});
    }, [userData]);

    return (<>
        <Suspense>
             {tempInfo?.template_name =="seasonal"?
             <MUpdateTempSeasonalFFooterPage/>: tempInfo?.template_name =="shopmart"? <MUpdateTempFooterPage/> : <Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                            {t('temp_not_ready_to_view')}</Typography></Center>}
        </Suspense>
    </>)
}