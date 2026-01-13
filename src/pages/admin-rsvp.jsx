import NavBar from "@/components/navbar"
import { useEffect, useState } from "react";

export default function AdminRSVP() {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchGuests();
    }, []);

    const fetchGuests = async () => {
        try {
            const res = await fetch("/api/rsvp");
            if (res.ok) {
                const data = await res.json();
                setGuests(data);
            }
        } catch (error) {
            console.error("Error fetching guests:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredGuests = guests.filter(guest =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalGuests = guests.reduce((acc, guest) => acc + 1 + (guest.guestCount || 0), 0);
    const confirmedCount = guests.length;

    return (
        <>
            <NavBar />
            <div className="mt-25 p-6 md:p-10 max-w-6xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="font-serif text-4xl mb-2 text-black/80">Painel de <span className="text-black/50">Convidados</span></h1>
                        <p className="text-sm opacity-60">Gerencie as confirmações de presença do seu casamento.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-black/5 flex flex-col items-center min-w-[120px]">
                            <span className="text-2xl font-bold">{confirmedCount}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-50 font-medium">Confirmações</span>
                        </div>
                        <div className="bg-black text-white p-4 rounded-lg shadow-sm flex flex-col items-center min-w-[120px]">
                            <span className="text-2xl font-bold">{totalGuests}</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-50 font-medium text-white/70">Total de Pessoas</span>
                        </div>
                    </div>
                </header>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Buscar convidado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-80 bg-white border border-black/10 rounded-full px-6 py-3 text-sm outline-none focus:border-black transition-colors"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center">
                            <p className="text-sm opacity-50 animate-pulse">Carregando lista...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/[0.02] border-b border-black/5">
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Nome</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Presença</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Acompanhantes</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40">Mensagem</th>
                                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold opacity-40 text-right">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredGuests.length > 0 ? (
                                        filteredGuests.map((guest) => (
                                            <tr key={guest.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                                                <td className="p-4 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-sm">{guest.name}</span>
                                                        {guest.companionNames && guest.companionNames.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {guest.companionNames.map((cName, idx) => (
                                                                    <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-black/5 rounded text-black/50">
                                                                        {cName}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter ${guest.confirmed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {guest.confirmed ? 'Confirmado' : 'Ausente'}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm tabular-nums text-black/60">{guest.guestCount || 0}</td>
                                                <td className="p-4 text-sm max-w-xs truncate italic text-black/50" title={guest.message}>
                                                    {guest.message || '-'}
                                                </td>
                                                <td className="p-4 text-xs text-black/40 text-right tabular-nums">
                                                    {guest.date ? new Date(guest.date).toLocaleDateString('pt-BR') : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-20 text-center text-sm opacity-40">
                                                Nenhum convidado encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
