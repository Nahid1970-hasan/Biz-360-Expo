import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
import { BizSubscriptionModal } from "./BizSubscriptionModal";
import { SubscriptionDelete } from "./SubscriptionDelete";
  
export const BizSubscriptionGrid = ({gridata}) => {


    const bizsubscription = useSelector((state) => state.bizsubscription); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [sn_id, set_sn_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "sn_id",
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
            width: "40px",
            fontFamily:"var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("pk_type"),
            field: "pk_type",
            description: "pk_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"150px"
        }, 
        {
            headerName: ("sn_name"),
            field: "sn_name_value",
            description: "sn_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"200px"
        }, 
        {
            headerName: ("sn_desc"),
            field: "sn_desc_value",
            description: "sn_desc",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("pk_for"),
            field: "sn_type_display",
            description: "pk_for",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"180px"
        }, 
        {
            headerName: ("duration"),
            field: "sn_duration",
            description: "sn_duration",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            alignment:"center",
            width:"180px",
        }, 

        {
            headerName: ("price"),
            field: "sn_rate_formatted",
            description: "sn_rate",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            alignment:"center",
            width:"180px",
            valueFormatter: (params) => {
            return params.value ? Number(params.value).toLocaleString() : "0";
        }
        }, 
     
        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (sn_id) => {
                    var rowdata = gridata.find((d) => d.sn_id == sn_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (sn_id) => {
                    setRemove(true);
                    set_sn_id(sn_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
         {(bizsubscription.addUpdateLoading == "idle" || bizsubscription.addUpdateLoading == "pending") ? <></> : (
          bizsubscription.addUpdateLoading == "succeeded" ? (
            <Toast msg={bizsubscription.msg} color="success" />
          ) : (
            <Toast color="error" msg={bizsubscription.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <BizSubscriptionModal open={open} setOpen={setOpen} data={data} />
        <SubscriptionDelete open={remove} setOpen={setRemove} data={{sn_id}} />
    </Suspense>;
}