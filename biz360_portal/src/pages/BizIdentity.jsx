import { useEffect } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { InfoCard, ShadowCard } from "../component/style/styled_card";
import useTitle from "../hooks/useTitle";
import { SizeBox } from "../component/style/styled_sizebox";
import { KDImg } from "../component/style/styled_img";
import banner from "../assets/banner-icon/banner-biz360expo.png";
import logo from "../assets/banner-icon/logo-biz360expo.png";
import icon from "../assets/banner-icon/icon-biz360expo.png";
import { Center } from "../component/style/styled_center";

export const BizIdentityPage = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    const handleNavigation = (url) => {
        if (!url.startsWith('http://www.') && !url.startsWith('https://www.')) {
            if (url.includes('@')) {
                window.location.href = `mailto:${url}`;
                return;
            }
            url = `https://www.${url}`;
        }
        window.location.href = url;
    };

    return (
        <Container>
            <Flex md={12} xs={12} padding="10px 0 !important">
                <InfoCard>
                    <Flex row="row" justifycenter="true">
                        <Flex md={12} xs={12} padding="0 !important">
                            <Typography fntsize="bodyHeader" fntweight="bold" margin="0 0 10px 0">
                                Biz 360 Expo Identity
                            </Typography>
                            <ULine />
                            {/* <Typography fntweight="bold" txtalign="left" fntsize="infoCardSubTitleFontSize" margin="10px 0 0 0">
                                Logo & Banner
                            </Typography> */}
                            <SizeBox/>
                            <Flex row="row">
                                <Flex md={4} padding="0 5px 0 0!important">
                                    <Typography fntweight="bold"  fntsize="infoCardSubTitleFontSize"margin="0 0 10px 0">Logo</Typography>
                                    <ShadowCard>
                                        <Center>
                                            <KDImg
                                                src={logo}
                                                height={"70px"}
                                                width={"auto"}
                                                noborder="true"
                                            />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={4} padding="0 5px!important">
                                    <Typography fntweight="bold"  fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">Banner</Typography>
                                    <ShadowCard>
                                        <Center>
                                            <KDImg
                                                src={banner}
                                                height={"70px"}
                                                width={"100%"}
                                                noborder="true"
                                            />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={4} padding="0 0 0 5px!important">
                                    <Typography fntweight="bold"  fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">Icon</Typography>
                                    <ShadowCard>
                                        <Center>
                                            <KDImg
                                                src={icon}
                                                height={"70px"}
                                                width={"auto"}
                                                noborder="true"
                                            />
                                        </Center>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex md={12} xs={12} padding="0 !important">
                            <Typography fntweight="bold" txtalign="left" fntsize="infoCardSubTitleFontSize" margin="10px 0 0 0">
                                Domain of Biz 360 Expo
                            </Typography>
                            <Flex row="row">
                                {["biz360expo.com", "biz360expo.org", "biz360expo.net", "biz360expo.xyz", "biz360expo.biz"].map((domain) => (
                                    <Flex md={2} padding="10px 5px 0 5px!important" key={domain}>
                                        <ShadowCard>
                                            <Typography>
                                                <a href="javascript:void(0)" onClick={() => handleNavigation(domain)} style={{ cursor: 'pointer' }}>
                                                    {domain}
                                                </a>
                                            </Typography>
                                        </ShadowCard>
                                    </Flex>
                                ))}
                            </Flex>
                            <SizeBox />
                            <Flex row="row">
                                <Flex md={6} padding="0 10px 0 0!important">
                                    <Typography fntweight="bold" txtalign="left" fntsize="infoCardSubTitleFontSize">
                                        Email Accounts
                                    </Typography>
                                    <Flex row="row">
                                        {["contact@biz360expo.com","marketing@biz360expo.com"].map((email, index) => (
                                            <Flex md={6} padding={`10px ${index % 2 ? '0 0 5px' : '5px 0 0'}!important`} key={email}>
                                                <ShadowCard top={index ? "0px" : "0"}>
                                                    <Typography>
                                                        <a href="javascript:void(0)" onClick={() => handleNavigation(email)} style={{ cursor: 'pointer' }}>
                                                            {email}
                                                        </a>
                                                    </Typography>
                                                </ShadowCard>
                                            </Flex>
                                        ))}
                                    </Flex>
                                   
                                </Flex>
                               
                            </Flex>
                            <Flex row="row">
                                 <Flex md={3} padding="10px 10px 0 0!important">
                                    <Typography fntweight="bold" txtalign="left" fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">
                                        YouTube Channel
                                    </Typography>
                                    {["youtube.com/@Biz360Expo"].map((url, index) => (
                                        <ShadowCard top={index ? "10px" : "0"} key={url}>
                                            <Typography>
                                                <a href="javascript:void(0)" onClick={() => handleNavigation(url)} style={{ cursor: 'pointer' }}>
                                                    {url}
                                                </a>
                                            </Typography>
                                        </ShadowCard>
                                    ))}
                                </Flex>
                            </Flex>
                            <SizeBox />
                            <Flex row="row">
                                <Flex md={12} padding="0 !important">
                                    <Typography fntweight="bold" txtalign="left" fntsize="infoCardSubTitleFontSize">
                                        Social Media Accounts
                                    </Typography>
                                </Flex>
                                <Flex md={3} padding="0 5px 0 0!important">
                                    <Typography fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">
                                        Facebook Business Page
                                    </Typography>
                                    {["facebook.com/biz360expo"].map((url, index) => (
                                        <ShadowCard top={index ? "10px" : "0"} key={url}>
                                            <Typography>
                                                <a href="javascript:void(0)" onClick={() => handleNavigation(url)} style={{ cursor: 'pointer' }}>
                                                    {url}
                                                </a>
                                            </Typography>
                                        </ShadowCard>
                                    ))}
                                </Flex>
                                <Flex md={3} padding="0 5px!important">
                                    <Typography fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">
                                        LinkedIn Accounts
                                    </Typography>
                                    <ShadowCard>
                                        <Typography>
                                            <a href="javascript:void(0)" onClick={() => handleNavigation("linkedin.com/in/biz360expo/")} style={{ cursor: 'pointer' }}>
                                                linkedin.com/in/biz360expo/
                                            </a>
                                        </Typography>
                                    </ShadowCard>
                                </Flex>
                                <Flex md={3} padding="0 0 0 5px!important">
                                    <Typography fntsize="infoCardSubTitleFontSize" margin="0 0 10px 0">
                                        X / Twitter Accounts
                                    </Typography>
                                    <ShadowCard>
                                        <Typography>
                                            <a href="javascript:void(0)" onClick={() => handleNavigation("x.com/biz360expo")} style={{ cursor: 'pointer' }}>
                                                x.com/biz360expo
                                            </a>
                                        </Typography>
                                    </ShadowCard>
                                </Flex>
                            </Flex>
                            <SizeBox />
                        </Flex>
                    </Flex>
                </InfoCard>
            </Flex>
        </Container>
    );
};