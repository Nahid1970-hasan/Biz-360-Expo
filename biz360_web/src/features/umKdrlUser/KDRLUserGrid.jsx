import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody } from "../../component/style/styled_card";
import { KDRLUseModal } from "./KDRLUseModal";
import { KDRLUserDelete } from "./KDRLUserDelete";
import { KDRLMenuSetup } from "./KDRLMenuSetup";
import { loadMenuData } from "./KDRL_menu_setup_slice.JS";

export const KDRLUsersGridPage = ({ gridata }) => {

    const kdrlUserGridData = useSelector((state) => state.kdrlusersdata);
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
            headerName: ("designation"),
            field: "designation",
            description: "designation",
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
            description: "def_lang",
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
                    //rowdata.status = rowdata.status.label;
                    setOpen(true);
                    setData(rowdata);
                },
                (user_id) => {
                    var rowdata = gridata.find((d) => d.user_id == user_id);
                    setRole(true);
                    dispatch(loadMenuData({ "role_user_id": user_id }))
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
        {(kdrlUserGridData.addUpdateLoading == "idle" || kdrlUserGridData.addUpdateLoading == "pending") ? <></> : (
            kdrlUserGridData.addUpdateLoading == "succeeded" ? (
                <Toast msg={kdrlUserGridData.msg} color="success" />
            ) : (
                <Toast color="error" msg={kdrlUserGridData.msg} />
            )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata || []} />
        </CardBody>
        <KDRLUseModal open={open} setOpen={setOpen} data={data} />
        <KDRLUserDelete open={remove} setOpen={setRemove} data={{ delete_user_id: user_id }} />
        <KDRLMenuSetup open={role} setOpen={setRole} data={{role_user_id: user_id }} />

    </Suspense>;
}