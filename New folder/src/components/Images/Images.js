import React, { useState } from "react";
import styles from './Images.module.css';

const Images = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [updateImage, setUpdateImage] = useState(false);
  const [updateImageId, setUpdateImageId] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleAddImage = () => {
    setShowForm(true);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(imageName || imageUrl){
      const image = {
      name: imageName,
      url: imageUrl,
      albumId: props.imageAlbum.id
    }
    props.handleAddImage(image);
    }

    // Reset the form
    setImageUrl("");
    setImageName("");
    setShowForm(false);
  };

  const handleImageUpdate = (event)=>{
    event.preventDefault();
    let image = {};
    if(imageUrl){
      image.url = imageUrl;
    }
    if(imageName){
      image.name = imageName;
    }
    
      image.albumId = props.imageAlbum.id
    
    props.handleImageUpdate(updateImageId,image);
        // Reset the form
        setImageUrl("");
        setImageName("");
        setUpdateImage(false);
        setUpdateImageId("");
  }

  const handleImageClick = (id) => {
    // search the index from props.images using image.id
    let index = 0;
    props.imagesList.map((image, key) => {
      if (image.id === id) {
        index = key;
        return;
      }
    });
    // console.log(props.imagesList[0].url);
    setSelectedImageIndex(index);
    setShowCarousel(true);
  };
  

  const handlePrevClick = () => {
    setSelectedImageIndex((selectedImageIndex) =>
      selectedImageIndex === 0 ? props.imagesList.length - 1 : selectedImageIndex - 1
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex((selectedImageIndex) =>
      selectedImageIndex === props.imagesList.length - 1 ? 0 : selectedImageIndex + 1
    );
  };



  return (
    <div>
      <div className={styles.imagesHeading}>
      <div className={styles.addImageButton} onClick={props.handleAlbumScreen}><span>Back To Albums</span></div>
        <div><b> {props.imageAlbum.name}</b></div>
        <div className={styles.addImageButton} onClick={handleAddImage}><span>Add Image</span></div>
      </div>
      <div className={styles.imagesListContainer}>
        {props.imagesList.map((image) => (
        <div className={styles.imageContainer}>
          <div className={styles.image}><img src={image.url} alt={image.name} /></div>
          <div key={image.id}>{image.name}</div>
          <div className={styles.editImageContainer}>
            <div className={styles.editImageContainerButton} onClick={()=>handleImageClick(image.id)}>Open</div>
            <div className={styles.editImageContainerButton} onClick={()=>{setUpdateImage(true); setUpdateImageId(image.id)}}>Edit</div>
          </div>
        </div>
      ))}
      </div>

      {/* to show the form for adding new image */}
      {showForm && (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
           <div className={styles.closeFormButton} onClick={()=>setShowForm(false)}>X</div>
           <input type="text" required value={imageName} onChange={handleImageNameChange} placeholder="Image Name" />
          <input type="text" required value={imageUrl} onChange={handleImageUrlChange} placeholder="Image URL" />
          <button type="submit">Submit</button>
        </form>
      )}
     {/* to show the form for editingimage */}
      {updateImage && (
        <form className={styles.formContainer} onSubmit={handleImageUpdate}>
           <div className={styles.closeFormButton} onClick={()=>setUpdateImage(false)}>X</div>
           <input type="text"  value={imageName} onChange={handleImageNameChange} placeholder="Edit Image Name" />
           <input type="text"  value={imageUrl} onChange={handleImageUrlChange} placeholder="Edit Image URL" />
           <button type="submit">Make Changes</button>
        </form>
      )}

    {(showCarousel) ? (
      <div className={styles.carouselContainer}>
        <div className={styles.closeCarouselButton} onClick={()=>setShowCarousel(false)}>
        <img width="40" height="35" src="https://img.icons8.com/ios/50/delete-sign--v1.png" alt="delete-sign--v1"/>
        </div>
        
        <div onClick={handlePrevClick}>
          <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/back.png" alt="back"/>
        </div>
        <img src={props.imagesList[selectedImageIndex].url} className={styles.image} alt="carousel" />
        <div onClick={handleNextClick}>
        <img width="50" height="50" src="https://img.icons8.com/3d-fluency/94/forward.png" alt="forward"/>
        </div>
      </div>
    ) : null}
    
    </div>
  );
}

export default Images;
