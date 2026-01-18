import {banksToColor} from "@/entities/bank";
import {Cashback} from "@/lib/types";
import {cashbackCategory} from "@/entities/cashback/model/cashback-category";

type PropsType = {
    cashback: Cashback,
    lg?: boolean,
    top?: boolean
}

export const CashbackCard = ({cashback, lg, top}: PropsType) => {
    return <div className={`bg-[#17171C] relative rounded-xl border-2 ${top ? 'border-amber-200' : 'border-transparent'} ${lg ? 'px-4' +
        ' py-3 pb-4' : 'px-3 py-2 pb-3'} flex items-center justify-between gap-2`}>
        <div className="flex items-center gap-4">
            <p className={lg ? "text-3xl" : "text-2xl"}>{cashbackCategory[cashback.category].icon}</p>
            <div>
                <h3 className={`font-semibold ${lg ? 'text-xl' : "text-lg"}`}>{cashbackCategory[cashback.category].title}</h3>
                <p className="font-light text-sm -mt-0.5 flex items-center gap-1">
                    <span style={{backgroundColor: banksToColor[cashback.bank]}} className="rounded-full w-2 h-2"></span>
                    {cashback.bank}
                </p>
            </div>
        </div>
        <div>
            <p className={`text-accent ${lg ? 'text-3xl' : 'text-2xl'} font-bold`}>{cashback.amount}%</p>
        </div>
        {top && <p className="absolute text-3xl -top-5 -right-3 z-10">👑</p>}
    </div>
};