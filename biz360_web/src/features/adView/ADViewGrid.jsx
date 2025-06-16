import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { CardBody } from "../../component/style/styled_card"; 
import { ViewUpdate } from "./ViewUpdate";
  
export const ADViewGrid = ({gridata}) => {

    const adviewdata = useSelector((state) => state.adviewdata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [ad_id, set_ad_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "ad_id",
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
            fontFamily:"var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("content_name"),
            field: "content_name_value",
            description: "content_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("display_name"),
            field: "display_name_value",
            description: "display_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("dimension_name"),
            field: "dimension_name_value",
            description: "dimension_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"200px"
        },
        {
            headerName: ("duration"),
            field: "time_value",
            description: "duration",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("date"),
            field: "submit_date",
            description: "submit_date",
            sortable: true,
            filterable: true,
            hide:true,
            fontFamily:"var(--dashboard-font)",
            type: "datetime",
            width:"220px"
        }, 
        {
            headerName: ("publish_date"),
            field: "publish_date",
            description: "publish_date",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("end_date"),
            field: "end_date",
            description: "end_date",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("amount"),
            field: "est_amount",
            description: "est_amount",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("status"),
            field: "status",
            description: "status",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "state",
        },

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit"],
            colors: ["success"],
            descriptions: ["Edit"],
            callBacks: [
                (ad_id) => {
                    var rowdata = gridata.find((d) => d.ad_id == ad_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
           <ViewUpdate open={open} setOpen={setOpen} data={data} />
    </Suspense>;
}