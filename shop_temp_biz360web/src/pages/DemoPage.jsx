import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { PrimaryButton } from "../component/style/styled_button";
import { Loading } from "../component/Loading";




export const DemoMemberPage = () => {
  const nevegate = useNavigate();
  const [element, setElement] = useState(null);

  useEffect(() => {
    setElement(
      Array.from({ length: 10 }, (x, i) => "user" + (i + 1)).map((d, i) =>
        <Flex key={i} md={2}>
          <PrimaryButton full="true" onClick={() => { nevegate("/" + d) }}>{"User " + (i + 1)}</PrimaryButton>
        </Flex>
      )
    )
  }, []);
  return (
    <>
      <Suspense>
        <Container>
          <Flex row="true">
            <Flex md={2}>
              <PrimaryButton full="true" onClick={() => { nevegate("/biz10")}}>{"Fahim "}</PrimaryButton>
            </Flex>
            {element ? element : <></>}
          </Flex>
        </Container>
      </Suspense>
      <Loading open={!element} />
    </>
  );
};