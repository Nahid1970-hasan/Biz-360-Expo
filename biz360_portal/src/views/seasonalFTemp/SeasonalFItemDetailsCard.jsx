
import { useNavigate } from "react-router-dom";
import { FillChip } from "../../component/Chip";
import { HoverCard, InfoCard, LabeledCard, ModalCard } from "../../component/style/styled_card";
import { KDImg } from "../../component/style/styled_img";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { Typography } from "../../component/style/styled_typography";
import { SecondaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addOrderData, deleteOrderData, updateOrderData } from "../../features/tempCustOrder/temp_cust_oder_slice";
import { useEffect, useState } from "react";
import { HLLabel, Label } from "../../component/style/styled_label";
import { IconButton } from "../../component/IconButton";
import { numberWithCommas } from "../../utils/helper";

export const SeasonalItemDetailsCard = ({ height = "100px", width = "100%", username, src, data, onClick = () => { }, size = "md" }) => {
    const { t, i18n } = useTranslation();
    const custTempOrder = useSelector((state) => state.custOrderData);
    const dispatch = useDispatch();
    const [orderData, setOrderData] = useState([]);
    const [oldData, setOldData] = useState({});
    const [isExits, setIsExits] = useState(false);
    useEffect(() => {
        setOrderData(custTempOrder?.dataList || []);
        var datadd = custTempOrder?.dataList?.find((d) => d.id == data.id) || "";
        setIsExits(datadd?.id || false);
        setOldData(datadd);
    }, [custTempOrder.dataList])

    const increaseQuanity = () => {
        if (oldData.order_quantity <= 9) {
            dispatch(updateOrderData({ id: oldData.id, order_quantity: (parseInt(oldData?.order_quantity) || 0) + 1 }))
        }

    }
    const decreaseQuanity = () => {
        if (oldData.order_quantity >= 1) {
            dispatch(updateOrderData({ id: oldData.id, order_quantity: (parseInt(oldData?.order_quantity) || 0) - 1 }))
        }
    }
    return (<LabeledCard background="bg">
        {data?.tag && <FillChip label={data?.tag || ""} background={"primaryBg"} color={"primaryFont"} labelfont="smFont" />}
        <KDImg height={height} width={width} noborder="true" src={src} alt="IMG" cursor={onClick ? "pointer" : "auto"} onClick={onClick} />
        <Typography margin="0 0 10px 5px" fntweight="bold" txtalign="left" fntsize={"cardTitleFontSize"}>
            {data?.category_name || ""}
        </Typography>

        <InlineDiv>
            <Typography margin="0 0 0 5px" fntweight="bold" txtalign="left" fntsize={"cardContentFontSize"}>
                {data?.quantity} {""} {data?.unit_name}
            </Typography>

            <div style={{ display: "inline-flex", justifyContent: "flex-end" }}>

                {<Typography fntweight="bold" txtalign="left" fntsize={"cardContentFontSize"}>
                    {t("Tk.")}  {numberWithCommas(data?.price || "0")} {parseInt(data?.priceoff || "0") > 0 && "|"}
                </Typography>
                }
                {parseInt(data?.priceoff || "0") > 0 && <Typography fntweight="bold" decoration="line-through" color="error" txtalign="left" fntsize="cardContentFontSize">
                    {numberWithCommas(data?.total_price || "0")}
                </Typography>
                }
            </div>
        </InlineDiv>
        <ModalCard height="65px" padding="0">
            <Typography margin="5px 0" txtalign="justify" fntsize={"smFont"}>
                {data?.description.length > 120 ? (data?.description?.substr(0, 117) + "...") : data?.description}
            </Typography>
        </ModalCard>
        {isExits ? <>
            <InfoCard height="auto">
                <InlineFlex>
                    <IconButton bgcolor="font" color="primaryFont" onClick={() => oldData?.order_quantity > 9 ? null : increaseQuanity(data)} ><span className="material-icons md-18">add</span></IconButton>
                    <Label> {oldData?.order_quantity || 0} {t("item_added")} </Label>
                    <IconButton bgcolor="font" color="primaryFont" onClick={() => oldData?.order_quantity < 2 ? dispatch(deleteOrderData({ "id": oldData.id })) : decreaseQuanity(data)}><span className="material-icons md-18">remove</span></IconButton>
                </InlineFlex>
            </InfoCard>
        </> : <SecondaryButton
            type="button"
            full="true"
            onClick={() => {
                var odt = [...orderData, Object.assign({ ...data, order_quantity: 1, total_price: data.price })];
                dispatch(addOrderData(odt));
            }}
        >
            {t("order_now")}
        </SecondaryButton>}
    </LabeledCard>)
}