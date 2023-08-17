import { useState } from "react";
import { styled } from "styled-components";
import { uid } from "uid";

export default function ArtPieceForm({
  onSubmit,
  artPieceToEdit,
  fileImageUrl,
  onChange,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
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
    //console.log(fileImageUrl);
    const newArtPiece = {
      id: uid(),
      slug: slug,
      date: data.year,
      name: data.name.replace(/^"+|"+$/g, "").replace(/[^\w\s-]/g, ""),
      description: data.description,
      category: data.category,
      technique: data.technique,
      imageUrl: fileImageUrl,
      heightReal: data.heightReal,
      widthReal: data.widthReal,
    };

    onSubmit(newArtPiece);

    event.target.imageUrl.focus();
    event.target.reset();
  }

  return (
    <StyledSection>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="imageUrl">
          Paste your image link here:
          <Input
            type="file"
            id="imageUrl"
            name="imageUrl"
            placeholder="only links from pixabay will work..."
            defaultValue={artPieceToEdit?.imageUrl}
            onChange={onChange}
            required
          />
        </label>
        <label htmlFor="name">
          What is the name of your painting?
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="type in a name..."
            defaultValue={artPieceToEdit?.name}
            maxLength={50}
            required
          />
        </label>
        <label htmlFor="year">
          Release Year:
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
        </label>
        <StyledFieldset>
          <label htmlFor="category">
            Category:
            <StyledSelection name="category">
              <option defaultValue={artPieceToEdit?.Impression}>
                Impressions
              </option>
              <option defaultValue={artPieceToEdit?.Landscape}>
                Landscapes
              </option>
              <option defaultValue={artPieceToEdit?.Abstact}>Abstract</option>
              <option defaultValue={artPieceToEdit?.Portrait}>Portraits</option>
            </StyledSelection>
          </label>
          <label htmlFor="technique">
            Technique:
            <StyledSelection name="technique">
              <option defaultValue={artPieceToEdit?.Oil}>Oil</option>
              <option defaultValue={artPieceToEdit?.Acryl}>Acryl</option>
            </StyledSelection>
          </label>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="heightReal">
            Width:
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
          </label>
          <label htmlFor="widthReal">
            Height:
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
          </label>
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
        <StyledButton>
          {artPieceToEdit.name !== undefined
            ? `EDIT: ${artPieceToEdit.name}`
            : "SUBMIT"}
        </StyledButton>
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
