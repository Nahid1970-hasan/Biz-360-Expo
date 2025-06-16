import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card";   
import { BIZSubDeleteModalPage } from "./BIZSubDeleteModal";
import { BIZSubCatgFormModalPage } from "./BIZSubCatgFormModal";
  
export const BIZSubCatgGridPage = ({gridata, main_id, main_name}) => {

    const bizSubCatgGridData = useSelector((state) => state.bizsubcatgdata);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [sub_id, set_sub_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "sub_id",
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
            headerName: ("sub_field_name"),
            field: "sub_name_value",
            description: "sub_field_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 

        {
            headerName: ("member_type"),
            field: "sub_type_name",
            description: "member_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("keywords"),
            field: "keywords",
            description: "keywords",
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
                (sub_id) => {
                    var rowdata = gridata.find((d) => d.sub_id == sub_id); 
                    setOpen(true);   
                    rowdata = Object.assign({...rowdata, 'main_id': main_id, 'main_name':main_name})
                    setData(rowdata);
                },
                (sub_id) => {
                    setRemove(true);
                    set_sub_id(sub_id);
                },
            ],
        },
    ];
  
    return <Suspense> 
         {(bizSubCatgGridData.addUpdateLoading == "idle" || bizSubCatgGridData.addUpdateLoading == "pending") ? <></> : (
          bizSubCatgGridData.addUpdateLoading == "succeeded" ? (
            <Toast msg={bizSubCatgGridData.msg} color="success" />
          ) : (
            <Toast color="error" msg={bizSubCatgGridData.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <BIZSubCatgFormModalPage open={open} setOpen={setOpen} data={data} />
        <BIZSubDeleteModalPage open={remove} setOpen={setRemove} data={{sub_id}} />
    </Suspense>;
}