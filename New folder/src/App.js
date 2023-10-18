import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Album from './components/Album/Album';
import Images from './components/Images/Images';

import { useState, useEffect } from "react";
import { doc, setDoc, addDoc, collection,  query, where, onSnapshot } from "firebase/firestore"; 
import { db } from "./firebase-init"; 


function App() {
  const [album , setAlbum] = useState([]);
  const [images , setImages] = useState([]);
  const [albumScreen , setAlbumScreen] = useState(true);
  // album whose images will be showm
  const [imageAlbum, setImageAlbum] = useState({id:"", name:""});


  useEffect(() => {
    onSnapshot(collection(db, "album"), (snapshot) => {
      let fetchedAlbum = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      
      console.log(fetchedAlbum);
      setAlbum(fetchedAlbum);
    });
  }, []);

  useEffect(() => {
    // This effect will run when imageAlbum changes
    console.log("imageAlbum:", imageAlbum);
    fetchImages();
  }, [imageAlbum]);


    const fetchImages = async () => {
      const q = query(collection(db, "Images"), where("albumId", "==", imageAlbum.id));
      
      const unsubscribe = await onSnapshot(q, (snapshot) => {
        const fetchedImages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setImages(fetchedImages);
      });

      return () => unsubscribe();
    };
// to fetch the images and setting the album which to get and albumscreen to false
    const handleAlbumClick = (album) => {
      setImageAlbum(album);
      setAlbumScreen(false);
    };
// to add the new album
    const handleAddAlbum =  async (albumName) => {
      await addDoc(collection(db, "album"), {
        name: albumName
      });
    };
  
// to add the new image
const handleAddImage = async (image) => {
  const imagesCollection = collection(db, "Images"); // Specify the collection name here
  await addDoc(imagesCollection, {
    albumId: image.albumId, // Include the id in the document data
    name: image.name,
    url: image.url
  });
};

  // to update the image
  const handleImageUpdate = async (imageId, image)=>{
    console.log(imageId, image)
    const imageRef = doc(db, "Images", imageId);
    try {
      // Update the document with new data
      await setDoc(imageRef, image, { merge: true });

      // The "merge" option is set to true to only update the specified fields in the document.
      // If the document doesn't exist, it will be created.
  
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  
    const handleAlbumScreen = ()=>{
      setAlbumScreen(!albumScreen);
    }
  
  return (
    <div className="App">
      <Header/> 
      {(albumScreen)?  
      <Album albumList={album} handleAlbumClick={handleAlbumClick} handleAddAlbum={handleAddAlbum}/> : 
      <Images imagesList={images} 
      imageAlbum={imageAlbum} 
      handleAlbumScreen={handleAlbumScreen}
      handleAddImage={handleAddImage} 
      handleImageUpdate={handleImageUpdate} />  
      
      }
    </div>
  );
}

export default App;
