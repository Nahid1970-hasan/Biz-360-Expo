import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { initLoader, loadInvAdvtismentData } from "../../features/invAd/inv_advert_Slice";
import { InvAdvertisementGrid} from "../../features/invAd/InvAdvertisementGrid";
import { AdvertisementModal } from "../../features/invAd/AdvertisementModal";

export const InvAdvertisementPage = () => {
    const invadvertisment = useSelector((state) => state.invadvertisment);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadInvAdvtismentData());
        dispatch(
            loadPage({
                title: ("inv_adt"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        invadvertisment.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invadvertisment.loading]);

   
    useEffect(() => {
        if (invadvertisment.addUpdateLoading == "pending") {
            setIsLoading(true) 
        }else if (invadvertisment.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadInvAdvtismentData()); 
            setTimeout(() => { dispatch(initLoader());}, 4000);
        } else {
            setTimeout(() =>{dispatch(initLoader()); setIsLoading(false);} , 4000);
        }
      }, [invadvertisment.addUpdateLoading]);

    const rowData = invadvertisment?.list?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        content_name_value: getValueByLang(d.content_name || "{}", lang),
        display_name_value: getValueByLang(d.display_name || "{}", lang),
        dimension_name_value: getValueByLang(d.dimension_name || "{}", lang),
    }));

    return invadvertisment.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {/* <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <InlineFlex justifycontent="end">
                        <Select
                            app="true"
                            name="lang"
                            onChange={(e) => { set_lang(e.target.value) }}
                            value={lang || "en"}
                        >

                            <option disabled value={0}>
                                {t("ph_select")}
                            </option>
                            {
                                invadvertisment?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            } 
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex> */}
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <InvAdvertisementGrid gridata={rowData} />
                </Flex>
            </Flex>
            <AdvertisementModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
