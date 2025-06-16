
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { StyledRSidebarLayout6 } from "../../component/style/styled_layout6_rsidebar";
import { DownloadButton, PrimaryButton, ReactButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { InlineDiv, InlineFlex } from "../../component/style/styled_inlineflex";
import { HLLabel, Label } from "../../component/style/styled_label";
import { Typography, ULine } from "../../component/style/styled_typography";
import { InfoCard, InfoUlineCard, MiddleCard } from "../../component/style/styled_card";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderData, updateOrderData } from "../../features/tempCustOrder/temp_cust_oder_slice";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../../component/MediaQuery";
import { numberWithCommas } from "../../utils/helper";


export const LayoutDemo6RSideBar = forwardRef((_, ref) => {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const location = useLocation();
  const username = location?.pathname.split("/")[1] || "";
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(0);
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const custTempOrder = useSelector((state) => state.custOrderData);

  


  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);
    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;
    element.style.height = scrollHeight * 100 + "%";
    element.style.transform = "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }

  const closeSidebar = (e)=>{
    let element = e.target; 
    element.parentElement.parentElement.parentElement.parentElement.parentElement.style.marginRight = isMobile?"-431px":"-301px";
    element.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("obscure");
  }

  useEffect(() => {
    var tt = custTempOrder?.dataList?.length > 0 ? custTempOrder?.dataList?.map(item => parseFloat(item.total_price))?.reduce((prev, next) => prev + next) || 0 : 0;
    setTotal(tt);
    setOrderData(custTempOrder?.dataList || [])
    setItems(custTempOrder?.dataList?.length || 0)
  }, [custTempOrder?.dataList])

   const increaseQuanity =(oldData)=>{ 
          if(oldData.order_quantity<=9){
              dispatch(updateOrderData({id: oldData.id, order_quantity: (parseInt(oldData?.order_quantity)||0)+1}))
          } 
         
      }
      const decreaseQuanity =(oldData)=>{ 
          if(oldData.order_quantity>=1){
              dispatch(updateOrderData({id: oldData.id, order_quantity: (parseInt(oldData?.order_quantity)||0)-1}))
          } 
      }

    const gotoPage = (e) => {
      let element = e.target; 
      element.parentElement.parentElement.parentElement.parentElement.parentElement.style.marginRight = isMobile?"-391px":"-301px";
      element.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.remove("obscure");    
      nevigate( "/"+username + "/orders")
    }

  return (
    <>
      <StyledRSidebarLayout6 ref={ref}>
        <div onScroll={handleScroll}>
          <Flex row="true">
            <Flex md={12} padding="10px !important" >
              <InlineDiv padding="0 10px">
                <Typography txtalign="left" fntweight="bold">{items} {t(items<2?"item":"items")}</Typography>
                <ReactButton style={{ margin: "0" }} onClick={(e)=>closeSidebar(e)} outlined="true">{t("close")}</ReactButton>
              </InlineDiv>
            </Flex>
          </Flex>
          <ULine />
          <InfoCard background={"bg"}>

            {
              orderData?.map((d, i) =>
                <InfoUlineCard background="bg" key={i} margin={i == orderData.length ? "0" : "0 0 5px 0"}>
                  <Flex row="true">
                    <Flex md={2} sm={2} xs={2} padding="0 5px 5px 0 !important" >
                      <MiddleCard cursor ={"pointer"}>
                        <span className="material-icons md-13" onClick={()=>d?.order_quantity>9?null:increaseQuanity(d)}>add</span>
                        <Label fntweight="bold" margin="0" justifycontent="center" fntsize="noteFont">{d.order_quantity}</Label>
                        <span className="material-icons md-13" onClick={()=>d?.order_quantity<2?dispatch(deleteOrderData({"id":d.id})):decreaseQuanity(d)}>remove</span>
                      </MiddleCard>
                    </Flex>
                    <Flex md={6} sm={6} xs={6} padding="0 5px 5px 0 !important">
                      <MiddleCard height="100%" justifycontent="left" txtalign="left">
                        <Typography  fntsize="noteFont">{d.category_name}</Typography> 
                        <Typography  fntsize="noteFont">{d.quantity}{d.unit_name}/ &#x9F3; {numberWithCommas(d.price||"0")}</Typography>
                      </MiddleCard> 
                    </Flex>
                    <Flex md={3} sm={3} xs={3} padding="0 0 5px  0 !important">
                      <Label margin="0" justifycontent="center" fntsize="noteFont" >&#x9F3; {numberWithCommas(d.total_price)||"0"}</Label>
                    </Flex>
                    <Flex md={1} sm={1} xs={1} padding="0 0 5px 0 !important">
                      <MiddleCard height="100%" cursor ={"pointer"}>
                        <span className="material-icons md-13" onClick={()=>dispatch(deleteOrderData({"id":d.id}))}>delete</span>
                      </MiddleCard>
                    </Flex>
                  </Flex>
                  <ULine />
                </InfoUlineCard>
              )
            }

          </InfoCard>
          <ULine />

          <Flex row="true">
            <Flex md={12} padding="10px !important" >
              <InlineDiv padding="0 10px">
                <DownloadButton style={{ margin: "0", padding:"5px 10px" }} onClick={(e)=>gotoPage(e)}>{t("submit_order")}</DownloadButton>
                <Typography txtalign="left" fntweight="bold">&#x9F3; {numberWithCommas(total)} </Typography>
              </InlineDiv>
            </Flex>
          </Flex>
        </div>
        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledRSidebarLayout6>
      <div className=""></div>
    </>
  );
});
