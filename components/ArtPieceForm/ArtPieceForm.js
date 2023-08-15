import { styled } from "styled-components";
import { uid } from "uid";

export default function ArtPieceForm({ artPieces, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const slug = data.name
      .toLowerCase()
      .trim() // remove leading and trailing whitespace
      .replace(/[ö]/g, "oe") // ö to oe
      .replace(/[ü]/g, "ue") // ü to ue
      .replace(/[ä]/g, "ae") // ä to ae
      .replace(/[ß]/g, "ss") // ß  ss
      .replace(/[^\w\s-]/g, "") // remove any characters which are not word characters
      .replace(/[\s_-]+/g, "-") // remove whitespace characters, underscores, hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // no hyphens in the beginning or end of the string

    const newArtPiece = {
      id: uid(),
      slug: slug,
      date: data.year,
      name: data.name,
      description: data.description,
      category: data.category,
      technique: data.technique,
      imageUrl: data.imageUrl,
      heightReal: data.heightReal,
      widthReal: data.widthReal,
    };

    onSubmit(newArtPiece);
  }

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">
          <Input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Only links from pixabey will work..."
            defaultValue={artPieces?.imageUrl}
            required
          />
        </label>
        <label htmlFor="name">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="type in a name..."
            defaultValue={artPieces?.name}
            maxLength={50}
            required
          />
        </label>
        <label htmlFor="year">
          <NumberInput
            type="number"
            min="1990"
            max="2099"
            step="1"
            id="year"
            name="year"
            defaultValue={artPieces?.date}
            required
          />
        </label>
        <label htmlFor="category">
          <StyledSelection name="category">
            <option value="" disabled>
              Select a category
            </option>
            <option defaultValue={artPieces?.Impression}>Impression</option>
            <option defaultValue={artPieces?.Landscape}>Landscape</option>
            <option defaultValue={artPieces?.Abstact}>Abstract</option>
            <option defaultValue={artPieces?.Portrait}>Portrait</option>
          </StyledSelection>
        </label>
        <label htmlFor="technique">
          <StyledSelection name="technique">
            <option value="" disabled>
              Select a technique
            </option>
            <option defaultValue={artPieces?.Oil}>Oil</option>
            <option defaultValue={artPieces?.Acryl}>Acryl</option>
          </StyledSelection>
        </label>
        <label htmlFor="heightReal">
          <NumberInput
            type="number"
            step="10"
            min="0"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="Add height..."
            defaultValue={artPieces?.heightReal}
            required
          />
        </label>
        <label htmlFor="widthReal">
          <NumberInput
            type="number"
            step="10"
            min="0"
            max="400"
            id="widthReal"
            name="widthReal"
            placeholder="Add width..."
            defaultValue={artPieces?.widthReal}
            required
          />
        </label>
        <label htmlFor="description">Describe your painting:</label>
        <Textarea
          name="description"
          maxLength="300"
          id="description"
          cols="30"
          rows="10"
          defaultValue={artPieces?.description}
        ></Textarea>
        <StyledButton type="submit">ADD NEW PICTURE</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: grid;
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
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const StyledSelection = styled.select`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
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
