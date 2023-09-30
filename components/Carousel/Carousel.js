import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import styled from "styled-components";

export default function ImageCarousel() {
  return (
    <>
      <h3>Presseartikel über Saba:</h3>
      <Carousel showIndicators={false} dynamicHeight={true} showThumbs={false} infiniteLoop={true}>
        <a
          href={`/documents/vom_bosporus_zum_bodensee_20-03-1986.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative" }}>
            <StyledImage
              src="/documents/vom_bosporus_zum_bodensee.png"
              alt="Vom Bospurus zum Bodensee"
              aria-label="Vom Bosporus zum Bodensee"
              priority={true}
              width={1000}
              height={1000}
            />
            <StyledLegend>
              <p className="legend">
                <q>Vom Bospurus zum Bodensee</q> 20.03.1986
              </p>
            </StyledLegend>
          </div>
        </a>
        <a
          href={`/documents/an_den_ufern_zweier_meere_29-06-1989.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative" }}>
            <StyledImage
              src="/documents/an_den_ufern_zweier_meere.png"
              alt="An den Ufern zweier Meere"
              aria-label="An den Ufern zweier Meere"
              width={1000}
              height={1000}
            />
            <StyledLegend>
              <p className="legend">
                <q>An den Ufern zweier Meere</q> 29.06.1989
              </p>
            </StyledLegend>
          </div>
        </a>
        <a
          href={`/documents/kultur_am_ort_25-02-1998.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative" }}>
            <StyledImage
              src="/documents/kultur_am_ort.png"
              alt="Kultur am Ort"
              aria-label="Kultur am Ort"
              width={1000}
              height={1000}
            />
            <StyledLegend>
              <p className="legend">
                <q>Kultur am Ort</q> 25.02.1998
              </p>
            </StyledLegend>
          </div>
        </a>
        <a
          href={`/documents/peruanische_geschichten_17-12-03.pdf`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div style={{ position: "relative" }}>
            <StyledImage
              src="/documents/peruanische_geschichten.png"
              alt="Peruanische Geschichten"
              aria-label="Peruanische Geschichten"
              width={1000}
              height={1000}
            />
            <StyledLegend>
              <p className="legend">
                <q>Peruanische Geschichten</q> 17.12.2003
              </p>
            </StyledLegend>
          </div>
        </a>
      </Carousel>
    </>
  );
}

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  border-radius: 5px;
`;

const StyledLegend = styled.span`
  position: absolute;
  display: flex;
  bottom: 0px;
  width: 100%;
  margin: 0 auto;
`;
