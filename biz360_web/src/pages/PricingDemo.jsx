
import { useTranslation } from "react-i18next";
import { InfoCard, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import { KDImg } from "../component/style/styled_img";
import img from "../assets/demo/S.jpg";
import imgIn from "../assets/demo/in.jpg";
import imgCom from "../assets/demo/c.jpg"; 

export const PricingDemoPage = () => {
    const { t, i18n } = useTranslation();

    return <div style={{ userSelect: "none" }}>
        <Container>

            <Flex row="row">
                <Flex md={12} padding="10px 0!important">
                    <InfoCard >
                        <Typography fntsize="bodyHeader" fntweight="bold">
                            {t("Package Price")}
                        </Typography>
                    </InfoCard>
                </Flex>
                {/* <Flex md={12} padding="0 0 10px 0!important">
                    <InfoSubTitle background="aboutContent">
                        <Typography fntsize="cardSubTitleFontSize" >
                            {t("pricing_title")}
                        </Typography>
                    </InfoSubTitle>
                </Flex> */}
                <InfoCard >
                    <Flex row="row">
                        <Flex md={3} padding="5px !important">
                            <ShadowCard>
                                <Flex row="row">


                                    <Flex md={12} padding="0 !important">
                                        <KDImg
                                            src={imgIn}  // Use the image from array
                                            height={"100%"}
                                            width={"100%"}
                                            noborder="true"
                                            padding="0!important"
                                        />
                                    </Flex>
                                    <Flex md={12} padding="10px 0 !important">
                                        <ShadowCard>
                                            <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                <sub>  {t("BDT")}</sub>{" "}{t("1200")}  <sub>  {t("TK")}</sub>
                                            </Typography>
                                            <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                {t("6")}{" "}
                                                <sub>  {t("months")}</sub>
                                            </Typography>
                                        </ShadowCard>

                                    </Flex>

                                    <Flex md={12} padding="10px 0 !important">
                                        <ShadowCard>
                                            <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                <sub>  {t("BDT")}</sub>{" "}{t("2000")}  <sub>  {t("TK")}</sub>
                                            </Typography>
                                            <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                {t("1")}{" "}
                                                <sub>  {t("year")}</sub>
                                            </Typography>
                                        </ShadowCard>

                                    </Flex>

                                </Flex>

                            </ShadowCard>
                        </Flex>
                        <Flex md={6} padding="5px !important">
                            <ShadowCard>
                                <Flex row="row">
                                    <Flex md={12} padding="0 !important">
                                        <KDImg
                                            src={imgCom}  // Use the image from array
                                            height={"100%"}
                                            width={"100%"}
                                            noborder="true"
                                            padding="0!important"
                                        />
                                    </Flex>

                                    <Flex row="row">
                                        <Flex md={6} padding="10px 5px !important">
                                            <ShadowCard >
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("BDT")}</sub>{" "}{t("1500")}  <sub>  {t("TK")}</sub>
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                    {t("6")}{" "}
                                                    <sub>  {t("months")}</sub>{" "}   {t("Basic")}
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>
                                        <Flex md={6} padding="10px 5px !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true" >
                                                    <sub>  {t("BDT")}</sub>{" "}{t("2500")}  <sub>  {t("TK")}</sub>
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                    {t("6")}{" "}
                                                    <sub>  {t("months")}</sub>{" "}   {t("Premium")}
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>
                                        <Flex md={6} padding="10px 5px !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("BDT")}</sub>{" "}{t("3000")}  <sub>  {t("TK")}</sub>
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                    {t("1")}{" "}
                                                    <sub>  {t("year")}</sub>{" "}   {t("Basic")}
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>
                                        <Flex md={6} padding="10px 5px !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("BDT")}</sub>{" "}{t("4000")}  <sub>  {t("TK")}</sub>
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                    {t("1")}{" "}
                                                    <sub>  {t("year")}</sub>{" "}   {t("Premium")}
                                                </Typography>
                                            </ShadowCard>
                                        </Flex>

                                    </Flex>

                                </Flex>

                            </ShadowCard>
                        </Flex>

                        <Flex md={3} padding="5px !important">
                            <ShadowCard>
                                <Flex row="row">
                                    <Flex md={12} padding="0 !important">
                                        <KDImg
                                            src={img}  // Use the image from array
                                            height={"100%"}
                                            width={"100%"}
                                            noborder="true"
                                            padding="0!important"
                                        />
                                    </Flex>

                                    <Flex row="row">
                                        <Flex md={12} padding="10px 0 !important">
                                            <ShadowCard>
                                                <Typography fntsize="dsFontSize" margin="5px 0" ntresize="true">
                                                    <sub>  {t("BDT")}</sub>{" "}{t("800")}  <sub>  {t("TK")}</sub>
                                                </Typography>
                                                <Typography fntsize="cardTitleFontSize" margin="5px 0" ntresize="true" fntweight="bold">
                                                    {t("3")}{" "}
                                                    <sub>  {t("months")}</sub>{" "}
                                                </Typography>
                                            </ShadowCard>

                                        </Flex>

                                    </Flex>



                                </Flex>

                            </ShadowCard>
                        </Flex>

                    </Flex>
                </InfoCard>


            </Flex>
            <Flex row="row">
                <Flex md={12} padding="10px 0 !important">
                    <InfoSubTitle background="infoCard">
                        <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                            {t("pricing_note")}
                        </Typography>
                    </InfoSubTitle>
                </Flex>

            </Flex>

        </Container>
    </div>
}