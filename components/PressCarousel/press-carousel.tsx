import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import also needed for GalleryCarousel!
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

import { BackDrop, CloseButton, ModalContent } from "../GalleryCarouselPreview/gallery-carousel-preview";
import pressCarouselData, { Article } from "./press-carousel-data";

type PressCarouselProperties = {
  currentTheme: string;
};

export default function PressCarousel({ currentTheme }: PressCarouselProperties) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  function openModalPressSlider(article: Article) {
    setSelectedArticle(article);
    setIsModalOpen(true);
  }

  function closeModalPressSlider() {
    setSelectedArticle(undefined);
    setIsModalOpen(false);
  }
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [], // remove sidebarTabs
  });

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
          preventMovementUntilSwipeScrollTolerance={true}
          swipeScrollTolerance={100}
        >
          {pressCarouselData.map((article) => (
            <div key={article._id}>
              <StyledImage
                src={article.imageUrl}
                alt={article.name}
                aria-label={article.name}
                priority={true}
                width={1000}
                height={1000}
              />
              <StyledCarouselLinkWrapper onClick={() => openModalPressSlider(article)}>
                <StyledLegend>
                  {article.legendText} - {article.dateOfArticle}
                </StyledLegend>
              </StyledCarouselLinkWrapper>
            </div>
          ))}
        </Carousel>
        {isModalOpen && selectedArticle && (
          <BackDrop>
            <ModalContent>
              <CloseButton onClick={closeModalPressSlider}>
                Schließen <FontAwesomeIcon icon={faXmark} />
              </CloseButton>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <ViewerWrapper>
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      height: "750px",
                    }}
                  >
                    <Viewer
                      theme={currentTheme === "dark" ? "light" : "dark"}
                      fileUrl={selectedArticle.pdfLink}
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </div>
                </ViewerWrapper>
              </Worker>
            </ModalContent>
          </BackDrop>
        )}
      </CarouselWrapper>
    </section>
  );
}

const CarouselWrapper = styled.div`
  margin: 1rem auto;
  position: relative;
`;

const StyledCarouselLinkWrapper = styled.button`
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
  height: 50vh;
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

const ViewerWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
// The model styles are imported from GalleryCarousel.js!
