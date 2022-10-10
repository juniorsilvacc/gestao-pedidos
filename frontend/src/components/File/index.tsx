import { useState, ChangeEvent } from 'react';

// Icons
import { FiUpload } from 'react-icons/fi';

// Styles
import styles from './styles.module.css';

export default function File() {
  
  const [imageURL, setImageURL] = useState('');
  const [imageSave, setImageSave] = useState(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const image = e.target.files[0];

    if(!image) {
      return;
    }

    if(image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
      setImageSave(image);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  }

  
  return (
    <label className={styles.file}>
      <span>
        <FiUpload color="#EA1D2C" size={ 30 }/>
      </span>

      <input 
        type="file" 
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFile}
      />

      {imageURL && (
        <img 
          className={styles.preview}
          src={imageURL} 
          alt="Foto de Produto" 
          width={250}
          height={250}
        />
      )}
    </label>
  )
}
