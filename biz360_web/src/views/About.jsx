import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import ImageCaptcha from "../component/ImgCaptcha";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Center } from "../component/style/styled_center";


export const UserAboutPage = () => {
    const user = useSelector((state) => state.user);
    const [fullname, setfullname] = useState();

    useEffect(() => {
        setfullname(localStorage.getItem("fullname"));
    }, [])

    return (
        <>
            <Suspense>
                <Container>
                    <Center>
                        <h2>Hi  <b>{fullname}</b> </h2>
                        <h3>This is your <b>About Page</b></h3>
                    </Center>
                </Container>
            </Suspense>
        </>

    );
};
