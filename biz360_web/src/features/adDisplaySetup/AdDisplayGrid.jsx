import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { CardBody } from "../../component/style/styled_card"; 
import { AdDisplayModal } from "./AdDisplayModal";
import { AdDisplayDelete } from "./adDisplayDelete";
  
export const AdDisplayGrid = ({gridata}) => {

    const adDisplyData = useSelector((state) => state.adDisplyData); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [display_id, set_display_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "display_id",
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
            headerName: ("display_name"),
            field: "display_name_value",
            description: "display_name",
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
                (display_id) => {
                    var rowdata = gridata.find((d) => d.display_id == display_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (display_id) => {
                    setRemove(true);
                    set_display_id(display_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <AdDisplayModal open={open} setOpen={setOpen} data={data} />
        <AdDisplayDelete open={remove} setOpen={setRemove} data={{display_id}} />
    </Suspense>;
}