import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArtPiece } from "pages/_app";
import styled from "styled-components";

import AdminImagePreview from "../AdminEditImagePreview/admin-edit-image-preview";

type ArtPieceFormProperties = {
  onSubmit: (newArtPiece: ArtPiece) => void;
  fileImageUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetFileImageUrl: (fileImageUrl: string) => void;
  currentFormData: ArtPiece;
  handleSetCurrentFormData: (currentFormData: ArtPiece) => void;
};

export default function ArtPieceForm({
  onSubmit,
  fileImageUrl,
  onChange,
  handleSetFileImageUrl,
  currentFormData,
  handleSetCurrentFormData,
}: ArtPieceFormProperties) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const name = data.name as string;
    const slug = name
      .toLowerCase()
      .trim()
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ä", "ae")
      .replaceAll("ß", "ss")
      .replaceAll(/[^\s\w-]/g, "") // remove any characters which are not word characters
      .replaceAll(/[\s_-]+/g, "-") // remove whitespace characters, underscores, hyphens with a single hyphen
      .replaceAll(/^-+|-+$/g, ""); // no hyphens in the beginning or end of the string
    const newArtPiece: ArtPiece = {
      slug: slug,
      date: typeof data.date === "string" ? Number.parseInt(data.date, 10) : new Date().getFullYear(),
      name: data.name as string,
      available: data.available === "on",
      description: data.description as string,
      category: data.category as string,
      technique: data.technique as string,
      imageUrl: fileImageUrl,
      widthReal: data.widthReal as string,
      heightReal: data.heightReal as string,
    };
    onSubmit(newArtPiece);
    handleSetFileImageUrl("/img/preview.png");
    handleSetCurrentFormData({
      ...currentFormData,
      name: "",
      date: new Date().getFullYear(),
      available: true,
      description: "",
      category: "",
      technique: "",
      widthReal: "",
      heightReal: "",
    });
    (form.elements.namedItem("name") as HTMLInputElement).focus();
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <StyledSection>
      <h2>Füge ein neues Kunstwerk hinzu: </h2>
      <AdminImagePreview fileImageUrl={fileImageUrl} handleSetFileImageUrl={handleSetFileImageUrl} />
      <StyledForm onSubmit={handleSubmit} autoComplete="on">
        <FileLabel htmlFor="imageUrl">
          <FontAwesomeIcon icon={faCloudArrowUp} />
        </FileLabel>
        <FileInput type="file" id="imageUrl" name="imageUrl" onChange={onChange} accept="image/*" />
        <label htmlFor="name">Benenne dein Kunstwerk:</label>
        <Input
          type="text"
          id="name"
          name="name"
          minLength={3}
          maxLength={100}
          autoComplete="name"
          required
          defaultValue={currentFormData.name}
          onChange={(event) => handleSetCurrentFormData({ ...currentFormData, name: event.target.value })}
        />
        <label htmlFor="date">Erscheinungsjahr: </label>
        <Input
          type="number"
          id="date"
          name="date"
          min="0"
          max={currentYear}
          defaultValue={currentFormData.date}
          onChange={(event) => handleSetCurrentFormData({ ...currentFormData, date: Number(event.target.value) })}
          required
        />
        <label htmlFor="available">
          Verfügbar:
          <StyledCheckbox
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={currentFormData.available}
            onChange={(event) => handleSetCurrentFormData({ ...currentFormData, available: event.target.checked })}
          />
        </label>

        <StyledFieldset>
          <label htmlFor="category">Kategorie: </label>
          <StyledSelection
            name="category"
            id="category"
            defaultValue={currentFormData.category}
            onChange={(event) => handleSetCurrentFormData({ ...currentFormData, category: event.target.value })}
          >
            <option>Impressionen</option>
            <option>Naturlandschaften</option>
            <option>Abstrakte Werke</option>
            <option>Aktmalerei</option>
            <option>Andere Kunstformen</option>
          </StyledSelection>
          <br />
          <label htmlFor="technique">Technik: </label>
          <StyledSelection
            name="technique"
            id="technique"
            defaultValue={currentFormData.technique}
            onChange={(event) => handleSetCurrentFormData({ ...currentFormData, technique: event.target.value })}
          >
            <option>Aquarell</option>
            <option>Diverse</option>
            <option>Öl auf Leinwand</option>
            <option>Öl auf Malpappe</option>
            <option>Spachtel</option>
            <option>Spachtel und Pinsel</option>
            <option>Steinhauerei</option>
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
            defaultValue={currentFormData.widthReal}
            onChange={(event) => handleSetCurrentFormData({ ...currentFormData, widthReal: event.target.value })}
            required
          />
          <label htmlFor="heightReal">Höhe: </label>
          <Input
            type="number"
            id="heightReal"
            name="heightReal"
            min="0"
            max="400"
            placeholder="cm"
            defaultValue={currentFormData.heightReal}
            onChange={(event) => handleSetCurrentFormData({ ...currentFormData, heightReal: event.target.value })}
            required
          />
        </StyledFieldset>
        <label htmlFor="description">Füge eine Beschreibung hinzu:</label>
        <Textarea
          name="description"
          maxLength={500}
          id="description"
          cols={30}
          rows={5}
          defaultValue={currentFormData.description}
          onChange={(event) => handleSetCurrentFormData({ ...currentFormData, description: event.target.value })}
        ></Textarea>
        <LetterCounter>{currentFormData && 500 - currentFormData.description?.length}</LetterCounter>
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

const StyledCheckbox = styled.input`
  vertical-align: top;
  width: 20px;
  height: 20px;
  margin-left: 0.5rem;
  accent-color: var(--tertiary-color);
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

const LetterCounter = styled.span`
  text-align: right;
`;
