import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import img_recipe from "../assets/img_recipe.png"

const Home = (props) =>{
    const inputRef = useRef(null);
    const fileUpload = (e) => {
        e.preventDefault();
        console.log(inputRef.current);
        inputRef.current.click();
    };

    return(
        <div className="container mx-auto my-5">
            <div id="home" className="section bg-desertStorm mx-auto my-5 px-10 py-5 rounded-[12px] flex justify-center items-center">
                <div className="grid grid-cols-2 place-items-center gap-32">
                    <div className="w-[500px] h-[500px] overflow-hidden bg-white 
                    border-[5px] border-solid rounded-[12px] border-pixieGreen_h">
                            <img src={props.fileUrl} alt="img_recipe"
                                onChange={e => props.setFileUrl(e.target.value)}
                                className="w-full h-full object-cover" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-black sm:text-[1rem] text-left font-bold">
                            食材の写真をアップロードしてください
                        </div>
                        <div>
                            <form className='my-6'>
                                <button 
                                    type="button"
                                    onClick={fileUpload} 
                                    className="bg-flamePea text-white border-0 p-2 rounded-md">
                                        ファイル選択
                                </button>
                                <input 
                                    hidden 
                                    ref={inputRef} 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => props.handleImageChange(e)} 
                                />
                                <button 
                                    type="submit" onClick={(e) => props.handleUpload(e)} 
                                    className="bg-pixieGreen text-white border-0 p-2 rounded-md hover:bg-pixieGreen_h hover:text-white">
                                        アップロード
                                </button>
                            </form>
                        </div>
                        <div className="text-black sm:text-[1rem] text-left font-bold">
                            生成結果
                        </div>
                        <textarea name="reply" className="h-80 w-[30rem] mx-auto my-6 p-2 border" 
                        placeholder='Loading...' value={props.textOfRecipe} onChange={e => props.setTextOfRecipe(e.target.value)} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Home;