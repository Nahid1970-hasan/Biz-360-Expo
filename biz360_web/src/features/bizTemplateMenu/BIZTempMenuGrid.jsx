import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card";    
import { BizTempMenuSetupModalPage } from "./BIZTempMenuSetupModal";
import { loadBizMenuTempData } from "./biz_temp_menu_setup_slice";
import { BIZTempModal } from "./BIZTempModal";
import { BIZTempDelete } from "./BIZTempDelete";
  
export const BIZTempMenuGridPage = ({gridata}) => {

    const bizTmpMenuData = useSelector((state) => state.biztempmenudata);

    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [menu_id, set_menu_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "menu_id",
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
            headerName: ("menu_name"),
            field: "menu_name_value",
            description: "menu_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 

        {
            headerName: ("type"),
            field: "menu_type",
            description: "menu_type",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"150px"
        }, 

        {
            headerName: ("page_name"),
            field: "page_name",
            description: "page_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"150px"
        }, 
      
        {
            headerName: ("position"),
            field: "menu_position",
            description: "position",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
            width:"150px"
        }, 
        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "settings", "delete"],
            colors: ["success","download", "error"],
            descriptions: ["Edit","Assign Group", "Delete"],
            callBacks: [
                (menu_id) => {
                    var rowdata = gridata.find((d) => d.menu_id == menu_id); 
                    setOpen(true);   
                   // rowdata = Object.assign({...rowdata, 'menu_id': menu_id, 'main_name':main_name})
                    setData(rowdata);
                },
                (menu_id) => {
                    var rowdata = gridata.find((d) => d.menu_id == menu_id); 
                    setRole(true);    
                    dispatch(loadBizMenuTempData({"menu_id":menu_id})) 
                    setData({"menu_name":rowdata.menu_name||"{}", 'menu_id': menu_id });
                },
                (menu_id) => {
                    setRemove(true);
                    set_menu_id(menu_id);
                },
            ],
        },
    ];
  
    return <Suspense> 
         {(bizTmpMenuData.addUpdateLoading == "idle" || bizTmpMenuData.addUpdateLoading == "pending") ? <></> : (
          bizTmpMenuData.addUpdateLoading == "succeeded" ? (
            <Toast msg={bizTmpMenuData.msg} color="success" />
          ) : (
            <Toast color="error" msg={bizTmpMenuData.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody>  
        <BizTempMenuSetupModalPage open={role} setOpen={setRole} data={data} /> 
        <BIZTempModal open={open} setOpen={setOpen} data={data} />
        <BIZTempDelete open={remove} setOpen={setRemove} data={{ menu_id }} />
          
    </Suspense>;
}