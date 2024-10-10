import { ArtPieceType } from 'pages/_app';
import { Fragment, useState } from 'react';

import AdminArtPieceEditForm from '../AdminArtPieceEditForm/AdminArtPieceEditForm';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import EditCard from './EditCard';

interface AdminArtPiecesEditListProperties {
  handleSetScrollPercentage: (scrollPercentage: number) => void;
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
  handleSetActiveCategory: (activeCategory: string) => void;
  activeCategory: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  artPieceToEdit: ArtPieceType;
  filteredCategory: ArtPieceType[];
}

export default function AdminArtPiecesEditList({
  handleSetScrollPercentage,
  handleSetFilteredCategory,
  handleSetActiveCategory,
  activeCategory,
  onDelete,
  onEdit,
  artPieceToEdit,
  filteredCategory,
}: AdminArtPiecesEditListProperties) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  return (
    <section>
      <h2>Bearbeite oder lösche Kunstwerke:</h2>
      <CategoryFilter
        handleSetFilteredCategory={handleSetFilteredCategory}
        handleSetActiveCategory={handleSetActiveCategory}
        activeCategory={activeCategory}
      />
      <ul className="w-auto">
        {filteredCategory.map(({ slug, _id, imageUrl, name }) => (
          <Fragment key={_id}>
            <EditCard
              slug={slug}
              _id={_id!}
              imageUrl={imageUrl}
              name={name}
              handleSetScrollPercentage={handleSetScrollPercentage}
              onDelete={onDelete}
              onEdit={onEdit}
              toggleEditForm={toggleEditForm}
              setToggleEditForm={setToggleEditForm}
            />
            {artPieceToEdit && artPieceToEdit._id === _id && toggleEditForm && (
              <AdminArtPieceEditForm
                handleSetFilteredCategory={handleSetFilteredCategory}
                filteredCategory={filteredCategory}
                artPieceToEdit={artPieceToEdit}
              />
            )}
          </Fragment>
        ))}
      </ul>
    </section>
  );
}
