
import logo from "../assets/logo.jpg";
import { MODULES } from "../utils/helper"; 
import { StyledDemo2Navbar } from "../component/style/styled_navbar_demo2";
import { forwardRef, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Demo2PublicMenu } from "../component/Demo2PublicMenu";
import Aos from "aos";




export const HeaderTemp2Layout = forwardRef((_, ref) => {
 
  const dispatch = useDispatch();
  const [position, set_postion] = useState("sticky");

  useEffect(() => {
    Aos.init({ duration: 1000 }); 
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        set_postion("fixed")
      } else {
        set_postion("sticky")
      }
    })
  }, []);


  return (
    <Suspense fallback={<Loader />}>
      <StyledDemo2Navbar position={position}>
        <Container border={"none"}>
          <Flex row="row">
            <Flex md={2} sm={4} xs={12}>
              <ul>
                <a href={"/"}><img data-aos="fade-down" src={logo}></img></a> 
                <span ref={ref} className="material-icons md-36">menu</span> 
              </ul>
            </Flex>
            <Flex md={10} sm={8} xs={12}>
              <ul>
                {MODULES?.map((item, i) => (
                  <Demo2PublicMenu key={i} item={item} />
                ))}
              </ul>
            </Flex>
          </Flex>
        </Container>
      </StyledDemo2Navbar>
    </Suspense>
  );
});
