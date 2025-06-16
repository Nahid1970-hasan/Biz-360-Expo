import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody } from "../../component/style/styled_card";
import { BizUserModal } from "./BizUserModal";
import { BizRoleSetupModal } from "./BizRoleSetupModal";
import { loadBizMenuData } from "./biz_menu_setup_slice";
import { BIZDelete } from "./BIZDelete";

export const BIZUsersGridPage = ({ gridata }) => {

    const bizUserData = useSelector((state) => state.bizusersdata);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [user_id, set_user_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(false);


    const colums = [
        {
            headerName: "ID",
            field: "user_id",
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
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("bus_name"),
            field: "business_name",
            description: "business_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
            hide: true
        },

        {
            headerName: ("fullname"),
            field: "fullname",
            description: "fullname",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("user_id"),
            field: "username",
            description: "user_id",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("email"),
            field: "email",
            description: "email",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("mobile_no"),
            field: "mobile",
            description: "mobile_no",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("lang"),
            field: "language_name",
            description: "default_lang",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("status"),
            field: "status",
            description: "status",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "state",
        },

        {
            headerName: ("action"),
            field: "",
            type: "action",
            icons: ["edit", "settings", "delete"],
            colors: ["success", "download", "error"],
            descriptions: ["Edit", "Group Assign", "Delete"],
            callBacks: [
                (user_id) => {
                    var rowdata = gridata.find((d) => d.user_id == user_id);
                    setOpen(true);
                    // rowdata = Object.assign({...rowdata, 'group_id': group_id, 'group_name':group_name})
                    setData(rowdata);
                },
                (user_id) => {
                    var rowdata = gridata.find((d) => d.user_id == user_id);
                    setRole(true);
                    dispatch(loadBizMenuData({ "role_user_id": user_id }))
                    setData({ "menu_name": rowdata.menu_name || "{}", 'role_user_id': user_id });
                    set_user_id(user_id);
                },
                (user_id) => {
                    setRemove(true);
                    set_user_id(user_id);
                },
            ],
        },
    ];

    return <Suspense>
        {(bizUserData.addUpdateLoading == "idle" || bizUserData.addUpdateLoading == "pending") ? <></> : (
            bizUserData.addUpdateLoading == "succeeded" ? (
                <Toast msg={bizUserData.msg} color="success" />
            ) : (
                <Toast color="error" msg={bizUserData.msg} />
            )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata || []} />
        </CardBody>
        <BizUserModal open={open} setOpen={setOpen} data={data} />
        <BizRoleSetupModal open={role} setOpen={setRole} data={{ role_user_id: user_id }} />
        <BIZDelete open={remove} setOpen={setRemove} data={{ delete_user_id: user_id }} />
    </Suspense>;
}