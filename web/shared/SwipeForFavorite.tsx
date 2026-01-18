"use client";

import {motion, useAnimation, useMotionValue} from "framer-motion";
import {ReactNode, useState} from "react";

type Props = {
    canSwipe?: boolean;
    onLike: () => void;
    children: ReactNode;
    direction?: "x" | "y";
    liked?: boolean;
}

const SwipeForFavorite = ({onLike, children, liked, direction = "x", canSwipe = true}: Props) => {
    const [open, setOpen] = useState(false);
    const swipeVal = useMotionValue(0);
    const controls = useAnimation();

    const handleDragEnd = async (_: any, info: any) => {
        if (info.offset[direction] < -40) {
            setOpen(true);
        } else {
            setOpen(false);
            await swipeBack();
        }
    };

    async function handleLike() {
        setOpen(false);
        await swipeBack();
        onLike();
    }

    async function swipeBack() {
        await controls.start({...(direction === "x" ? {x: 0} : {y: 0}), transition: {duration: 0.25}});
    }

    return <>
        <motion.button
            className={`absolute cursor-pointer ${liked ? "bg-accent" : "bg-[#26262C]"} ${direction === "x" ? "right-0 top-0" +
                " px-6" : "bottom-0 w-full h-[40px]"} transition-colors duration-300 ease-in-out bottom-0 rounded-xl flex items-center justify-center text-white text-xl ${open ? "pointer-events-auto" : "pointer-events-none"}`}
            initial={{opacity: 0}}
            animate={{opacity: open ? 1 : 0}}
            transition={{duration: 0.25}}
            onClick={handleLike}
        >
            ⭐
        </motion.button>

        <motion.article
            drag={canSwipe ? direction : false}
            dragConstraints={direction === "x"
                ? {left: -60, right: 0}
                : {top: -60, bottom: 0}}
            style={{[direction]: swipeVal}}
            onDragEnd={handleDragEnd}
            animate={controls}
            transition={{type: "spring", stiffness: 300, damping: 30}}
        >
            {children}
        </motion.article>
    </>
}

export default SwipeForFavorite;