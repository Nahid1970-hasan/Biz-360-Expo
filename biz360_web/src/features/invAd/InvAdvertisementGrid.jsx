import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
import { AdvertisementModal } from "./AdvertisementModal";
import { InvAdvertisementDelete } from "./InvAdvertisementDelete";
  
export const InvAdvertisementGrid = ({ gridata }) => {

    const invadvertisment = useSelector((state) => state.invadvertisment); 
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
            headerName: ("content_type"),
            field: "content_name_value",
            description: "content_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("display_type"),
            field: "display_name_value",
            description: "display_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
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
            headerName: ("dimension"),
            field: "dimension_name_value",
            description: "dimension",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
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
            headerName: ("est_cost"),
            field: "est_cost",
            description: "est_cost",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (ad_id) => {
                    var rowdata = gridata.find((d) => d.ad_id == ad_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (ad_id) => {
                    setRemove(true);
                    set_ad_id(ad_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
         {(invadvertisment.addUpdateLoading == "idle" || invadvertisment.addUpdateLoading == "pending") ? <></> : (
          invadvertisment.addUpdateLoading == "succeeded" ? (
            <Toast msg={invadvertisment.msg} color="success" />
          ) : (
            <Toast color="error" msg={invadvertisment.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <AdvertisementModal open={open} setOpen={setOpen} data={data} />
        <InvAdvertisementDelete open={remove} setOpen={setRemove} data={{ad_id}} />
    </Suspense>;
}