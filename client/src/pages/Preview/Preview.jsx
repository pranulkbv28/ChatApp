// // import React from 'react';
// import { useState } from "react";
// import styles from "./preview.module.css";

// const Preview = () => {
//   const [image, setImage] = useState(null);

//   const handlePreview = (e) => {
//     // setImage(e.target.files);
//     // console.log(image)
//     console.log(e.target.files);
//     // console.log(e.target.files);
//     // setImage(URL.createObjectURL(e.target.files[0]));
//     const arr = [];
//     arr.push(e.target.files[0]);
//     setImage(URL.createObjectURL(new Blob(arr, { type: "application/zip" })));
//     console.log(image);
//   };

//   return (
//     <div className={styles.body}>
//       <form action="">
//         <input type="file" name="" id="" onChange={handlePreview} />
//         <img src={image} alt="" />
//       </form>
//     </div>
//   );
// };

// export default Preview;

// import React from 'react';

import { useState } from "react";
import { TIFFViewer } from "react-tiff";
import "react-tiff/dist/index.css";

const Preview = () => {
  const [imageURL, setImageURL] = useState(null);

  const handleInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageURL(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleInput} accept=".tiff" />
      {imageURL && (
        <TIFFViewer
          tiff={imageURL}
          lang="en" // en | de | fr | es | tr | ja | zh | ru | ar | hi
          paginate="ltr" // bottom | ltr
          buttonColor="#141414"
          printable
        />
      )}
    </div>
  );
};

export default Preview;
