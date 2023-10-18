import React, { useState } from "react";
import styles from './Album.module.css';
import albumLogo from '../../images-logo.png';
const Album = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [albumName, setAlbumName] = useState("");

    const handleAddFolder = () => {
        setShowForm(true);
      };

    const handleAlbumNameChange = (event) => {
        setAlbumName(event.target.value);
      };

    const handleAddFolderSubmit = (event) => {
        event.preventDefault();
        props.handleAddAlbum(albumName)
        setAlbumName('');
        setShowForm(false);
      };
    

    return (
        <div>
        <div className={styles.albumHeading}>
            <div className={styles.createAlbumButton}><span>Your Albums</span></div>
            <div onClick={handleAddFolder} className={styles.createAlbumButton}><span>New Album</span></div>
        </div>
        <div className={styles.albumCcontainer}> 
            {props.albumList.map((album) => {
                return (
                    <div className={styles.album} key={album.id} onClick={() => props.handleAlbumClick(album)}>
                    <img className={styles.logo} src={albumLogo} alt="Album Logo"/>
                    
                    <p key={album.id}>{album.name}</p>
                    </div>
                )
            }
        )}
        </div>

        {showForm && (
        <form className={styles.formContainer} onSubmit={handleAddFolderSubmit}>
            <div className={styles.closeFormButton} onClick={()=>setShowForm(false)}>X</div>
          <input type="text" value={albumName} onChange={handleAlbumNameChange} placeholder="Enter Album Name" />
          <button type="submit">Submit</button>
        </form>
      )}

        </div>
     
    );
  }
  
  export default Album;
  