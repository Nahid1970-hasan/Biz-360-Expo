import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import { Container } from "../component/style/styled_contrainer";

import vegBoxImg from "../assets/demo/veg-box.jpg";
import mangoImg from "../assets/demo/mango.jpg";
import lichiImg from "../assets/demo/6.jpg";
import jackfruits from "../assets/demo/l7.jpg";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  aspect-ratio: 3/4;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const TextCard = styled.div`
  position: sticky;
  bottom: 0px;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);

  h2 {
    color: #2c3e50;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }

  p {
    color: #7f8c8d;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0;
  }

  @media (max-width: 768px) {
    bottom: 15px;
    left: 15px;
    right: 15px;
    padding: 1rem;
  }
`;

const items = [
  {
    title: "Vegetable Boxes",
    description: "From farm to table, our vegetables are freshly picked and full of flavor. A vibrant mix of seasonal goodness, just the way nature intended.",
    image: vegBoxImg,
  },
  {
    title: "Mangoes",
    description: "We love our mangoes, and would be happy to put together a handpicked selection just for you. Let us know how many you'd like.",
    image: mangoImg,
  },
  {
    title: "Lichi",
    description: "Our lichis are nature’s candy — sweet, fragrant, and bursting with juice. Treat yourself to a taste of summer with a box full of handpicked delights.",
    image: lichiImg,
  },
  {
    title: "Jackfruit",
    description: "Our jackfruit is a tropical treasure — rich, hearty, and incredibly versatile. Whether sweet or savory, it’s a true feast for the senses.",
    image: jackfruits,
  },
];

export const SeasonalFruitsPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ userSelect: "none" }}>
      <Container>
        <CardGrid>
          {items.map((item, index) => (
            <Card
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ImageWrapper>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "80%",
                    objectFit: "cover",
                  }}
                />
                <TextCard>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </TextCard>
              </ImageWrapper>
            </Card>
          ))}
        </CardGrid>
      </Container>
    </div>
  );
};