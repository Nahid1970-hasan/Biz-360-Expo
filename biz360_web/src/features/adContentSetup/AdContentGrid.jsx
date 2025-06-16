import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
import { AdContentModal } from "./AdContentModal";
import { AdContentDelete } from "./AdContentDelete";
  
export const AdContentGrid = ({gridata}) => {

    const bizGroupGrid = useSelector((state) => state.bizgroupdata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [content_id, set_content_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "content_id",
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
            width: "60px",
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
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (content_id) => {
                    var rowdata = gridata.find((d) => d.content_id == content_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (content_id) => {
                    setRemove(true);
                    set_content_id(content_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <AdContentModal open={open} setOpen={setOpen} data={data} />
        <AdContentDelete open={remove} setOpen={setRemove} data={{content_id}} />
    </Suspense>;
}