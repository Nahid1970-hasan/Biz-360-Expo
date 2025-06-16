import { useEffect, useState } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, InfoSubTitle, InfoTitle } from "../component/style/styled_card";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../features/page/page_slice";
import { loadViewData } from "../features/viewdemo/view_demo_slice";
import { Loading } from "../component/Loading";

export const ViewDemoPage = () => {
    const { t, i18n } = useTranslation();
    const viewdata = useSelector((state) => state.viewdata);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false) }, 2000);
        dispatch(loadPage({ title: "view_demo", button: false }));
        dispatch(loadViewData());
    }, []);

    // Set the first video as selected when data loads
    useEffect(() => {
        if (viewdata?.videoList?.length > 0 && !selectedVideo) {
            setSelectedVideo(viewdata.videoList[0]);
        }
    }, [viewdata, selectedVideo]);

    useTitle(t('view_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex md={12} sm={12} xs={12} padding="10px 0 !important">
                    <Flex row="row">
                        <Flex md={3} xs={12} padding="0 5px 0 0 !important">
                            <InfoCard>
                                <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                    {t("view_demo")}
                                </Typography>
                                <ULine />
                                {viewdata?.videoList?.map((video) => (
                                    <Typography
                                        key={video.vedio_id}
                                        fntsize="bodyTitleFontSize"
                                        txtalign="left"
                                        margin="20px 0 0 0"
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: selectedVideo?.vedio_id === video.vedio_id ? 'bold' : 'normal'
                                        }}
                                        onClick={() => setSelectedVideo(video)}
                                    >
                                        {video.vedio_title}
                                    </Typography>
                                ))}
                            </InfoCard>
                        </Flex>
                        <Flex md={9} xs={12} padding="0 0 0 5px !important">
                            <InfoCard>
                                <Flex row="row">
                                    {viewdata?.videoList?.map((video) => (
                                        <Flex md={6} key={video.vedio_id} padding="10px">
                                            <Typography 
                                                fntsize="buttonFontSize" 
                                                txtalign="left" 
                                                margin="0 0 10px 0"
                                                style={{
                                                    fontWeight: selectedVideo?.vedio_id === video.vedio_id ? 'bold' : 'normal'
                                                }}
                                            >
                                                {video.vedio_title}
                                            </Typography>
                                            <iframe
                                                width="100%"
                                                height="300"
                                                src={video.vedio_url}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{
                                                    borderRadius: '8px',
                                                    margin: '0 auto',
                                                    display: 'block'
                                                }}
                                                title={video.vedio_title}
                                            ></iframe>
                                        </Flex>
                                    ))}
                                </Flex>
                            </InfoCard>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
            <Loading open={isLoading} />
        </div>
    );
};