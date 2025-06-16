import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Flex } from "../../component/style/styled_flex";
import { Typography } from "../../component/style/styled_typography";
import UnAuthorized from "../UnAuthorized";
import { loadMemberOrderData, initLoader, updateOrderData } from "./member_temp_order_slice";
import { NotNetwork } from "../NoNetwork";
import { Loading } from "../../component/Loading";
import { CardBody, CardHeaderButton, InfoTitle } from "../../component/style/styled_card";
import { useTranslation } from "react-i18next";
import DataGrid from "../../component/DataGrid";
import { ItemModalPage } from "./ItemModalPage";
import { UpdateCusOrder } from "./UpdateCusOrder";
import { Toast } from "../../component/Toast";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { PrimaryButton } from "../../component/style/styled_button";
import styled from "styled-components";
import { ErrLabel } from "../../component/style/styled_label";
import { DateTime } from "luxon";
import Flatpickr from "react-flatpickr";
import { checkNumber, daysLeftCount, numberWithCommas } from "../../utils/helper";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake;

const CustDiv = styled.div` 
    display: flex;
    justify-content:${({ end }) => (end ? 'flex-end' : 'flex-start')}; 
    align-items: flex-end;
    height: 100%;
    &>button:first-child {
      margin: 0 0 2px 0;
    }
  
`;
export const MemberTempOrderPage = () => {
    const mOrderData = useSelector((state) => state.memberorderdata);
    const userData = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isUnAuthorized, setUnAthorized] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const [openOrder, setOrderOpen] = useState(false);
    const [order, setOrderData] = useState({});
    const [rowData, setRowData] = useState([]);
    const [rowTotalAmnt, setRowTotalAmnt] = useState(0);

    const [get_value, set_value] = useState("customer_name");
    const dropDownInputRef = useRef(null);
    const dropDownRef = useRef(null);
    const [search_value_err, set_search_value_err] = useState(null);
    const [date_value_err, set_date_value_err] = useState(null);
    const [disable, set_disable] = useState(false);
    const [date, setDate] = useState("");
    const [basicInfo, setBasicInfo] = useState({});
    const [daysLeft, setDaysLeft] = useState(-1);
    useEffect(() => {
         setRowData([]);
        dispatch(loadMemberOrderData({}));
        dispatch(
            loadPage({
                title: ("orders"),
                button: false,
            })
        );
    }, []);


    useEffect(() => {
        setDaysLeft(daysLeftCount(userData?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || 0);
    }, [userData?.dashboard]);

    useEffect(() => {
        setBasicInfo(userData?.basicInfo || {});
    }, [userData]);

    useEffect(() => {
        var dataList = mOrderData?.list?.map((d, i) => daysLeft < 0 ? ({
            "sl": i + 1,
            order_date: d.order_date,
            "pamount": numberWithCommas(d?.order_total_price || 0),
            actiontype: [false, false, false],
            delivery_status: {
                label: d.delivery_status,
                color: d.delivery_status == "Delivered" ? "success" : d.delivery_status == "Booked" ? "booked" : d.delivery_status == "Pending" ? "warning" : "error",
            },
        }) : ({
            ...d,
            "sl": i + 1,
            "pamount": numberWithCommas(d?.order_total_price || 0),
            "ramount": numberWithCommas(d?.received_amount || 0),
            actiontype: [d.delivery_status == "Pending", d.delivery_status == "Booked", true],
            delivery_status: {
                label: d.delivery_status,
                color: d.delivery_status == "Delivered" ? "success" : d.delivery_status == "Booked" ? "booked" : d.delivery_status == "Pending" ? "warning" : "error",
            },
        })) || [];
        setRowTotalAmnt(mOrderData?.list.length > 0 ? mOrderData?.list?.map((d) => parseInt(d?.order_total_price) || 0)?.reduce((a, b) => a + b) : 0);
        setRowData(dataList);
    }, [mOrderData.list]);


    const colums = [
        {
            headerName: "Id",
            field: "order_id",
            key: true,
            type: "number",
            hide: true,
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
            headerName: "customer_name",
            field: "customer_name",
            description: "customer_name",
            type: "string",
            width: "200px"
        },
        {
            headerName: "mobile_no",
            field: "customer_mobile",
            description: "customer_mobile_no",
            type: "string",
            smhide: true,
            alignment: "center",
            width: "180px"
        },
        {
            headerName: "order_date",
            field: "order_date",
            fontFamily: "var(--dashboard-font)",
            description: "order_date",
            sortable: true,
            filterable: true,
            type: "string",
            width: "150px"
        },
        {
            headerName: "invoice_no",
            field: "invoice_id",
            description: "invoice_no",
            type: "string",
            alignment: "center",
            width: "120px",
        },
        {
            headerName: "total_price",
            field: "pamount",
            description: "order_total_price",
            type: "number",
            width: "100px",
        },
        {
            headerName: "received",
            field: "ramount",
            description: "received_amount",
            type: "number",
            width: "100px",
        },
        {
            headerName: "delivery_date",
            field: "delivery_date",
            fontFamily: "var(--dashboard-font)",
            description: "delivery_date",
            sortable: true,
            filterable: true,
            type: "string",
            width: "150px",

        },
        {
            headerName: "status",
            field: "delivery_status",
            fontFamily: "var(--dashboard-font)",
            description: "delivery_status",
            sortable: true,
            filterable: true,
            type: "state",
            width: "100px",
        },

        {
            headerName: ("action"),
            field: "",
            type: "custaction",
            icons: [
                {
                    icon: "edit",
                    color: "success",
                    hoverDesc: "update"
                },
                {
                    icon: "local_shipping",
                    color: "error",
                    hoverDesc: "delivered"
                },
                {
                    icon: "preview",
                    color: "preview",
                    hoverDesc: "view_details"
                }
            ],
            callBacks: [

                (order_id) => {
                    var rowdata = rowData?.find((d) => d.order_id == order_id);
                    setOrderOpen(true);
                    setOrderData(rowdata);
                },
                (order_id) => {
                    var rowdata = rowData?.find((d) => d.order_id == order_id);
                    var datad = {
                        "order_id": order_id,
                        "delivery_status": "Delivered",
                        "payment_method": rowdata.payment_method || "",
                        "received_amount": rowdata.received_amount || "",
                        "delivery_name": rowdata.delivery_name || "",
                    };
                    dispatch(updateOrderData(datad));
                },
                (order_id) => {
                    var rowdata = rowData?.find((d) => d.order_id == order_id); 
                    setOpen(true);
                    setData(rowdata);

                },
            ],
        }
    ];

    useEffect(() => {
        if (mOrderData.loading == "pending") {
            setIsLoading(true)
        } else if (mOrderData.loading == "succeeded") {
            setTimeout(() => { setIsLoading(false); }, 2000);
        } else if (mOrderData.loading == "unauthorized") {
            setTimeout(() => { setUnAthorized(true); setIsLoading(false); }, 2000);
        } else if (mOrderData.loading == "nonetwork") {
            setTimeout(() => { setIsAxiosError(true); setIsLoading(false); }, 2000);
        } else if (mOrderData.loading == "failed") {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }
    }, [mOrderData.loading]);


    useEffect(() => {
        if (mOrderData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (mOrderData.addUpdateLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); dispatch(loadMemberOrderData({})); }, 4000);
        } else if (mOrderData.addUpdateLoading == "unauthorized") {
            setUnAthorized(true);
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (mOrderData.addUpdateLoading == "nonetwork") {
            setIsAxiosError(true);
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        } else if (mOrderData.addUpdateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [mOrderData.addUpdateLoading]);


    const searchType = daysLeft < 0 ? [] : [
        { key: "customer_name", value: "Customer Name" },
        { key: "customer_mobile", value: "Customer Mobile No." },
        { key: "delivery_status", value: "Status" },
        { key: "order_date", value: "Order Date" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        set_search_value_err(null);
        let searchVal = dropDownInputRef.current?.value || "";
        if (searchVal || date) {
            let data = {
                search_by: dropDownRef.current.value,
                search_value: dropDownRef.current.value == "order_date" ? date : searchVal,

            };
            if (!(daysLeft < 0)) {
                dispatch(loadMemberOrderData(data));
                set_date_value_err(null);
            }
        } else {
            set_search_value_err(t("field_required"));
        }
    };
    const handleChangeOption = () => {
        let searchID = dropDownRef.current.value;
        set_value(searchID);
    };

    const handleChangeValue = () => {
        let searchVal = dropDownInputRef.current.value;
        if (!searchVal) {
            set_disable(true)
            set_search_value_err("This field is reruired");

        } else if (dropDownRef.current.value == "mobile_no" && !/(^(01){1}[3456789]{1}(\d){8})$/i.test(searchVal)) {
            set_search_value_err("This is not valid mobile number.");
            set_disable(true)
        }
        else {
            set_disable(false)
            set_search_value_err(null);
        };

    };

    const downloadPdfData = (e) => {
        var sl = 0; var modifyData = []
        var orderPdf = rowData.map((d, i) => d.items.map((b, i) => modifyData.push(Object.assign({ "sl": sl + 1, "sender_mobile": userData.mobile, "sender_name": userData.fullname, "customer_location": d.customer_location || "", "customer_mobile": d.customer_mobile || "", "customer_name": d.customer_name || "", "delivery_name": d.delivery_name || "", ...b }))));
        var demoPdfDefinition = {
            pageSize: 'A5',
            pageOrientation: 'portrait',
            pageMargins: [25, 25],
            content: modifyData.map((b, i) => ({
                margin: [0, 0, 0, 7],
                pageBreak: (i != 0 && i % 3 == 0) ? 'before' : null,
                table: {
                    widths: ["50%", "50%"],
                    body: [
                        [
                            {
                                text: "From",
                                bold: true,
                                alignment: "left",
                                border: [true, true, false, false],
                            },
                            {
                                text: "To",
                                bold: true,
                                alignment: "left",
                                border: [true, true, true, false],
                            },
                        ],
                        [
                            {
                                text: "Name: " + (b.sender_name || "Sender Name"),
                                bold: true,
                                alignment: "left",
                                border: [true, false, false, false],
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: "Name: " + (b?.customer_name || "Receiver Name"),
                                alignment: "left",
                                bold: true,
                                border: [true, false, true, false],
                                margin: [10, 0, 0, 0]

                            },
                        ],
                        [
                            {
                                text: "Mobile: " + (b.sender_mobile || "Sender Mobile"),
                                alignment: "left",
                                bold: true,
                                border: [true, false, false, false],
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: "Mobile: " + (b?.customer_mobile || "Receiver Mobile"),
                                alignment: "left",
                                bold: true,
                                border: [true, false, true, false],
                                margin: [10, 0, 0, 0]
                            },
                        ],
                        [
                            {
                                text: "",
                                alignment: "left",
                                border: [true, false, false, false],
                                margin: [10, 0, 0, 0]
                            },
                            {
                                text: "Address: " + (b?.customer_location || "Receiver Address"),
                                alignment: "left",
                                bold: true,
                                border: [true, false, true, false],
                                margin: [10, 0, 0, 0]
                            },
                        ],
                        [
                            {
                                text: b?.item_name + ", Weight: " + b?.item_qty + "KG",
                                colSpan: 2,
                                fontSize: 14,
                                bold: true,
                                alignment: "center",
                            },
                            {
                                text: "",
                                fontSize: 10,
                                alignment: "center",
                            },
                        ],
                        [
                            {
                                text: b?.delivery_name ? "Courier: " + b?.delivery_name : "",
                                fontSize: 10,
                                colSpan: 2,
                                bold: true,
                                alignment: "right",
                                border: [false, false, false, false],
                            },
                            {
                                text: "",
                                fontSize: 10,
                                alignment: "left",
                            },
                        ],
                        [
                            {
                                text: Array(30).join(" - "),
                                colSpan: 2,
                                alignment: "center",
                                border: [false, false, false, false],
                                margin: [0, 5, 0, 0],
                            },
                            {
                                text: "",
                                fontSize: 12,
                                alignment: "left",
                            },

                        ],

                    ],
                },
            })),
            styles: {
                header: {
                    fontSize: 15,
                    alignment: "right",
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 0, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
                fontSize: 14,
                bold: true
            },
        };
        var nameformate = "Order_" + DateTime.now().toFormat('dd_MMM_yyyy_HHmmss') + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);
    };

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> :
        <>
            {(mOrderData.addUpdateLoading == "idle" || mOrderData.addUpdateLoading == "pending") ? <></> : (
                mOrderData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={mOrderData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={mOrderData.msg} />
                )
            )}
            <Suspense>
                <Flex row="true">
                    <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
                        <Typography margin="0 0 10px 0" fntweight="bold" txtalign="left" > Search By</Typography>
                        <Select
                            app="true"
                            width="100%"
                            defaultValue=""
                            ref={dropDownRef}
                            name="search_col"
                            id="search_col"
                            onChange={handleChangeOption}
                        >
                            <option disabled value={""}>{t("ph_select")}</option>
                            {searchType?.map((d, i) => (
                                <option key={i} value={d.key}>
                                    {d.value}
                                </option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
                        <Typography margin="0 0 10px 0" fntweight="bold" txtalign="left" > Search Value</Typography>
                        {(get_value === "customer_name") && (
                            <Input
                                app="true"
                                ref={dropDownInputRef}
                                type="text"
                                onChange={handleChangeValue}
                                placeholder="search value"
                                name="search_value"
                                id="search_value"
                            />
                        )}
                        {get_value === "customer_mobile" && (
                            <Input
                                app="true"
                                ref={dropDownInputRef}
                                type="text"
                                onKeyDown={(event) => {
                                    if (!checkNumber(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                maxLength={11}
                                onChange={handleChangeValue}
                                placeholder="search value"
                            />
                        )}

                        {get_value === "delivery_status" && (
                            <Select
                                app="true"
                                width="100%"
                                defaultValue=""
                                ref={dropDownInputRef}
                                name="delivery_status"
                                onChange={(e) => { set_search_value_err(null) }}
                                id="delivery_status"
                            >
                                <option disabled value={""}>{t("ph_select")}</option>
                                <option value="Pending">Pending</option>
                                <option value="Booked">Booked</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Canceled">Canceled</option>
                            </Select>
                        )}
                        {get_value === "order_date" && (
                            <Flatpickr
                                readOnly
                                options={{
                                    dateFormat: "Y-m-d",
                                    defaultDate: DateTime.now().toFormat("yyyy-MM-dd")
                                }}
                                value={date || ""}
                                onChange={(e, str) => {
                                    setDate(str);
                                    set_search_value_err(null);
                                }}
                                render={({ value, ...props }, ref) => {
                                    return (
                                        <Input
                                            {...props}
                                            app="true"
                                            type="text"
                                            name="date"
                                            mnwidth="auto"
                                            placeholder={("pick date")}
                                            value={date || ""}
                                            ref={ref}
                                        />
                                    );
                                }}
                            />
                        )}
                        {search_value_err ? <ErrLabel margin="0px">{search_value_err}</ErrLabel> : null}
                    </Flex>

                    <Flex padding="0 10px 2px 0 !important" md={2} sm={2} xs={12}>
                        <CustDiv>
                            <CardHeaderButton start="flex-start">
                                <PrimaryButton
                                    type="button"
                                    onClick={daysLeft < 0 ? null : handleSubmit}
                                    disabled={disable || daysLeft < 0}
                                >
                                    Submit
                                </PrimaryButton>
                            </CardHeaderButton>

                        </CustDiv>
                    </Flex>
                    <Flex padding="0 10px 0 0 !important" md={6} sm={2} xs={12}>
                        <CustDiv end="true">
                            <CardHeaderButton>
                                <PrimaryButton
                                    type="button"
                                    onClick={daysLeft < 0 ? null : downloadPdfData}
                                    disabled={rowData.length == 0 || daysLeft < 0}
                                >
                                    Download
                                </PrimaryButton>
                            </CardHeaderButton>

                        </CustDiv>
                    </Flex>
                </Flex>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <CardBody>
                            <DataGrid
                                maxheight="72vh"
                                colums={colums}
                                rows={rowData || []}
                            />
                            <Typography margin="0 10px 0 0" fntsize={"cardTitleFontSize"} fntweight="bold" txtalign="right" >
                                {t("total")}{" "}{":"} {t("Tk.")}{" "}{numberWithCommas(rowTotalAmnt || 0)}
                            </Typography>
                        </CardBody>

                    </Flex>
                </Flex>
                <ItemModalPage open={open} setOpen={setOpen} data={data} />
                <UpdateCusOrder open={openOrder} setOpen={setOrderOpen} data={order} />
                <Loading open={isLoading} />
            </Suspense>

        </>


    )
};
