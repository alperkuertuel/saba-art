import {
  faDownload,
  faPencil,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { MessageConfirmModal } from '@/Modal/MessageConfirmModal';

interface EditCardProperties {
  handleSetScrollPercentage: (scrollPercentage: number) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  name: string;
  slug: string;
  _id: string;
  imageUrl: string;
  toggleEditForm: boolean;
  setToggleEditForm: (toggleEditForm: boolean) => void;
}

export default function EditCard({
  handleSetScrollPercentage,
  onDelete,
  onEdit,
  name,
  slug,
  _id,
  imageUrl,
  toggleEditForm,
  setToggleEditForm,
}: EditCardProperties) {
  const [toggleModal, setToggleModal] = useState(false);

  function handleDelete() {
    setToggleModal(true);
  }

  function confirmDelete() {
    onDelete(_id);
    setToggleModal(false);
  }

  function cancelDelete() {
    setToggleModal(false);
  }
  return (
    <>
      <li className="mx-0 my-4 flex w-auto flex-col content-center items-center gap-2 rounded-lg bg-box-color p-2 shadow-box-style">
        <Link
          className="w-full rounded-lg"
          href={`/art-pieces/${slug}`}
          onClick={() => handleSetScrollPercentage(0)}
        >
          <Image
            className="h-[50px] w-full rounded-lg object-cover"
            src={imageUrl}
            width={1000}
            height={1000}
            alt={name}
            priority={false}
          />
        </Link>
        <q className="w-full justify-self-start font-bold">{name}</q>
        <div className="flex w-full justify-end">
          <button
            aria-label="edit"
            onClick={() => {
              if (_id) {
                onEdit(_id);
                setToggleEditForm(!toggleEditForm);
              }
            }}
          >
            <FontAwesomeIcon className="mx-4 my-0" icon={faPencil} />
          </button>
          <a href={imageUrl} download={name}>
            <FontAwesomeIcon className="mx-4 my-0" icon={faDownload} />
          </a>
          <button onClick={handleDelete} aria-label="delete">
            <FontAwesomeIcon className="mx-4 my-0" icon={faTrashCan} />
          </button>
        </div>
      </li>
      {toggleModal && (
        <MessageConfirmModal
          title="Hinweis!"
          confirmAction={confirmDelete}
          closeAction={cancelDelete}
        >
          {`Willst du das Bild "${name}" wirklich löschen?`}
          <div className="flex w-full items-center justify-center">
            <Image
              src={imageUrl}
              width={150}
              height={150}
              alt={name}
              className="my-4"
            />
          </div>
        </MessageConfirmModal>
      )}
      {toggleModal && (
        <MessageConfirmModal
          title="Hinweis!"
          confirmAction={confirmDelete}
          closeAction={cancelDelete}
        >
          {`Willst du das Bild "${name}" wirklich löschen?`}
          <div className="flex w-full items-center justify-center">
            <Image
              src={imageUrl}
              width={150}
              height={150}
              alt={name}
              className="my-4"
            />
          </div>
        </MessageConfirmModal>
      )}
    </>
  );
}
