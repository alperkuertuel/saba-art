import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ArtPieceListForm from "./ArtPiecesListForm";
import { Fragment } from "react";

export default function ArtPiecesList({
  artPieces,
  handleSetArtPieces,
  onEdit,
  onDelete,
  artPieceToEdit,
  onSubmit,
}) {
  return (
    <StyledSection>
      <ul>
        {artPieces.map(({ slug, id, imageUrl, name }) => (
          <Fragment key={id}>
            <StyledItem>
              <StyledLink href={`/art-pieces/${slug}`}>
                <StyledImage
                  src={imageUrl}
                  height={75}
                  width={75}
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
              <StyledButton onClick={() => onEdit(id)}>
                <StyledIcon icon={faPencil} />
              </StyledButton>
              <StyledButton onClick={() => onDelete(id)}>
                <StyledIcon icon={faTrashCan} />
              </StyledButton>
            </StyledItem>
            {artPieceToEdit.id === id && (
              <ArtPieceListForm
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

const StyledImage = styled(Image)`
  border-radius: 2rem;
  border: 2px solid var(--border-color);
`;

const StyledButton = styled.button`
  background: transparent;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
  color: var(--secondary-color);
  padding: 0.3rem;
`;
