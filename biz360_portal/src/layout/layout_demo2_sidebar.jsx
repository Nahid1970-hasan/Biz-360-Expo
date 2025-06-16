

import { StyledSidebar } from "../component/style/styled_sidebar";
import { forwardRef, useEffect, useRef, useState } from "react";
import { SidebarMenuDemo2 } from "./SidebarMenuDemo2";
import { MODULES } from "../utils/helper";

export const SidebarTemp2Layout = forwardRef((_, ref) => {
  const scrollRef = useRef(null);
  const itemRef = useRef(null);
  const [indexUrl, setIndexUrl] = useState("/");

  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);
    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;
    element.style.height = scrollHeight * 100 + "%";
    element.style.transform = "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }

  useEffect(() => {
    let element = itemRef.current;

    function collapsedSidebar() { 
      itemRef.current.parentElement.parentElement.style.marginRight = "-271px";
      itemRef.current.parentElement.parentElement.nextElementSibling.classList.remove("obscure");
    }
    element.addEventListener("click", collapsedSidebar);

    return () => {
      element.removeEventListener("click", collapsedSidebar);
    }

  }, [itemRef]);

  return (
    <>
      <StyledSidebar ref={ref}>
        <div onScroll={handleScroll}>
           
          <ul  ref={itemRef}>
            {MODULES?.map((item, i) => (
              <SidebarMenuDemo2 key={i} item={item} />
            ))}
          </ul>
        </div>
        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledSidebar>
      <div className=""></div>
    </>
  );
});
