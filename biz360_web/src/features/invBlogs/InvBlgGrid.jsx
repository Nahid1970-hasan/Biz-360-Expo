import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
  
export const InvBlgGrid = ({ gridata }) => {

    const invblogs = useSelector((state) => state.invblogs); 
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
            headerName: ("method_name"),
            field: "method_name_value",
            description: "content_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("type"),
            field: "type",
            description: "type",
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
                    console.log(rowdata)
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
         {(invblogs.addUpdateLoading == "idle" || invblogs.addUpdateLoading == "pending") ? <></> : (
          invblogs.addUpdateLoading == "succeeded" ? (
            <Toast msg={invblogs.msg} color="success" />
          ) : (
            <Toast color="error" msg={invblogs.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        {/* <AdvertisementModal open={open} setOpen={setOpen} data={data} />
        <InvAdvertisementDelete open={remove} setOpen={setRemove} data={{ad_id}} /> */}
    </Suspense>;
}