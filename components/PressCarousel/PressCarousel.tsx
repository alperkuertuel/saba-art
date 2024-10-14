import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import also needed for GalleryCarousel!
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Carousel } from 'react-responsive-carousel';

import { InfoModal } from '@/Modal/DetailsModal';

import pressCarouselData from './press-carousel-data';

interface Article {
  _id: string;
  imageUrl: string;
  name: string;
  legendText: string;
  dateOfArticle: string;
  pdfLink: string;
}

export default function PressCarousel({ isDarkMode }: { isDarkMode: boolean }) {
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
                className="relative h-[50vh] w-full object-cover"
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
          <InfoModal closeAction={closeModalPressSlider}>
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
                    theme={isDarkMode ? 'dark' : 'light'}
                    fileUrl={selectedArticle.pdfLink}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </div>
              </div>
            </Worker>
          </InfoModal>
        )}
      </div>
    </section>
  );
}
