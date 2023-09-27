import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import Image from "next/image";
import styled from "styled-components";

export default function PressCarousel({ filteredCategory }) {
  const { data } = useSWR("/api", { fallbackData: [] });
  // console.log(data);
  return (
    <StyledCarousel showIndicators={false} dynamicHeight={true} showThumbs={false}>
      {filteredCategory.map(({ imageUrl, name, _id }) => (
        <div key={_id}>
          <StyledImage src={imageUrl} alt={name} aria-label={name} width={1000} height={1000} />
        </div>
      ))}
    </StyledCarousel>
  );
}

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const StyledCarousel = styled(Carousel)``;
