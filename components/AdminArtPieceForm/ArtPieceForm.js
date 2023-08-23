import styled from "styled-components";
import { uid } from "uid";
import AdminImagePreview from "../AdminEditImagePreview/AdminEditImagePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ArtPieceForm({ onSubmit, fileImageUrl, onChange, handleSetFileImageUrl }) {
  function handleSubmit(event) {
    event.preventDefault();
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
    const newArtPiece = {
      id: uid(),
      slug: slug,
      date: data.date,
      name: data.name.replace(/^"+|"+$/g, "").replace(/[^\w\s-]/g, ""),
      description: data.description,
      category: data.category,
      technique: data.technique,
      imageUrl: fileImageUrl,
      widthReal: data.widthReal,
      heightReal: data.heightReal,
    };

    onSubmit(newArtPiece);
    handleSetFileImageUrl("/img/preview.png");
    form.reset();
    form.name.focus();
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <FileLabel htmlFor="imageUrl">
          <FontAwesomeIcon icon={faCloudArrowUp} />
        </FileLabel>
        <FileInput
          type="file"
          id="imageUrl"
          name="imageUrl"
          onChange={onChange}
          accept="image/*"
          required
          capture
        />
        <AdminImagePreview fileImageUrl={fileImageUrl} />
        <label htmlFor="name">Name your art piece:</label>
        <Input type="text" id="name" name="name" minLength={3} maxLength={30} required />
        <label htmlFor="date">Release Year: </label>
        <Input type="number" id="date" name="date" min="0" max={currentYear} required />
        <StyledFieldset>
          <label htmlFor="category">Category: </label>
          <StyledSelection name="category" id="category">
            <option>Impression</option>
            <option>Landscape</option>
            <option>Abstract</option>
            <option>Portrait</option>
            <option>New Category 1</option> {/* for testing */}
            <option>New Category 2</option> {/* for testing */}
          </StyledSelection>

          <label htmlFor="technique"></label>
          <StyledSelection name="technique" id="technique">
            <option>Oil</option>
            <option>Acryl</option>
          </StyledSelection>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="heightReal">width: </label>
          <Input
            type="number"
            id="widthReal"
            name="widthReal"
            min="0"
            max="400"
            placeholder="cm"
            required
          />
          <label htmlFor="widthReal"> height: </label>
          <Input
            type="number"
            min="0"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="cm"
            required
          />
        </StyledFieldset>
        <label htmlFor="description">Describe your painting:</label>
        <Textarea name="description" maxLength="300" id="description" cols="30" rows="5"></Textarea>
        <StyledButton>ADD NEW ART PIECE</StyledButton>
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
  gap: 0.7rem;
`;

const FileLabel = styled.label`
  line-height: 1.15;
  text-align: center;
  cursor: pointer;
  font-size: 2rem;
  color: var(--tertiary-color);
  border: 1px dotted var(--border-color);
  background: hsl(0 0 0/0);
  border-radius: 5px;
  transition: 0.5s;
  &:hover,
  &:focus,
  &:active {
    background: var(--tertiary-color);
    color: #fff;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Input = styled.input`
  width: fit-content;
  line-height: 1.15;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--border-color);
  border-radius: 5px 5px 0 0;
  padding: 0.4rem;
`;

const StyledSelection = styled.select`
  text-align: center;
  width: auto;
  line-height: 1.15;
  border: none;
  outline: none;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 0.4rem;
  margin-right: 1rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 0.5rem;
`;

const StyledButton = styled.button`
  background-color: var(--secondary-color);
  color: white;
  cursor: pointer;
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
