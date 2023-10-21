import React, { useState } from 'react';
import { motion } from "framer-motion";
import img_recipe from "../assets/img_recipe.png"

const Result = (props) =>{
    
    return(
        <div className="container mx-auto my-5">
            <div id="result" className="section bg-pixieGreen mx-auto my-5 px-10 py-5 rounded-[12px] flex justify-center items-center">
                <div className="grid grid-cols-2 place-items-center gap-32">
                    <div className="w-[500px] h-[500px] overflow-hidden bg-white 
                    border-[5px] border-solid rounded-[12px] border-pixieGreen_h">
                            <img src={props.fileUrl} alt="img_recipe"
                                className="w-full h-full object-cover" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-black sm:text-[2rem] font-black mb-12">
                            生成結果
                        </div>
                        <textarea name="reply" className="h-80 w-[30rem] mx-auto p-2 border" 
                        placeholder='Loading...' value={props.textOfRecipe} onChange={e => props.setTextOfRecipe(e.target.value)} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Result;