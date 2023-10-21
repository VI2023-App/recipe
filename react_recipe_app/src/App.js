import './App.css';
import './index.css'
import React, { useState }from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import img_recipe from "./assets/img_recipe.png"

function App() {

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(img_recipe);
  const [textOfRecipe, setTextOfRecipe] = useState('');

  const getRecipe = (json) => {
    const formattedText = json["text"];
    const resultImage = json["image"];
    const resultImageURL = 'data:image/png;base64,' + resultImage;
    setTextOfRecipe(formattedText); //setを使えばstateに値を書き込める
    setFileUrl(resultImageURL);
    console.log(textOfRecipe);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setSelectedFile(imageFile);
    setFileUrl(imageURL);
    console.log(selectedFile);
    console.log(fileUrl);
  };

  const handleUpload = async (e) => {
      e.preventDefault();
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        console.log(formData);

        try {
          const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            console.log('画像がアップロードされました');
            const json = await response.json();
            getRecipe(json);
          } else {
            console.error('アップロードエラー');
          }
        } catch (error) {
          console.error('ネットワークエラー', error);
        }
      }
  };

  return (
    <div className="App bg-ghostWhite">
      <Header />
      <Home fileUrl={fileUrl} setFileUrl={setSelectedFile} 
        handleImageChange={handleImageChange} handleUpload={handleUpload}
        textOfRecipe={textOfRecipe} setTextOfRecipe={setTextOfRecipe} />
      <Footer />
    </div>
  );
}

export default App;
