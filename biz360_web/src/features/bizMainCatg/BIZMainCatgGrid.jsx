import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card";  
import { BIZMainCatgFormModalPage } from "./BIZMainCatgFormModal";
import { BIZMainDeleteModalPage } from "./BIZMainDeleteModal";
  
export const BIZMainCatgGridPage = ({gridata, group_id, group_name}) => {

    const bizMainCatgGridData = useSelector((state) => state.bizmaincatgdata);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [main_id, set_main_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "main_id",
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
            width: "50px",
            fontFamily:"var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("sub_field_name"),
            field: "main_name_value",
            description: "sub_field_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("detail_name"),
            field: "group_codename_value",
            description: "detail_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            hide:true
        }, 

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (main_id) => {
                    var rowdata = gridata.find((d) => d.main_id == main_id); 
                    setOpen(true);   
                    rowdata = Object.assign({...rowdata, 'group_id': group_id, 'group_name':group_name})
                    setData(rowdata);
                },
                (main_id) => {
                    setRemove(true);
                    set_main_id(main_id);
                },
            ],
        },
    ];
  
    return <Suspense> 
         {(bizMainCatgGridData.addUpdateLoading == "idle" || bizMainCatgGridData.addUpdateLoading == "pending") ? <></> : (
          bizMainCatgGridData.addUpdateLoading == "succeeded" ? (
            <Toast msg={bizMainCatgGridData.msg} color="success" />
          ) : (
            <Toast color="error" msg={bizMainCatgGridData.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <BIZMainCatgFormModalPage open={open} setOpen={setOpen} data={data} />
        <BIZMainDeleteModalPage open={remove} setOpen={setRemove} data={{main_id}} />
    </Suspense>;
}