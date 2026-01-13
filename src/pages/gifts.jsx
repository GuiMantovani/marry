import { useState } from "react";
import { FaGift } from "react-icons/fa";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import giftsData from "@/data/gifts.json";

export default function Gifts() {
    const [selectedGift, setSelectedGift] = useState(null);

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

            <div>
                <main className="flex-grow pt-28 pb-32 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto w-full">
                    {/* Header Section */}
                    <div className="text-center mb-16 bg-orange-50 md:p-16 p-10">
                        <div className="flex justify-center mb-6 text-2xl">
                            <FaGift />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-serif text-gray-900 mb-6 tracking-wide uppercase">
                            Lista de <span className="italic uppercase">Presentes</span>
                        </h1>
                        <p className="text-sm md:text-lg font-mono text-gray-700 max-w-2xl mx-auto leading-relaxed ">
                            Queridos amigos e familiares, sua presença é o nosso maior presente.
                            Se desejar nos mimar, preparamos uma lista especial com sugestões para nosso novo lar.
                        </p>
                    </div>

                    {/* Gift Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {giftsData.map((gift) => (
                            <ProductCard
                                key={gift.id}
                                gift={gift}
                                onClick={() => setSelectedGift(gift)}
                            />
                        ))}
                    </div>
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


