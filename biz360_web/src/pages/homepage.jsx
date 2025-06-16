import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Flex } from "../component/style/styled_flex";
import { Card, CardBody, InfoCard } from "../component/style/styled_card";
import { Typography } from "../component/style/styled_typography";
import { CircleKDImg, ImageArea, KDImg } from "../component/style/styled_img";
import img from "../assets/logo.jpg";
import hatimg from "../assets/hat_bazar.jpg";
import { Center } from "../component/style/styled_center";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import whatsapp from "../assets/icons/whatsapp.svg";
import { SizeBox } from "../component/style/styled_sizebox";
import { Input } from "../component/style/styled_input";
import { Formik } from "formik";
import { PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { Menu } from "../component/Menu";
import ImageCaptcha from "../component/ImgCaptcha";
import { CheckboxLabel } from "../component/Checkbox";
import { Icon } from "../component/style/styled_icon";
import { TextArea } from "../component/style/styled_textarea";
import { Toast } from "../component/Toast";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake;
export const HomePage = () => {
    const { t, i18n } = useTranslation();
    const user = useSelector((state) => state.user);
    const [msg, setMsg] = useState("");

    const galleryData = ["asd", "Dasd", "weew", "asd", "Dasd", "weew", "asd", "Dasd", "weew", "asd", "Dasd", "weew"];

    let items = galleryData?.map((slideImage, index) => (
        <Flex row="row" key={index}>
            <Flex md={12}>
                <Center><CircleKDImg height={150} width={150}><img src={img}></img></CircleKDImg></Center>
            </Flex>
        </Flex>));

    const responsive = {
        0: { items: 2 },
        820: { items: 4 },
        1080: { items: 6 },
    };

    const makePdfINVData = () => {
        var demoPdfDefinition = {
            content: [

                 
                {
                    margin: [0, 10, 0, 0],
                    table: {
                        widths: ["5%", "45%", "15%", "15%", "20%"],
                        body: [
                            [
                                {
                                    text: "From",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left",
                                    colSpan: 2,
                                },
                                {
                                    text: "",
                                    alignment: "center",
                                },
                                {
                                    text: "From",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left",
                                    colSpan: 3, 
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                            ],
                            [
                                {
                                    text: "Sender Name",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left", 
                                    colSpan: 2,
                                },
                                {
                                    text: "",
                                    alignment: "center",
                                },
                                {
                                    text: "Sender Name",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left", 
                                    colSpan: 3, 
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                            ],
                            [
                                {
                                    text: "Sender Mobile",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left", 
                                    colSpan: 2,
                                },
                                {
                                    text: "",
                                    alignment: "center",
                                },
                                {
                                    text: "Receiver Mobile",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left", 
                                    colSpan: 3, 
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                            ],
                            [
                                {
                                    text: "#",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Description",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left",
                                },
                                {
                                    text: "Qty",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Unit Price",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                                {
                                    text: "Amount",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                            ],
                            [
                                {
                                    text: "1",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "Harivanga",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                                {
                                    text: "10kg",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "120.00 Tk",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                                {
                                    text: "1200.00 Tk",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                            ],

                        ],
                    },
                },

            ],
            styles: {
                header: {
                    fontSize: 10,
                    alignment: "right",
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 5, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
            },
        };
        var now = new Date();
        var nameformate = "INVOICE_" + now.getHours() + now.getMinutes() + now.getSeconds() + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);

    }

    const makePdfData = () => {
        var demoPdfDefinition = {
            content: [
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [
                            [
                                {
                                    text: "King Digital Recharge Limited.",
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 25,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                            ],
                            [
                                {
                                    text: "Mobile: 01292912043214",
                                    style: "header",
                                    alignment: 'center',
                                    fontSize: 18,
                                    colSpan: 1,
                                    bold: true,
                                    rowSpan: 1,
                                    margin: [0, 0, 0, 0]
                                },
                            ],
                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ["60%", "40%"],
                        headerRows: 1,
                        body: [

                            [{
                                text: "Order No: INV23489090",
                                fontSize: 10,
                                alignment: "left",
                            },
                            {
                                text: "Order Date: 30 April 2025",
                                fontSize: 10,
                                alignment: "right",
                            },]

                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [
                                {
                                    text: "Name: Person Name",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],

                            [
                                {
                                    text: "Mobile: 01721909090",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],
                            [
                                {
                                    text: "Address: Mohammadpur, Dhaka-1209",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                            ],
                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ["5%", "50%", "7%", "19%", "19%"],
                        body: [

                            [
                                {
                                    text: "#",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Description",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "left",
                                },
                                {
                                    text: "Qty",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "center",
                                },
                                {
                                    text: "Unit Price (TK)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                                {
                                    text: "Amount (TK)",
                                    fontSize: 12,
                                    bold: true,
                                    alignment: "right",
                                },
                            ],
                            [
                                {
                                    text: "1",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "Harivanga",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                                {
                                    text: "10",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "120.00",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                                {
                                    text: "1200.00",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                            ],
                            [
                                {
                                    text: "1",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "Harivanga",
                                    fontSize: 10,
                                    alignment: "left",
                                },
                                {
                                    text: "10",
                                    fontSize: 10,
                                    alignment: "center",
                                },
                                {
                                    text: "120.00",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                                {
                                    text: "1200.00",
                                    fontSize: 10,
                                    alignment: "right",
                                },
                            ],
                        ],
                    },
                },
                {
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [
                                {
                                    text: "Total: 1200.00 Tk",
                                    alignment: "right",
                                    bold: true,
                                    fontSize: 12,
                                }
                            ]

                        ],
                    },
                    layout: 'noBorders'
                },
                {
                    margin: [0, 20, 0, 0],
                    table: {
                        widths: ["100%"],
                        headerRows: 1,
                        body: [

                            [{
                                text: "N:B: Pay as soon as possible",
                                alignment: "left",
                                italics: true,
                                fontSize: 10,
                            }
                            ]

                        ],
                    },
                    layout: 'noBorders'
                },
            ],
            styles: {
                header: {
                    fontSize: 10,
                    alignment: "right",
                    fillColor: "#e2e2e2",
                    color: "black",
                    margin: [0, 0, 5, 0]
                },
            },
            defaultStyle: {
                margin: [0, 0, 0, 0],
            },
        };
        var now = new Date();
        var nameformate = "INVOICE_" + now.getHours() + now.getMinutes() + now.getSeconds() + ".pdf";
        pdfMake.createPdf(demoPdfDefinition).download(nameformate);

    }

    return (
        <>{(msg && <Toast color="success" msg={msg} />)}
            <Suspense>
                <Container>
                    <Flex row="row">
                        <Flex md={12}>
                            <AliceCarousel
                                disableButtonsControls={true}
                                disableDotsControls={true}
                                disableSlideInfo={true}
                                touchMoveDefaultEvents={false}
                                responsive={responsive}
                                autoPlay={true}
                                infinite={true}
                                mouseTracking={true}
                                autoPlayInterval={5000}
                                items={items}
                            >
                            </AliceCarousel>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0!important" md={3} xs={12}>
                            <ImageArea> <KDImg height={"200px"} width={"100%"} src={hatimg} /> </ImageArea>
                            <ImageArea> <KDImg height={"400px"} width={"100%"} src={hatimg} /> </ImageArea>
                        </Flex>
                        <Flex padding="0 !important" md={6} xs={12}>
                            <ImageArea> <KDImg height={"400px"} width={"100%"} src={hatimg} /> </ImageArea>
                            <Flex row="row">
                                <Flex padding="0 !important" md={6} xs={12}>
                                    <ImageArea> <KDImg height={"200px"} width={"100%"} src={hatimg} /> </ImageArea>
                                </Flex>
                                <Flex padding="0 !important" md={6} xs={12}>
                                    <ImageArea> <KDImg height={"200px"} width={"100%"} src={hatimg} /> </ImageArea>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex padding="0 !important" md={3} xs={12}>
                            <ImageArea> <KDImg height={"200px"} width={"100%"} src={hatimg} /> </ImageArea>
                            <ImageArea> <KDImg height={"190px"} width={"100%"} src={hatimg} /> </ImageArea>
                            <ImageArea> <KDImg height={"200px"} width={"100%"} src={hatimg} /> </ImageArea>
                        </Flex>
                    </Flex>
                    <SizeBox h="20px" />
                    <InfoCard>
                        <Flex row="row">
                            <Flex md="7">
                                <Typography fntsize="titleLargeFontSize" fntweight="bold" txtalign="left">BIZ360Expo powers millions of businesses worldwide</Typography>
                                <Typography fntsize="cardTitleFontSize" txtalign="left">There all-in-one commerce platform to start, run and grow a business</Typography>
                                <PrimaryButton
                                    color="primaryButton"
                                    type="button"
                                    fontcolor="font"
                                    onClick={() => { makePdfData() }}
                                >
                                    {t("get_start")}
                                </PrimaryButton>
                            </Flex>
                            <Flex md="5">
                                <KDImg src={hatimg} height={"280px"} width={"100%"} noborder="true" />
                            </Flex>
                        </Flex>
                    </InfoCard>
                    <SizeBox h="20px" />
                    <Flex row="row">
                        <Flex md="5">
                            <KDImg src={hatimg} height={"280px"} width={"100%"} />
                        </Flex>
                        <Flex md="7">
                            <Typography fntsize="titleLargeFontSize" fntweight="bold" txtalign="left">We're building a 100-year company</Typography>
                            <Typography fntsize="cardTitleFontSize" txtalign="left">There all-in-one commerce platform to start, run and grow a business</Typography>

                        </Flex>
                    </Flex>

                </Container>
            </Suspense>
        </>

    );
};
