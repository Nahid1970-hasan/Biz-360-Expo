import { Suspense, useEffect, useState } from "react"
import { Modal } from "../../component/Modal";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Typography, ULine } from "../../component/style/styled_typography";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CheckboxLabel } from "../../component/Checkbox";
import { Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { Input } from "../../component/style/styled_input";
import { SizeBox } from "../../component/style/styled_sizebox";
import { IMPORTANTLINK, SOCIALLINK, SUPPORTDATA } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addDataList, selectIMLink, selectSCLink, selectSPPList, updateTemplateContent } from "../template/temp_footer_setup_data_slice";

export const SetupTempSeasonalFFooterModalPage = ({ open, setOpen = () => { }, data }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const admFTTmpListData = useSelector((state) => state.admfttempsetupdata);
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");

    const [support_title, set_support_title] = useState("");
    const [imp_link_title, set_imp_link_title] = useState("");
    const [scl_link_title, set_scl_link_title] = useState("");

    useEffect(() => {

        set_support_title(data?.support?.title || "");
        set_imp_link_title(data?.important_link?.title || "");
        set_scl_link_title(data?.social_media?.title || "")
        var datad = {
            socialList: data?.social_media?.link || SOCIALLINK, 
            supportdatalist: data?.support?.datalist || SUPPORTDATA
        }
        dispatch(addDataList(datad))
    }, [data]);

    function handleSubmit() {
        var data = {
            "support": {
                "title": support_title,
                "datalist": admFTTmpListData?.supportDataList
            }, 
            "social_media": {
                "title": scl_link_title,
                "link": admFTTmpListData?.socialLinkList
            }
        }
        dispatch(updateTemplateContent({ "template_id": admTempData.tempInfoData?.template_id || 0, "template_footer": JSON.stringify(data) }))
    }

    useEffect(() => {
        if (admFTTmpListData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false) }, 2000);
        }
    }, [admFTTmpListData.addUpdateLoading]);

    return (<>
        <Modal
            md={8}
            sm={8}
            xs={12}
            title={t("update_footer")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <div>
                <Flex row="row" justifycenter="true" >
                    <Flex md={12} padding="0 !important">
                        <CardHeaderButton>
                            {admTempData?.langList?.length > 0 ?
                                <Select
                                    app="true"
                                    name="lang"
                                    onChange={(e) => { setMenuLang(e.target.value) }}
                                    value={menuLang || "en"}
                                >
                                    <option disabled value={0}>
                                        {t("ph_select")}
                                    </option>
                                    {
                                        admTempData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                    }
                                </Select>
                                : <></>}
                        </CardHeaderButton>
                        <ULine />
                    </Flex>
                    <Flex row="true">
                        <Flex md={4} padding="0 !important">
                            <Label>{t("support_title")}</Label>
                            <Input
                                type="text"
                                name='support_title'
                                placeholder={t("ph_support_title")}
                                value={support_title}
                                onChange={(e) => set_support_title(e.target.value)}
                            />
                        </Flex>
                        <Flex md={4} padding="0 5px !important">

                            <Label>{t("important_link_title")}</Label>
                            <Input
                                type="text"
                                name='imp_link_title'
                                placeholder={t("ph_imp_link_title")}
                                value={imp_link_title}
                                onChange={(e) => set_imp_link_title(e.target.value)}
                            />

                        </Flex>
                        <Flex md={4} padding="0 !important">
                            <Label>{t("social_media_title")}</Label>
                            <Input
                                type="text"
                                name='scl_link_title'
                                placeholder={t("ph_scl_link_title")}
                                value={scl_link_title}
                                onChange={(e) => set_scl_link_title(e.target.value)}
                            />

                        </Flex>
                    </Flex>
                    <Flex row="true">
                        <Flex md={12} padding="0 !important">
                            <Label margin={"8px 0 5px 0"}>{t("support_info_data")}</Label>
                            <ULine />
                            {
                                admFTTmpListData?.supportDataList?.map((d, i) => <CheckboxLabel id={"spp_" + d.id} key={i} checked={d.status == "Active" ? 1 : 0} onClick={(e) => { dispatch(selectSPPList(e.target.id)) }} label={d.name} labelcolor="font" size={"md"} />)
                            }
                        </Flex>
                    </Flex>
                    <Flex row="true"> 
                        <Flex md={12} padding="0 !important">
                            <Label margin={"8px 0 5px 0"}>{t("social_media_link")}</Label>
                            <ULine />
                            {
                                admFTTmpListData?.socialLinkList?.map((d, i) => <CheckboxLabel id={"scl_" + d.icon_id} key={i} checked={d.status == "Active" ? 1 : 0} onClick={(e) => { dispatch(selectSCLink(e.target.id)) }} label={d.name} labelcolor="font" size={"md"} />)
                            }
                        </Flex>
                    </Flex>
                    <Flex md={12}>
                        <CardHeaderButton>
                            <PrimaryButton
                                type="button"
                                onClick={handleSubmit}
                            >
                                {t("submit")}
                            </PrimaryButton>
                        </CardHeaderButton>
                    </Flex>
                </Flex>
            </div>
        </Modal>
    </>)
}