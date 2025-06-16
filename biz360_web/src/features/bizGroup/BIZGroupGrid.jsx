import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody } from "../../component/style/styled_card";
import { BIZGroupFormModalPage } from "./BIZGroupFormModal";
import { BIZGroupDeleteModalPage } from "./BIZGroupDeleteModal";
import { BIZGroupPhotoModalPage } from "./BIZGroupPhotoModal";
import { getValueByLang } from "../../utils/helper";

export const BIZGroupGridPage = ({ lang = "en" }) => {

    const bizGroupGrid = useSelector((state) => state.bizgroupdata);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [group_id, set_group_id] = useState(0);
    const [upload, set_upload] = useState(false);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "group_id",
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
            headerName: ("code_name"),
            field: "group_codename_value",
            description: "group_codename",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
             width: "150px"
        },
        {
            headerName: ("short_name"),
            field: "group_shortname_value",
            description: "group_shortname",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
             width: "180px"
        },
        {
            headerName: ("detail_name"),
            field: "group_name_value",
            description: "detail_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("seasonal"),
            field: "is_seasonal_value",
            description: "seasonal",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "state",
            width: "110px"
        },

        {
            headerName: ("photo"),
            field: "group_image",
            description: "photo",
            type: "photo",
            alignment: "center",
            width: "200px"
        },

        {
            headerName: ("action"),
            field: "",
            type: "action",
            icons: ["edit", "upload", "delete"],
            colors: ["success", "download", "error"],
            descriptions: ["Edit", "Upload Photo", "Delete"],
            callBacks: [
                (group_id) => {
                    var rowdata = rowData.find((d) => d.group_id == group_id);
                    setOpen(true);
                    setData(rowdata);
                },
                (group_id) => {
                    var rowdata = rowData.find((d) => d.group_id == group_id);
                    set_upload(true);
                    setData(rowdata);
                },
                (group_id) => {
                    setRemove(true);
                    set_group_id(group_id);
                },
            ],
        },
    ];


    const rowData = bizGroupGrid?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        group_name_value: getValueByLang(d.group_name || "{}", lang),
        group_shortname_value: getValueByLang(d.group_shortname || "{}", lang),
        group_codename_value: getValueByLang(d.group_codename || "{}", lang),
        //    is_seasonal_value:d.is_seasonal==1?"Yes":"No",
        is_seasonal_value: {
            label: d.is_seasonal == 1 ? "Yes" : "No",
            color: d.is_seasonal == 1 ? "success" : "error",
        },

    }));

    return <Suspense>

        <CardBody>
            <DataGrid colums={colums} rows={rowData || []} />
        </CardBody>
        <BIZGroupFormModalPage open={open} setOpen={setOpen} data={data} />
        <BIZGroupPhotoModalPage open={upload} setOpen={set_upload} data={data} />
        <BIZGroupDeleteModalPage open={remove} setOpen={setRemove} data={{ group_id }} />
    </Suspense>;
}