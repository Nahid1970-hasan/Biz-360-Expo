
import { EmailConfigModal } from "./EmailConfigModal";
import { EmailConfigDelete } from "./EmailConfigDelete";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useState } from "react";
import { CardBody } from "../../component/style/styled_card";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";

  
export const EmailConfigGridPage = ({gridData}) => {

    const emailConfigGDData = useSelector((state) => state.emailconfigdata); 
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
            headerName: ("sender_name"),
            field: "sender_name",
            description: "sender_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("sender_email"),
            field: "sending_email_address",
            description: "sender_email",
            fontFamily:"var(--dashboard-font)",
        },
        {
            headerName: ("email_server"),
            field: "email_server",
            description: "email_server",
            fontFamily:"var(--dashboard-font)",
        },
        {
            headerName: ("ssl"),
            field: "enable_ssl",
            description: "ssl",
            fontFamily:"var(--dashboard-font)",
            width: "100px"
        },
        {
            headerName: ("credatial_email"),
            field: "network_cred_user_email",
            description: "net_cred_email",
            fontFamily:"var(--dashboard-font)",
        },
        {
            headerName: ("network_cred_pass"),
            field: "network_cred_pass",
            description: "network_cred_pass",
            fontFamily:"var(--dashboard-font)",
            hide: true,
        },
        {
            headerName: ("port"),
            field: "port",
            type: "string",
            width: "80px",
            fontFamily:"var(--dashboard-font)",
            description: "port",
        },
        { headerName: ("used_for"),
        description: "used_for",
         field: "used_for" },

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (config_id) => {
                    var rowdata = emailConfigGDData?.list?.find((d) => d.config_id == config_id); 
                    setOpen(true); 
                    setData(rowdata);
                },
                (config_id) => {
                    setRemove(true);
                    set_config_id(config_id);
                },
            ],
        },
    ];
 
    const rowData = emailConfigGDData?.list.map((d) => ({
        ...d,
        status: {
          label: d.status,
          color: d.status == "Active" ? "success" : "error",
        },
      }));

    return <Suspense> 
         {(emailConfigGDData.addUpdateLoading == "idle" || emailConfigGDData.addUpdateLoading == "pending") ? <></> : (
          emailConfigGDData.addUpdateLoading == "succeeded" ? (
            <Toast msg={emailConfigGDData.msg} color="success" />
          ) : (
            <Toast color="error" msg={emailConfigGDData.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={rowData||[]} />
        </CardBody> 
        <EmailConfigDelete open={remove} setOpen={setRemove} data={{ config_id }} />
        <EmailConfigModal open={open} setOpen={setOpen} data={data} />        
    </Suspense>;
}