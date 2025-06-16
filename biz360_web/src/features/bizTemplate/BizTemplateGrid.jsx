import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGrid from "../../component/DataGrid";
import { Toast } from "../../component/Toast";
import { CardBody, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { BizTemplateModal } from "./BizTemplateModal";
import { DeleleTemplate } from "./DeleteTemplate";
import { Flex } from "../../component/style/styled_flex";
import { KDImg } from "../../component/style/styled_img";
import { getTextToImage, getValueByLang } from "../../utils/helper";
import { Label } from "../../component/style/styled_label";
import { PrimaryButton } from "../../component/style/styled_button";
import { useNavigate } from "react-router-dom";
import { config } from "../../config/config";

export const BizTemplateGrid = ({ gridata, group_id, group_name }) => {

    const biztempdata = useSelector((state) => state.biztempdata);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [remove, setRemove] = useState(false);
    const [template_id, set_template_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const { PUBURL } = config;

    function handleUpdate(id) {
        nevigate("/app/t/" + id)
    }
 
    function handlePreview(id) {
        window.open(PUBURL + "/#/t/" + id, "_blank")
    }


    return <Suspense>
        {(biztempdata.addUpdateLoading == "idle" || biztempdata.addUpdateLoading == "pending") ? <></> : (
            biztempdata.addUpdateLoading == "succeeded" ? (
                <Toast msg={biztempdata.msg} color="success" />
            ) : (
                <Toast color="error" msg={biztempdata.msg} />
            )
        )}

        <CardBody>
            <Flex row="true">
                {
                    gridata.map((d, i) =>
                        <Flex key={i} md={4}>
                            <InfoCard>
                                <KDImg height={"200px"} width={"100%"} noborder="true" src={d.template_url || getTextToImage({ height: 100, width: 300, text: d.template_name || "Template" })} />
                                <Label>{getValueByLang(d.template_desc || "{}")}</Label>
                                <CardHeaderButton>
                                    <PrimaryButton onClick={() => handleUpdate(d.template_id)}>Update</PrimaryButton>
                                    <PrimaryButton onClick={() => handlePreview(d?.template_name)} >Preview</PrimaryButton>
                                </CardHeaderButton>
                            </InfoCard>
                        </Flex>)
                }

            </Flex>
        </CardBody>
        <BizTemplateModal open={open} setOpen={setOpen} data={data} />
        <DeleleTemplate open={remove} setOpen={setRemove} data={{ template_id }} />
    </Suspense>;
}