import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import styles from './styles.module.css';

export default function File() {
  const [imgProductURL, setImgProductURL] = useState('');
  const [imgPreview, setImgPreview] = useState(null);

  function handlePreview(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if(!image) {
      return;
    }

    if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      setImgPreview(image);
      setImgProductURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <label className={styles.file}>
      <span>
        <FiUpload color="#EA1D2C" size={ 30 }/>
      </span>

      <input
        type="file"
        accept='image/png, image/jpeg, image/jpg'
        onChange={handlePreview}
      />

      {imgProductURL && (
        <img
          className={styles.preview}
          src={imgProductURL}
          alt="Foto Produto"
          width={250}
          height={250}
        />
      )}
    </label>
  )
}
