import CashbackGroups from "@/app/CashbackGroups";

export default async function Home() {
    const response = await fetch(`${process.env.HOST}/api/cashback`);
    const cashbackData = await response.json();

    return <main className="px-3 py-4">
        <CashbackGroups cashbackData={cashbackData}/>
    </main>;
}
