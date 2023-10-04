import React, { useEffect, useState } from "react";
import { PiCookingPotFill } from "react-icons/pi"

const Header = () =>{
    const [toggle, setToggle] = useState(false);
    const [isTop, setIsTop] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setIsTop(window.scrollY > 20);
        });
    }, []);
    return(
        <div className="w-full top-0 left-0 z-0">
            <div className="container mx-auto bg-yellow100 flex items-center justify-between py-4 px-2">
                <div className="flex items-center gap-2">
                    {/*左上のアイコン*/}
                    <PiCookingPotFill className="rounded-full w-10 h-10 bg-white flex items-center justify-center text-black" />
                    <p className="text-xl">
                        <span className="opacity-80">Recipe Generation by GPT-3.5</span>
                    </p>
                </div>
                <div className="md:flex hidden items-center gap-6">
                    
                </div>
            </div>
        </div>
    );
}

export default Header;