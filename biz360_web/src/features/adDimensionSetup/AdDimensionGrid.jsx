import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { CardBody } from "../../component/style/styled_card"; 
import { AdDimensionDelete } from "./AdDimensionDelete";
import { AdDimensionModal } from "./AdDimensionModal";
  
export const AdDimensionGrid = ({gridata}) => {

    const adDimensiondata = useSelector((state) => state.adDimensiondata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [dimension_id, set_dimension_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "dimension_id",
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
            headerName: ("dimension_name"),
            field: "dimension_name_value",
            description: "dimension_name",
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
            headerName: ("height"),
            field: "height",
            description: "height",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"120px"
        }, 
        {
            headerName: ("width"),
            field: "width",
            description: "width",
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
                (dimension_id) => {
                    var rowdata = gridata.find((d) => d.dimension_id == dimension_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (dimension_id) => {
                    setRemove(true);
                    set_dimension_id(dimension_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
     
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <AdDimensionModal open={open} setOpen={setOpen} data={data} />
        <AdDimensionDelete open={remove} setOpen={setRemove} data={{dimension_id}} />
    </Suspense>;
}