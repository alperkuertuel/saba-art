import { styled } from "styled-components";

export default function ArtPieceForm({ onSubmit, defaultValue }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log(data);
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
            defaultValue={defaultValue?.imageUrl}
            required
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="type in a name..."
            defaultValue={defaultValue?.name}
            required
          />
        </label>
        <label htmlFor="category">
          <select name="category">
            <option disabled hidden>
              Select a category
            </option>
            <option defaultValue={defaultValue?.Impression}>Impression</option>
            <option defaultValue={defaultValue?.Impression}>Landscape</option>
            <option defaultValue={defaultValue?.Impression}>Abstract</option>
            <option defaultValue={defaultValue?.Impression}>Portrait</option>
          </select>
        </label>
        <label htmlFor="technique">
          <select name="technique">
            <option disabled hidden>
              Select a technique
            </option>
            <option defaultValue={defaultValue?.Oil}>Oil</option>
            <option defaultValue={defaultValue?.Acryl}>Acryl</option>
          </select>
        </label>
        <label htmlFor="heightReal">
          <input
            type="text"
            id="heightReal"
            name="heightReal"
            placeholder="Add height..."
            defaultValue={defaultValue?.heightReal}
            required
          />
        </label>
        <label htmlFor="widthReal">
          <input
            type="text"
            id="widthReal"
            name="widthReal"
            placeholder="Add width..."
            defaultValue={defaultValue?.widthReal}
            required
          />
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          defaultValue={defaultValue?.description}
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
