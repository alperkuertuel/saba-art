import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ArtPieceForm from "./ArtPiecesListForm";

export default function ArtPiecesList({
  artPieces,
  onEdit,
  onDelete,
  artPieceToEdit,
  onSubmit,
}) {
  return (
    <StyledSection>
      <ul>
        {artPieces.map(({ slug, id, imageUrl, name }) => (
          <StyledItem key={id}>
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
        ))}
      </ul>
      <EditForm>
        <ArtPieceForm artPieceToEdit={artPieceToEdit} onSubmit={onSubmit} />
      </EditForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 2rem auto;
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

const EditForm = styled.span``;
