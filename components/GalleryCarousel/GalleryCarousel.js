import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import artPiecesData from "@/db/TestData/SampleDataForTests";
import styled from "styled-components";

export default function GallerySlider({ filteredCategory }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCategory]);

  return (
    <Wrapper>
      <Carousel
        showIndicators={false}
        dynamicHeight={false}
        showThumbs={true}
        swipeScrollTolerance={100}
        selectedItem={selectedIndex}
        onChange={(index) => setSelectedIndex(index)}
      >
        {filteredCategory.map((category) => (
          <div key={category.id}>
            <SliderImage src={category.imageUrl} width={1000} height={1000} alt={category.name} />
          </div>
        ))}
      </Carousel>
    </Wrapper>
  );
}

const SliderImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 60vh;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  margin-top: 2rem;
`;
