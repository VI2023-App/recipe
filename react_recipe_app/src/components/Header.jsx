import React, { useEffect, useState } from "react";

const Header = () =>{
    const [toggle, setToggle] = useState(false);
    const [isTop, setIsTop] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setIsTop(window.scrollY > 20);
        });
    }, []);
    return(
        <div className={`${isTop ? "shadow-xl bg-yellow100" : ""} fixed w-full top-0 left-0 z-20`}>
            <div className="container mx-auto flex items-center justify-between py-4 px-2">
                {/*左上のアイコン*/}
                <div className="flex items-center gap-2">
                    <div className="rounded-full w-8 h-8 bg-ghostWhite flex items-center justify-center text-black">
                        R
                    </div>
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