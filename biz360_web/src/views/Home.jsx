import { Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import ImageCaptcha from "../component/ImgCaptcha";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import SliderCaptcha from "../component/SliderCaptcha";
import logoImg from "../assets/logo.jpg"; 

export const Home = () => {
    const user = useSelector((state) => state.user); 
    const [token, setToken] = useState(null);
    const captchaRef = useRef(null);

    const onLoad = () => {
        // https://docs.hcaptcha.com/configuration#jsapi
        // captchaRef.current.execute();
    };

    useEffect(() => {
        if (token) console.log(`hCaptcha Token: ${token}`);
    }, [token]);

    const handleVerify = () => {
        console.log('Captcha Verified!');
        // Proceed with form submission or other actions
    };
    return (
        <>
           <Suspense>
                <Container>
                    <ImageCaptcha />
                    <Flex row="">
                        <Flex md={12}>
                            <HCaptcha
                                sitekey="878e8932-186c-43d0-a494-c930aa94d278"
                                onLoad={onLoad}
                                onVerify={setToken}
                                ref={captchaRef}
                            />
                        </Flex>
                    </Flex> 
                </Container>
            </Suspense>
        </>

    );
};
