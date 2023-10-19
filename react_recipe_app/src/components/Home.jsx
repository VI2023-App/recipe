import React, { useState } from 'react';
import { motion } from "framer-motion";
import img_recipe from "../assets/img_recipe.png"

const Home = () =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(img_recipe);
    const [textOfRecipe, setTextOfRecipe] = useState('');

    const getRecipe = (json) => {
        const formattedText = json["text"].replace(/\n/g, '<br>');
        setTextOfRecipe(formattedText);
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        const imageURL = URL.createObjectURL(imageFile);
        setSelectedFile(imageFile);
        setFileUrl(imageURL);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    console.log('画像がアップロードされました');
                    const json = await response.json()
                    getRecipe(json);
                    console.log(json["text"])
                } else {
                    console.error('アップロードエラー');
                }
            } catch (error) {
                console.error('ネットワークエラー', error);
            }
        }
    };
    
    return(
        <div className="container mx-auto my-5">
            <div id="home" className="section bg-desertStorm mx-auto my-5 px-10 py-5 rounded-[12px] flex justify-center items-center">
                <div className="grid grid-cols-2 place-items-center gap-32">
                    <div className="w-[500px] h-[500px] overflow-hidden bg-white 
                    border-[5px] border-solid rounded-[12px] border-pixieGreen_h">
                            <img src={fileUrl} alt="img_recipe"
                                onChange={e => setFileUrl(e.target.value)}
                                className="w-full h-full object-cover" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-black sm:text-[2rem] font-black mb-24">
                            Recipe Generation by GPT-3.5
                        </div>
                        <div>
                            <form>
                                <div className='mb-12'>
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                </div>
                                <button 
                                    type="submit" onClick={handleUpload} 
                                    className="bg-pixieGreen text-white border-0 p-2 rounded-md hover:bg-pixieGreen_h hover:text-white">
                                        アップロード
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div id="result" className="section bg-pixieGreen mx-auto my-5 px-10 py-5 rounded-[12px] flex justify-center items-center">
                <div className="text-black sm:text-[2rem] font-bond text-left mb-4">処理結果</div>
                <textarea name="reply" className="h-48 w-4/5 mx-auto p-2 border" 
                    placeholder='Loading...' value={textOfRecipe} onChange={e => setTextOfRecipe(e.target.value)} />
            </div>
        </div>
    );
}

export default Home;