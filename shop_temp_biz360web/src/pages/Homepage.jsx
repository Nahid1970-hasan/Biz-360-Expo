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
export const HomePage = () => {
    const { t, i18n } = useTranslation();
    const user = useSelector((state) => state.user);
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [validCaptcha, setValidCaptcha] = useState(false);

    const initData = {
        name: "",
        company_name: "",
        email: "",
        mobile: "",
        message: ""
    };

    const validate = (values) => {
        let errors = {};

        return errors;
    };
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

    const submitForm = (values) => {
        setMsg("Successfully Submitted.");
        formRef.current.resetForm();
        setValidCaptcha(false);
        setTimeout(() => { setMsg("") }, 4000);
    };

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
                    <SizeBox h="20px"/>
                    <InfoCard>
                        <Flex row="row">
                            <Flex md="7">
                                <Typography fntsize="titleLargeFontSize" fntweight="bold" txtalign="left">BIZ360Expo powers millions of businesses worldwide</Typography>
                                <Typography fntsize="cardTitleFontSize" txtalign="left">There all-in-one commerce platform to start, run and grow a business</Typography>
                                <PrimaryButton
                                    color="primaryButton"
                                    type="button"
                                    fontcolor="font"
                                >
                                    {t("get_start")}
                                </PrimaryButton>
                            </Flex>
                            <Flex md="5">
                                <KDImg src={hatimg} height={"280px"} width={"100%"} noborder="true" />
                            </Flex>
                        </Flex>
                    </InfoCard>
                    <SizeBox h="20px"/>
                    <Flex row="row">
                        <Flex md="5">
                            <KDImg src={hatimg} height={"280px"} width={"100%"} />
                        </Flex>
                        <Flex md="7">
                            <Typography fntsize="titleLargeFontSize" fntweight="bold" txtalign="left">We're building a 100-year company</Typography>
                            <Typography fntsize="cardTitleFontSize" txtalign="left">There all-in-one commerce platform to start, run and grow a business</Typography>
                            
                        </Flex> 
                    </Flex>
                    <Flex row="row">
                        <Flex md={12}>
                            <Typography fntsize="titleLargeFontSize" fntweight="bold">Get In Touch</Typography>
                        </Flex>
                        <Flex md={6}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">Contact Us</Typography>
                            <SizeBox />
                            <CardBody>
                                <Formik
                                    initialValues={initData}
                                    validate={validate}
                                    innerRef={formRef}
                                    onSubmit={submitForm}
                                >
                                    {(formik) => {
                                        const {
                                            values,
                                            handleChange,
                                            handleSubmit,
                                            errors,
                                            touched,
                                            handleBlur,
                                            isValid,
                                            dirty,
                                            resetForm,
                                        } = formik;
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <Flex row="row">

                                                    <Flex row="row">
                                                        <Flex padding="0 5px 0 0 !important" md={7}>
                                                            <Input
                                                                type="text"
                                                                name="name"
                                                                placeholder={t("name")}
                                                                value={values.name}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </Flex>
                                                        <Flex padding="0 0 0 5px !important" md={5}>
                                                            <Input
                                                                type="text"
                                                                name="company_name"
                                                                placeholder={t("company")}
                                                                value={values.company_name}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </Flex>
                                                    </Flex>
                                                    <Flex row="row">
                                                        <Flex padding="0 5px 0 0 !important" md={7}>
                                                            <Input
                                                                type="text"
                                                                name="email"
                                                                placeholder={t("email")}
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </Flex>
                                                        <Flex padding="0 0 0 5px !important" md={5}>
                                                            <Input
                                                                type="text"
                                                                name="mobile"
                                                                placeholder={t("mobile")}
                                                                value={values.mobile}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                        </Flex>
                                                    </Flex>
                                                    <Flex padding="0 !important" md={12}>
                                                        <TextArea
                                                            type="text"
                                                            name="message"
                                                            placeholder={t("message")}
                                                            value={values.message}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                        />
                                                    </Flex>
                                                    <Flex padding="0 !important" md={12}>
                                                        <CheckboxLabel disabled={validCaptcha} checked={validCaptcha} onClick={() => {
                                                            !validCaptcha && setOpen(!open);
                                                        }} label={t("iam_human")} labelcolor="font" size={"md"} />
                                                        <div>
                                                            <Menu open={open} left={(buttonRef?.current?.offsetLeft + 30) + "px"} top={(buttonRef?.current?.offsetTop - 200) + "px"}>
                                                                <Card>
                                                                    <ImageCaptcha setOpen={(setOpen)} setValidCaptcha={setValidCaptcha} />
                                                                </Card>
                                                            </Menu>
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                                <PrimaryButton
                                                    full="true"
                                                    color="primaryButton"
                                                    type="submit"
                                                    ref={buttonRef}
                                                    fontcolor="font"
                                                    className={!(dirty && isValid) ? "disabled-btn" : ""}
                                                    disabled={!(dirty && isValid) || !validCaptcha}
                                                >
                                                    {t("send")}
                                                </PrimaryButton>
                                            </form>
                                        );
                                    }}
                                </Formik>

                            </CardBody>
                        </Flex>
                        <Flex md={6}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">Our Office Address</Typography>
                            <SizeBox />
                            <CardBody>
                                <Typography txtalign="left" fntsize="bodyContentFontSize" fntweight="bold">
                                    King <b>Digital</b> Recharge Limited (K<b>D</b>RL)
                                </Typography>
                                <Typography txtalign="left" fntsize="bodyContentFontSize" >3rd Floor, House 20, Road 12, PC Culture Housing Society</Typography>
                                <Typography txtalign="left" fntsize="bodyContentFontSize" >Shekertek, Adabor, Dhaka-1207, Bangladesh</Typography>
                                <Flex row="row">
                                    <Flex md={12}>
                                        <iframe height="250px" width="100%" src="https://maps.google.com/maps?q=House%2020,%20Road%20no%2012,%20PC%20Culture%20Society&amp;t=&amp;z=19&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
                                    </Flex>
                                </Flex>

                            </CardBody>
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
