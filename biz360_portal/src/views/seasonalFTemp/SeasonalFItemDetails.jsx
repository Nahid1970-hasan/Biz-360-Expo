import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../component/style/styled_typography";
import { Container } from "../../component/style/styled_contrainer";
import { Center } from "../../component/style/styled_center";
import { useLocation, useNavigate } from "react-router-dom";
import { PageNotFound } from "../../pages/NotFound";
import { NotNetwork } from "../../pages/NoNetwork";
import { loadPubProductData, loadPubProductListData } from "../../features/pubprofile/pub_product_slice";
import ProgressBar from "../../component/ProgressBar";
import { Flex } from "../../component/style/styled_flex";
import { getTextToImage, getValueByLang, numberWithCommas } from "../../utils/helper";
import { SizeBox } from "../../component/style/styled_sizebox";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { useTranslation } from "react-i18next";
import InnerImageZoom from "react-inner-image-zoom";
import "inner-image-zoom/lib/styles.min.css";
import { PrimaryButton, SecondaryButton } from "../../component/style/styled_button";
import { SeasonalItemDetailsCard } from "./SeasonalFItemDetailsCard";
import { InfoCard } from "../../component/style/styled_card";
import { IconButton } from "../../component/IconButton";
import { Label } from "../../component/style/styled_label";
import { addOrderData, deleteOrderData, updateOrderData } from "../../features/tempCustOrder/temp_cust_oder_slice";
import useMediaQuery from "../../component/MediaQuery";
import { Frame } from "../../component/style/styled_iframe";
import styled from "styled-components";
import useTitle from "../../hooks/useTitle";

const IFreamArea = styled.div`
    &>iframe {
        height: 200px !important;
        width: 100% !important;
    }

`
export const SeasonalFItemDetailsPage = () => {
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const custTempOrder = useSelector((state) => state.custOrderData);
    const location = useLocation();
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();

    // const userpath = location?.pathname?.split("/p/")[1] || "";
    const [productInfo, setProductInfo] = useState("");
    const [productDataList, setProductDataList] = useState([]);
    const username = location?.pathname?.split("/")[1] || "";
    const [isLoading, setIsLoading] = useState(false);
    const [scName, setSCName] = useState("");
    const [url, set_url] = useState("");
    const [imgIdName, setImgIdName] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const tempimg = getTextToImage({ width: 200, height: 250, text: "Logo" });
    const [oldData, setOldData] = useState({});
    const [isExits, setIsExits] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [orderData, setOrderData] = useState([]);
    const [title, setTitle] = useState([]);
 
    useEffect(() => { 
        setOrderData(custTempOrder?.dataList || []);
    }, [custTempOrder.dataList]);
 
    useEffect(() => {
        if (scName == "item") {
            var datadd = custTempOrder?.dataList?.find((d) => d.id == prdtPubData?.prdtInfo?.id) || "";
            setIsExits(datadd?.id || false);
            setOldData(datadd);
        }
    }, [prdtPubData?.prdtInfo, custTempOrder.dataList]);

    useEffect(() => {
        console.log(prdtPubData?.prdtInfo)
        document.title = document.title+" | "+ (prdtPubData?.prdtInfo?.category_name || "");
        if (scName == "item") {
            setProductInfo(prdtPubData?.prdtInfo || {});
        }
    }, [prdtPubData?.prdtInfo]);

    useEffect(() => {
        var scData = JSON.parse(prdtPubData?.prdtList || "{}");
        if (scName == "category") {
            var dd = scData?.image_list?.filter((d) => d.category_id == imgIdName);
            setProductDataList(dd);
        }
        if (scName == "brand") {
            setProductDataList(scData?.image_list?.filter((d) => d.brand_id == imgIdName));
        }
    }, [prdtPubData?.prdtList, scName]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const user_url = location?.pathname?.split("/")[1] || "";
        const sectionName = location?.pathname?.split("/")[3]?.split("-")[0] || "";
        const imgID = location?.pathname?.split("/")[3]?.split("-")[1] || 0;
        setImgIdName(imgID);
        set_url(user_url);
        setSCName(sectionName);
        if (sectionName == "item") {
            setIsInvalid(false);
            var data = {
                "user_url": user_url,
                "section_name": "section9",
                "image_id": imgID
            }
            dispatch(loadPubProductData(data));
        } else if (sectionName == "category" || sectionName == "brand") {
            setIsInvalid(false);
            var data = {
                "user_url": user_url,
                "page_name": "home",
                "section_name": "section9"
            }
            dispatch(loadPubProductListData(data));
        } else {
            setIsInvalid(true);
        }
    }, [location?.pathname]);


    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    const gotoPage = (id, section) => {
        nevigate("/" + username + "/products/" + section + "-" + id)
    }

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

    return (isInvalid ? <PageNotFound /> : isLoading ? <ProgressBar /> : isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    <InfoCard background="bg">
                        {scName == "item" ? (productInfo?.visible == "yes" ? <Flex row="true">
                            <Flex md={4} sm={4} xs={12}>
                                <div style={{ width: isMobile ? "100%" : 320, background: "#3e3e3e", overflow: "hidden" }}>
                                    <InnerImageZoom
                                        src={productInfo.url}
                                        zoomSrc={productInfo.url}
                                        zoomType="hover"
                                        width={isMobile ? "100%" : 320}
                                        zoomPreload={true}
                                    />
                                </div>
                            </Flex>
                            <Flex md={5} sm={5} xs={12}>
                                <Typography txtalign="left" fntweight="bold" fntsize="headingLargeFontSize" >
                                    {productInfo?.category_name || "{{product_title}}"}
                                </Typography>

                                <Typography txtalign="left" fntsize="bodyTitleFontSize" >
                                    {t('unit')}{":"}   {productInfo?.quantity || "0"}  {productInfo?.unit_name || "{{unit}}"} {" "}
                                </Typography>

                                <SizeBox />
                                <InlineDiv justifycontent="start">

                                    {<Typography fntweight="bold" txtalign="left" fntsize={"titleLargeFontSize"}>
                                        {t("Tk.")}  {numberWithCommas(productInfo?.price || "0")} {parseInt(productInfo?.priceoff || "0") > 0 && "|"}
                                    </Typography>
                                    }
                                    {parseInt(productInfo?.priceoff || "0") > 0 && <Typography fntweight="bold" decoration="line-through" color="error" txtalign="left" fntsize="titleLargeFontSize">
                                        {numberWithCommas(productInfo?.total_price || "0")}
                                    </Typography>
                                    }
                                </InlineDiv>
                                <Typography fntsize="bodyContentFontSize" fntweight="bold" txtalign="justify">
                                    {productInfo?.unit_description || ""}
                                </Typography>
                                <SizeBox />
                                <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                    {productInfo?.description || ""}
                                </Typography>
                                <SizeBox />
                                <Typography fntsize="bodyContentFontSize" fntweight="bold" txtalign="justify">
                                    {t("nb")} {productInfo?.note || ""}
                                </Typography>
                            </Flex>
                            <Flex md={3} sm={3} xs={12}>
                                {isExits ? <>
                                    <InfoCard height="auto">
                                        <InlineFlex>
                                            <IconButton bgcolor="font" color="primaryFont" onClick={() => oldData?.order_quantity > 9 ? null : increaseQuanity(productInfo)} ><span className="material-icons md-18">add</span></IconButton>
                                            <Label> {oldData?.order_quantity || 0} {t("item_added")}</Label>
                                            <IconButton bgcolor="font" color="primaryFont" onClick={() => oldData?.order_quantity < 2 ? dispatch(deleteOrderData({ "id": oldData.id })) : decreaseQuanity(productInfo)}><span className="material-icons md-18">remove</span></IconButton>
                                        </InlineFlex>
                                    </InfoCard>
                                </> : <SecondaryButton
                                    type="button"
                                    full="true"
                                    onClick={() => {
                                        var odt = [...orderData, Object.assign({ ...productInfo, order_quantity: 1, total_price: productInfo.price })];
                                        dispatch(addOrderData(odt));
                                    }}
                                >
                                    {t("order_now")}
                                </SecondaryButton>}
                                <PrimaryButton
                                    full="true"
                                    type="button"
                                    onClick={() => {
                                        if (!isExits) {
                                            var odt = [...orderData, Object.assign({ ...productInfo, order_quantity: 1, total_price: productInfo.price })];
                                            dispatch(addOrderData(odt));
                                        }
                                        nevigate("/" + username + "/orders");
                                    }}
                                >
                                    {t("buy_now")}
                                </PrimaryButton>
                                {
                                    productInfo?.promotional_link_yt &&

                                    <Flex row="row">
                                        <Flex md={12} sm={12} xs={12}>
                                            <SizeBox height="40px" />
                                            <IFreamArea dangerouslySetInnerHTML={{ __html: productInfo?.promotional_link_yt }} />
                                        </Flex>
                                    </Flex>}

                            </Flex>
                        </Flex> : <Center> <Typography fntweight={100} fntsize="headingLargeFontSize" color="font">404</Typography>
                            <Typography fntsize="titleLargeFontSize" >
                                {t("item_not_found")}
                            </Typography> </Center>) : ((scName == "category" || scName == "brand") ?
                                <Flex row="true">
                                    {productDataList?.map((d, i) =>
                                        <Flex key={i} md={3}>
                                            <SeasonalItemDetailsCard username={username} onClick={() => gotoPage(d.id, "item")} height={"200px"} src={d.url || ""} size="sm" data={d} />
                                        </Flex>)}
                                </Flex> : <Center> <Typography fntweight={100} fntsize="headingLargeFontSize" color="font">404</Typography>
                                    <Typography fntsize="titleLargeFontSize" >
                                        {t("product_not_found")}
                                    </Typography> </Center>)}
                    </InfoCard>
                </Container>
            </Suspense>
        </>
    );
};
