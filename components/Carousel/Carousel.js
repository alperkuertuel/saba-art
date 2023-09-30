import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function ImageCarousel({ filteredCategory }) {
  return (
    <Carousel
      showIndicators={false}
      dynamicHeight={true}
      showThumbs={false}
      infiniteLoop={true}
      selectedItem={item}
    >
      {filteredCategory.map(({ imageUrl, name, date, _id, slug }) => (
        <Link key={_id} href={`/art-pieces/${slug}`}>
          <div style={{ position: "relative" }}>
            <StyledImage src={imageUrl} alt={name} aria-label={name} width={1000} height={1000} />
            <StyledLegend>
              <p className="legend">
                <q>{name}</q> {date}
              </p>
            </StyledLegend>
          </div>
        </Link>
      ))}
    </Carousel>
  );
}

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const StyledLegend = styled.span`
  position: absolute;
  display: flex;
  bottom: 0px;
  width: 100%;
  margin: 0 auto;
`;
