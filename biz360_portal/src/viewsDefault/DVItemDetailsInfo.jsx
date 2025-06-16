import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { useLocation, useNavigate } from "react-router-dom";
import { PageNotFound } from "../pages/NotFound";
import { NotNetwork } from "../pages/NoNetwork";
import { loadPubProductData, loadPubProductListData } from "../features/pubprofile/pub_product_slice";
import { Loading } from "../component/Loading";
import ProgressBar from "../component/ProgressBar";
import { Flex } from "../component/style/styled_flex";
import { KDImg } from "../component/style/styled_img";
import { getTextToImage } from "../utils/helper";
import { SizeBox } from "../component/style/styled_sizebox";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import { CompProductDetailsCard } from "../features/TempContent/ProductLabelCard";
import useTitle from "../hooks/useTitle";


export const DefaultItemDetailsPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const prdtPubData = useSelector((state) => state.pubproductdata);
    const location = useLocation();
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const { t, i18n } = useTranslation();
    const userpath = location?.pathname?.split("/t/")[1] || "";
    const [productInfo, setProductInfo] = useState("");
    const [productDataList, setProductDataList] = useState([]);
    const username = userpath.split("/")[0] || "";
    const [isLoading, setIsLoading] = useState(false);
    const [scName, setSCName] = useState("");
    const [url, set_url] = useState("");
    const [imgIdName, setImgIdName] = useState("");
    const [isInvalid, setIsInvalid] = useState(false);
    const [isAxisError, setIsAxiosError] = useState(false);
    const tempimg = getTextToImage({ width: 200, height: 250, text: "Logo" });

  
    useEffect(() => {
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
        const user_url = userpath.split("/")[0] || "";
        const sectionName = userpath.split("/")[2]?.split("-")[0] || "";
        const imgID = userpath.split("/")[2]?.split("-")[1] || 0;
        setImgIdName(imgID);
        set_url(user_url);
        setSCName(sectionName);
        if (sectionName == "item") {
            setIsInvalid(false);
            var data = {
                "user_url": user_url,
                "section_name": "section4",
                "image_id": imgID
            }
            dispatch(loadPubProductData(data));
        } else if (sectionName == "category" || sectionName == "brand") {
            setIsInvalid(false);
            var data = {
                "user_url": user_url,
                "page_name": "home",
                "section_name": "section4"
            }
            dispatch(loadPubProductListData(data));
        } else {
            setIsInvalid(true);
        }
    }, [userpath]);


    useEffect(() => {
        prdtPubData.loading == "pending" ? setIsLoading(true) : prdtPubData.loading == "nonetwork" ? (setIsAxiosError(true), setIsLoading(false)) : setTimeout(() => setIsLoading(false), 2000);
    }, [prdtPubData.loading]);

    const gotoPage = (id, section) => {
        nevigate("/t/" + username + "/products/" + section + "-" + id)
    }
    return (isInvalid ? <PageNotFound /> : isLoading ? <ProgressBar /> : isAxisError ? <NotNetwork /> :
        <>
            <Suspense>
                <Container>
                    {scName == "item" ? (productInfo?.visible == "yes" ? <Flex row="true">
                        <Flex md={4}>
                            <KDImg height={"250px"} width={"100%"} src={productInfo?.url || tempimg} />
                        </Flex>
                        <Flex md={8}>
                            <Typography txtalign="left" fntweight="bold" fntsize="headingLargeFontSize" >
                                {productInfo?.label || "{{product_title}}"}
                            </Typography>
                            <Typography txtalign="left" fntsize="bodyTitleFontSize" >
                                {'Brand: '} {productInfo?.brand_name || "{{product_brand}}"} {" "}
                                |{" "}
                                {'Category: '} {productInfo?.category_name || "{{product_category}}"}
                            </Typography>
                            <SizeBox />
                            <InlineDiv justifycontent="start">
                                <Typography fntweight="bold" txtalign="left" fntsize="titleLargeFontSize">
                                    {productInfo?.price || "{{product_price}}"} {" Tk"}
                                </Typography>

                                <Typography margin="0 10px 0 0" fntweight="bold" txtalign="left" fntsize="titleLargeFontSize">
                                    {" | "}
                                </Typography>
                                <Typography decoration="line-through" color="error" fntweight="bold" txtalign="left" fntsize="titleLargeFontSize">
                                    {productInfo?.priceoff || "{{product_price_off}}"} {"Tk"}
                                </Typography>
                            </InlineDiv>
                        </Flex>
                        <Flex md={12}>
                            <Typography fntsize="cardTitleFontSize" txtalign="left" fntweight="bold">
                                {t("details")}
                            </Typography>
                        </Flex>
                        <Flex md={12}>
                            <Typography fntsize="bodyContentFontSize" txtalign="justify">
                                {productInfo?.description || ""}
                            </Typography>
                        </Flex>
                    </Flex> : <Center> <Typography fntweight={100} fntsize="headingLargeFontSize" color="font">404</Typography>
                        <Typography fntsize="titleLargeFontSize" >
                            {t("item_not_found")}
                        </Typography> </Center>) : ((scName == "category" || scName == "brand") ?
                            <Flex row="true">
                                {
                                    productDataList.length > 0 ? (productDataList?.map((d, i) =>
                                        <Flex key={i} md={3}>
                                            <CompProductDetailsCard height={"200px"} username={username} onClick={() => gotoPage(d.id, "item")} src={d.url || ""} tag={d.tag || ""} price={d.price || ""} priceoff={d.priceoff || ""} label={"Title " + d.label} />
                                        </Flex>) ): <Flex md={12}>
                                        <Center> <Typography fntweight={100} fntsize="headingLargeFontSize" color="font">404</Typography>
                                            <Typography fntsize="titleLargeFontSize" >
                                                {t("product_not_found")}
                                            </Typography> </Center>
                                    </Flex>
                                }
                            </Flex> : <Center> <Typography fntweight={100} fntsize="headingLargeFontSize" color="font">404</Typography>
                                <Typography fntsize="titleLargeFontSize" >
                                    {t("product_not_found")}
                                </Typography> </Center>)}
                </Container>
            </Suspense>
        </>
    );
};
