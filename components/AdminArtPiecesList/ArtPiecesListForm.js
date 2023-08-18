import { styled } from "styled-components";

export default function ArtPieceListForm({
  onSubmit,
  artPieceToEdit,
  artPieces,
  handleSetArtPieces,
}) {
  function handleUpdate(event) {
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const slug = data.name
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
      id: artPieceToEdit.id,
      slug: slug,
      date: data.year,
      name: data.name.replace(/^"+|"+$/g, "").replace(/[^\w\s-]/g, ""),
      description: data.description,
      category: data.category,
      technique: data.technique,
      imageUrl: artPieceToEdit.imageUrl,
      heightReal: data.heightReal,
      widthReal: data.widthReal,
    };

    console.log("Editing submitted:", editedArtPiece);
    console.log(artPieces);
    const updatedArtpieces = artPieces.map((piece) =>
      piece.id === artPieceToEdit.id
        ? {
            ...piece,
            id: editedArtPiece.id,
            name: editedArtPiece.name,
            description: editedArtPiece.description,
            category: editedArtPiece.category,
            technique: editedArtPiece.technique,
            heightReal: editedArtPiece.heightReal,
            widthReal: editedArtPiece.widthReal,
          }
        : piece
    );
    onSubmit(editedArtPiece);
    handleSetArtPieces(updatedArtpieces);
  }

  return (
    <StyledSection>
      <StyledForm onSubmit={handleUpdate}>
        <label htmlFor="name">Change the name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="type in a name..."
          defaultValue={artPieceToEdit?.name}
          maxLength={50}
          required
        />
        <label htmlFor="year">Change Release year: </label>
        <NumberInput
          type="number"
          min="1990"
          max="2099"
          step="1"
          id="year"
          name="year"
          defaultValue={artPieceToEdit?.date}
          required
        />

        <StyledFieldset>
          <label htmlFor="category">Change category: </label>
          <StyledSelection name="category">
            <option defaultValue={artPieceToEdit?.Impression}>
              Impressions
            </option>
            <option defaultValue={artPieceToEdit?.Landscape}>Landscapes</option>
            <option defaultValue={artPieceToEdit?.Abstact}>Abstract</option>
            <option defaultValue={artPieceToEdit?.Portrait}>Portraits</option>
          </StyledSelection>

          <label htmlFor="technique">Change technique:</label>
          <StyledSelection name="technique">
            <option defaultValue={artPieceToEdit?.Oil}>Oil</option>
            <option defaultValue={artPieceToEdit?.Acryl}>Acryl</option>
          </StyledSelection>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="heightReal">width:</label>
          <NumberInput
            type="number"
            min="10"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="cm"
            defaultValue={artPieceToEdit?.heightReal}
            required
          />
          <label htmlFor="widthReal">height:</label>
          <NumberInput
            type="number"
            min="10"
            max="400"
            id="widthReal"
            name="widthReal"
            placeholder="cm"
            defaultValue={artPieceToEdit?.widthReal}
            required
          />
        </StyledFieldset>
        <label htmlFor="description">Describe your painting:</label>
        <Textarea
          name="description"
          maxLength="300"
          id="description"
          cols="30"
          rows="10"
          defaultValue={artPieceToEdit?.description}
        ></Textarea>
        <StyledButton>UPDATE</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 100%;
`;

const NumberInput = styled.input`
  padding: 0.5rem;
  margin: 0 0.5rem;
  font-size: inherit;
  width: fit-content;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const StyledSelection = styled.select`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  margin: 0 1rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  background-color: grey;
  color: white;
  padding: 0.8rem;
  border-radius: 0.6rem;
  text-decoration: none;
  font-weight: bold;
  border: none;
  font-size: inherit;
  &:hover {
    background-color: black;
  }
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;
