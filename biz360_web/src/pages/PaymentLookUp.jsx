import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import { DateTime } from "luxon"; import { loadPage } from "../features/page/page_slice";
import { Flex } from "../component/style/styled_flex";
import { CardBody, CardHeaderButton } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { Loader } from "../component/style/Loader_styled";
import { Input } from "../component/style/styled_input";
import { Loading } from "../component/Loading";
import DataGrid from "../component/DataGrid";
import { Label } from "../component/style/styled_label";
import { loadPaymentLookup, loadPaymentLookupInit, initLoader } from "../features/payment/payment_lookup_Slice";
import { UpdatePaymentStatusModal } from "../features/payment/UpdatePaymentStatus";
import { useTranslation } from "react-i18next";
import { Select } from "../component/style/styled_select";
import { getValueByLang } from "../utils/helper";
import { Toast } from "../component/Toast";
import { PaymentViewDataModalPage } from "../features/payment/PaymentViewDataModal";

export const PaymentLookUpPage = () => {
    const paymentData = useSelector((state) => state.paymentLookup);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    const [viewData, setViewData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [get_value, set_value] = useState("invoice_no");
    const dropDownInputRef = useRef(null);
    const dropDownRef = useRef(null);
    const [date, setDate] = useState("");

    useEffect(() => {
        dispatch(loadPage({ title: t("pay_lookup"), button: false }));
        dispatch(loadPaymentLookupInit())
    }, []);

    const Colums = [
        {
            headerName: "Id",
            field: "payment_id",
            key: true,
            type: "number",
            hide: true,
        },
        {
            headerName: "#",
            field: "sl",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            description: "serial_no",
            sortable: true,
            smhide: true,
            width: "30px",
        },
        {
            headerName: "method",
            field: "payment_method",
            fontFamily: "var(--dashboard-font)",
            description: "payment_method",
            type: "string",
            hide:true,
            width: "100px"
        },
        {
            headerName: "invoice_no",
            description: "invoice_no",
            field: "invoice_no",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "120px",
        },
        {
            headerName: "account_no",
            description: "account_no",
            field: "account_no",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "120px",
        },

        {
            headerName: "transaction_no",
            description: "transaction_no",
            field: "transaction_no",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "160px"
        },
        {
            headerName: "amount",
            description: "amount",
            field: "amount",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "100px"
        },
        {
            headerName: "invoice_for",
            description: "invoice_for",
            field: "invoice_for",
            type: "string",
            fontFamily: "var(--dashboard-font)",
            width: "120px"
        },

        {
            headerName: "update_by",
            description: "approved_by",
            field: "approved_by",
            type: "string",
            fontFamily: "var(--dashboard-font)",
             
        },

        {
            headerName: "status",
            description: "payment_status",
            field: "status_val",
            type: "state",
            fontFamily: "var(--dashboard-font)",
            width: "170px"
        },
        {
            headerName: "payment_date",
            field: "payment_date",
            description: "payment_date",
            type: "timestamp",
            fontFamily: "var(--dashboard-font)",
            width: "120px"
        },
        {

            headerName: ("action"),
            field: "",
            type: "action",
            icons: ["done","preview"],
            colors: ["success", "preview"],
            descriptions: ["Edit","Preview"],
            callBacks: [
                (payment_id, rows) => {
                    var rwdata = rows?.find((d) => d.payment_id == payment_id);
                    setOpen(true);
                    setViewData(rwdata);
                },
                (payment_id, rows) => {
                    var rwdata = rows?.find((d) => d.payment_id == payment_id); 
                    setViewData(rwdata);
                    setView(rwdata);
                },

            ],

        },
    ];

    useEffect(() => {
        paymentData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [paymentData.loading]);


    const rowData = paymentData?.payList.map((d, i) => ({
        ...d,
        "sl": i + 1,
        status_val: {
            label: d?.payment_status || "",
            color: d?.payment_status == "Approved" ? "success" : "error",
        },
    }));

    const searchType = [
        { key: "invoice_no", value: t("invoice_no") },
        { key: "account_no", value: t("account_no") },
        { key: "approved_by", value: t("update_by") },
        { key: "payment_date", value: t("payment_date") },
        { key: "payment_method", value: t("payment_method") },
        { key: "payment_status", value: t("payment_status") },
    ]


    const handleSubmit = (e) => {
        e.preventDefault();
        var inputVal = get_value == "payment_date" ? dropDownInputRef.current.props.value : dropDownInputRef.current.value;
        if (inputVal) {
            let data = {
                search_col: dropDownRef.current.value,
                search_val: inputVal
            };
            dispatch(loadPaymentLookup(data));
        }  
    };

    useEffect(() => {
        if (paymentData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (paymentData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadPaymentLookupInit());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else if (paymentData.addUpdateLoading == "failed" || paymentData.addUpdateLoading == "unauthorized") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [paymentData.addUpdateLoading]);

    const handleChangeOption = (values) => {
        let searchID = dropDownRef.current.value;
        set_value(searchID);
    };
    return (
        <>
            {(paymentData.addUpdateLoading == "idle" || paymentData.addUpdateLoading == "pending") ? <></> : (
                paymentData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={paymentData.msg} color="success" />
                ) : (
                    <Toast color="error" msg={paymentData.msg} />
                )
            )}
            <Suspense fallback={<Loader />}>
                <form>
                    <Flex row="row">
                        <Flex md={5} sm={6} xs={12} padding="0 !important">
                            <Flex row="row">
                                <Flex md={4} sm={6} xs={12} padding="0 !important">
                                    <Label > {t("serch_type")}</Label>
                                    <Select
                                        app="true"
                                        ref={dropDownRef}
                                        name="search_col" 
                                        onChange={handleChangeOption}>
                                        <option disabled> {t("ph_select_val")}</option>
                                        {
                                            searchType?.map((d, i) => (<option key={i} value={d.key}>{i18n.resolvedLanguage == "bn" ? d.value_bn : d.value}</option>))
                                        }
                                    </Select>

                                </Flex>
                                <Flex md={5} sm={6} xs={12} padding="0 !important">
                                    <Label > {t("serch_val")} </Label>

                                    {
                                        (get_value === 'invoice_no' ||
                                            get_value === 'account_no' ||
                                            get_value === 'approved_by') &&
                                        <Input
                                            app="true"
                                            ref={dropDownInputRef}
                                            type="text"
                                            height="auto"
                                            name="search_str"
                                            placeholder={t("ph_search_val")}
                                        />
                                    }
                                    {
                                        (get_value === 'payment_status') &&
                                        <Select
                                            app="true"
                                            width={"100%"}
                                            ref={dropDownInputRef}
                                            name="search_col"
                                        >
                                            <option disabled value={""}> {t("ph_select_val")}</option>
                                            <option value={"Pending"}>{t("Pending")}</option>
                                            <option value={"Approved"}>{t("Approved")}</option>

                                        </Select>
                                    }
                                    {
                                        (get_value === 'payment_method') &&
                                        <Select
                                            app="true"
                                             width={"100%"}
                                            ref={dropDownInputRef}
                                            name="search_col"
                                        >
                                            <option disabled value={""}> {t("ph_select_val")}</option>
                                            {
                                                paymentData?.payMethod?.map((d, i) => <option key={i} value={getValueByLang(d, 'en')}>{getValueByLang(d)}</option>)
                                            }

                                        </Select>
                                    }
                                    {(get_value === 'payment_date' &&
                                        <Flatpickr
                                            readOnly
                                            options={{
                                                dateFormat: "Y-m-d",
                                            }}
                                            ref={dropDownInputRef}
                                            value={date || ""}
                                            onChange={(e, str) => {
                                                setDate(str);
                                            }}
                                            render={({ value, ...props }, ref) => {
                                                return (
                                                    <Input
                                                        {...props}
                                                        type="text"
                                                        name="date"
                                                        mnwidth="auto"
                                                        placeholder={t("pick_date")}
                                                        value={date || ""}
                                                        ref={ref}
                                                    />
                                                );
                                            }}
                                        />
                                    )}
                                </Flex>
                                <Flex padding="28px 0 0 0" md={3} sm={12} xs={12}>
                                    <PrimaryButton

                                        margin="18px"
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        {t("submit")}
                                    </PrimaryButton>

                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>

                <Flex row="row">
                    <Flex padding="0 !important" md={12}>
                        <CardBody>
                            <DataGrid colums={Colums} rows={rowData || []} />
                        </CardBody>
                    </Flex>
                </Flex>
            </Suspense>
            <UpdatePaymentStatusModal open={open} setOpen={setOpen} data={viewData} />
            <PaymentViewDataModalPage open={view} setOpen={setView} data={viewData} />
            <Loading open={isLoading} />
        </>
    );
};
