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
import { getValueByLang } from "../../utils/helper";
import Flatpickr from "react-flatpickr";
import { TextArea } from "../../component/style/styled_textarea";
import { calcAdCost, saveInvAdvtismentData, updateInvAdvtismentData } from "../invAd/inv_advert_Slice";

export const BizAdvertisementModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const invadvertisment = useSelector((state) => state.invadvertisment);
    const [disabled, set_disabled] = useState(false);
    const formRef = useRef();
    const dispatch = useDispatch();
    const imgRef = useRef();
    const [cost, set_cost] = useState("");
    const [url, setPhotoUrl] = useState("");

    const [main_data, set_main_data] = useState({
        content_id: 0,
        ad_id: '',
        main_name: '',
        dimension_id: 0,
        main_lang: 0,
        display_id: 0,
        user_id: '',
        time_value: '',
        publish_date: '',
        est_cost: '',
        notes: ''


    })

    useEffect(() => {
        set_cost(
            invadvertisment?.estCost || ""
        );

    }, [invadvertisment?.estCost]);


    useEffect(() => {
        if (data) {
            set_main_data({
                main_name: getValueByLang(data.main_name || "{}"),
                main_lang: localStorage.i18nextLng || "en",
                ad_id: data.ad_id,
                dimension_id: data.dimension_id,
                content_id: data.content_id,
                display_id: data.display_id,
                user_id: data.user_id,
                time_value: data.time_value,
                publish_date: data.publish_date,
                est_cost: data.cost,
                notes: data.notes,
            });
        }
    }, [data]);

    const SubmitForm = (values) => {
        // console.log(values)
        var datad = {};
        var content_name = {};
        var display_name = {};
        var dimension_name = {};
        content_name[values.main_lang] = values.content_name;
        datad.content_name = JSON.stringify(content_name);
        display_name[values.main_lang] = values.display_name;
        datad.display_name = JSON.stringify(display_name);
        dimension_name[values.main_lang] = values.dimension_name;
        datad.dimension_name = JSON.stringify(dimension_name);
        datad.dimension_id = values.dimension_id || 0;
        datad.display_id = values.display_id || 0;
        datad.content_id = values.content_id || 0;
        datad.user_id = values.user_id || 0;
        datad.ad_id = values.ad_id || 0;
        datad.publish_date = values.publish_date || '';
        datad.time_value = values.time_value || '';
        datad.est_cost = cost || '';
        datad.notes = values.notes || '';
        console.log(datad)
        dispatch(add ? saveInvAdvtismentData(datad) : updateInvAdvtismentData(datad));
    };

    const handleCalculateCost = (values) => {
        var datad = {};
        datad.dimension_id = values.dimension_id || 0;
        datad.display_id = values.display_id || 0;
        datad.content_id = values.content_id || 0;
        datad.time_value = values.time_value || '';
        dispatch(calcAdCost(datad));
    };

    const validate = (Values) => {
        let errors = {};

        if (!Values.content_id) {
            errors.content_id = t("err_msg_main_catg_name");
        } else if (Values.content_id.length > 260) {
            errors.content_id = t("err_260_legnth");
        }

        if (!Values.display_id) {
            errors.display_id = t("err_msg_lang");
        }
        if (!Values.dimension_id) {
            errors.dimension_id = t("err_msg_group_name");
        }


        return errors;
    };

    useEffect(() => {
        if (invadvertisment.addUpdateLoading == "succeeded") {
            formRef.current.resetForm();
            setTimeout(() => { setOpen(false); }, 3000);
        }
    }, [invadvertisment.addUpdateLoading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={add ? t("add_advtsment") : t("up_advtsment")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
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
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("content_type")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0!important">
                                        <Select
                                            app="true"
                                            name="content_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.content_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                invadvertisment?.conList?.map((d, i) => <option key={i} value={d.content_id}>{getValueByLang(d.content_name || "{}", values.main_lang)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.content_id && touched.content_id ? <ErrLabel>{errors.content_id}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("display_type")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0!important">
                                        <Select
                                            app="true"
                                            name="display_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.display_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                invadvertisment?.displayList?.map((d, i) => <option key={i} value={d.display_id}>{getValueByLang(d.display_name || "{}", values.main_lang)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.display_id && touched.display_id ? <ErrLabel>{errors.display_id}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("duration")} </Label>
                                    </Flex>
                                    <Flex md={8} padding="0!important">
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="time_value"
                                            placeholder={t("ph_time_val")}
                                            value={values.time_value || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.time_value && touched.time_value ? <ErrLabel>{errors.time_value}</ErrLabel> : null
                                        }

                                    </Flex>
                                    <Flex md={1} padding="0 2px!important"> <Label>{t("weeks")} </Label></Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("dimension")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0!important">
                                        <Select
                                            app="true"
                                            name="dimension_id"
                                            width="100%"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dimension_id || 0}
                                        >

                                            <option disabled value={0}>
                                                {t("ph_select_val")}
                                            </option>
                                            {
                                                invadvertisment?.dimensionList?.map((d, i) => <option key={i} value={d.dimension_id}>{getValueByLang(d.dimension_name || "{}", values.main_lang)}</option>)
                                            }
                                        </Select>
                                        {
                                            errors.dimension_id && touched.dimension_id ? <ErrLabel>{errors.dimension_id}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("content_file")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0!important">
                                        <Input
                                            app="true"
                                            type="file"
                                            name="file"
                                            ref={imgRef}
                                            accept="application/pdf"
                                            onChange={(e) => {
                                                if (e.target.value && e.target.files) {
                                                    var length = e.target.files[0].size / 1024;
                                                    var fileName = e.target.files[0].name;
                                                    var idxDot = fileName.lastIndexOf(".") + 1;
                                                    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                                    if (fileName.length < 60) {
                                                        if (extFile == "pdf") {
                                                            if (length > 2048) {
                                                                setPhotoUrl('');
                                                                setFieldValue('file', "length");
                                                            } else {
                                                                setSelectedFiles(e.target.files[0])
                                                                setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                                setFieldValue('file', fileName)
                                                            }
                                                        } else {
                                                            setPhotoUrl('');
                                                            setFieldValue('file', "invalid");
                                                        }
                                                    } else {
                                                        setPhotoUrl('');
                                                        setFieldValue('file', "filename");
                                                    }

                                                } else {
                                                }
                                            }}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.file && touched.file ? <ErrLabel>{errors.file}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("publish_date")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0!important">
                                        <Flatpickr
                                            readOnly
                                            options={{
                                                dateFormat: "Y-m-d",
                                            }}
                                            value={values.publish_date || ""}
                                            onChange={(e, str) => {
                                                setFieldValue("publish_date", str);
                                            }}
                                            render={({ value, ...props }, ref) => {
                                                return (
                                                    <Input
                                                        {...props}
                                                        type="text"
                                                        name="publish_date"
                                                        mnwidth="auto"
                                                        placeholder={t("pick_date")}
                                                        value={values.publish_date || ""}
                                                        ref={ref}
                                                    />
                                                );
                                            }}
                                        />

                                        {
                                            errors.publish_date && touched.publish_date ? <ErrLabel>{errors.publish_date}</ErrLabel> : null
                                        }

                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="5px 0!important">
                                        <Label>{t("est_cost")} </Label>
                                    </Flex>
                                    <Flex md={7} padding="5px 2px!important">
                                        <Input
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="est_cost"
                                            placeholder={t("duration")}
                                            value={cost || ""}
                                            disabled
                                        />

                                    </Flex>
                                    <Flex md={2} padding="0 10px 0 0 !important">
                                      
                                            <PrimaryButton
                                                type="button"
                                                onClick={() => handleCalculateCost(values)}
                                            >
                                                {t("calculate")}
                                            </PrimaryButton>
                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex md={3} padding="0!important">
                                        <Label>{t("note")} </Label>
                                    </Flex>
                                    <Flex md={9} padding="0 2px!important">
                                        <TextArea
                                            app="true"
                                            type="text"
                                            width="100%"
                                            name="notes"
                                            placeholder={t("note")}
                                            value={values.notes || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            errors.notes && touched.notes ? <ErrLabel>{errors.notes}</ErrLabel> : null
                                        }

                                    </Flex>

                                </Flex>

                                <Flex md={12} padding="0 10px 0 0 !important">

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

                            </form>
                        </div>
                    );
                }}
            </Formik>
        </Modal>
    </>
    );
};
