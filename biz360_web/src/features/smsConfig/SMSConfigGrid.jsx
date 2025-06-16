import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card";
import { SMSConfigModal } from "./SMSConfigModal";
import { SMSConfigDelete } from "./SMSConfigDelete";
  
export const SMSConfigGridPage = () => {

    const smsConfigGDData = useSelector((state) => state.smsconfigdata); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [config_id, set_config_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
          headerName: "ID",
          field: "config_id",
          key: true,
          type: "number",
          hide: true,
          sortable: false,
        },
        {
          headerName: ("comp_name"),
          field: "company_name",
          description: "comp_name",
          sortable: true,
          filterable: true,
          fontFamily:"var(--dashboard-font)",
          type: "string",
          width:"220px"
        },
        {
          headerName: ("base_url"),
          field: "base_url",
          fontFamily:"var(--dashboard-font)",
          description: "base_url",
        },
        {
          headerName: ("sender_name"),
          field: "sender_name",
          fontFamily:"var(--dashboard-font)",
          description: "sender_name",
          width: "150px"
        },
        {
          headerName: ("username"),
          field: "gateway_username",
          description: "username",
          fontFamily:"var(--dashboard-font)",
          width: "130px",
          hide:true
        },
        {
          headerName: ("password"),
          field: "gateway_password",
          fontFamily:"var(--dashboard-font)",
          description: "password",
          width: "100px",
          hide: true,
        },
        {
          headerName: ("api_key"),
          field: "gateway_api_key",
          description: "api_key",
          width: "120px",
          fontFamily:"var(--dashboard-font)",
          hide:true
        },
        {
          headerName: ("stock"),
          field: "sms_stock",
          description: "sms_stock",
          fontFamily:"var(--dashboard-font)",
          width: "100px",
        },
        {
          headerName: ("sender_id"),
          field: "gateway_sender_id",
          type: "string",
          description: "sender_id",
          fontFamily:"var(--dashboard-font)",
          width: "130px"
        },
        {
          headerName: ("type"),
          field: "sms_type",
          description: "smstype",
          fontFamily:"var(--dashboard-font)",
          width: "140px"
        },
        {
          headerName: ("status"),
          field: "status",
          type: "state",
          description: "status",
          fontFamily:"var(--dashboard-font)",
          width: "100px"
        },
    
        {
          headerName: ("action"),
          field: "", 
          type: "action",
          icons: ["edit", "delete"],
          colors: ["success", "error"],
          descriptions: ["Edit", "Delete"],
          callBacks: [
            (config_id) => {
              var data = rowData.find((d) => d.config_id == config_id);
              set_config_id(config_id);
              setOpen(true);
              data.status = data.status.label;
              setData(data);
            },
            (config_id) => {
              setRemove(true);
              set_config_id(config_id);
            },
          ],
        },
      ];
 
    const rowData =  smsConfigGDData.list.map((d) => ({
        ...d,
        status: {
          label: d.status,
          color: d.status == "Active" ? "success" : "error",
        },
      }));

    return <Suspense> 
         {(smsConfigGDData.addUpdateLoading == "idle" || smsConfigGDData.addUpdateLoading == "pending") ? <></> : (
          smsConfigGDData.addUpdateLoading == "succeeded" ? (
            <Toast msg={smsConfigGDData.msg} color="success" />
          ) : (
            <Toast color="error" msg={smsConfigGDData.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={rowData||[]} />
        </CardBody> 
        <SMSConfigDelete open={remove} setOpen={setRemove}  data={{ config_id }}  />
        <SMSConfigModal open={open} setOpen={setOpen} data={data} />
    </Suspense>;
}