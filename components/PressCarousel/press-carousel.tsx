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

import pressCarouselData, { Article } from "./press-carousel-data";

export default function PressCarousel() {
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
      <div className="m-4 mx-auto relative">
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
              <Image
                className="relative object-cover w-full h-[50vh] opacity-40"
                src={article.imageUrl}
                alt={article.name}
                aria-label={article.name}
                priority={true}
                width={1000}
                height={1000}
              />
              <button className="absolute top-0 right-0 h-full w-full" onClick={() => openModalPressSlider(article)}>
                <div className="absolute text-justify text-font-color bg-box-color block p-2 border-t-2 border-[var(--tertiary-color)] bottom-0 right-0 w-full h-auto opacity-90">
                  {article.legendText} - {article.dateOfArticle}
                </div>
              </button>
            </div>
          ))}
        </Carousel>
        {isModalOpen && selectedArticle && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30">
            <div className="flex flex-col items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-4 p-2 w-[95%] max-w-[768px] max-h-[90vh] bg-primary-color z-30 overflow-y-auto rounded-[5px]">
              <button
                className="sticky top-0 flex justify-center items-center w-full gap-2 text-font-color bg-box-color shadow-box-shadow p-2 rounded-[5px] text-base cursor-pointer"
                onClick={closeModalPressSlider}
              >
                Schließen <FontAwesomeIcon icon={faXmark} />
              </button>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                <div className="overflow-hidden w-full h-full">
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      height: "750px",
                    }}
                  >
                    <Viewer theme={"light"} fileUrl={selectedArticle.pdfLink} plugins={[defaultLayoutPluginInstance]} />
                  </div>
                </div>
              </Worker>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// The model styles are imported from GalleryCarousel.js!
