import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export default function ArtPiecesEditForm({
  artPieceToEdit,
  filteredCategory,
  handleSetFilteredCategory,
}) {
  const [lettersLeft, setLettersLeft] = useState(artPieceToEdit.description.length);
  const router = useRouter();
  async function handleUpdate(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const editData = Object.fromEntries(formData);
    const slug = editData.name
      .toLowerCase()
      .trim()
      .replace(/[ö]/g, "oe")
      .replace(/[ü]/g, "ue")
      .replace(/[ä]/g, "ae")
      .replace(/[ß]/g, "ss")
      .replace(/[^\w\s-]/g, "") // remove any characters which are not word characters
      .replace(/[\s_-]+/g, "-") // remove whitespace characters, underscores, hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // no hyphens in the beginning or end of the string

    const editedArtPiece = {
      _id: artPieceToEdit._id,
      slug: slug,
      date: editData.date,
      name: editData.name,
      description: editData.description,
      category: editData.category,
      technique: editData.technique,
      imageUrl: artPieceToEdit.imageUrl,
      heightReal: editData.heightReal,
      widthReal: editData.widthReal,
    };

    const updatedArtPiecesCategory = filteredCategory.map((piece) =>
      piece._id === artPieceToEdit._id
        ? {
            ...piece,
            _id: editedArtPiece._id,
            slug: editedArtPiece.slug,
            date: editedArtPiece.date,
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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
      console.error(`Something went wrong!`, error);
    }
    //location.reload();
    router.push(`/art-pieces/${editedArtPiece.slug}`);
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <StyledArticle>
      <StyledForm onSubmit={handleUpdate} autoComplete="off">
        <label htmlFor="name">Ändere den Namen:</label>
        <Input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="change the name"
          defaultValue={artPieceToEdit.name}
          minLength={3}
          maxLength={100}
          required
        />
        <label htmlFor="date">Ändere das Erscheinungsjahr: </label>
        <Input
          type="number"
          id="date"
          name="date"
          max={currentYear}
          defaultValue={artPieceToEdit.date}
          required
        />

        <StyledFieldset>
          <label htmlFor="category">Kategorie: </label>
          <StyledSelection name="category" id="category" defaultValue={artPieceToEdit.category}>
            <option>Impressionen</option>
            <option>Naturlandschaften</option>
            <option>Abstrakte Werke</option>
            <option>Aktmalerei</option>
            <option>Andere Kunstformen</option>
          </StyledSelection>
          <br />
          <label htmlFor="technique">Technik: </label>
          <StyledSelection name="technique" id="technique" defaultValue={artPieceToEdit.technique}>
            <option>Öl auf Leinwand</option>
            <option>Aquarell</option>
            <option>Steinhauerei</option>
            <option>Diverse</option>
          </StyledSelection>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="widthReal"> Breite: </label>
          <Input
            type="number"
            min="0"
            max="400"
            id="widthReal"
            name="widthReal"
            placeholder="cm"
            defaultValue={artPieceToEdit.widthReal}
            required
          />
          <label htmlFor="heightReal">Höhe: </label>
          <Input
            type="number"
            min="0"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="cm"
            defaultValue={artPieceToEdit.heightReal}
            required
          />
        </StyledFieldset>
        <label htmlFor="description">Ändere die Beschreibung:</label>
        <Textarea
          name="description"
          maxLength="500"
          id="description"
          cols="30"
          rows="5"
          defaultValue={artPieceToEdit.description}
          onChange={(event) => setLettersLeft(event.target.value.length)}
        ></Textarea>
        <LetterCounter>{500 - lettersLeft}</LetterCounter>
        <StyledButton>UPDATE {artPieceToEdit ? artPieceToEdit.name : ""}</StyledButton>
      </StyledForm>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  font-size: 0.8rem;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  gap: 0.7rem;
`;

const Input = styled.input`
  width: auto;
  border-bottom: 1px solid var(--tertiary-color);
  background: var(--primary-color);
`;

const StyledSelection = styled.select`
  text-align: center;
  width: auto;
  border: 1px solid var(--tertiary-color);
  border-radius: 5px;
  padding: 0.3rem 0;
  margin: 0.5rem 0;
  background: var(--primary-color);
  color: var(--font-color);
  outline: none;
`;

const Textarea = styled.textarea`
  background: var(--primary-color);
  font-family: inherit;
  border: 1px solid var(--tertiary-color);
  border-radius: 5px;
  padding: 0.5rem;
  color: var(--font-color);
  outline: none;
`;

const StyledButton = styled.button`
  background-color: var(--cool-brown);
  color: var(--font-color);
  padding: 0.8rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  &:hover {
    background-color: var(--tertiary-color);
    transition: background-color 0.2s ease;
  }
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;

const LetterCounter = styled.span`
  text-align: right;
`;
