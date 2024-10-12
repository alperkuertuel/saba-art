import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import also needed for GalleryCarousel!
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Carousel } from 'react-responsive-carousel';

import Button from '@/Button/Button';

import pressCarouselData from './press-carousel-data';

interface Article {
  _id: string;
  imageUrl: string;
  name: string;
  legendText: string;
  dateOfArticle: string;
  pdfLink: string;
}

export default function PressCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
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
      <div className="relative m-4 mx-auto">
        <Carousel
          axis={'horizontal'}
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
                className="relative h-[50vh] w-full object-cover opacity-40"
                src={article.imageUrl}
                alt={article.name}
                aria-label={article.name}
                priority={true}
                width={1000}
                height={1000}
              />
              <button
                className="absolute right-0 top-0 size-full"
                onClick={() => openModalPressSlider(article)}
              >
                <div className="absolute bottom-0 right-0 block h-auto w-full border-t-2 border-[var(--tertiary-color)] bg-box-color p-2 text-justify text-font-color opacity-90">
                  {article.legendText} - {article.dateOfArticle}
                </div>
              </button>
            </div>
          ))}
        </Carousel>
        {isModalOpen && selectedArticle && (
          <div className="fixed left-0 top-0 z-30 size-full bg-black/70">
            <div className="fixed left-1/2 top-1/2 z-30 flex max-h-[90vh] w-[95%] max-w-screen-md -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 overflow-y-auto rounded-[5px] bg-primary-color p-2">
              <Button
                variant="main"
                size="base"
                additionalStyles="sticky top-0"
                onClick={closeModalPressSlider}
              >
                Schließen <FontAwesomeIcon icon={faXmark} />
              </Button>
              <Worker
                workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
              >
                <div className="size-full overflow-hidden">
                  <div
                    style={{
                      border: '1px solid rgba(0, 0, 0, 0.3)',
                      height: '750px',
                    }}
                  >
                    <Viewer
                      theme={'light'}
                      fileUrl={selectedArticle.pdfLink}
                      plugins={[defaultLayoutPluginInstance]}
                    />
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
