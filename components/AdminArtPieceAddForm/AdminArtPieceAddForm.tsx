import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArtPieceType } from 'pages/_app';

import Button from '@/Button/Button';

import AdminImagePreview from '../AdminEditImagePreview/AdminEditImagePreview';

interface AdminArtPieceAddFormProperties {
  onSubmit: (newArtPiece: ArtPieceType) => void;
  fileImageUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSetFileImageUrl: (fileImageUrl: string) => void;
  currentFormData: ArtPieceType;
  handleSetCurrentFormData: (currentFormData: ArtPieceType) => void;
}

export default function AdminArtPieceAddForm({
  onSubmit,
  fileImageUrl,
  onChange,
  handleSetFileImageUrl,
  currentFormData,
  handleSetCurrentFormData,
}: AdminArtPieceAddFormProperties) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const name = data.name as string;
    const slug = name
      .toLowerCase()
      .trim()
      .replaceAll('ö', 'oe')
      .replaceAll('ü', 'ue')
      .replaceAll('ä', 'ae')
      .replaceAll('ß', 'ss')
      .replaceAll(/[^\s\w-]/g, '') // remove any characters which are not word characters
      .replaceAll(/[\s_-]+/g, '-') // remove whitespace characters, underscores, hyphens with a single hyphen
      .replaceAll(/^-+|-+$/g, ''); // no hyphens in the beginning or end of the string
    const newArtPiece: ArtPieceType = {
      slug: slug,
      date:
        data.date === 'string'
          ? Number.parseInt(data.date, 10)
          : new Date().getFullYear(),
      name: data.name as string,
      available: data.available === 'on',
      description: data.description as string,
      category: data.category as string,
      technique: data.technique as string,
      imageUrl: fileImageUrl,
      widthReal: data.widthReal as string,
      heightReal: data.heightReal as string,
    };
    onSubmit(newArtPiece);
    handleSetFileImageUrl('/img/preview.png');
    handleSetCurrentFormData({
      ...currentFormData,
      name: '',
      date: new Date().getFullYear(),
      available: true,
      description: '',
      category: '',
      technique: '',
      widthReal: '',
      heightReal: '',
    });
    (form.elements.namedItem('name') as HTMLInputElement).focus();
  }
  const currentYear = new Date().getFullYear().toString();
  return (
    <article className="text-xs">
      <h2>Füge ein neues Kunstwerk hinzu: </h2>
      <AdminImagePreview
        fileImageUrl={fileImageUrl}
        handleSetFileImageUrl={handleSetFileImageUrl}
      />
      <form
        className="grid grid-rows-1 gap-3"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        <label
          className="cursor-pointer rounded-[5px] border border-dotted border-tertiary-color bg-primary-color text-center text-2xl leading-tight text-tertiary-color transition duration-500 hover:bg-tertiary-color hover:text-white focus:bg-tertiary-color focus:text-white active:bg-tertiary-color active:text-white"
          htmlFor="imageUrl"
        >
          <FontAwesomeIcon icon={faCloudArrowUp} />
        </label>
        <input
          className="hidden"
          type="file"
          id="imageUrl"
          name="imageUrl"
          onChange={onChange}
          accept="image/*"
        />
        <label htmlFor="name">Benenne dein Kunstwerk:</label>
        <input
          className="w-auto border-b border-tertiary-color bg-primary-color"
          type="text"
          id="name"
          name="name"
          minLength={3}
          maxLength={100}
          autoComplete="name"
          required
          defaultValue={currentFormData.name}
          onChange={(event) =>
            handleSetCurrentFormData({
              ...currentFormData,
              name: event.target.value,
            })
          }
        />
        <label htmlFor="date">Erscheinungsjahr: </label>
        <input
          className="w-auto border-b border-tertiary-color bg-primary-color"
          type="number"
          id="date"
          name="date"
          min="0"
          max={currentYear}
          defaultValue={currentFormData.date}
          onChange={(event) =>
            handleSetCurrentFormData({
              ...currentFormData,
              date: Number(event.target.value),
            })
          }
          required
        />
        <label htmlFor="available">
          Verfügbar:
          <input
            className="ml-2 size-[15px] align-top"
            style={{ accentColor: 'var(--tertiary-color)' }}
            type="checkbox"
            id="available"
            name="available"
            defaultChecked={currentFormData.available}
            onChange={(event) =>
              handleSetCurrentFormData({
                ...currentFormData,
                available: event.target.checked,
              })
            }
          />
        </label>

        <fieldset className="border-none">
          <label htmlFor="category">Kategorie: </label>
          <select
            className="my-1 w-auto rounded-[5px] border border-tertiary-color bg-primary-color py-1 text-center text-font-color outline-none"
            name="category"
            id="category"
            defaultValue={currentFormData.category}
            onChange={(event) =>
              handleSetCurrentFormData({
                ...currentFormData,
                category: event.target.value,
              })
            }
          >
            <option>Impressionen</option>
            <option>Naturlandschaften</option>
            <option>Abstrakte Werke</option>
            <option>Aktmalerei</option>
            <option>Andere Kunstformen</option>
          </select>
          <br />
          <label htmlFor="technique">Technik: </label>
          <select
            className="my-1 w-auto rounded-[5px] border border-tertiary-color bg-primary-color py-1 text-center text-font-color outline-none"
            name="technique"
            id="technique"
            defaultValue={currentFormData.technique}
            onChange={(event) =>
              handleSetCurrentFormData({
                ...currentFormData,
                technique: event.target.value,
              })
            }
          >
            <option>Aquarell</option>
            <option>Diverse</option>
            <option>Öl auf Leinwand</option>
            <option>Öl auf Malpappe</option>
            <option>Spachtel</option>
            <option>Spachtel und Pinsel</option>
            <option>Steinhauerei</option>
          </select>
        </fieldset>
        <fieldset className="border-none">
          <label htmlFor="widthReal"> Breite: </label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="number"
            min="0"
            max="400"
            id="widthReal"
            name="widthReal"
            placeholder="cm"
            defaultValue={currentFormData.widthReal}
            onChange={(event) =>
              handleSetCurrentFormData({
                ...currentFormData,
                widthReal: event.target.value,
              })
            }
            required
          />
          <label htmlFor="heightReal">Höhe: </label>
          <input
            className="w-auto border-b border-tertiary-color bg-primary-color"
            type="number"
            id="heightReal"
            name="heightReal"
            min="0"
            max="400"
            placeholder="cm"
            defaultValue={currentFormData.heightReal}
            onChange={(event) =>
              handleSetCurrentFormData({
                ...currentFormData,
                heightReal: event.target.value,
              })
            }
            required
          />
        </fieldset>
        <label htmlFor="description">Füge eine Beschreibung hinzu:</label>
        <textarea
          className="rounded-[5px] border border-tertiary-color bg-primary-color p-2 text-font-color outline-none"
          name="description"
          maxLength={500}
          id="description"
          cols={30}
          rows={5}
          defaultValue={currentFormData.description}
          onChange={(event) =>
            handleSetCurrentFormData({
              ...currentFormData,
              description: event.target.value,
            })
          }
        ></textarea>
        <span className="text-right">
          {currentFormData && 500 - currentFormData.description?.length}
        </span>
        <Button variant="main" size="base">
          Hinzufügen
        </Button>
      </form>
    </article>
  );
}