
import { useTranslation } from "react-i18next";
import { InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import useTitle from "../hooks/useTitle";

export const PricingPage = () => {

    const { t, i18n } = useTranslation();
    useTitle(t('price_diff_title'));
    return <div style={{ userSelect: "none" }}>
        <Container>

            <Flex row="row">
                <Flex md={12} padding="0!important">
                    <InfoTitle background="aboutTitle">
                        <Typography fntsize="dsTextFontSize" fntweight="bold">
                            {t("pricing")}
                        </Typography>
                    </InfoTitle>
                </Flex>
                <Flex md={12} padding="0 0 10px 0!important">
                    <InfoSubTitle background="aboutContent">
                        <Typography fntsize="cardSubTitleFontSize" >
                            {t("pricing_title")}
                        </Typography>
                        <Flex row="row">
                            <Flex md={6} padding="10px  10px 0 0 !important">
                                <ShadowCard>
                                    <Flex row="row">
                                        <Flex md={12} padding="0 !important">
                                            <InfoTitle background="aboutTitle">
                                                <Typography fntsize="infoCardTitleFontSize" ntresize="true">
                                                    {t("Individual Package")}
                                                </Typography>
                                            </InfoTitle>
                                        </Flex>
                                        <Flex md={12} padding="0 !important">
                                            <Typography fntsize="cardSubTitleFontSize" margin="5px 0" ntresize="true">
                                                {t("Keep place for Icon of Individual Type")}
                                            </Typography>
                                        </Flex>
                                        <ULine />
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Residence")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("6-Month Package")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("1-Year Package")}
                                            </Typography>
                                        </Flex>
                                        <ULine />

                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Bangladesh")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Tk. 1200/=")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Tk. 2200/=")}
                                            </Typography>
                                        </Flex>
                                        <ULine />
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Outside Bangladesh")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("US$ 30.00")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("US$ 50.00")}
                                            </Typography>
                                        </Flex>
                                    </Flex>

                                </ShadowCard>
                            </Flex>
                            <Flex md={6} padding="10px  0 0 0 !important">
                                <ShadowCard>
                                    <Flex row="row">
                                        <Flex md={12} padding="0 !important">
                                            <InfoTitle background="aboutTitle">
                                                <Typography fntsize="infoCardTitleFontSize" ntresize="true">
                                                    {t("Commercial Package")}
                                                </Typography>
                                            </InfoTitle>
                                        </Flex>
                                        <Flex md={12} padding="0 !important">
                                            <Typography fntsize="cardSubTitleFontSize" margin="5px 0" ntresize="true">
                                                {t("Keep place for Icon of Commercial Type")}
                                            </Typography>
                                        </Flex>
                                        <ULine />
                                        <Flex md={3} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" margin="12px 0 0 0" ntresize="true">
                                                {t("Business Location")}
                                            </Typography>

                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">

                                            <Flex row="row">
                                                <Flex md={12} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" margin="0 0 5px 10px" ntresize="true">
                                                        {t("6-Month Package")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" ntresize="true">
                                                        {t("Basic")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" ntresize="true">
                                                        {t("Premium")}
                                                    </Typography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">

                                            <Flex row="row">
                                                <Flex md={12} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" margin="0 0 5px 10px" ntresize="true">
                                                        {t("1-Year Package")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" ntresize="true">
                                                        {t("Basic")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="cardContentFontSize" ntresize="true">
                                                        {t("Premium")}
                                                    </Typography>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                        <ULine />

                                        <Flex md={3} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Bangladesh")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">
                                            <Flex row="row">
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("Tk. 1500/=")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("Tk. 2500/=")}
                                                    </Typography>
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">
                                            <Flex row="row">
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("Tk. 3000/=")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("Tk. 4000/=")}
                                                    </Typography>
                                                </Flex>

                                            </Flex>
                                        </Flex>

                                        <ULine />
                                        <Flex md={3} padding="0 !important">
                                            <Typography fntsize="cardContentFontSize" ntresize="true">
                                                {t("Outside Bangladesh")}
                                            </Typography>
                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">
                                            <Flex row="row">
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("US$ 40.00")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("US$ 70.00")}
                                                    </Typography>
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                        <Flex md={4.5} padding="0 !important">
                                            <Flex row="row">
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("US$ 60.00")}
                                                    </Typography>
                                                </Flex>
                                                <Flex md={6} padding="0 !important">
                                                    <Typography fntsize="fontBn" margin="0 0 0 10px" ntresize="true">
                                                        {t("US$ 100.00")}
                                                    </Typography>
                                                </Flex>

                                            </Flex>
                                        </Flex>
                                    </Flex>

                                </ShadowCard>
                            </Flex>
                        </Flex>
                    </InfoSubTitle>
                </Flex>

                <Flex row="row">
                    <Flex md={12} padding="0 !important">
                        <InfoSubTitle background="aboutContent">
                            <Typography fntsize="cardSubTitleFontSize" >
                                {t("seasonal_title")}
                            </Typography>
                            <Flex row="row">
                                <Flex md={3}></Flex>
                                <Flex md={6} padding="10px  0 !important">
                                    <ShadowCard>
                                        <Flex row="row">
                                            <Flex md={12} padding="0 !important">
                                                <InfoTitle background="aboutTitle">
                                                    <Typography fntsize="infoCardTitleFontSize" >
                                                        {t("Package for Seasonal Trader")}
                                                    </Typography>
                                                </InfoTitle>
                                            </Flex>
                                            <Flex md={12} padding="0 !important">
                                                <Typography fntsize="cardSubTitleFontSize" margin="5px 0">
                                                    {t("Both Individual or Commercial ")}
                                                </Typography>
                                            </Flex>
                                            <ULine />
                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("Residence")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("3-Month Package")}
                                                </Typography>
                                            </Flex>
                                            <ULine />

                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("Bangladesh")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("Tk. 800/=")}
                                                </Typography>
                                            </Flex>

                                            <ULine />
                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("Outside Bangladesh")}
                                                </Typography>
                                            </Flex>
                                            <Flex md={6} padding="0 !important">
                                                <Typography fntsize="cardContentFontSize" >
                                                    {t("US$ 10.00")}
                                                </Typography>
                                            </Flex>

                                        </Flex>

                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 0 10px 0"></Flex>
                            </Flex>
                        </InfoSubTitle>
                    </Flex>

                </Flex>
            </Flex>
            <Flex row="row">
                <Flex md={12} padding="10px 0 !important">
                    <InfoSubTitle background="aboutContent">
                        <Typography fntsize="cardSubTitleFontSize" fntweight="bold">
                            {t("pricing_note")}
                        </Typography>
                    </InfoSubTitle>
                </Flex>

            </Flex>

        </Container>
    </div>
}