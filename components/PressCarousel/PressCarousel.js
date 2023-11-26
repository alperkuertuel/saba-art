import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import also needed for GalleryCarousel!
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { uid } from "uid";
import pressCarouselData from "./pressCarouselData";

export default function ImageCarousel() {
  return (
    <section>
      <h2>Presseartikel über Saba:</h2>
      <CarouselWrapper>
        <Carousel
          axis={"horizontal"}
          showIndicators={false}
          dynamicHeight={false}
          showThumbs={false}
          infiniteLoop={true}
          stopSwipingPropagation={true}
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={100}
        >
          {pressCarouselData.map((article) => (
            <div key={uid()}>
              <StyledImage
                src={article.imageUrl}
                alt={article.name}
                aria-label={article.name}
                priority={true}
                width={1000}
                height={1000}
              />
              <StyledCarouselLinkWrapper
                href={article.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StyledLegend>
                  {article.legendText} - {article.dateOfArticle}
                </StyledLegend>
              </StyledCarouselLinkWrapper>
            </div>
          ))}
        </Carousel>
      </CarouselWrapper>
    </section>
  );
}

const CarouselWrapper = styled.div`
  width: 85%;
  margin: 2rem auto;
  position: relative;
`;

const StyledCarouselLinkWrapper = styled(Link)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;

const StyledImage = styled(Image)`
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 60vh;
  opacity: 0.4;
`;

const StyledLegend = styled.span`
  position: absolute;
  text-align: justify;
  color: var(--font-color);
  background-color: var(--box-color);
  display: block;
  padding: 0.5rem;
  border-top: 2px solid var(--tertiary-color);
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: auto;
  opacity: 0.9;
`;
