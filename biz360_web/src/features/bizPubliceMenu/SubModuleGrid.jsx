import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody, CardHeaderButton } from "../../component/style/styled_card";
import { SubModuleMudal } from "./SubModuleMudal";
import { Flex } from "../../component/style/styled_flex";
import { PrimaryButton } from "../../component/style/styled_button";
import { t } from "i18next";
import { SubModuleDelete } from "./SubModuleDelete";
import { LoadPublicMenuData } from "./public_menu_Slice";
import { initImgLoader } from "../../pages/memberTemplate/mmb_image_upload_slice";
import { SubMenuPhotoModal } from "./SubMenuPhotoModal";

export const SubModuleGrid = ({ gridata }) => {

    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [sub_id, set_sub_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [upload, set_upload] = useState(false);



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
            fontFamily: "var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("sub_name"),
            field: "value_sub_name",
            description: "sub_name",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },
        {
            headerName: ("sub_desc"),
            field: "sub_desc",
            description: "sub_desc",
            sortable: true,
            filterable: true,
            fontFamily: "var(--dashboard-font)",
            type: "string",
        },

        {
            headerName: ("action"),
            field: "",
            type: "action",
            icons: ["edit", "upload", "delete"],
            colors: ["success", "download", "error"],
            descriptions: ["Edit", "Upload Photo", "Delete"],
            callBacks: [
                (sub_id) => {
                    var rowdata = gridata.find((d) => d.sub_id == sub_id);
                    setOpen(true);
                    setData(rowdata);
                },
                (sub_id) => {
                    var rowdata = gridata.find((d) => d.sub_id == sub_id);
                    set_upload(true);
                    setData(rowdata);
                },
                (sub_id) => {
                    setRemove(true);
                    set_sub_id(sub_id);
                },
            ],
        },
    ];

    useEffect(() => {
        if (mmbimgupload.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmbimgupload.imgUploading == "succeeded") {
            setIsLoading(false);
            dispatch(LoadPublicMenuData());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmbimgupload.imgUploading]);
    // useEffect(() => {
    //     bizpublicdata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    // }, [bizpublicdata.loading]);

    return <Suspense>
        {(bizpublicdata.addUpdateLoading == "idle" || bizpublicdata.addUpdateLoading == "pending") ? <></> : (
            bizpublicdata.addUpdateLoading == "succeeded" ? (
                <Toast msg={bizpublicdata.msg} color="success" />
            ) : (
                <Toast color="error" msg={bizpublicdata.msg} />
            )
        )}
        {(mmbimgupload.imgUploading == "idle" || mmbimgupload.imgUploading == "pending") ? <></> : (
            mmbimgupload.imgUploading == "succeeded" ? (
                <Toast msg={mmbimgupload.msg} color="success" />
            ) : (
                <Toast color="error" msg={mmbimgupload.msg} />
            )
        )}
        <Flex row="row">
            <Flex md={12} padding="0 0 10px 0!important">
                <CardHeaderButton>
                    <PrimaryButton
                        onClick={() => {
                            setAdd(true)
                        }}
                    >
                        {t("add_sub_module")}
                    </PrimaryButton>
                </CardHeaderButton>

            </Flex>
        </Flex>
        <CardBody>
            <DataGrid colums={colums} rows={gridata || []} />
        </CardBody>
        <SubModuleMudal open={open} setOpen={setOpen} data={data} />
        <SubModuleMudal open={add} setOpen={setAdd} add />
        <SubMenuPhotoModal open={upload} setOpen={set_upload} data={data} />
        <SubModuleDelete open={remove} setOpen={setRemove} data={{ sub_id }} />

    </Suspense>;
}