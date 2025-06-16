import { useEffect, useState } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import Aos from "aos";
import "aos/dist/aos.css";
import { InfoSubTitle, InfoTitle, ModalCard, ShadowCard } from "../component/style/styled_card";
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
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [rowData, setRowData] = useState([]);
    useTitle(t('fre_qus_title'))
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

    const handleGroupClick = (groupId) => {
        const selectedGroup = faqData?.dataList?.find(group => group.group_id === groupId);
        if (selectedGroup) {
            setSelectedGroupId(groupId);
            setRowData(selectedGroup.faq_list || []);
        }
    };

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <InfoSubTitle background="aboutContent">
                    <Flex row="row">
                        <Flex md={12} padding="0 !important">
                            <InfoTitle background="aboutTitle">
                                <Typography fntsize="dsTextFontSize" fntweight="bold" margin="0">
                                    {t("faq")}
                                </Typography>
                            </InfoTitle>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 10px !important" md={3} sm={12} xs={12}>
                            <Typography margin="5px 0 " fntweight="bold">{t("faq_type")}</Typography>
                            <ULine />
                            <Flex direction="column" style={{ width: '100%' }}>
                                {faqData?.dataList?.map((group, index) => (
                                    <div
                                        key={group.group_id}
                                        onClick={() => handleGroupClick(group.group_id)}
                                        style={{
                                            cursor: "pointer",
                                            padding: "2px",
                                            backgroundColor: selectedGroupId === group.group_id ? "#f0f0f0" : "transparent",
                                            borderRadius: "4px",
                                            width: '100%',
                                            transition: 'background-color 0.2s',
                                        }}
                                    >
                                        <Typography fntweight={selectedGroupId === group.group_id ? "bold" : "normal"} >
                                            {safeGetLangValue(group.group_name, lang)}
                                        </Typography>
                                    </div>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex padding="30px 0!important" md={9} sm={12} xs={12}>
                            <ModalCard padding="10px">
                                {rowData.length === 0 ? (
                                    <Typography txtalign="center">
                                        {t("select_faq_type")}
                                    </Typography>
                                ) : (
                                    rowData.map((item, index) => (
                                        <ShadowCard key={index} style={{ marginBottom: "1rem" }}>
                                            <Typography margin="0 0 0.5rem 0" txtalign="left">
                                                <strong>{index + 1}. {t("question")}:</strong> {safeGetLangValue(item.question, lang)}
                                            </Typography>
                                            <Typography txtalign="left" margin=" 0 0 0 20px">
                                                <b>   {t("answer")}{" "} {":"}</b>{" "} {safeGetLangValue(item.answer, lang)}
                                            </Typography>
                                        </ShadowCard>
                                    ))
                                )}
                            </ModalCard>
                        </Flex>
                    </Flex>
                </InfoSubTitle>
            </Container>
            <Loading open={isLoading} />
        </div>
    );
};