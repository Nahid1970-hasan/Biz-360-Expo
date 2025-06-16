import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useTranslation } from "react-i18next";
import "inner-image-zoom/lib/styles.min.css";
import { SeasonalFItemDetailsPage } from "./seasonalFTemp/SeasonalFItemDetails";
import { BekariItemDetailsPage } from "./bekariTemp/BekariItemDetails";
import useTitle from "../hooks/useTitle";

export const ItemDetailsInfoPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata); 
    const { t } = useTranslation(); 
    const [tempInfo, setTempInfo] = useState({}); 

    useEffect(() => { 
        setTempInfo(profilePubData?.basicData || {});
    }, [profilePubData?.basicData]);
 
    return (
        <>
            <Suspense>
                <Container>
                    {
                        tempInfo?.template_id > 0 ? <>
                            {
                                tempInfo?.template_id == 2 && <BekariItemDetailsPage />
                            }
                            {
                                tempInfo?.template_id == 6 && <SeasonalFItemDetailsPage />
                            }
                        </> : <Center><Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                            {t('temp_not_ready_to_view')}</Typography></Center>
                    }
                </Container>
            </Suspense>
        </>
    );
};
