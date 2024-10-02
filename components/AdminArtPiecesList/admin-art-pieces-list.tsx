import { faDownload, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { ArtPiece } from "pages/_app";
import { Fragment, useState } from "react";
import styled from "styled-components";

import ArtPiecesEditForm from "../AdminArtPiecesEditForm/admin-art-pieces-edit-form";
import CategoryFilter from "../CategoryFilter/category-filter";

type ArtPiecesListProperties = {
  handleSetScrollPercentage: (scrollPercentage: number) => void;
  handleSetFilteredCategory: (filteredCategory: ArtPiece[]) => void;
  handleSetActiveCategory: (activeCategory: string) => void;
  activeCategory: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  artPieceToEdit: ArtPiece;
  filteredCategory: ArtPiece[];
};

export default function ArtPiecesList({
  handleSetScrollPercentage,
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  onDelete,
  onEdit,
  artPieceToEdit,
  filteredCategory,
}: ArtPiecesListProperties) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  return (
    <section>
      <h2>Bearbeite oder lösche Kunstwerke:</h2>
      <CategoryFilter
        handleSetFilteredCategory={handleSetFilteredCategory}
        handleSetActiveCategory={handleSetActiveCategory}
        activeCategory={activeCategory}
      />
      <StyledList>
        {filteredCategory.map(({ slug, _id, imageUrl, name }) => (
          <Fragment key={_id}>
            <StyledItem>
              <StyledLink href={`/art-pieces/${slug}`} onClick={() => handleSetScrollPercentage(0)}>
                <StyledImage src={imageUrl} width={1000} height={1000} alt={name} priority={false} />
              </StyledLink>
              <StyledName>
                <q>{name}</q>
              </StyledName>
              <ButtonContainer>
                <button
                  aria-label="edit"
                  onClick={() => {
                    if (_id) {
                      onEdit(_id);
                      setToggleEditForm(!toggleEditForm);
                    }
                  }}
                >
                  <StyledIcon icon={faPencil} />
                </button>
                <a href={imageUrl} download={name}>
                  <StyledIcon icon={faDownload} />
                </a>
                <button onClick={() => _id && onDelete(_id)} aria-label="delete">
                  <StyledIcon icon={faTrashCan} />
                </button>
              </ButtonContainer>
            </StyledItem>
            {artPieceToEdit && artPieceToEdit._id === _id && toggleEditForm && (
              <ArtPiecesEditForm
                handleSetFilteredCategory={handleSetFilteredCategory}
                filteredCategory={filteredCategory}
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
  &:hover {
    background-color: var(--highlight);
  }
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
`;

const StyledName = styled.p`
  align-self: start;
  font-weight: bold;
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
