/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from 'next/router';
import { ArtPieceType } from 'pages/_app';
import { useState } from 'react';

import Button from '@/Button/Button';

interface AdminArtPieceEditFormProperties {
  artPieceToEdit: ArtPieceType;
  filteredCategory: ArtPieceType[];
  handleSetFilteredCategory: (filteredCategory: ArtPieceType[]) => void;
}

export default function AdminArtPieceEditForm({
  artPieceToEdit,
  filteredCategory,
  handleSetFilteredCategory,
}: AdminArtPieceEditFormProperties) {
  const [lettersLeft, setLettersLeft] = useState(
    artPieceToEdit?.description.length
  );
  const router = useRouter();
  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const editData = Object.fromEntries(formData);
    const name = editData.name as string;
    const slug = name
      .toLowerCase()
      .trim()
      .replaceAll('ö', 'oe')
      .replaceAll('ü', 'ue')
      .replaceAll('ä', 'ae')
      .replaceAll('ß', 'ss')
      .replaceAll(/[^\s\w-]/g, '') // remove any characters which are not word characters
      .replaceAll(/[\s_-]+/g, '-') // remove whitespace characters, underscores, hyphens with a single hyphen
      .replaceAll(/^-+|-+$/g, ''); // no hyphens in the beginning or end of the string

    const editedArtPiece: ArtPieceType = {
      _id: artPieceToEdit._id,
      slug: slug,
      date:
        typeof editData.date === 'string'
          ? Number.parseInt(editData.date, 10)
          : artPieceToEdit.date, // ensure date is a number,
      available: editData.available === 'on',
      name: editData.name as string,
      description: editData.description as string,
      category: editData.category as string,
      technique: editData.technique as string,
      imageUrl: artPieceToEdit.imageUrl,
      heightReal: editData.heightReal as string,
      widthReal: editData.widthReal as string,
    };

    const updatedArtPiecesCategory = filteredCategory.map((piece) =>
      piece._id === artPieceToEdit._id
        ? {
            ...piece,
            _id: editedArtPiece._id,
            slug: editedArtPiece.slug,
            date: editedArtPiece.date,
            available: editedArtPiece.available,
            name: editedArtPiece.name,
            description: editedArtPiece.description,
            category: editedArtPiece.category,
            technique: editedArtPiece.technique,
            imageUrl: artPieceToEdit.imageUrl,
            heightReal: editedArtPiece.heightReal,
            widthReal: editedArtPiece.widthReal,
          }
        : piece
    );

    handleSetFilteredCategory(updatedArtPiecesCategory);

    try {
      const response = await fetch(`/api/${artPieceToEdit._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedArtPiece),
      });

      if (response.ok) {
        alert(`Deine Änderungen waren erfolgreich.`);
      } else
        alert(
          `Etwas ist beim Ändern von "${editedArtPiece.name}" schief geflaufen! Versuche es später noch einmal.`
        );
    } catch (error) {
      console.error(`Etwas ist schief gelaufen!`, error);
    }
    //location.reload();
    router.push(`/art-pieces/${editedArtPiece.slug}`);
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <article className="text-xs">
      <form
        className="grid grid-rows-1 gap-3"
        onSubmit={handleUpdate}
        autoComplete="off"
      >
        <label htmlFor="name">Ändere den Namen:</label>
        <input
          className="w-auto border-b border-tertiary-color bg-primary-color"
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="change the name"
          defaultValue={artPieceToEdit?.name}
          minLength={3}
          maxLength={100}
          required
        />
        <label htmlFor="date">Ändere das Erscheinungsjahr: </label>
        <input
          className="w-auto border-b border-tertiary-color bg-primary-color"
          type="number"
          id="date"
          name="date"
          max={currentYear}
          defaultValue={artPieceToEdit?.date}
          required
        />
        <label htmlFor="available">
          Ändere die Verfügbarkeit:
          <input
            className="ml-2 size-[15px] align-top"
            style={{ accentColor: 'var(--tertiary-color)' }}
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={artPieceToEdit?.available}
          />
        </label>
        <fieldset className="border-none">
          <label htmlFor="category">Kategorie: </label>
          <select
            className="my-1 w-auto rounded-[5px] border border-tertiary-color bg-primary-color py-1 text-center text-font-color outline-none"
            name="category"
            id="category"
            defaultValue={artPieceToEdit?.category}
          >
            <option>Impressionen</option>
            <option>Naturlandschaften</option>
            <option>Abstrakte Werke</option>
            <option>Aktmalerei</option>
            <option>Andere Kunstformen</option>
          </select>
          <br />
          <label htmlFor="technique">Technik: </label>
          <select
            className="my-1 w-auto rounded-[5px] border border-tertiary-color bg-primary-color py-1 text-center text-font-color outline-none"
            name="technique"
            id="technique"
            defaultValue={artPieceToEdit?.technique}
          >
            <option>Öl auf Leinwand</option>
            <option>Aquarell</option>
            <option>Steinhauerei</option>
            <option>Diverse</option>
          </select>
        </fieldset>
        <fieldset className="border-none">
          <label htmlFor="widthReal"> Breite: </label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="number"
            min="0"
            max="400"
            id="widthReal"
            name="widthReal"
            placeholder="cm"
            defaultValue={artPieceToEdit?.widthReal}
            required
          />
          <label htmlFor="heightReal">Höhe: </label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="number"
            min="0"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="cm"
            defaultValue={artPieceToEdit?.heightReal}
            required
          />
        </fieldset>
        <label htmlFor="description">Ändere die Beschreibung:</label>
        <textarea
          className="rounded-[5px] border border-tertiary-color bg-primary-color p-2 text-font-color outline-none"
          name="description"
          maxLength={500}
          id="description"
          cols={30}
          rows={5}
          defaultValue={artPieceToEdit?.description}
          onChange={(event) => setLettersLeft(event.target.value.length)}
        ></textarea>
        <span className="text-right">{500 - lettersLeft} / 500 </span>
        <Button variant="main" size="small">
          Aktualisiere: {artPieceToEdit ? artPieceToEdit.name : ''}
        </Button>
      </form>
    </article>
  );
}
