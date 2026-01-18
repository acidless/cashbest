"use client";

import {CashbackCategory} from "@/lib/types";
import {CashbackAccordion} from "@/entities/cashback";
import {motion} from "framer-motion";

type PropsType = {
    title: string;
    categories: CashbackCategory[];
}

export const CashbackGroup = ({title, categories}: PropsType) => {
    return <motion.div
        transition={{ duration: 0.3, ease: "easeInOut" }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}>
        <h2 className="text-xl mb-2">{title}</h2>
        <div className="flex flex-col gap-2 mb-8">
            {categories.map(c => {
                return <CashbackAccordion key={c.category} cashbackCategory={c}/>
            })}
        </div>
    </motion.div>
}