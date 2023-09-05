import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ArtPiecesEditForm from "../AdminArtPiecesEditForm/AdminArtPiecesEditForm";
import { Fragment, useState } from "react";
import CategoryFilter from "../CategoryFilter/CategoryFilter";

export default function ArtPiecesList({
  handleSetScrollPercentage,
  handleSetFilteredCategory,
  handleSetActive,
  active,
  onDelete,
  onEdit,
  artPieceToEdit,
  onSubmit,
  filteredCategory,
}) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  return (
    <section>
      <h2>Update or delete art pieces:</h2>
      <CategoryFilter
        handleSetFilteredCategory={handleSetFilteredCategory}
        handleSetActive={handleSetActive}
        active={active}
      />
      <StyledList>
        {filteredCategory.map(({ slug, _id, imageUrl, name }) => (
          <Fragment key={_id}>
            <StyledItem>
              <StyledLink href={`/art-pieces/${slug}`} onClick={() => handleSetScrollPercentage(0)}>
                <StyledImage
                  src={imageUrl}
                  width={1000}
                  height={1000}
                  alt={name}
                  priority={false}
                />
              </StyledLink>
              <StyledName>
                <q>{name}</q>
              </StyledName>
              <ButtonContainer>
                <button
                  aria-label="edit"
                  onClick={() => {
                    onEdit(_id);
                    setToggleEditForm(!toggleEditForm);
                  }}
                >
                  <StyledIcon icon={faPencil} />
                </button>
                <a href={imageUrl} download={name}>
                  <StyledIcon icon={faDownload} />
                </a>
                <button onClick={() => onDelete(_id)} aria-label="delete">
                  <StyledIcon icon={faTrashCan} />
                </button>
              </ButtonContainer>
            </StyledItem>
            {artPieceToEdit._id === _id && toggleEditForm && (
              <ArtPiecesEditForm
                handleSetFilteredCategory={handleSetFilteredCategory}
                filteredCategory={filteredCategory}
                onSubmit={onSubmit}
                artPieceToEdit={artPieceToEdit}
              />
            )}
          </Fragment>
        ))}
      </StyledList>
    </section>
  );
}

const StyledList = styled.ul`
  width: auto;
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: auto;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.4rem;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  background-color: var(--box-color);
`;

const StyledLink = styled(Link)`
  padding: 0.2rem;
  border-radius: 5px;
  width: 100%;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: 1px solid var(--border-color);
`;

const StyledName = styled.p`
  align-self: start;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  color: var(--secondary-color);
  padding: 0 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
