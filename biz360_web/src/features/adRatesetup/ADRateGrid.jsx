import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { CardBody } from "../../component/style/styled_card"; 
import { ADRateDelete } from "./ADRateDelete";
import { ADRateModal } from "./ADRateModal";
  
export const ADRateGrid = ({gridata}) => {

    const adratedata = useSelector((state) => state.adratedata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [rate_id, set_rate_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "rate_id",
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
            headerName: ("rate"),
            field: "rate",
            description: "rate",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
             width:"120px"
        }, 

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (rate_id) => {
                    var rowdata = gridata.find((d) => d.rate_id == rate_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (rate_id) => {
                    setRemove(true);
                    set_rate_id(rate_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <ADRateModal open={open} setOpen={setOpen} data={data} />
        <ADRateDelete open={remove} setOpen={setRemove} data={{rate_id}} />
    </Suspense>;
}