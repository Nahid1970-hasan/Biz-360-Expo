import AliceCarousel from "react-alice-carousel"
import { Flex } from "../style/styled_flex"
import { GallerImg } from "../style/styled_temp_body";
import { InfoCard } from "../style/styled_card";
import { KDImg } from "../style/styled_img";
import { CompProductCard } from "./ProductCard";

export const CompBannerSection = ({ height, width, bannerData, labelsize, responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
}, slideLabel=true}) => {
  
    let items = bannerData?.map((slideImage, index) => ( 
        <CompProductCard key={index} height={height} width={width} src={slideImage.url || ""} label={slideImage.label||""} size={labelsize} /> 
    )) ||[];
    
    return (<> 
        <AliceCarousel
            disableButtonsControls={true}
            disableDotsControls={true}
            disableSlideInfo={slideLabel}
            touchMoveDefaultEvents={false}
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            mouseTracking={true}
            autoPlayInterval={5000}
            items={items} /> 
    </>)
}