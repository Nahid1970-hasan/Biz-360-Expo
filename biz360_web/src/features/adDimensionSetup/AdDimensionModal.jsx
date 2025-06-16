import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { saveAdDimension, updateAdDimension } from "./ad_dimension_setup_slice";


export const AdDimensionModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const adDimensiondata = useSelector((state) => state.adDimensiondata);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();

    const [group_data, set_group_data] = useState({
        dimension_id: 0,
        dimension_name: '',
        price_weight: 0,
        width: 0,
        height: 0,
        group_lang: '',
    })


    useEffect(() => {
        if (data) {
            set_group_data({
                dimension_name: getValueByLang(data.dimension_name || "{}"),
                group_lang: localStorage.i18nextLng || "en",
                dimension_id: data.dimension_id,
                price_weight: data.price_weight,
                width: data.width,
                height: data.height
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        var datad = {};
        var dimension_name = {};
        add ? "" : datad['dimension_id'] = values.dimension_id || 0;
        dimension_name[values.group_lang] = values.dimension_name;
        datad.dimension_name = JSON.stringify(dimension_name);
        datad.price_weight = values.price_weight || 0,
        datad.width = values.width || 0,
        datad.height = values.height || 0,
        dispatch(add ? saveAdDimension(datad) : updateAdDimension(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.dimension_name) {
            errors.dimension_name = t("err_msg_dimension_name");
        } else if (Values.dimension_name.length > 260) {
            errors.dimension_name = t("err_260_legnth");
        }
        if (!Values.price_weight) {
            errors.price_weight = t("err_msg_price");
        }
        if (!Values.width) {
            errors.width = t("err_msg_width");
        }
        if (!Values.height) {
            errors.height = t("err_msg_height");
        }

        if (!Values.group_lang) {
            errors.group_lang = t("err_msg_lang");
          }

        
        return errors;
    };

    useEffect(() => {
        if (adDimensiondata.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [adDimensiondata.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_dimension") : t("up_dimension")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Formik
                initialValues={group_data}
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

                                <Flex row="row" justifycenter="true" >
                                    <Flex md={12} padding="0 10px 0 0 !important">
                                        <Label color="cardfont">{t("language")} </Label>
                                        <Select
                                            app="true"
                                            name="group_lang"
                                            width="100%"
                                            onChange={(e) => {
                                                data && setFieldValue("dimension_name", getValueByLang(data?.dimension_name, e.target.value))
                                                formik.handleChange(e)
                                            }}
                                            onBlur={handleBlur}
                                            // value={add?"DEFAULT":values.status}
                                            value={values.group_lang || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                adDimensiondata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.group_lang && touched.group_lang ? <ErrLabel>{errors.group_lang}</ErrLabel> : null
                                        }
                                        <Label color="cardfont">{t("dimension_name")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="dimension_name"
                                            placeholder={t("dimension_name")}
                                            value={values.dimension_name || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.dimension_name && touched.dimension_name ? <ErrLabel>{errors.dimension_name}</ErrLabel> : null
                                        }

                                        <Label >{t("price_weight")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="price_weight"
                                            placeholder={t("price_weight")}
                                            value={values.price_weight || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.price_weight && touched.price_weight ? <ErrLabel>{errors.price_weight}</ErrLabel> : null
                                        }
                                        <Label >{t("height")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="height"
                                            placeholder={t("height")}
                                            value={values.height || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.height && touched.height ? <ErrLabel>{errors.height}</ErrLabel> : null
                                        }
                                        <Label >{t("width")}</Label>
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="width"
                                            placeholder={t("width")}
                                            value={values.width || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.width && touched.width ? <ErrLabel>{errors.width}</ErrLabel> : null
                                        }
                                    </Flex>
                                    <Flex md={12} padding="0 10px 0 0 !important">
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
        </Modal>
    </>
    );
};
