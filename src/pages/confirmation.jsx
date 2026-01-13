import NavBar from "@/components/navbar"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

export default function Confirmation() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        guestCount: 0,
        companionNames: [],
        message: ""
    });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    // Update companionNames array when guestCount changes
    useEffect(() => {
        setFormData(prev => {
            const currentCount = parseInt(prev.guestCount) || 0;
            const names = [...prev.companionNames];

            if (names.length < currentCount) {
                // Add empty strings for new companions
                for (let i = names.length; i < currentCount; i++) {
                    names.push("");
                }
            } else if (names.length > currentCount) {
                // Remove extra names
                names.splice(currentCount);
            }

            return { ...prev, companionNames: names };
        });
    }, [formData.guestCount]);

    const handleCompanionNameChange = (index, value) => {
        const newNames = [...formData.companionNames];
        newNames[index] = value;
        setFormData({ ...formData, companionNames: newNames });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/rsvp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    confirmed: true
                }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", guestCount: 0, companionNames: [], message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="mt-25 mb-30 p-10 bg-orange-100 w-95 max-w-2xl mx-auto flex flex-col justify-center gap-8 rounded-lg shadow-sm" >
                <div className="flex flex-col gap-2">
                    <h1 className="font-serif text-3xl">CONFIRME SUA <br /> <span className="text-black/70">PRESENÇA</span></h1>
                    <p className="text-sm opacity-80">Pedimos a gentileza de confirmar sua presença até o dia 10 de Fevereiro de 2026.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-black/10 py-6">
                    <div className="flex flex-col gap-1">
                        <p className="font-thin text-xs uppercase tracking-widest text-black/50">Data</p>
                        <p className="font-medium">21 . Fev . 2026</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-thin text-xs uppercase tracking-widest text-black/50">Hora</p>
                        <p className="font-medium">13:00</p >
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-thin text-xs uppercase tracking-widest text-black/50">Local </p>
                        <p className="font-medium text-sm">Eventos Fest</p>
                    </div>
                </div>

                {status === "success" ? (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-md text-center">
                        <h2 className="text-green-800 font-serif text-xl mb-2">Presença Confirmada!</h2>
                        <p className="text-green-700 text-sm">Ficamos muito felizes que você virá celebrar conosco.</p>
                        <button
                            onClick={() => router.push("/")}
                            className="mt-4 text-xs underline uppercase tracking-widest text-green-800 hover:text-green-600"
                        >
                            Voltar
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs uppercase tracking-widest font-light">Nome Completo</label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors"
                                placeholder="Como está no convite"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="guestCount" className="text-xs uppercase tracking-widest font-light">Acompanhantes</label>
                            <input
                                id="guestCount"
                                type="number"
                                min="0"
                                max="10"
                                value={formData.guestCount}
                                onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) || 0 })}
                                className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors"
                                placeholder="0"
                            />
                        </div>

                        {formData.companionNames.length > 0 && (
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Nomes dos Acompanhantes</p>
                                {formData.companionNames.map((name, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <label htmlFor={`companion-${index}`} className="text-[10px] uppercase tracking-tighter font-light opacity-60">Acompanhante {index + 1}</label>
                                        <input
                                            id={`companion-${index}`}
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => handleCompanionNameChange(index, e.target.value)}
                                            className="bg-transparent border-b border-black/20 py-1 focus:border-black outline-none transition-colors text-sm"
                                            placeholder={`Nome do acompanhante ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-widest font-light">Mensagem (Opcional)</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors resize-none"
                                rows="3"
                                placeholder="Deixe um recado para os noivos..."
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-red-500 text-xs">Ocorreu um erro ao confirmar sua presença. Tente novamente.</p>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-black text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black/80 transition-all disabled:bg-black/50"
                        >
                            {status === "loading" ? "ENVIANDO..." : "CONFIRMAR PRESENÇA"}
                        </button>
                    </form>
                )}
            </div >
            <div className="fixed bottom-0 left-0 w-full z-40">
                <Footer />
            </div>
        </div>
    )
}
