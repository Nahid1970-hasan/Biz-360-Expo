import { useTranslation } from "react-i18next";
import { Modal } from "../../component/Modal";
import { PrimaryButton } from "../../component/style/styled_button";
import { CardBody, CardHeaderButton } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { SizeBox } from "../../component/style/styled_sizebox";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "../../component/style/styled_label";
import DataGrid from "../../component/DataGrid";
import pdfMake from "pdfmake/build/pdfmake";
import { DateTime } from "luxon";
import { Typography } from "../../component/style/styled_typography";

export const OrderPreviewModalPage = ({ open, setOpen = () => { }, data, basicData, invoiceID }) => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const nevigate = useNavigate();
    const username = location?.pathname.split("/")[1] || "";
    const invID = DateTime.now().toFormat("yyyyMMdd_HHmmss");
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
            field: "item_name",
            description: "category_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("quantity"),
            field: "item_unit_qty",
            description: "order_quantity",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("unit_price"),
            field: "item_unit_price",
            description: "unit_price",
            sortable: true,
            smhide:true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("price"),
            field: "item_total_price",
            description: "total_price",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

    ];
    const rowData = data?.items?.map((d, i) => ({
        ...d,
        sl: i + 1,
        item_unit_qty: (d.item_qty||0)+(d.item_unit_name||"")
    }));

    const makePdfData = () => {
        var demoPdfDefinition = {
            content: [
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text:  basicData?.fullname||"",
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 22,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                            ],
                            [
                                {
                                    text: "Mobile: "+(basicData?.biz_mobile||"")+(basicData?.biz_address?(", Address: "+basicData?.biz_address):""),
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 11,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                            ],
                            
                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ["60%", "40%"],
                        headerRows: 1,
                        body: [

                            [{
                                text: "Order No: "+(invoiceID||""),
                                fontSize: 10,
                                alignment: "left",
                            },
                            {
                                text: "Order Date: "+(DateTime.now().toFormat("dd MMM yyyy")),
                                fontSize: 10,
                                alignment: "right",
                            },]

                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [
                                {
                                    text: "Name: "+(data.customer_name||""),
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],

                            [
                                {
                                    text: "Mobile: "+(data.customer_mobile||""),
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],
                            [
                                {
                                    text: "Address: "+(data.customer_location||""),
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],
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
                                    text: "Unit Price (TK)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                                {
                                    text: "Amount (TK)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                            ],
                            ...data?.items?.map((d,i)=>[
                                {
                                    text: (i+1),
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: (d.item_name||""),
                                    fontSize: 10,
                                    alignment: "left",
                                },
                                {
                                    text: (d.item_qty||"0")+(d.item_unit_name||""),
                                    fontSize: 10,
                                    alignment: "left",
                                },
                                {
                                    text: (d.item_unit_price||""),
                                    fontSize: 10,
                                    alignment: "right",
                                },
                                {
                                    text: (d.item_total_price||""),
                                    fontSize: 10,
                                    alignment: "right",
                                },
                            ])
                            
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
                                    text: "Total: "+(data.item_total_price||"")+"Tk",
                                    alignment: "right",
                                    bold: true,
                                    fontSize: 12,
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
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 5, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
            },
        }; 
        var nameformate = "INV_" +(invoiceID || invID) + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);
        setOpen(false); 
    }


    return <Modal title={t("order_details")} md={6} sm={8} xs={11} open={open} outsideclick>
        <Flex row="row">
            <Flex md="12">
                <Typography margin={"0 0 10px 0"} fntsize={"cardTitleFontSize"} fntweight="bold">{t("invoice_id")} { ": " } {(invoiceID || invID)}</Typography>
                <Label margin="0">{t("customer_name") + ": " + data.customer_name} </Label>
                <Label margin="0">{t("customer_mobile") + ": " + data.customer_mobile} </Label>
                <Label margin="0">{t("customer_location") + ": " + data.customer_location} </Label>
                <Label margin="0">{t("total_amount") + ": " + data.item_total_price + " Tk"} </Label>
            </Flex>
            <Flex md="12">
                <CardBody>
                    <DataGrid colums={colums} rows={rowData || []} />
                </CardBody>
            </Flex>
            <Flex md={12}>
                <CardHeaderButton>
                    <PrimaryButton
                        onClick={() => makePdfData()}
                    >
                        {t("download")}
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={() => {setOpen(false), nevigate("/" + username)}}
                    >
                        {t("okay")}
                    </PrimaryButton>

                </CardHeaderButton>
            </Flex>
        </Flex>
    </Modal>
}