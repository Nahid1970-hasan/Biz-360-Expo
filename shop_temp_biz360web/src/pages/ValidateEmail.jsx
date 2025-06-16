import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Toast } from "../component/Toast";
import { Loading } from "../component/Loading";
import { Container } from "../component/style/styled_contrainer";
import { Card, CardBody } from "../component/style/styled_card";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";
import { Flex } from "../component/style/styled_flex";
import { PrimaryButton } from "../component/style/styled_button";
import { theme } from "../styles/theme";
import { getValidateEmail } from "../features/resetPassword/validate_email_slice";



export const ValidateEmailPage = () => {
    const validEmailData = useSelector((state) => state.validemaildata);
    const dispatch = useDispatch();
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [tokenstr] = useState(token.split(":token=")[1]);

    function validEmail() {
        var data = {
            token: tokenstr
        }
        dispatch(getValidateEmail(data))
    }


    useEffect(() => {
        if (validEmailData.loading == "pending") {
            setIsLoading(true)
        } else if (validEmailData.loading != "idle" && validEmailData.loading != "pending") {
            setTimeout(() => { setIsLoading(false) }, 4000);
        }
    }, [validEmailData.loading]);

    return <>

        {(validEmailData.loading == "idle" || validEmailData.loading == "pending") ? <></> : (
            validEmailData.loading == "succeeded" ? <Toast color="success" icon="task_alt" msg={validEmailData.msg} />
                : <Toast color="error" icon="task_alt" msg={validEmailData.msg} />
        )}

        <Suspense>
            <Container>
                <Card color={"bg"}>
                    <CardBody>
                        {tokenstr != undefined ? validEmailData.loading == "succeeded" ? (
                            <Center>
                                <Typography fntsize="titleLargeFontSize" lnheight="1.5">
                                    {validEmailData.msg}
                                </Typography>
                            </Center>
                        ) : (
                            <Flex row="row" justifycenter="true">
                                <Flex md={4}>
                                    <PrimaryButton 
                                        full="true"
                                        color="primaryButton"
                                        type="button" 
                                        onClick={() => validEmail()}
                                    >
                                        {"Active Account"}
                                    </PrimaryButton>
                                </Flex>

                            </Flex>
                        ) : (
                            <NotFound />
                        )}
                    </CardBody>
                </Card>
            </Container>
        </Suspense>
        <Loading open={isLoading} />
    </>
}