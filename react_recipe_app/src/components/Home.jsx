import React, { useState } from 'react';
import { motion } from "framer-motion";
import img_recipe from "../assets/img_recipe.png"

const Home = () =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [textOfRecipe, setTextOfRecipe] = useState('');

    const getRecipe = (json) => {
        const formattedText = json["text"].replace(/\n/g, '<br>');
        setTextOfRecipe(formattedText);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
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
        <div>
            <div className="section flex justify-center items-center" id="home">
                <div className="grid md:grid-cols-2 place-items-center gap-8">
                    <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] 
                        rounded-3xl overflow-hidden shadow-iconShadow border-[10px] border-solid border-mistyrose">
                            <img src={img_recipe} alt="img_recipe" className="w-full h-full object-cover" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-black sm:text-[1.5rem] font-bond mb-4">
                            Recipe Generation by GPT-3.5
                        </div>
                        <div>
                            <form>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                                <button 
                                    type="submit" onClick={handleUpload} 
                                    className="bg-gray-300 border-0 p-2 rounded-md hover:bg-gray-400 hover:text-white">
                                        アップロード
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className='Result'>
                <h2>処理結果</h2>
                <textarea name="reply" class="h-48 w-full p-2 border" 
                    placeholder='Loading...' value={textOfRecipe} onChange={e => setTextOfRecipe(e.target.value)} />
            </div>
        </div>
    );
}

export default Home;