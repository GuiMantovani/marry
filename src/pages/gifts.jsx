import { useState, useEffect } from "react";
import { FaGift } from "react-icons/fa";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

export default function Gifts() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGift, setSelectedGift] = useState(null);

    useEffect(() => {
        fetchGifts();
    }, []);

    const fetchGifts = async () => {
        try {
            const res = await fetch("/api/gifts");
            if (res.ok) {
                const data = await res.json();
                setGifts(data);
            }
        } catch (error) {
            console.error("Error fetching gifts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#efeee9]">
            <NavBar />

            <div className="flex-grow">
                <main className="pt-28 pb-32 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="text-center mb-16 bg-white/50 backdrop-blur-sm md:p-16 p-10 rounded-3xl border border-black/5">
                        <div className="flex justify-center mb-6 text-2xl text-black/40">
                            <FaGift />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6 tracking-wide uppercase">
                            Lista de <span className="italic uppercase text-black/50">Presentes</span>
                        </h1>
                        <p className="text-sm md:text-lg font-mono text-gray-600 max-w-2xl mx-auto leading-relaxed ">
                            Queridos amigos e familiares, sua presença é o nosso maior presente.
                            Se desejar nos mimar, preparamos uma lista especial com sugestões para nosso novo lar.
                        </p>
                    </div>

                    {/* Gift Grid */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 gap-4">
                            <div className="w-12 h-12 border-4 border-black/5 border-t-black/20 rounded-full animate-spin" />
                            <p className="font-mono text-xs uppercase tracking-widest opacity-40">Carregando mimos...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            {gifts.map((gift) => (
                                <ProductCard
                                    key={gift.id}
                                    gift={gift}
                                    onClick={() => setSelectedGift(gift)}
                                />
                            ))}
                        </div>
                    )}
                </main>

                <ProductModal
                    gift={selectedGift}
                    isOpen={!!selectedGift}
                    onClose={() => setSelectedGift(null)}
                />

            </div>
            <div className="fixed bottom-0 left-0 w-full z-40">
                <Footer />
            </div>
        </div>
    );
}



