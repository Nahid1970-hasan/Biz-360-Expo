
import { useTranslation } from "react-i18next";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import { KDImg } from "../component/style/styled_img";
import imgIn from "../assets/package-price/individual-price-icon-biz360expo.png";
import imgCom from "../assets/package-price/commercial-price-icon-biz360expo.png";
import img from "../assets/package-price/seasonal-price-icon-biz360expo.png";
import useTitle from "../hooks/useTitle";


export const PricingDemoPage = () => {
    const { t, i18n } = useTranslation();
    useTitle(t('price_title'))

    return <div style={{ userSelect: "none" }}>
        <Container>
            <Flex row="row">
                <Flex md={3} padding="10px 5px 10px 0 !important">
                    <InfoCard >
                        <Typography fntsize="bodyHeader" fntweight="bold"margin="0 0 10px 0">
                            {t("package_price")}
                        </Typography>
                        <ULine/>
                         <Typography fntsize="cardSubTitleFontSize"  margin="20px 0 0 0"  txtalign="left">
                            {t("individual")}{" "}{t("package")}
                        </Typography>
                         <Typography fntsize="cardSubTitleFontSize" margin="5px 0 0 0" txtalign="left">
                            {t("commercial")}{" "}{t("package")}
                        </Typography>
                         <Typography fntsize="cardSubTitleFontSize" margin="5px 0 0 0" txtalign="left">
                            {t("sea_trade_pack")}
                        </Typography>
                         <Typography fntsize="cardContentFontSize" margin="20px 0 0 0" txtalign="left">
                        <strong>{t("pricenote")} </strong>   {t("pricing_note")}
                        </Typography>
                    </InfoCard>
                </Flex>
                <Flex md={9} padding="5px 0 5px 0 !important">
                  
                        <Flex row="row">
                            <Flex md={4} xs={12} padding="5px !important">
                                <InfoCard>
                                    <KDImg
                                        src={imgIn}  // Use the image from array
                                        height={"auto"}
                                        width={"100%"}
                                        noborder="true"
                                        padding="0!important"
                                    />
                                </InfoCard>
                                {/* <Flex md={12} xs={12} padding="0 !important">
                                            <KDImg
                                                src={imgIn}  // Use the image from array
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                padding="0!important"
                                            />
                                        </Flex> */}
                                {/* <ShadowCard>
                                    <Flex row="row">


                                        <Flex md={12} xs={12} padding="0 !important">
                                            <KDImg
                                                src={imgIn}  // Use the image from array
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                padding="0!important"
                                            />
                                        </Flex>
                                        <Flex md={12} xs={12} padding="10px 0 !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("bdt")}</sub>{" "}{getBNNumber("1200")}   {t("/=")}
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold"  >
                                                    {getBNNumber("6")}{" "}
                                                    <sub>  {t("months")}</sub>
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>

                                        <Flex md={12} xs={12} padding="10px 0 !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("bdt")}</sub>{" "}{getBNNumber("2000")}  {t("/=")}
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold" incnum={10} incnumtype="incr">
                                                    {getBNNumber("1")}{" "}
                                                    <sub>  {t("year")}</sub>
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>

                                    </Flex>

                                </ShadowCard> */}
                            </Flex>
                            <Flex md={4} xs={12} padding="5px !important">
                                <InfoCard>
                                    <KDImg
                                        src={imgCom}  // Use the image from array
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                        padding="0!important"
                                    />
                                </InfoCard>
                                {/* <Flex row="row">
                                        <Flex md={12} padding="0 !important">
                                            <KDImg
                                                src={imgCom}  // Use the image from array
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                padding="0!important"
                                            />
                                        </Flex>

                                       

                                    </Flex> */}


                            </Flex>

                            <Flex md={4} xs={12} padding="5px !important">
                                <InfoCard>
                                    <KDImg
                                        src={img}  // Use the image from array
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                        padding="0!important"
                                    />
                                </InfoCard>
                               


                            </Flex>
                        </Flex>
                 
                </Flex>
                {/* <Flex md={12} padding="0 0 10px 0!important">
                    <InfoCard >
                        <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                            {t("pricing_note")}
                        </Typography>
                    </InfoCard>
                </Flex> */}



            </Flex>
        </Container>
    </div>
}