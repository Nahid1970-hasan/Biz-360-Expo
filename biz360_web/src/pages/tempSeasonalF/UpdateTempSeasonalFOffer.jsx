import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography"
import { Suspense, useEffect, useRef, useState } from "react";
import { Flex } from "../../component/style/styled_flex";
import { Label } from "../../component/style/styled_label";
import { useTranslation } from "react-i18next";
import { KDImg } from "../../component/style/styled_img";
import { CardHeaderButton, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { InlineDiv } from "../../component/style/styled_inlineflex";
import { PrimaryButton } from "../../component/style/styled_button";
import { CompBannerSection } from "../../component/TempContent/BannerSection";
import { CompProductDetailsCard } from "../../component/TempContent/ProductLabelCard"; 
import { Input } from "../../component/style/styled_input";
import { Formik } from "formik";
import { Modal } from "../../component/Modal";
import { updateTempBDCSC } from "../template/temp_body_setup_data_slice";
import { loadPage } from "../../features/page/page_slice";

export const UpdateTempSeasonalFOfferPage = () => {
    const admTempData = useSelector((state) => state.admupdatetempdata);
    const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);

    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");

    const [section1data, setSection1Data] = useState({}); 
    const [section1Open, setSection1Open] = useState(false); 
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();   
    const formRef = useRef();

    const [bdc_data, set_bdc_data] = useState({
        section1_title: "",
        section1_count: ""
    });

      useEffect(() => {
                dispatch(loadPage({
                    title: 'offer_template',
                    button: false
                }))
            }, []);
        

    const validate = (values) => {
        let errors = {};

        return errors;
    };

    useEffect(() => {
        var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page3 ||{};
        setSection1Data(infoBodyData?.section1 || {});
        set_bdc_data({
            section1_title: infoBodyData?.section1?.section1_title || "",
            section1_count: infoBodyData?.section1?.section1_count || ""
        })
    }, [admTempData]);

    const submitForm = (values) => {
        var data = {
            "section1": {
                "section1_title": values.section1_title || "",
                "section1_count": values.section1_count || 0,
                "data": (parseInt(values.section1_count) || 0) < 1 ? [] : Array.apply(null, { length: parseInt(values.section1_count) })?.map((d, i) => ({ "id": (i + 1), url: admTempData.tempInfoData?.category || "", tag: i % 2 == 0 ? "Flash Sale" : "", price: 100, priceoff: 120, label: "Product Title " + (i + 1), }))
            }
        }
        dispatch(updateTempBDCSC({ "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({'page3':data})}))
    }

    useEffect(() => {
        if (admTempBDCData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setSection1Open(false) }, 2000);
        }
    }, [admTempBDCData.addUpdateLoading]);
 

    var catResponsive = {
        0: { items: 2 },
        568: { items: 4 },
        1024: { items: 6 },
    }
    return (<>
        <Suspense>
            <Flex row="true">
                <Flex padding={"0 5px !important"} md={12}>
                    <InfoCard>
                        <InlineDiv>
                            <Label>{t("section_1", { lng: menuLang })} {"(" + t("offer_section") + ")"}</Label>
                            <PrimaryButton onClick={() => { setSection1Open(true) }}>{t("update")}</PrimaryButton>
                        </InlineDiv>
                    </InfoCard>
                </Flex>
                <Flex md={12}>
                    <ShadowCard>
                        <InfoCard>
                            <Flex row="true">
                                <Flex md={12}>
                                    <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                        {section1data?.section1_title || t("offer_products")} {"( " + (section1data?.data?.length||0) + " Products Found )"}
                                    </Typography>
                                </Flex>
                                <Flex md={12} padding="10px 0 0 0!important">
                                    <Flex row="true">
                                        {section1data?.data?.map((d, i) =>
                                            <Flex key={i} md={3}>
                                                <CompProductDetailsCard height={"200px"} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                            </Flex>)}
                                    </Flex>
                                </Flex>
                            </Flex>
                        </InfoCard>
                    </ShadowCard>
                </Flex>

            </Flex>
        </Suspense>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("update_offer_page")}
            open={section1Open}
            onClose={() => {
                setSection1Open(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={bdc_data}
                validate={validate}
                onSubmit={submitForm}
                innerRef={formRef}
                enableReinitialize
            >
                {(formik) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                        setFieldValue,
                        resetForm,
                    } = formik;

                    return (
                        <Flex row="row" justifycenter="center">
                            <Flex md={8} sm={12} xs={12} padding="0">
                                <Label>{t("section1_title")}</Label>
                                <Input
                                    type="text"
                                    name='section1_title'
                                    placeholder={t("ph_section1_title")}
                                    value={values.section1_title}
                                    onChange={v => {
                                        setFieldValue('section1_title', v.target.value);
                                    }}
                                    onBlur={handleBlur}
                                />
                                <Label>{t("section1_count")}</Label>
                                <Input
                                    type="number"
                                    name='section1_count'
                                    max={3}
                                    placeholder={t("ph_section1_count")}
                                    value={values.section1_count}
                                    onChange={v => {
                                        setFieldValue('section1_count', (parseInt(v.target.value) || 0));
                                    }}
                                    onBlur={handleBlur}
                                />

                            </Flex>
                        
                            <Flex md={8} sm={12} xs={12} padding="0">
                                <CardHeaderButton top="10px" padding="0 10px">
                                    <PrimaryButton
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        {t("submit")}
                                    </PrimaryButton>
                                </CardHeaderButton>
                            </Flex>
                        </Flex>
                    )
                }}
            </Formik>
        </Modal >
    </>)
}