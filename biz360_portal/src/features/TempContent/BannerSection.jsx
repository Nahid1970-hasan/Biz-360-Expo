import AliceCarousel from "react-alice-carousel";
import { CompProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";



export const CompBannerSection = ({ height, width, bannerData, username, section, onClick = false, labelsize, responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
}, slideLabel = true }) => {
    const nevigate = useNavigate();

    const gotoPage =(id)=>{ 
        nevigate("/"+username+"/products/"+section+"-"+id)
    }
    let items = bannerData.map((slideImage, index) => (
        <CompProductCard key={index} height={height} width={width} onClick={onClick?()=>{gotoPage(slideImage.id)}:null} src={slideImage.url || ""} label={slideImage.label || ""} size={labelsize} />
    ));

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