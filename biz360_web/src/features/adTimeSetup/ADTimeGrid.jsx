import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { CardBody } from "../../component/style/styled_card"; 
import { ADTimeDelete } from "./ADTimeDelete";
import { ADTimeSetupModal } from "./ADTimeSetupModal";
  
export const ADTimeGrid = ({gridata}) => {

    const adDimensiondata = useSelector((state) => state.adDimensiondata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [time_id, set_time_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "time_id",
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
            headerName: ("time_name"),
            field: "time_name_value",
            description: "time_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("price_weight"),
            field: "price_weight",
            description: "price_weight",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
             width:"150px"
        }, 
        {
            headerName: ("value_start"),
            field: "value_start",
            description: "value_start",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"120px"
        }, 
        {
            headerName: ("value_end"),
            field: "value_end",
            description: "value_end",
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
                (time_id) => {
                    var rowdata = gridata.find((d) => d.time_id == time_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (time_id) => {
                    setRemove(true);
                    set_time_id(time_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <ADTimeSetupModal open={open} setOpen={setOpen} data={data} />
        <ADTimeDelete open={remove} setOpen={setRemove} data={{time_id}} />
    </Suspense>;
}