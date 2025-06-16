import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Toast } from "../../component/Toast";
import DataGrid from "../../component/DataGrid";
import { InvPaymentModal } from "./InvPaymentModal";
import { InvPaymentDelete } from "./InvPaymentDelete";
import { InvPaymentViewModal } from "./InvPaymentViewModal";
import { numberWithCommas } from "../../utils/helper";


const Scroll = styled.div`
overflow:hidden scroll;
height: 580px;
`;

export const InvPaymentGrid = ({ gridata }) => {

    const invPaymentData = useSelector((state) => state.invpayment);
    const userReadOnly = useSelector((state) => state.user.read_only);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false); 
    const [payment_id, set_payment_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [view, setView] = useState(false);


    const colums = [
        {
            headerName: "ID",
            field: "payment_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("invoice_no"),
            field: "invoice_no",
            description: "invoice_no",
            type: "string",
            width: "160px"
        },
        {
            headerName: ("method"),
            field: "payment_method",
            description: "payment_method",
            sortable: true,
            filterable: true,
            type: "string",
            width: "100px"
        },
        {
            headerName: ("account_no"),
            field: "account_no",
            description: "account_no",
            type: "string",
        },
        {
            headerName: ("transaction_id"),
            field: "transaction_no",
            description: "transaction_id",
            type: "string",
        },
        {
            headerName: ("amount"),
            field: "amount_val",
            description: "payment_amount",
            type: "currency",
            width: "80px"
        },
        {
            headerName: ("date"),
            field: "payment_date",
            alignment: "center",
            description: "payment_date",
            type: "date",
            width: "140px"
        },
        {
            headerName: ("status"),
            field: "status_val",
            description: "payment_status",
            type: "state",
            alignment: "center",
            width: "120px"
        },
        {
            headerName: ("action"),
            field: "",
            type: "custaction",
            icons: [
                {
                    icon: "preview",
                    color: "preview",
                    hoverDesc: "View Details"
                },
                {
                    icon: "edit",
                    color: "success",
                    hoverDesc: "Edit"
                },
                {
                    icon: "delete",
                    color: "error",
                    hoverDesc: "Delete"
                },

            ],
            callBacks: [
                (payment_id, rows) => {
                    var rwdata = rows.find((d) => d.payment_id == payment_id); 
                    setData(rwdata);
                    setView(true);
                },
                (payment_id, rows) => {
                    var rwdata = rows.find((d) => d.payment_id == payment_id);
                    setOpen(true);
                    setData(rwdata); 
                },
                (payment_id) => {
                    setRemove(true);
                    set_payment_id(payment_id);
                },

            ],
        }

    ];

    const rowData = invPaymentData.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        "amount_val": numberWithCommas(d.amount),
        "status_val": {
            label: d?.payment_status || "",
            color: d?.payment_status == "Approved" ? "success" : "error",
        },
        "actiontype": [true, d.payment_status != "Approved", d.payment_status != "Approved"]

    })) || [];

    return (
        <>
            {(invPaymentData.addUpdateLoading == "idle" || invPaymentData.addUpdateLoading == "pending") ? <></> : (
                invPaymentData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={invPaymentData.msg} icon="task_alt" color="success" />
                ) : (
                    <Toast color="error" msg={invPaymentData.msg} />
                )
            )}
            <DataGrid colums={colums} maxheight="65vh" rows={rowData || []} />
            <InvPaymentModal open={open} setOpen={setOpen} data={data} />
            <InvPaymentDelete open={remove} setOpen={setRemove} data={{ payment_id }} /> 
            <InvPaymentViewModal open={view} setOpen={setView} data={data} />  

            {/*  <InvPaymentViewModal open={view} setOpen={setView} data={data} /> */}
        </>

    );
}