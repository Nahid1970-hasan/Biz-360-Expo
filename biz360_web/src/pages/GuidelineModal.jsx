
import { useSelector } from "react-redux";
import { Modal } from "../component/Modal";
import { Flex } from "../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { Center } from "../component/style/styled_center";
import { KDImg } from "../component/style/styled_img";
import bizBanner from "../assets/banner-icon/banner-biz360expo.png"
import guidline from "../assets/guidlines.jpeg"
import { GL, Typography, ULine } from "../component/style/styled_typography";
import { InfoCard } from "../component/style/styled_card";
import { Select } from "../component/style/styled_select";
import { useState } from "react";
import { SizeBox } from "../component/style/styled_sizebox";
import styled from "styled-components";
import { InlineFlex } from "../component/style/styled_inlineflex";

const ScrollArea = styled.div`
    height: 400px;
    overflow: scroll;
    padding: 10px;
`

export const GuidelineModal = ({ open, setOpen = () => { }, }) => {
    const user = useSelector((state) => state.user);
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState('en');
 
    return <>
        <Modal
            md={10}
            sm={12}
            xs={12}
            title={t("guidelines")}
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            outsideclick

        >

            <div style={{
                position: 'sticky',
                top: 0,
                paddingBottom: '10px',
                backgroundColor: '#e4ffea',
                zIndex: 1,

            }}>
                <Flex row="row">
                    <Flex md={2} sm={12} xs={12} padding="0 !important"></Flex>
                    <Flex md={8} sm={12} xs={12} padding="0 !important">
                        <Center>

                       
                                <KDImg src={bizBanner} width={"260px"} height={"50px"} noborder="true" />
                     
                            <Typography fntsize="bodyHeader" fntweight="bold">
                                {t("biz_header", {lng: selectedLang})}
                            </Typography>
                            <Typography fntsize="bodyTitleFontSize" fntweight="bold" >
                                {t("biz_title",  {lng: selectedLang})}
                            </Typography>
                        </Center>
                    </Flex>
                    <Flex md={2} sm={12} xs={12} padding="55px 30px 0 0!important">
                        <InlineFlex justifycontent="end">
                    <Typography
                        // color={localStorage.i18nextLng == "en" ? "cardContent" : "infoCardContent"}
                        txtalign="left"
                        fntcolor="font"
                        margin="0 5px"
                        onClick={(e) => {setSelectedLang ("en")}}
                    >
                        {t("English")}
                    </Typography>
                    {" "}{" | "}{" "}
                    <Typography
                        fntcolor="font"
                        margin="0 5px"
                        onClick={(e) => { setSelectedLang ("bn")}}
                        txtalign="left"
                    >
                        {t("বাংলা")}
                    </Typography>
                </InlineFlex>
                    </Flex>
                </Flex>
            </div>
            <ScrollArea>
                <Flex row="row">
                    <Flex md={12} sm={12} xs={12} padding="10px 0 0 0!important">
                        <Typography fntweight="bold" txtalign="left" fntsize="girdHeaderFontSize">
                            {t("intro_biz", {lng: selectedLang})}
                        </Typography>
                        <Typography txtalign="left">
                            {t("guid_desc1", {lng: selectedLang})}
                        </Typography>
                        <Typography txtalign="left">
                            {t("guid_desc2", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={5} sm={12} xs={12} padding="10px 10px 0 0!important">
                                <InfoCard>
                                    <Typography txtalign="left" margin="40px 0 5px 0" fntsize="cardSubTitleFontSize">
                                        {t("step_guid_title_1", {lng: selectedLang})}
                                    </Typography>
                                    <Typography txtalign="left" margin="10px 0 5px 0" fntsize="cardSubTitleFontSize">
                                        {t("step_guid_title_2", {lng: selectedLang})}
                                    </Typography>
                                    <Typography txtalign="left" margin="10px 0 5px 0" fntsize="cardSubTitleFontSize">
                                        {t("step_guid_title_3", {lng: selectedLang})}
                                    </Typography>
                                    <Typography txtalign="left" margin="10px 0 5px 0" fntsize="cardSubTitleFontSize">
                                        {t("step_guid_title_4", {lng: selectedLang})}
                                    </Typography>
                                    <Typography txtalign="left" margin="10px 0 5px 0" fntsize="cardSubTitleFontSize">
                                        {t("step_guid_title_5", {lng: selectedLang})}
                                    </Typography>
                                </InfoCard>
                            </Flex>
                            <Flex md={4} sm={12} xs={12} padding="10px 0 0 0!important">
                                <InfoCard>
                                    <KDImg height={"auto"} src={guidline} noborder="true" />
                                </InfoCard>
                            </Flex>
                        </Flex>
                        <Typography txtalign="left" margin="10px 0 0 0">
                            {t("guid_desc3", {lng: selectedLang})}
                        </Typography>

                        <Typography txtalign="left" margin="10px 0 0 0" fntweight="bold">
                            {t("step_guid_title_1", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_1", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_1", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>

                        <Typography txtalign="left" margin="10px 0 0 0" fntweight="bold">
                            {t("step_guid_title_2", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_2", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_2", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_3", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_3", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>

                        <Typography txtalign="left" margin="10px 0 0 0" fntweight="bold">
                            {t("step_guid_title_3", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_4", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_4", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_5", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_5", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_6", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_6", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_7", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_7", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>

                        <Typography txtalign="left" margin="10px 0 0 0" fntweight="bold">
                            {t("step_guid_title_4", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_8", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_8", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>

                        <Typography txtalign="left" margin="10px 0 0 0" fntweight="bold">
                            {t("step_guid_title_5", {lng: selectedLang})}
                        </Typography>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_9", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_9", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <Flex row="row">
                            <Flex md={.2} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_10", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                            <Flex md={11.8} padding="0!important">
                                <Typography txtalign="left"  >
                                    {t("step_guid_10", {lng: selectedLang})}
                                </Typography>
                            </Flex>
                        </Flex>
                        <SizeBox />
                        <ULine />
                        <Typography txtalign="left" margin="10px 0 0 0" >
                            {t("guid_desc_l", {lng: selectedLang})}
                        </Typography>
                        <Typography txtalign="left" margin="5px 0 0 0" fntweight="bold">
                            <GL>{t("wishing_title", {lng: selectedLang})} </GL>
                        </Typography>
                        <Typography txtalign="left" margin="1px 0 0 0" >
                            {t("thanks", {lng: selectedLang})}
                        </Typography>
                        <Typography txtalign="left" margin="1px 0 0 0" >
                            {t("biz_360_expro", {lng: selectedLang})}
                        </Typography>
                    </Flex>
                </Flex>
                </ScrollArea>
        </Modal>
    </>

}