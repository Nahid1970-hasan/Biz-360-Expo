import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody,InfoCard } from "../../component/style/styled_card";
import { SubModuleGrid } from "./SubModuleGrid";
import { Flex } from "../../component/style/styled_flex";
import { ModulesModal } from "./ModulesModal";
import { getValueByLang } from "../../utils/helper";

export const PublicMenuGrid = ({ gridata }) => {
    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const dispatch = useDispatch();
    const [module_id, set_module_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const [lang, set_lang] = useState("en");

    const colums = [
        {
            headerName: "ID",
            field: "module_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: "#",
            field: "sl",
            description: "Serial",
            sortable: true,
            width: "40px",
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: "menu_name",
            field: "module_name_value",
            description: "menu_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: "action",
            field: "",
            type: "action",
            icons: ["edit", "preview"],
            colors: ["success", "preview"],
            descriptions: ["Edit", "Details"],
            callBacks: [
                (module_id) => {
                    const rowdata = gridata.find((d) => d.module_id == module_id);
                    setOpen(true);
                    setData(rowdata);
                },
                (module_id) => {
                    const rowdata = gridata.find((d) => d.module_id == module_id);
                    if (rowdata?.sub_module?.length > 0) {
                        setViewOpen(true);
                        setSelectedModule(rowdata.sub_module?.map((d)=>({...d, 'module_id':module_id})));
                    } else {
                        setViewOpen(true);
                        setSelectedModule([]);
                    }
                },
            ],
        },
    ];

    const row = selectedModule?.map((d, i) => ({
        ...d,
        "sl": i + 1,
        sub_desc: getValueByLang(d.sub_desc || "{}", lang),
        value_sub_name: getValueByLang(d.sub_name || "{}", lang),
    }));

    return (
        <Suspense>
            {(bizpublicdata.addUpdateLoading === "idle" || bizpublicdata.addUpdateLoading === "pending") ? <></> : (
                bizpublicdata.addUpdateLoading === "succeeded" ? (
                    <Toast msg={bizpublicdata.msg} color="success" />
                ) : (
                    <Toast color="error" msg={bizpublicdata.msg} />
                )
            )}
            <CardBody>
                <DataGrid colums={colums} rows={gridata || []} />
            </CardBody>

            {viewOpen && (
                <Flex row='row'>
                    <Flex padding="20px !important" md={12} sm={12} xs={12}>
                        <InfoCard>
                            <SubModuleGrid open={viewOpen} gridata={row || []} />
                        </InfoCard>
                    </Flex>
                </Flex>
            )}

            <ModulesModal open={open} setOpen={setOpen} data={data} />
        </Suspense>
    );
};