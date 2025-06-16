import { Formik } from "formik";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, Button, DownloadButton, PrimaryButton } from "../../component/style/styled_button";
import { ErrLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Input } from "../../component/style/styled_input";
import { Flex } from "../../component/style/styled_flex";
import { initLoader, loadBIZGroupData, saveBIZGroupData, updateBIZGroupData } from "./biz_group_slice";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { uploadIMGUsers } from "../../pages/memberTemplate/mmb_image_upload_slice";

export const BIZGroupPhotoModalPage = ({
  add,
  open,
  setOpen = () => { },
  data,
}) => {
  const bizGroupFormData = useSelector((state) => state.bizgroupdata);
  const mmbimgupload = useSelector((state) => state.mmbimgupload);

  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const imgRef = useRef();

  const [group_data, set_group_data] = useState({
    group_id: 0,
    group_name: '',
    group_lang: '',
    group_image: ''
  });

  useEffect(() => {
    if (data) {
      set_group_data({
        group_name: getValueByLang(data.group_name || "{}"),
        group_lang: localStorage.i18nextLng || "en",
        group_id: data.group_id,
        group_image: data.group_image
      });
    }
  }, [data]);


  const submitImgForm = (group_id) => {
    var data = new FormData();
    data.append('file', selectedFiles);
    data.append("image_tag", group_id);
    data.append("image_type", "group");
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
      title={t("add_main_photo")}
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
            name="group_name"
            value={group_data.group_name || ""}
            disabled={true}
          />

          <Flex row="row">
            <Flex md={12} padding="0!important">
              <Label>{t("main_field_img")} </Label>
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
                submitImgForm(group_data.group_id)
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
