import React from "react";
import { PiCookingPotFill } from "react-icons/pi"

const Header = () =>{
    return(
        <div className="container w-full md:w-auto mx-auto mb-5 bg-dandelion">
            <div className="container px-5 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/*左上のアイコン*/}
                    <PiCookingPotFill className="rounded-full w-10 h-10 bg-white flex items-center justify-center text-black" />
                    <p className="text-xl font-black">
                        <span className="opacity-80">Recipe Generation by GPT-3.5</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Header;