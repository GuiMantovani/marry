import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { FaPlus, FaPencilAlt, FaTrash, FaTimes, FaSave, FaGift } from "react-icons/fa";

export default function AdminGifts() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGift, setEditingGift] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        storeLink: "",
        image: "",
        isSoldOut: false
    });

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

    const handleOpenModal = (gift = null) => {
        if (gift) {
            setEditingGift(gift);
            setFormData({ ...gift });
        } else {
            setEditingGift(null);
            setFormData({
                name: "",
                price: "",
                description: "",
                storeLink: "",
                image: "",
                isSoldOut: false
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingGift ? "PUT" : "POST";

        try {
            const res = await fetch("/api/gifts", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price)
                })
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchGifts();
            }
        } catch (error) {
            console.error("Error saving gift:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este presente?")) return;

        try {
            const res = await fetch(`/api/gifts?id=${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                fetchGifts();
            }
        } catch (error) {
            console.error("Error deleting gift:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#efeee9]">
            <NavBar />

            <main className="flex-grow pt-28 pb-32 px-4 md:px-10 max-w-7xl mx-auto w-full">
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="font-serif text-4xl text-black/80 flex items-center gap-3">
                            <FaGift className="text-black/40" /> Gerenciar <span className="text-black/50">Presentes</span>
                        </h1>
                        <p className="text-sm opacity-60">Adicione, edite ou remova produtos da sua lista de presentes.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2 uppercase tracking-widest text-xs font-bold hover:bg-black/80 transition-all shadow-lg"
                    >
                        <FaPlus /> Novo Presente
                    </button>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center animate-pulse opacity-50">Carregando presentes...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/[0.02] border-b border-black/5">
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Imagem</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Nome / Descrição</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Preço</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Status</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40 text-right">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {gifts.map((gift) => (
                                        <tr key={gift.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                                            <td className="p-4 w-24">
                                                <img src={gift.image} alt={gift.name} className="w-16 h-16 object-cover rounded-lg border border-black/5 bg-gray-50" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium text-black/80">{gift.name}</span>
                                                    <span className="text-[10px] opacity-40 line-clamp-1">{gift.description}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-mono text-sm">
                                                R$ {gift.price.toFixed(2).replace('.', ',')}
                                            </td>
                                            <td className="p-4">
                                                <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter ${gift.isSoldOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                    {gift.isSoldOut ? 'Indisponível' : 'Disponível'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleOpenModal(gift)}
                                                        className="p-3 bg-black/5 hover:bg-black hover:text-white rounded-lg transition-all"
                                                        title="Editar"
                                                    >
                                                        <FaPencilAlt size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(gift.id)}
                                                        className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                                                        title="Excluir"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#efeee9] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center p-6 border-b border-black/5 bg-white">
                            <h2 className="font-serif text-2xl text-black/80">
                                {editingGift ? "Editar Presente" : "Novo Presente"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-all">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Nome do Produto</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                                        placeholder="Ex: Cafeteira Italiana"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Preço (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                                        placeholder="0,00"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">URL da Imagem</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Link da Loja</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.storeLink}
                                    onChange={(e) => setFormData({ ...formData, storeLink: e.target.value })}
                                    className="bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors"
                                    placeholder="https://amazon.com.br/..."
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Descrição</label>
                                <textarea
                                    rows="3"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-white border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors resize-none"
                                    placeholder="Uma breve descrição do produto..."
                                />
                            </div>

                            <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-black/10">
                                <input
                                    type="checkbox"
                                    id="isSoldOut"
                                    checked={formData.isSoldOut}
                                    onChange={(e) => setFormData({ ...formData, isSoldOut: e.target.checked })}
                                    className="w-5 h-5 accent-black"
                                />
                                <label htmlFor="isSoldOut" className="text-sm font-medium text-black/70 cursor-pointer">Marcar como indisponível</label>
                            </div>

                            <button
                                type="submit"
                                className="bg-black text-white py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black/80 transition-all shadow-xl mt-4"
                            >
                                <FaSave /> {editingGift ? "Salvar Alterações" : "Adicionar Presente"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="fixed bottom-0 left-0 w-full z-40">
                <Footer />
            </div>
        </div>
    );
}
