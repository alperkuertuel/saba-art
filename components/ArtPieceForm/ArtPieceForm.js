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
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            placeholder="Add image link here..."
            defaultValue={artPieces?.imageUrl}
            required
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="type in a name..."
            defaultValue={artPieces?.name}
            required
          />
        </label>
        <label htmlFor="year">
          <input
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
          <select name="category">
            <option disabled>Select a category</option>
            <option defaultValue={artPieces?.Impression}>Impression</option>
            <option defaultValue={artPieces?.Impression}>Landscape</option>
            <option defaultValue={artPieces?.Impression}>Abstract</option>
            <option defaultValue={artPieces?.Impression}>Portrait</option>
          </select>
        </label>
        <label htmlFor="technique">
          <select name="technique">
            <option disabled>Select a technique</option>
            <option defaultValue={artPieces?.Oil}>Oil</option>
            <option defaultValue={artPieces?.Acryl}>Acryl</option>
          </select>
        </label>
        <label htmlFor="heightReal">
          <input
            type="text"
            id="heightReal"
            name="heightReal"
            placeholder="Add height..."
            defaultValue={artPieces?.heightReal}
            required
          />
        </label>
        <label htmlFor="widthReal">
          <input
            type="text"
            id="widthReal"
            name="widthReal"
            placeholder="Add width..."
            defaultValue={artPieces?.widthReal}
            required
          />
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          defaultValue={artPieces?.description}
        ></textarea>
        <button type="submit">Submit</button>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
