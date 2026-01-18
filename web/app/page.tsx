
import {CashbackGroup} from "@/widgets/cashback-group";

export default async function Home() {
    const response = await fetch("http://localhost:3000/api/cashback");
    const cashbackData = await response.json();

    return <main className="px-3 py-4">
        <CashbackGroup title="Любимые категории кэшбэка" categories={cashbackData}/>
        <CashbackGroup title="Остальные категории кэшбэка" categories={cashbackData}/>
    </main>;
}
