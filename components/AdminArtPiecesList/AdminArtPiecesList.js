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
      <StyledItemList>
        {artPieces.map(({ slug, id, imageUrl, name }) => (
          <Fragment key={id}>
            <StyledItem>
              <Link href={`/art-pieces/${slug}`}>
                <StyledImage src={imageUrl} height={75} width={75} alt={name} />
              </Link>
              <p>
                Name: <q>{name}</q>
              </p>
              <StyledButton onClick={() => onEdit(id)}>
                <FontAwesomeIcon icon={faPencil} />
              </StyledButton>
              <StyledButton onClick={() => onDelete(id)}>
                <FontAwesomeIcon icon={faTrashCan} />
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
      </StyledItemList>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
`;

const StyledItemList = styled.ul`
  padding: 1rem;
`;

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
  border: 2px solid grey;
`;

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  font-size: 1.2rem;
  background-color: transparent;
  color: black;
  width: fit-content;
  padding: 5px 20px;
  &:hover {
    color: black;
  }
`;
