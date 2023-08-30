import { useRouter } from "next/router";
import styled from "styled-components";

export default function ArtPiecesEditForm({ artPieceToEdit }) {
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
      name: editData.name.replace(/^"+|"+$/g, "").replace(/[^\w\s-]/g, ""),
      description: editData.description,
      category: editData.category,
      technique: editData.technique,
      imageUrl: artPieceToEdit.imageUrl,
      heightReal: editData.heightReal,
      widthReal: editData.widthReal,
    };

    console.log(editedArtPiece);

    try {
      const response = await fetch(`/api/${editedArtPiece._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedArtPiece),
      });

      if (response.ok) {
        console.log("art piece edited");
      } else console.log("something went wrong");
    } catch (error) {
      console.log("error");
    }

    // todo: think about routing structure, is it usefull to route to the slug-page?
    router.push(`/art-pieces/${slug}`);
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <StyledSection>
      <StyledForm onSubmit={handleUpdate} autoComplete="on">
        <label htmlFor="name">Change name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="change the name"
          defaultValue={artPieceToEdit.name}
          minLength={3}
          maxLength={30}
          required
        />
        <label htmlFor="date">Change release year: </label>
        <Input
          type="number"
          id="date"
          name="date"
          max={currentYear}
          defaultValue={artPieceToEdit.date}
          required
        />

        <StyledFieldset>
          <label htmlFor="category">Category: </label>
          <StyledSelection name="category" id="category" defaultValue={artPieceToEdit.category}>
            <option>Impression</option>
            <option>Landscape</option>
            <option>Abstract</option>
            <option>Portrait</option>
            <option>New Category 1</option> {/* for testing */}
            <option>New Category 2</option> {/* for testing */}
          </StyledSelection>

          <label htmlFor="technique">Technique: </label>
          <StyledSelection name="technique" id="technique" defaultValue={artPieceToEdit.technique}>
            <option>Oil</option>
            <option>Acryl</option>
          </StyledSelection>
        </StyledFieldset>
        <StyledFieldset>
          <label htmlFor="heightReal">width: </label>
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
          <label htmlFor="widthReal"> height: </label>
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
        </StyledFieldset>
        <label htmlFor="description">Change description:</label>
        <Textarea
          name="description"
          maxLength="300"
          id="description"
          cols="30"
          rows="5"
          defaultValue={artPieceToEdit.description}
        ></Textarea>
        <StyledButton>UPDATE</StyledButton>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  margin: 0 auto;
  font-size: 0.8rem;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  gap: 0.7rem;
`;

const Input = styled.input`
  width: fit-content;
  border-bottom: 1px solid var(--border-color);
  border-radius: 5px 5px 0 0;
`;

const StyledSelection = styled.select`
  text-align: center;
  width: auto;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 0.3rem 0;
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
