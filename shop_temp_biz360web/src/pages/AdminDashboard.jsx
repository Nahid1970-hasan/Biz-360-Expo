import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";

 


export const AdminDashboardPage = () => {
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
