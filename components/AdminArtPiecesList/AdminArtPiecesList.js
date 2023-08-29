import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ArtPiecesEditForm from "../AdminArtPiecesEditForm/AdminArtPiecesEditForm";
import { Fragment } from "react";
import useSWR from "swr";

export default function ArtPiecesList({
  artPieces,
  handleSetArtPieces,
  onEdit,
  onDelete,
  artPieceToEdit,
  onSubmit,
}) {
  // todo: set toggle function when clicking the pen
  const { data } = useSWR("/api", { fallbackData: [] });
  return (
    <StyledSection>
      <h2>Update or delete art pieces:</h2>
      <ul>
        {data.map(({ slug, _id, imageUrl, name }) => (
          <Fragment key={_id}>
            <StyledItem>
              <StyledLink href={`/art-pieces/${slug}`}>
                <StyledImage
                  src={imageUrl}
                  height={50}
                  width={50}
                  alt={name}
                  priority={false}
                  placeholder="blur"
                  blurDataURL={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPs7WqbCQAFgQI4fezTAAAAAABJRU5ErkJggg=="
                  }
                />
              </StyledLink>
              <p>
                <q>{name}</q>
              </p>
              <StyledButton onClick={() => onEdit(_id)}>
                <StyledIcon icon={faPencil} />
              </StyledButton>
              <StyledButton onClick={() => onDelete(_id)}>
                <StyledIcon icon={faTrashCan} />
              </StyledButton>
            </StyledItem>
            {_id && (
              <ArtPiecesEditForm
                artPieces={artPieces}
                handleSetArtPieces={handleSetArtPieces}
                artPieceToEdit={artPieceToEdit}
                onSubmit={onSubmit}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  margin: 1rem auto;
  padding: 1rem;
`;

const StyledLink = styled(Link)`
  padding: 0.2rem;
  border-radius: 50%;
`;

const StyledImage = styled(Image)`
  width: 100%;
  border-radius: 50%;
  border: 2px solid var(--border-color);
`;

const StyledItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.4rem;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  background-color: var(--box-color);
`;

const StyledButton = styled.button`
  background: transparent;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  color: var(--secondary-color);
  padding: 0.3rem;
`;
