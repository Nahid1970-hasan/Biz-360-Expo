import { useEffect, useState } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle, ModalCard, ShadowCard } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../component/Loading";
import { loadPage } from "../features/page/page_slice";
import { loadFaq } from "../features/faq/faq_Slice";
import useTitle from "../hooks/useTitle";

export const PubFaqPage = () => {
    const faqData = useSelector((state) => state.faqData);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");
    const { t, i18n } = useTranslation();
    const [selectedGroup, setSelectedGroup] = useState(null);
    useTitle(t('fre_qus_title'));

    const safeGetLangValue = (value, lang) => {
        try {
            if (typeof value === 'string') {
                const parsed = JSON.parse(value);
                return parsed[lang] || parsed.en || '';
            }
            return value[lang] || value.en || '';
        } catch (e) {
            return '';
        }
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false) }, 2000);
        dispatch(loadPage({ title: "faq", button: false }));
        dispatch(loadFaq());
    }, []);

    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        faqData.loading === "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [faqData.loading]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const handleBackToAll = () => {
        setSelectedGroup(null);
    };


    const renderAllGroups = () => (
        <>
            <InfoCard>
                {faqData?.dataList?.map((group) => (
                    <div key={group.group_id} style={{ marginBottom: "2rem" }}>
                        <Typography
                        txtalign="left"
                            fntsize="cardTitleFontSize"
                            fntweight="bold"
                            margin="0 0 1rem 0"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleGroupClick(group)}
                        >
                            {safeGetLangValue(group.group_name, lang)}
                        </Typography>
                       
                        {group.faq_list?.map((item, index) => (
                            <div key={index} style={{ marginBottom: "1rem" }}>
                                <Typography margin="0 0 0.5rem 0" txtalign="left">
                                    <strong>{index + 1}. {t("question")}:</strong> {safeGetLangValue(item.question, lang)}
                                </Typography>
                                <Typography txtalign="justify" margin="0 0 0 20px">
                                    <b>{t("answer")}:</b> {safeGetLangValue(item.answer, lang)}
                                </Typography>
                            </div>
                        ))}
                    </div>
                ))}
            </InfoCard>
        </>
    );


    const SelectedGroup = () => (
        <InfoCard>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} onClick={handleBackToAll} >
               
                <Typography fntsize="cardTitleFontSize" fntweight="bold">
                    {safeGetLangValue(selectedGroup.group_name, lang)}
                </Typography>
            </div>

            {selectedGroup.faq_list?.map((item, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    <Typography margin="0 0 0.5rem 0" txtalign="left">
                        <strong>{index + 1}. {t("question")}:</strong> {safeGetLangValue(item.question, lang)}
                    </Typography>
                    <Typography txtalign="left" margin="0 0 0 20px">
                        <b>{t("answer")}:</b> {safeGetLangValue(item.answer, lang)}
                    </Typography>
                </div>
            ))}
        </InfoCard>
    );

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex row="row">
                    <Flex padding="10px 0 10px 0 !important" md={3} sm={12} xs={12}>
                        <InfoCard>
                            <Typography fntsize="dsTextFontSize" fntweight="bold" margin="0 0 10px 0">
                                {t("faq")}
                            </Typography>
                            <ULine />
                            <Flex direction="column" style={{ width: '100%' }}>
                                {faqData?.dataList?.map((group) => (
                                    <div
                                        key={group.group_id}
                                        onClick={() => handleGroupClick(group)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "8px",
                                            backgroundColor: selectedGroup?.group_id === group.group_id ? "#f0f0f0" : "transparent",
                                            borderRadius: "4px",
                                            width: '100%',
                                            transition: 'background-color 0.2s',
                                            marginBottom: '5px'
                                        }}
                                    >
                                        <Typography
                                            txtalign="left"
                                            fntweight={selectedGroup?.group_id === group.group_id ? "bold" : "normal"}
                                        >
                                            {safeGetLangValue(group.group_name, lang)}
                                        </Typography>
                                    </div>
                                ))}
                            </Flex>
                        </InfoCard>
                    </Flex>

                    <Flex padding="0!important" md={9} sm={12} xs={12}>

                        <ModalCard padding="10px">
                            {selectedGroup ? SelectedGroup() : renderAllGroups()}
                        </ModalCard>

                    </Flex>
                </Flex>
            </Container>
            <Loading open={isLoading} />
        </div>
    );
};