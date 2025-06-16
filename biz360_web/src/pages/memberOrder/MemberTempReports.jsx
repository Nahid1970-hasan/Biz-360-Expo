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
import { DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import styled from "styled-components";
import { ErrLabel } from "../../component/style/styled_label";
import { DateTime } from "luxon";
import Flatpickr from "react-flatpickr";
import { checkNumber, daysLeftCount, numberWithCommas } from "../../utils/helper";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { loadMemberReportData } from "./member_temmp_report_slice";
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
export const MemberTempReportsPage = () => {
    const mReportData = useSelector((state) => state.memberreportdata);
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
    const [daysLeft, setDaysLeft] = useState(-1);
  
    const [disable, set_disable] = useState(false);
    const [date, setDate] = useState(DateTime.now().toFormat("yyyy-MM-dd"));
    const [basicInfo, setBasicInfo] = useState({});
    const [rowTotalAmnt, setRowTotalAmnt] = useState(0);

    useEffect(() => {
        dispatch(loadMemberReportData({ "order_date": DateTime.now().toFormat("yyyy-MM-dd") }))
        dispatch(
            loadPage({
                title: ("Reports"),
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
        var dataList = mReportData?.list?.map((d, i) =>  daysLeft < 0 ? ({
            "sl": i + 1, 
            "pamount": numberWithCommas(d?.order_total_price || 0), 
        }) : ({
            ...d,
            "sl": i + 1,
            "pamount": numberWithCommas(d?.order_total_price || 0)
        })) || [];
        setRowTotalAmnt(mReportData?.list.length > 0 ? mReportData?.list?.map((d) => parseInt(d?.order_total_price) || 0)?.reduce((a, b) => a + b) : 0)
        setRowData(dataList);
    }, [mReportData.list]);


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
            description: "customer_mobile",
            type: "string",
            alignment: "center",
            width: "180px"
        },
        {
            headerName: "invoice_no",
            field: "invoice_id",
            description: "invoice_no",
            type: "string",
            alignment: "center",
            width: "150px",
        },
        {
            headerName: "total_price",
            field: "pamount",
            description: "order_total_price",
            type: "number",
            width: "130px",
        },

        {
            headerName: "received_amount",
            field: "received_amount",
            description: "received_amount",
            type: "number",
            width: "130px",
        },
        {
            headerName: "payment_method",
            field: "payment_method",
            description: "payment_method",
            type: "string",
            width: "130px",
        },


    ];

    useEffect(() => {
        mReportData.loading == "pending" ? setIsLoading(true) : mReportData.loading == "unauthorized" ? (setUnAthorized(true), setIsLoading(false)) : mReportData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [mReportData.loading]);



    const handleSubmit = (e) => {
        e.preventDefault();
        set_search_value_err(null);
        if (date) {
            dispatch(loadMemberReportData({ "order_date": date }));
            set_date_value_err(null);
        } else {
            set_search_value_err("This field is required.");
        }
    };


    const downloadPdfData = (e) => {
        var demoPdfDefinition = {
            pageSize: 'A5',
            pageOrientation: 'landscape',
            pageMargins: [15, 20],
            content: {
                margin: [0, 0, 0, 0],
                table: {
                    widths: ["5%", "20%", "14%", "10%", "13%", "10%", "12%", "15%"],
                    body: [
                        [
                            {
                                text: userData?.fullname || "Fullname",
                                fontSize: 18,
                                bold: true,
                                alignment: "center",
                                colSpan: 8,
                                border: [false, false, false, false],
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                        ],
                        [
                            {
                                text: "Mobile: " + (userData?.mobile || "") + (userData?.address ? (", Address: " + userData?.address) : ""),
                                fontSize: 12,
                                bold: true,
                                alignment: "center",
                                colSpan: 8,
                                border: [false, false, false, false],
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                        ],
                        [
                            {
                                text: "Booking List",
                                fontSize: 12,
                                bold: true,
                                alignment: "center",
                                colSpan: 8,
                                margin: [0, 0, 0, 10],
                                border: [false, false, false, true],
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                            {
                                text: "",
                                style: "header"
                            },
                        ],
                        [
                            {
                                text: "#",
                                style: "header"
                            },
                            {
                                text: "Name",
                                style: "header"
                            },
                            {
                                text: "Mobile",
                                style: "header"
                            },
                            {
                                text: "Total",
                                style: "rheader"
                            },
                            {
                                text: "Received",
                                style: "rheader"
                            },
                            {
                                text: "Method",
                                style: "header"
                            },
                            {
                                text: "Date",
                                style: "header"
                            },
                            {
                                text: "Remarks",
                                style: "header"
                            },
                        ],
                        ...rowData?.map((d, i) => [
                            {
                                text: (i + 1),
                            },
                            {
                                text: d?.customer_name || "",
                            },
                            {
                                text: d?.customer_mobile || "",
                            },
                            {
                                text: numberWithCommas(d.order_total_price || "0"),
                                alignment: "right",
                            },
                            {
                                text: numberWithCommas(d.received_amount || "0"),
                                alignment: "right",
                            },
                            {
                                text: d?.payment_method || "",
                            },
                            {
                                text: d?.order_date || "",
                            },

                            {
                                text: " ",
                            },
                        ])

                    ],
                },

            },
            styles: {
                header: {
                    fontSize: 12,
                    bold: true,
                    alignment: "left",
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 0, 0]
                },
                rheader: {
                    fontSize: 12,
                    bold: true,
                    alignment: "right",
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 0, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
                alignment: "left",
                color: "black",
                fillColor: "#fff",
                fontSize: 10,
            },
        };
        var nameformate = "Order_" + DateTime.now().toFormat('dd_MMM_yyyy_HHmmss') + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);
    };

    return (isUnAuthorized ? <UnAuthorized /> : isAxisError ? <NotNetwork /> :
        <>
            {(mReportData.addUpdateLoading == "idle" || mReportData.addUpdateLoading == "pending") ? <></> : (
                mReportData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={mReportData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={mReportData.msg} />
                )
            )}
            <Suspense>
                <Flex row="true">

                    <Flex padding="0 10px 0 0 !important" md={2} sm={4} xs={12}>
                        <Typography fntweight="bold" txtalign="left" >{t("order_date")}</Typography>
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
                            disabled={daysLeft < 0}
                            render={({ value, ...props }, ref) => {
                                return (
                                    <Input
                                        {...props}
                                        app="true"
                                        type="text"
                                        name="date"
                                        mnwidth="auto"
                                        width="auto"
                                        placeholder={("pick date")}
                                        value={date || ""}
                                        ref={ref}
                                    />
                                );
                            }} />
                    </Flex>
                    <Flex padding="0 10px 2px 0 !important" md={2} sm={2} xs={12}>
                        <CustDiv>
                            <CardHeaderButton start="flex-start">
                                <PrimaryButton
                                    type="button"
                                    onClick={ daysLeft < 0 ? null : handleSubmit}
                                    disabled={ daysLeft < 0 || disable}
                                >
                                    {t("submit")}
                                </PrimaryButton>
                            </CardHeaderButton>

                        </CustDiv>
                    </Flex>
                    <Flex padding="0 !important" md={8} sm={6} xs={12}>
                        <CustDiv>
                            <CardHeaderButton>
                                <PrimaryButton
                                    type="button"
                                    onClick={ daysLeft < 0? null : downloadPdfData}
                                    disabled={ daysLeft < 0 || rowData.length == 0}
                                >
                                    {t("download")}
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
                                {t("total")}{" "}{":"} {t("Tk.")}{" "}{numberWithCommas(rowTotalAmnt)}
                            </Typography>
                        </CardBody>

                    </Flex>
                </Flex>
                <ItemModalPage open={open} setOpen={setOpen} data={data} />
                <UpdateCusOrder open={openOrder} setOpen={setOrderOpen} data={order} />
            </Suspense>
            <Loading open={isLoading} />
        </>


    )
};
