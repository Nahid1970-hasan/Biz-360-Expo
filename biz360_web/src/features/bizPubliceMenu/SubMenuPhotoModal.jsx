
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { DownloadButton } from "../../component/style/styled_button";
import { Label } from "../../component/style/styled_label";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";

export const SubMenuPhotoModal = ({
    add,
    open,
    setOpen = () => { },
    data,
}) => {
    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);

    const dispatch = useDispatch();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [photoUrl, setPhotoUrl] = useState("");
    const imgRef = useRef();

    const [group_data, set_group_data] = useState({
        sub_id: 0,
        sub_name: '',
        group_lang: '',
        module_id: 0,
        sub_page: "",
        sub_image: "",
        sub_desc: ""

    });

    useEffect(() => {
        if (data) {
            set_group_data({
                sub_name: getValueByLang(data.sub_name || "{}"),
                group_lang: localStorage.i18nextLng || "en",
                sub_id: data.sub_id,
                module_id: data.module_id,
                sub_image: data.sub_image
            });
        }
    }, [data]);


    const submitImgForm = (sub_id) => {
        var data = new FormData();
        data.append('file', selectedFiles);
        data.append("image_tag", sub_id);
        data.append("image_type", "menu");
        data.append('type', 'save_photo');
        dispatch(uploadIMGUsers(data));
    };

    useEffect(() => {
        if (mmbimgupload.imgUploading == "succeeded") {
            setTimeout(() => { setOpen(false); setPhotoUrl("") }, 2000);
        }
    }, [mmbimgupload.imgUploading]);

    return (<>
        <Modal
            md={4}
            sm={8}
            xs={12}
            title={t("add_menu_photo")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick
        >
            <Flex row="row" justifycenter="true" >
                <Flex md={12} padding="0 10px 0 0 !important">
                    <Input
                        app="true"
                        type="text"
                        width="100%"
                        name="sub_name"
                        value={group_data.sub_name || ""}
                        disabled={true}
                    />

                    <Flex row="row">
                        <Flex md={12} padding="0!important">
                            <Label>{t("sub_img")} </Label>
                        </Flex>

                        <Flex md={12} padding="0 !important">
                            <Input
                                app="true"
                                type="file"
                                name="file"
                                ref={imgRef}
                                accept="image/jpg,image/png, image/gif, image/jpeg"
                                onChange={(e) => {
                                    if (e.target.value && e.target.files) {
                                        var length = e.target.files[0].size / 1024;
                                        var fileName = e.target.files[0].name;
                                        var idxDot = fileName.lastIndexOf(".") + 1;
                                        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                                        if (fileName.length < 60) {
                                            if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
                                                if (length > 2048) {
                                                    setPhotoUrl('');
                                                } else {
                                                    setSelectedFiles(e.target.files[0])
                                                    setPhotoUrl(URL.createObjectURL(e.target.files[0]));
                                                }
                                            } else {
                                                setPhotoUrl('');
                                            }
                                        } else {
                                            setPhotoUrl('');
                                        }

                                    } else {
                                    }
                                }}
                            />
                        </Flex>

                    </Flex>




                </Flex>
                <Flex md={12} padding="0 10px 0 0 !important">
                    <ULine />
                    <CardHeaderButton>
                        <DownloadButton
                            type="button"
                            margin="0!important"
                            padding="0!important"
                            disabled={!photoUrl}
                            onClick={() => {
                                submitImgForm(group_data.module_id +"-"+group_data.sub_id)
                            }}
                        >
                            {t("upload")}
                        </DownloadButton>
                    </CardHeaderButton>
                </Flex>
            </Flex>
        </Modal>
    </>
    );
};
