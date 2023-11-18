import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function GallerySlider({ filteredCategory }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  return (
    <Wrapper>
      <Carousel
        showIndicators={false}
        dynamicHeight={true}
        showThumbs={false}
        swipeScrollTolerance={100}
        selectedItem={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
      >
        {filteredCategory.map((category) => (
          <div key={category.name}>
            <SliderImage src={category.imageUrl} width={1000} height={1000} alt={category.name} />
            <StyledLink href={`/art-pieces/${category.slug}`}></StyledLink>
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
}

const SliderImage = styled(Image)`
  width: auto;
  height: auto;
  border-radius: 5px;
  position: relative;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
  min-height: 50vh;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;
