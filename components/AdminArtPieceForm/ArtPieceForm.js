import styled from "styled-components";
import AdminImagePreview from "../AdminEditImagePreview/AdminEditImagePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function ArtPieceForm({
  onSubmit,
  fileImageUrl,
  onChange,
  handleSetFileImageUrl,
  currentFormData,
  handleSetCurrentFormData,
}) {
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
      slug: slug,
      date: data.date,
      name: data.name,
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
    handleSetCurrentFormData("");
    form.name.focus();
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <StyledSection>
      <h2>Add a new art piece: </h2>
      <AdminImagePreview
        fileImageUrl={fileImageUrl}
        handleSetFileImageUrl={handleSetFileImageUrl}
      />
      <StyledForm onSubmit={handleSubmit} autoComplete="on">
        <FileLabel htmlFor="imageUrl">
          <FontAwesomeIcon icon={faCloudArrowUp} />
        </FileLabel>
        <FileInput type="file" id="imageUrl" name="imageUrl" onChange={onChange} accept="image/*" />
        <label htmlFor="name">Name your art piece:</label>
        <Input
          type="text"
          id="name"
          name="name"
          minLength={3}
          maxLength={100}
          autoComplete="name"
          required
          defaultValue={currentFormData.name}
          onChange={(event) =>
            handleSetCurrentFormData({ ...currentFormData, name: event.target.value })
          }
        />
        <label htmlFor="date">Erscheinungsjahr: </label>
        <Input
          type="number"
          id="date"
          name="date"
          min="0"
          max={currentYear}
          defaultValue={currentFormData.date}
          onChange={(event) =>
            handleSetCurrentFormData({ ...currentFormData, date: event.target.value })
          }
          required
        />
        <StyledFieldset>
          <label htmlFor="category">Kategorie: </label>
          <StyledSelection
            name="category"
            id="category"
            defaultValue={currentFormData.category}
            onChange={(event) =>
              handleSetCurrentFormData({ ...currentFormData, category: event.target.value })
            }
          >
            <option>Impressionen</option>
            <option>Naturlandschaften</option>
            <option>Abstrakte Werke</option>
            <option>Aktmalerei</option>
            <option>Vielfältige Kunstformen</option>
          </StyledSelection>

          <label htmlFor="technique">Technik: </label>
          <StyledSelection
            name="technique"
            id="technique"
            defaultValue={currentFormData.technique}
            onChange={(event) =>
              handleSetCurrentFormData({ ...currentFormData, technique: event.target.value })
            }
          >
            <option>Öl auf Leinwand</option>
          </StyledSelection>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="heightReal">Breite: </label>
          <Input
            type="number"
            id="widthReal"
            name="widthReal"
            min="0"
            max="400"
            placeholder="cm"
            defaultValue={currentFormData.widthReal}
            onChange={(event) =>
              handleSetCurrentFormData({ ...currentFormData, widthReal: event.target.value })
            }
            required
          />
          <label htmlFor="widthReal"> Höhe: </label>
          <Input
            type="number"
            min="0"
            max="400"
            id="heightReal"
            name="heightReal"
            placeholder="cm"
            defaultValue={currentFormData.heightReal}
            onChange={(event) =>
              handleSetCurrentFormData({ ...currentFormData, heightReal: event.target.value })
            }
            required
          />
        </StyledFieldset>
        <label htmlFor="description">Füge eine Beschreibung hinzu:</label>
        <Textarea
          name="description"
          maxLength="300"
          id="description"
          cols="30"
          rows="5"
          defaultValue={currentFormData.description}
          onChange={(event) =>
            handleSetCurrentFormData({ ...currentFormData, description: event.target.value })
          }
        ></Textarea>
        <StyledButton>Hinzufügen</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  font-size: 0.8rem;
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
  border: 1px dotted var(--tertiary-color);
  background: var(--primary-color);
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
  margin-right: 1rem;
  background: var(--primary-color);
  color: var(--font-color);
  outline: none;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid var(--tertiary-color);
  color: var(--font-color);
  background: var(--primary-color);
  border-radius: 5px;
  padding: 0.5rem;
  outline: none;
`;

const StyledButton = styled.button`
  background-color: var(--cool-brown);
  color: var(--font-color);
  padding: 0.8rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: inherit;
  &:hover {
    background-color: var(--tertiary-color);
    transition: background-color 0.2s ease;
  }
`;

const StyledFieldset = styled.fieldset`
  border: none;
`;
