import { Suspense, useEffect, useRef, useState } from "react"
import { Center } from "../../component/style/styled_center"
import { Typography } from "../../component/style/styled_typography"
import { Flex } from "../../component/style/styled_flex"
import { useDispatch, useSelector } from "react-redux"
import { Formik } from "formik"
import { ErrLabel, Label } from "../../component/style/styled_label"
import { Select } from "../../component/style/styled_select"
import { Input } from "../../component/style/styled_input"
import { ULine } from "../../component/style/styled_uline"
import { CardHeaderButton } from "../../component/style/styled_card"
import { AlertButton, PrimaryButton } from "../../component/style/styled_button"
import { useTranslation } from "react-i18next"
import { updateTemplate } from "../../features/bizTemplate/template_slice"
import { getValueByLang } from "../../utils/helper"

export const UpdateTempBasicInfoPage = () => {

    const admTempData = useSelector((state) => state.admupdatetempdata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [main_data, set_main_data] = useState({
        template_id: 0,
        template_name: '',
        template_desc: '',
        group_id: 0,
        main_lang: 0,
        published: "DEFAULT",
    })


    useEffect(() => {
        var data = admTempData.tempInfoData || {};
        set_main_data({
            main_lang: localStorage.i18nextLng || "en",
            group_id: data.group_id,
            template_id: data.template_id,
            template_name: data.template_name,
            template_desc: getValueByLang(data.template_desc || "{}"),
            published: data.published == 1 ? "yes" : "no",
        });

    }, [admTempData.tempInfoData]);

    const SubmitForm = (values) => {
        var datad = {};
        var template_desc = {};
        datad['template_id'] = values.template_id || 0;
        template_desc[values.main_lang] = values.template_desc;
        datad.template_desc = JSON.stringify(template_desc); 
        datad.published = values.published == "yes" ? 1 : 0 || 0;
        dispatch(updateTemplate(datad));
    };

    const validate = (Values) => {
        let errors = {};
        if (!Values.template_desc) {
            errors.template_desc = t("err_msg_template_desc");
        } else if (Values.template_desc.length > 500) {
            errors.template_desc = t("err_500_legnth");
        }
        return errors;
    };

    return <Suspense>

        <Formik
            initialValues={main_data}
            validate={validate}
            enableReinitialize
            innerRef={formRef}
            onSubmit={SubmitForm}
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
                    resetForm,
                    setFieldValue
                } = formik;

                return (
                    <div>
                        <form onSubmit={handleSubmit}>

                            <Flex row="row">
                                <Flex md={6}>
                                    <CardHeaderButton>
                                        <Select
                                            app="true"
                                            name="main_lang"
                                            width="auto"
                                            onChange={(e) => {
                                                admTempData?.tempInfoData?.template_desc && setFieldValue("template_desc", getValueByLang(admTempData?.tempInfoData?.template_desc, e.target.value));
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            value={values.main_lang || 0}
                                        >
                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                admTempData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                    </CardHeaderButton>

                                    <Label>{t("biz_group")} </Label>
                                    <Select
                                        app="true"
                                        name="group_id"
                                        width="100%" 
                                        value={values.group_id || 0}
                                        disabled
                                    >
                                        <option disabled value={0}>
                                            {t("ph_select_val")}
                                        </option>
                                        {
                                            admTempData?.bizGroupList?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", values.main_lang)}</option>)
                                        }
                                    </Select>
                                    {
                                        errors.group_id && touched.group_id ? <ErrLabel>{errors.group_id}</ErrLabel> : null
                                    }


                                    <Label>{t("template_name")}</Label>
                                    <Input
                                        app="true"
                                        type="text"
                                        width="100%"
                                        name="template_name"
                                        value={values.template_name || ""}
                                        disabled
                                    />

                                    <Label>{t("template_desc")}</Label>

                                    <Input
                                        app="true"
                                        type="text"
                                        width="100%"
                                        name={"template_desc"}
                                        placeholder={t("template_desc")}
                                        value={values.template_desc || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        errors.template_desc && touched.template_desc ? <ErrLabel>{errors.template_desc}</ErrLabel> : null
                                    }
                                    <Label>{t("published")}</Label>
                                    <Select
                                        app="true"
                                        name="published"
                                        width="100%"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.published || 0}
                                    >
                                        <option disabled value={0}>
                                            {t("ph_select_val")}</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </Select>

                                </Flex>
                            </Flex>
                            <Flex row="true">
                                <Flex md={6} padding="0 10px 0 0 !important">
                                    <ULine />
                                    <CardHeaderButton>
                                        <AlertButton
                                            type="reset"
                                            onClick={resetForm}
                                        >
                                            {t("reset")}
                                        </AlertButton>
                                        <PrimaryButton
                                            type="submit"
                                            className={!(dirty && isValid) ? "disabled-btn" : ""}
                                            disabled={!(dirty && isValid) || disabled}
                                        >
                                            {t("submit")}
                                        </PrimaryButton>
                                    </CardHeaderButton>
                                </Flex>
                            </Flex>
                        </form>
                    </div>
                );
            }}
        </Formik>

    </Suspense>
}