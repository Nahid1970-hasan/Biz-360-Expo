import { useEffect, useRef, useState } from "react";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";

import Aos from "aos";
import "aos/dist/aos.css";
import { Card, CardBody, InfoSubTitle, InfoTitle, ShadowCard } from "../component/style/styled_card";


import { SizeBox } from "../component/style/styled_sizebox";
import { Formik } from "formik";
import { Input } from "../component/style/styled_input";
import { TextArea } from "../component/style/styled_textarea";
import { CheckboxLabel } from "../component/Checkbox";
import ImageCaptcha from "../component/ImgCaptcha";
import { Menu } from "../component/Menu";
import { PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import useTitle from "../hooks/useTitle";

export const FooterFeedback = () => {
    const formRef = useRef(null);
    const buttonRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [validCaptcha, setValidCaptcha] = useState(false);
    const { t, i18n } = useTranslation();
    useTitle(t('feed_title'))
    useEffect(() => {
        Aos.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);
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

    const submitForm = (values) => {
        setMsg("Successfully Submitted.");
        formRef.current.resetForm();
        setValidCaptcha(false);
        setTimeout(() => { setMsg("") }, 4000);
    };

    return (
        <div style={{ userSelect: "none" }}>
            <Container>
                <Flex row="row">
                    <Flex md={12} padding="0 !important" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
                        <InfoSubTitle background="aboutContent">
                            <Flex row="row">

                                <Flex md={12} padding="10px 0 !important">
                                    <InfoTitle background="aboutTitle">
                                        <Typography fntsize="dsTextFontSize" fntweight="bold">
                                            {t("your_feedback")}
                                        </Typography>
                                    </InfoTitle>


                                </Flex>

                            </Flex>
                            <Flex row="row">
                                <Flex md={2} padding="0!important"></Flex>
                                <Flex md={6} padding=" 0 10px">
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
                                <Flex md={4} padding="0!important"></Flex>
                            </Flex>
                        </InfoSubTitle>
                    </Flex>

                </Flex>
            </Container>
        </div>
    );
};