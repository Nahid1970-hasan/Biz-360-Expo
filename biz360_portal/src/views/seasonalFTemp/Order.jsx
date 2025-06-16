import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography";
import { Container } from "../../component/style/styled_contrainer";
import { Center } from "../../component/style/styled_center";

import { Flex } from "../../component/style/styled_flex";
import { AlertButton, DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import { useLocation, useNavigate } from "react-router-dom";
import { CardBody, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import DataGrid from "../../component/DataGrid";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Input } from "../../component/style/styled_input";
import { Select } from "../../component/style/styled_select";
import { loadDistrictData } from "../../features/district/get_district_list";
import { Loading } from "../../component/Loading";
import { getValueByLang, numberWithCommas } from "../../utils/helper";
import { deleteAllOrderData, initODLoader, saveCustomerOdersTemp } from "../../features/tempCustOrder/temp_cust_oder_slice";
import { Toast } from "../../component/Toast";
import { SizeBox } from "../../component/style/styled_sizebox";
import { PageNotFound } from "../../pages/NotFound";
import { OrderPreviewModalPage } from "./OrderPreviewModal";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TextArea } from "../../component/style/styled_textarea";
pdfMake.vfs = pdfFonts.pdfMake;
export const UserOrderPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const custTempOrder = useSelector((state) => state.custOrderData);
    const districtData = useSelector((state) => state.districtdata);
    const location = useLocation();
    const username = location?.pathname.split("/")[1] || "";
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const formRef = useRef();
    const { t, i18n } = useTranslation();
    const [basicInfo, setBasicInfo] = useState("");
    const user = useSelector((state) => state.user);
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, set_disabled] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [distData, setDisData] = useState([]);
    const [thanaData, setThanaData] = useState([]);
    const [invalidPage, setInvalidPage] = useState(true);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [preview, set_preview] = useState(false);
    const [preview_data, set_preview_data] = useState({});
    const [invoice_id, set_invoice_id] = useState("");
    const [init_data, set_init_data] = useState({
        member_id: 0,
        customer_name: '',
        customer_mobile: 0,
        customer_location: '',
        district_id: 0,
        district_name: "",
        thana_id: 0,
        thana_name: "",
        location: "",
        item_total_price: 0,
        items: []
    })
    useEffect(() => {
        window.scrollTo(0, 0);
        var isvalid = !!(profilePubData?.pageList?.find((d) => d == location.pathname) || "");
        if (isvalid) {
            dispatch(loadDistrictData());
            setInvalidPage(false);
        } else {
            setInvalidPage(true);
        }

    }, [location?.pathname]);

    useEffect(() => {
        setDisData(districtData?.list || 0);
        setThanaData(districtData?.list.length > 0 ? districtData?.list[0]?.thana_list || [] : [])
    }, [districtData?.list]);

    useEffect(() => {
        setBasicInfo(profilePubData?.basicData || {});
    }, [profilePubData?.profileData]);

    useEffect(() => {
        setOrderData(custTempOrder?.dataList || []);
        setTotalPrice(custTempOrder?.dataList.length > 0 ? custTempOrder?.dataList?.map(item => parseFloat(item.total_price))?.reduce((prev, next) => prev + next) || 0 : 0);
    }, [custTempOrder.dataList])

    useEffect(() => {
        districtData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [districtData.loading]);

    useEffect(() => {
        if (custTempOrder.loading == "pending") {
            setIsLoading(true)
        } else if (custTempOrder.loading == "succeeded") {
            setTimeout(() => {
                dispatch(initODLoader());
                dispatch(deleteAllOrderData());
                set_invoice_id(custTempOrder?.invoiceID || ""),
                    set_preview(true);
                set_disabled(false),
                    setIsLoading(false);
            }, 4000);
        } else if (custTempOrder.loading == "failed" || custTempOrder.loading == "nonetwork") {
            setTimeout(() => { setIsLoading(false); set_disabled(false); dispatch(initODLoader()); }, 4000);
        } else {
            setTimeout(() => { setIsLoading(false); set_disabled(false); }, 4000);
        }
    }, [custTempOrder.loading]);

    const validate = (Values) => {
        let errors = {};

        if (!Values.customer_name) {
            errors.customer_name = t("err_msg_customer_name");
        } else if (Values.customer_name.length > 50) {
            errors.customer_name = t("err_50_legnth");
        }

        if (!Values.customer_mobile) {
            errors.customer_mobile = t("err_msg_mobile_no");
        } else if (Values.customer_mobile.length > 11) {
            errors.customer_mobile = t("err_11_legnth");
        }

        if (!Values.location) {
            errors.location = t("err_msg_customer_location");
        } else if (Values.location.length > 100) {
            errors.location = t("err_100_legnth");
        }

        if (!Values.district_id) {
            errors.district_id = t("err_msg_district");
        }

        if (!Values.thana_id) {
            errors.thana_id = t("err_msg_thana");
        }


        return errors;
    };


    const colums = [
        {
            headerName: "ID",
            field: "user_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "30px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("name"),
            field: "category_name",
            description: "category_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("quantity"),
            field: "quantity_value",
            description: "order_quantity",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("price"),
            field: "price_val",
            description: "unit_price",
            sortable: true,
            smhide: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("total_price"),
            field: "total_price_val",
            description: "total_price",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

    ];

    const rowData = orderData?.map((d, i) => ({
        ...d,
        sl: i + 1,
        price_val: numberWithCommas(d?.price||"0"),
        total_price_val: numberWithCommas(d?.total_price||"0"),
        quantity_value: (d.order_quantity||"0")+(d.unit_name||"")
    }));


    const SubmitForm = (values) => {
        var reqdata = {
            member_id: basicInfo?.user_id,
            customer_name: values.customer_name,
            customer_mobile: values.customer_mobile,
            customer_location: values.location + ", " + "Thana:" + values.thana_name + ", " + "District:" + values.district_name,
            item_total_price: totalPrice,
            items: orderData.map((d) => Object.assign({
                "item_name": d.category_name,
                "item_description": d.description,
                "item_qty": (d.order_quantity || 0),
                "item_unit_price": d.price,
                "item_unit_name": d.unit_name,
                "item_total_price": d.total_price
            }))
        }
        set_preview_data(reqdata);
        set_disabled(true);
        dispatch(saveCustomerOdersTemp(reqdata));
    };



    return (<>{invalidPage ? <PageNotFound /> : isAxisError ? <NotNetwork /> : orderData.length > 0 ?
        <>
            {(custTempOrder.loading == "idle" || custTempOrder.loading == "pending") ? <></> : (
                custTempOrder.loading == "succeeded" ? (
                    <Toast msg={custTempOrder.msg} color="success" />
                ) : (
                    <Toast color="error" msg={custTempOrder.msg} />
                )
            )}
            <Suspense>
                <Container>
                    <Formik
                        initialValues={init_data}
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
                                        <InfoCard background="bg">
                                            <Flex row="True">
                                                <Flex md={12}>
                                                    <Typography fntsize="cardTitleFontSize" fntweight="bold">{t("order_information")}</Typography>
                                                    <Typography fntsize="smFont" txtalign="left" color="error" fntweight="bold">{t("all_field_are_required")}</Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Flex row="true">
                                                        <Flex md={6} padding="0 5px 0 0 !important">
                                                            <Label>{t("customer_name")} </Label>
                                                            <Input
                                                                app="true"
                                                                type="text"
                                                                width="100%"
                                                                name="customer_name"
                                                                placeholder={t("ph_customer_name")}
                                                                value={values.customer_name || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.customer_name && touched.customer_name ? <ErrLabel>{errors.customer_name}</ErrLabel> : null
                                                            }
                                                            <Label>{t("customer_mobile_no")} </Label>
                                                            <Input
                                                                app="true"
                                                                type="text"
                                                                width="100%"
                                                                name="customer_mobile"
                                                                placeholder={t("ph_customer_mobile")}
                                                                value={values.customer_mobile || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.customer_mobile && touched.customer_mobile ? <ErrLabel>{errors.customer_mobile}</ErrLabel> : null
                                                            }


                                                        </Flex>
                                                        <Flex md={6} padding="0 0 0 5px !important">
                                                            <Label>{t("district")} </Label>
                                                            <Select
                                                                app="true"
                                                                name="district_id"
                                                                width="100%"
                                                                onChange={(e) => {
                                                                    setFieldValue("district_name", e.target.selectedOptions[0].text);
                                                                    var slData = distData.find((d) => d.district_id == e.target.value);
                                                                    console.log(slData);
                                                                    setThanaData(slData?.thana_list || []);
                                                                    formik.handleChange(e);
                                                                }}
                                                                onBlur={handleBlur}
                                                                value={values.district_id || 0}
                                                            >

                                                                <option disabled value={0}>
                                                                    {t("ph_select_val")}
                                                                </option>

                                                                {
                                                                    distData?.map((d, i) => <option key={i} value={d.district_id}>{getValueByLang(d.district_name || "{}")}</option>)
                                                                }
                                                            </Select>
                                                            {
                                                                errors.district_id && touched.district_id ? <ErrLabel>{errors.district_id}</ErrLabel> : null
                                                            }
                                                            <Label>{t("thana")} </Label>
                                                            <Select
                                                                app="true"
                                                                name="thana_id"
                                                                width="100%"
                                                                onChange={(e) => {
                                                                    setFieldValue("thana_name", e.target.selectedOptions[0].text);
                                                                    formik.handleChange(e);
                                                                }}
                                                                onBlur={handleBlur}
                                                                value={values.thana_id || 0}
                                                            >

                                                                <option disabled value={0}>
                                                                    {t("ph_select_val")}
                                                                </option>
                                                                {
                                                                    thanaData?.map((d, i) => <option key={i} value={d.thana_id}>{getValueByLang(d.thana_name || "{}")}</option>)
                                                                }
                                                            </Select>
                                                            {
                                                                errors.thana_id && touched.thana_id ? <ErrLabel>{errors.thana_id}</ErrLabel> : null
                                                            }
                                                        </Flex>
                                                        <Flex md={11.99} padding="0 !important">
                                                            <Label>{t("customar_address_location")} </Label>
                                                            <TextArea
                                                                app="true"
                                                                type="text"
                                                                width="100%"
                                                                mxheight="80px"
                                                                name="location"
                                                                placeholder={t("ph_customer_location")}
                                                                value={values.location || ""}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {
                                                                errors.location && touched.location ? <ErrLabel>{errors.location}</ErrLabel> : null
                                                            }
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                                <Flex md="12">
                                                    <Typography txtalign="left" fntweight="bold" fntsize="bodyTitleFontSize">
                                                        {t("product_details")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md="12">
                                                    <CardBody>
                                                        <DataGrid colums={colums} rows={rowData || []} />
                                                    </CardBody>
                                                </Flex>
                                                <Flex md="12">
                                                    <Typography txtalign="right" fntweight="bold" fntsize="bodyTitleFontSize">
                                                        {t("total_price")} {" : "} &#x9F3; {totalPrice || 0}
                                                    </Typography>
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

                                            </Flex>
                                        </InfoCard>
                                    </form>
                                </div>
                            );
                        }}
                    </Formik>
                    <SizeBox />

                </Container>
            </Suspense >
            <Loading open={isLoading} />
        </> : <>
            <Center>
                <Typography fntsize="headingLargeFontSize" >
                    {t("cart_is_empty")}
                </Typography>
                <DownloadButton onClick={() => nevigate("/" + username)}>Start buying..</DownloadButton>
            </Center>
        </>}
        <OrderPreviewModalPage open={preview} setOpen={set_preview} basicData={basicInfo} invoiceID={invoice_id} data={preview_data} />
    </>
    );

};
