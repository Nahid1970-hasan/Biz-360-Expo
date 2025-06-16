import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Flex } from "../../component/style/styled_flex";
import { Typography } from "../../component/style/styled_typography";
import { CardBody, InfoCard } from "../../component/style/styled_card";
import DataGrid from "../../component/DataGrid";
import { loadMemberInvoiceData, loadMemberInvoiceDetails, initLoader, payInitLoader } from "../../features/memInvoice/member_invoice_slice";
import { formatGridDate, getBase64ImageFromURL, getTextToImage, getValueByLang, numberWithCommas } from "../../utils/helper";
import UnAuthorized from "../UnAuthorized";
import { Loading } from "../../component/Loading";
import { DateTime } from "luxon";
import { theme } from "../../styles/theme";
import IMGPAID from "../../assets/sample_paid.png";
import IMGUNPAID from "../../assets/sample_unpaid.png";
import { InvPaymentModal } from "../../features/invPayment/InvPaymentModal";
import { InvPaymentViewModal } from "../../features/invPayment/InvPaymentViewModal";
import { Label } from "../../component/style/styled_label";
import { Toast } from "../../component/Toast";
import { useTranslation } from "react-i18next";
export const InvInvoicePage = () => {
    const memInvData = useSelector((state) => state.meminvoicedata);
    const dispatch = useDispatch();
    const [t, i18next] = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);
    useEffect(() => {
        dispatch(loadMemberInvoiceData());
        dispatch(
            loadPage({
                title: ("invoice_and_payment"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);


    const colums = [
        {
            headerName: "ID",
            field: "invoice_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            width: "60px",
            sortable: false,
            fontFamily: "var(--dashboard-font)",
            type: "string",
            alignment: "center"
        },
        {
            headerName: ("invoice_no"),
            field: "invoice_no",
            description: "invoice_no",
            type: "string",
            width: "110px",
        },
        {
            headerName: ("invoice_date"),
            field: "invoice_date",
            description: "invoice_date",
            type: "date",
            width: "120px",
        },

        {
            headerName: ("membership_package"),
            field: "sn_name_value",
            description: "package_name",
            type: "string",
        },
        {
            headerName: ("due_amount_tk"),
            field: "due_amount_val",
            description: "due_amount",
            type: "number",
            alignment: "right",
            sortable: false,
            width: "160px",
        },

        {
            headerName: ("paid_amount_tk"),
            field: "paid_amount_val",
            description: "payment_amount",
            type: "number",
            alignment: "right",
            sortable: false,
            width: "160px",
        },

        {
            headerName: ("paid_date"),
            field: "payment_date",
            description: "payment_date",
            type: "date",
            width: "120px",
        },

        {
            headerName: ("status"),
            field: "status_val",
            description: "status",
            width: "170px",
            type: "state",
        },
        {
            headerName: ("action"),
            field: "",
            type: "custaction",
            icons: [
                {
                    icon: "payments",
                    color: "downlaod",
                    hoverDesc: "input_payment_details"
                },
                {
                    icon: "download",
                    color: "download",
                    hoverDesc: "download_invoice"
                },
                {
                    icon: "preview",
                    color: "preview",
                    hoverDesc: "view_details_payment"
                },

            ],
            callBacks: [
                (invoice_id) => {
                    var rwdata = rowData.find((d) => d.invoice_id == invoice_id);
                    setData(rwdata);
                    setOpen(true);
                },
                (invoice_id) => {
                    var rwdata = rowData.find((d) => d.invoice_id == invoice_id);
                    dispatch(loadMemberInvoiceDetails({ "invoice_id": invoice_id || 0, "sn_ad_id": rwdata?.sn_ad_id || 0 }))

                },
                (invoice_id) => {
                    var rwdata = rowData.find((d) => d.invoice_id == invoice_id);
                    setData(rwdata);
                    setView(true);
                },

            ],
        }
    ];

    const rowData = memInvData.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        "due_amount_val": numberWithCommas(d.due_amount),
        "paid_amount_val": numberWithCommas(d.paid_amount),
        "sn_name_value": getValueByLang(d.sn_name || "{}"),
        "actiontype": [d?.status?.toLowerCase().replaceAll(" ", "_") == "unpaid", true, true],
        status_val: {
            label: d?.status || "",
            color: (d?.status == "Paid" || d?.status == "Approved") ? "success" : "error",
        },
    }));


    useEffect(() => {
        memInvData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [memInvData.loading]);


    useEffect(() => {
        if (memInvData.payLoading == "pending") {
            setIsLoading(true)
        } else if (memInvData.payLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadMemberInvoiceData());
            setTimeout(() => { dispatch(payInitLoader()); }, 4000);
        } else if (memInvData.payLoading == "failed" || memInvData.payLoading == "unauthorized") {
            setTimeout(() => { setIsLoading(false); }, 4000);
        }
    }, [memInvData.payLoading]);

    useEffect(() => {
        if (memInvData.addUpdateLoading == "pending") {
            setIsLoading(true);
        } else if (memInvData.addUpdateLoading == "succeeded") {
            setTimeout(() => { setIsLoading(false); makePdfData(memInvData.invoiceData) }, 4000);
        } else if (memInvData.addUpdateLoading == "failed" || memInvData.addUpdateLoading == "unauthorized") {
            setTimeout(() => { setIsLoading(false); }, 4000);
        }
    }, [memInvData.addUpdateLoading]);

    const makePdfData = async (rwdata) => {
        var demoPdfDefinition = {
            pageSize: 'A4',
            watermark: { text: rwdata?.invoice_info?.status || "----", fontSize: 120, color: rwdata?.invoice_info?.status == "Paid" ? 'green' : 'red', opacity: 0.3, bold: true, italics: false },
            pageOrientation: 'portrait',
            content: [
                {
                    table: {
                        widths: ["35%", "15%", "50%"],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    image: await getBase64ImageFromURL(rwdata?.company_info?.logo_url || ""),
                                    fit: [100, 70]
                                },
                                // {
                                //     // image: getTextToImage({ width: 80, color: rwdata?.invoice_info?.paid_amount>0?"green":"red", height: 40, text: rwdata?.invoice_info?.paid_amount>0?"Paid":"Unpaid" }),
                                //     image: await getBase64ImageFromURL(rwdata?.invoice_info?.paid_amount > 0 ? IMGPAID : IMGUNPAID),
                                //     fit: [130, 70]
                                // },
                                {
                                    text: "",
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 22,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                                {
                                    table: {
                                        widths: ["100%"],
                                        margin: [0, 0, 0, 0],
                                        body: [
                                            [{
                                                text: "Member Invoice",
                                                style: "header",
                                                alignment: 'right',
                                                fontSize: 30,
                                                colSpan: 1,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [0, 0, 0, 0]
                                            }],
                                            [{
                                                text: "Date: " + formatGridDate(rwdata?.invoice_info?.invoice_date),
                                                style: "header",
                                                alignment: 'right',
                                                fontSize: 12,
                                                colSpan: 1,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [0, 0, 0, 0]
                                            }],
                                            [{
                                                text: "Invoice No. " + rwdata?.invoice_info?.invoice_no,
                                                style: "header",
                                                alignment: 'right',
                                                fontSize: 12,
                                                colSpan: 1,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [0, 0, 0, 0]
                                            }]
                                        ],

                                    },
                                    layout: 'noBorders'

                                },

                            ]
                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    table: {
                        widths: ["45%", "10%", "45%"],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    table: {
                                        widths: ["100%"],
                                        margin: [0, 0, 0, 0],
                                        body: [
                                            [{
                                                text: 'Bill From',
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 14,
                                                colSpan: 1,
                                                fillColor: theme.colors.pdfPrimary,
                                                color: theme.colors.font,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [5, 2]
                                            }],
                                            [{
                                                text: rwdata?.company_info?.company_name || "---",
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 12,
                                                colSpan: 1,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [5, 0]
                                            }],
                                            [{
                                                text: rwdata?.company_info?.address || "---",
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 10,
                                                colSpan: 1,
                                                rowSpan: 1,
                                                margin: [5, 0]
                                            }],
                                            [{
                                                text: rwdata?.company_info?.mobile + ", " + rwdata?.company_info?.email,
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 10,
                                                colSpan: 1,
                                                rowSpan: 1,
                                                margin: [5, 0]
                                            }]
                                        ],

                                    },
                                    layout: 'noBorders'

                                },

                                {
                                    text: "",
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 22,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                                {
                                    table: {
                                        widths: ["100%"],
                                        margin: [0, 0, 0, 0],
                                        body: [
                                            [{
                                                text: 'Bill To',
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 14,
                                                colSpan: 1,
                                                fillColor: theme.colors.pdfPrimary,
                                                color: theme.colors.font,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [5, 2]
                                            }],
                                            [{
                                                text: rwdata?.contact_info?.fullname || "---",
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 12,
                                                colSpan: 1,
                                                bold: true,
                                                rowSpan: 1,
                                                margin: [5, 0]
                                            }],
                                            [{
                                                text: rwdata?.contact_info?.mobile + ", " + rwdata?.contact_info?.email,
                                                style: "header",
                                                alignment: 'left',
                                                fontSize: 10,
                                                colSpan: 1,
                                                rowSpan: 1,
                                                margin: [5, 0]
                                            }]
                                        ],

                                    },
                                    layout: 'noBorders'

                                },

                            ]
                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ["5%", "45%", "10%", "20%", "20%"],
                        body: [

                            [
                                {
                                    text: "#",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Description",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left",
                                },
                                {
                                    text: "Qty",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Unit Price (Tk.)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                                {
                                    text: "Amount (Tk.)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                            ],
                            [
                                {
                                    text: "1",
                                    fontSize: 10,
                                    alignment: "center",
                                    rowSpan: 2
                                },
                                {
                                    text: getValueByLang(rwdata?.invoice_desc?.package_name || "{}"),
                                    fontSize: 12,
                                    alignment: "left",
                                    border: [true, true, true, false],
                                },
                                {
                                    text: ("1"),
                                    fontSize: 10,
                                    alignment: "center",
                                    rowSpan: 2
                                },
                                {
                                    text: numberWithCommas(rwdata?.invoice_info?.net_amount || "0"),
                                    fontSize: 10,
                                    alignment: "right",
                                    rowSpan: 2,

                                },
                                {
                                    text: numberWithCommas(rwdata?.invoice_info?.gross_amount || "0"),
                                    fontSize: 10,
                                    alignment: "right",
                                    rowSpan: 2
                                },

                            ],
                            [
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: getValueByLang(rwdata?.invoice_desc?.package_desc || "{}"),
                                    fontSize: 10,
                                    alignment: "left",
                                    border: [true, false, true, true],
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "right",
                                },

                            ],


                        ],
                    },
                },
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [
                                {
                                    text: "Total : Tk. " + numberWithCommas(rwdata?.invoice_info?.gross_amount || "0"),
                                    alignment: "right",
                                    bold: true,
                                    fontSize: 12,
                                }
                            ]

                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 5],
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [
                                {
                                    text: 'Note',
                                    style: "padding",
                                    alignment: 'left',
                                    fontSize: 12,
                                    colSpan: 1,
                                    fillColor: theme.colors.pdfPrimary,
                                    color: theme.colors.font,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [5, 2]
                                },
                            ],
                            [
                                {

                                    ul: [
                                        'Instruction step 1',
                                        'Instruction step 2',
                                        'Instruction step 3',
                                        'Instruction step 4',
                                        'Instruction step 4',
                                    ],
                                    margin: [5, 2]
                                }
                            ]

                        ],
                    },
                    layout: 'noBorders'
                },

            ],
            styles: {
                header: {
                    fontSize: 10,
                    alignment: "right",
                    color: "black",
                    margin: [0, 0, 5, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
            },
        };
        const invID = DateTime.now().toFormat("yyyyMMdd_HHmmss");
        var nameformate = "INV_" + (rwdata?.invoice_info?.invoice_no || invID) + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);
        dispatch(initLoader());
    }


    return memInvData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(memInvData.payLoading == "idle" || memInvData.payLoading == "pending") ? <></> : (
                memInvData.payLoading == "succeeded" ? (
                    <Toast msg={memInvData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={memInvData.msg} />
                )
            )}
            <Flex row="row">
                <Flex md={12} padding="0 !important">
                    <InfoCard>
                        <Label fntweight="bold">{t("instructions")}{"."}</Label>
                        <Typography txtalign="left" ><li>{t("inv_inst_1")}</li></Typography>
                        <Typography txtalign="left" ><li>{t("inv_inst_2")}</li></Typography>
                        <Typography txtalign="left" ><li>{t("inv_inst_3")}</li></Typography>
                        <Typography txtalign="left" ><li>{t("inv_inst_4")}</li></Typography>
                        <Typography txtalign="left" ><li>{t("inv_inst_5")}</li></Typography>
                    </InfoCard>
                </Flex>
                <Flex md={12} padding="0 !important">
                    <CardBody>
                        <DataGrid colums={colums} rows={rowData || []} />
                    </CardBody>
                </Flex>
            </Flex>
            <InvPaymentViewModal open={view} setOpen={setView} data={data} />
            <InvPaymentModal open={open} setOpen={setOpen} data={data} add />
            <Loading open={isLoading} />
        </>)
}
