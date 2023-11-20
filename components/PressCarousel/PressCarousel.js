import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import also needed for GalleryCarousel!
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function ImageCarousel() {
  return (
    <>
      <h3>Presseartikel über Saba:</h3>
      <CarouselWrapper>
        <Carousel
          showIndicators={false}
          dynamicHeight={false}
          showThumbs={false}
          infiniteLoop={true}
          swipeScrollTolerance={100}
        >
          <div>
            <StyledImage
              src="/documents/auszug_allgemein.png"
              alt="Auszug meines Gästebuchs"
              aria-label="Auszug meines Gästebuchs"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/auszug_allgemein.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Das Zitat <q>Erfolg ist so einsam und eiskalt wie der Nordpol</q> aus meinem
                Ausstellungs-Gästebuch betont, dass der Weg zum Erfolg oft von Isolation und
                emotionaler Kälte begleitet wird, bedingt durch die erforderlichen Herausforderungen
                und Opfer.
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/vom_bosporus_zum_bodensee.png"
              alt="Vom Bospurus zum Bodensee"
              aria-label="Vom Bosporus zum Bodensee"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/vom_bosporus_zum_bodensee_20-03-1986.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>Vom Bospurus zum Bodensee - 20.03.1986</StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/an_den_ufern_zweier_meere.png"
              alt="An den Ufern zweier Meere"
              aria-label="An den Ufern zweier Meere"
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/an_den_ufern_zweier_meere_29-06-1989.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Erscheinen am 29.06.1989 in der Regionalzeitung Kreisbote. Dem Autor sei der
                Namensirrtum verziehen.
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/aus_dem_kulturleben.png"
              alt="Aus dem Kulturleben"
              aria-label="Aus dem Kulturleben"
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/aus_dem_kulturleben_1990.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>Aus dem Kulturleben - 1990</StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/suedliches_temperament_09-11-1995.png"
              alt="Südliches Temperament begegnet dem Allgäu"
              aria-label="Südliches Temperament begegnet dem Allgäu"
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/suedliches_temperament_09-11-1995.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Es war mir eine Freude mich mit den genannten Künstlerinnen aus Spanien und Peru
                auszutauschen. - 09.11.1995
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/kultur_am_ort.png"
              alt="Kultur am Ort"
              aria-label="Kultur am Ort"
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/kultur_am_ort_25-02-1998.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>Kultur am Ort - 25.02.1998</StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/peruanische_geschichten.png"
              alt="Peruanische Geschichten"
              aria-label="Peruanische Geschichten"
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/peruanische_geschichten_17-12-03.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>Peruanische Geschichten - 17.12.2003</StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/stille_motive.png"
              alt="Stille Motive"
              aria-label="Stille Motive"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/stille_motive_28-10-2006.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Erscheinen 28.10.2006 in der AZ Kempten Nr. 249 unter der Rubrik Kultur am Ort. Ein
                Dank geht an die Stadtverwaltung Kempten, welche die Austellung in Kollaboration
                ermöglichte.
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/vielfaeltige_kunstwelten.png"
              alt="Vielfältige Kunstwelten"
              aria-label="Vielfältige Kunstwelten"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/vielfaeltige_kunstwelten.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Sieben Künstler kommen für ein Wochenende im Thingers-Bürgersaal zusammen.
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
          <div>
            <StyledImage
              src="/documents/kunstwelten_sind_zu_gast_2012.png"
              alt="Kunstwelten sind zu Gast"
              aria-label="Kunstwelten sind zu Gast"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledCarouselLinkWrapper
              href={`/documents/kunstwelten_sind_zu_gast_2012.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledLegend>
                Eine der schönsten Kollektivausstellungen im Bürgertreff Thingers - 2012
              </StyledLegend>
            </StyledCarouselLinkWrapper>
          </div>
        </Carousel>
      </CarouselWrapper>
    </>
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
  border-radius: 5px;
`;

const StyledLegend = styled.span`
  position: absolute;
  text-align: justify;
  color: var(--font-color);
  background-color: var(--primary-color);
  display: block;
  padding: 0.5rem;
  border-top: 2px solid var(--tertiary-color);
  bottom: 0px;
  right: 0px;
  width: 100%;
  height: auto;
  opacity: 0.9;
`;
