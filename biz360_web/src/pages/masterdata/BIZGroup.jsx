import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { initLoader, loadBIZGroupData } from "../../features/bizGroup/biz_group_slice";
import { BIZGroupGridPage } from "../../features/bizGroup/BIZGroupGrid";
import { Select } from "../../component/style/styled_select";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { ULine } from "../../component/style/styled_uline";
import { getValueByLang } from "../../utils/helper";
import { BIZGroupFormModalPage } from "../../features/bizGroup/BIZGroupFormModal";
import { Toast } from "../../component/Toast";
import { initImgLoader } from "../memberTemplate/mmb_image_upload_slice";

export const BIZGroupPage = () => {
    const bizGroupData = useSelector((state) => state.bizgroupdata);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadBIZGroupData());
        dispatch(
            loadPage({
                title: ("main_field"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        bizGroupData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizGroupData.loading]);

    
    useEffect(() => {
        if (mmbimgupload.imgUploading == "pending") {
            setIsLoading(true)
        } else if (mmbimgupload.imgUploading == "succeeded") {
            setIsLoading(false);
            dispatch(loadBIZGroupData());
            setTimeout(() => { dispatch(initImgLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initImgLoader()); setIsLoading(false); }, 4000);
        }
    }, [mmbimgupload.imgUploading]);

    useEffect(() => {
        if (bizGroupData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (bizGroupData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadBIZGroupData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [bizGroupData.addUpdateLoading]);


    return bizGroupData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            {(bizGroupData.addUpdateLoading == "idle" || bizGroupData.addUpdateLoading == "pending") ? <></> : (
                bizGroupData.addUpdateLoading == "succeeded" ? (
                    <Toast msg={bizGroupData.msg} color="success" />
                ) : (
                    <Toast color="error" msg={bizGroupData.msg} />
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
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <InlineFlex justifycontent="end">
                        <Select
                            app="true"
                            name="lang"
                            onChange={(e) => { set_lang(e.target.value) }}
                            value={lang || "en"}
                        >

                            <option disabled value={0}>
                                {t("ph_select")}
                            </option>
                            {
                                bizGroupData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                            }
                        </Select>
                    </InlineFlex>
                    <ULine />
                </Flex>
            </Flex>
            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <BIZGroupGridPage lang={lang}/>
                </Flex>
            </Flex>
            <BIZGroupFormModalPage open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>
    );
};
