import { useState } from "react";
import { X, ExternalLink, QrCode, Copy, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { payload } from "pix-payload";

export default function ProductModal({ gift, isOpen, onClose }) {
    const [view, setView] = useState("details"); // details, choose, pix
    const [copied, setCopied] = useState(false);

    if (!isOpen || !gift) return null;

    const { name, price, image, description, isSoldOut, storeLink } = gift;
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price || 0);

    const pixKey = "guimtvn@gmail.com";
    const pixPayload = payload({
        key: pixKey,
        name: "Guilherme Isadora",
        city: "SAO PAULO",
        amount: price || 0,
        transactionId: "***"
    });

    const handleCopyPix = async () => {
        try {
            await navigator.clipboard.writeText(pixPayload);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Erro ao copiar PIX:', err);
            alert('Não foi possível copiar o código PIX');
        }
    };

    const handleClose = () => {
        setView("details");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row relative transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-600 hover:text-gray-900 shadow-md transition-all active:scale-90"
                >
                    <X size={24} />
                </button>

                {/* Left: Image Section */}
                <div className="md:w-1/2 h-64 md:h-[500px] relative overflow-hidden bg-gray-50 border-r border-gray-100 p-8">
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full object-contain ${isSoldOut ? 'grayscale' : ''}`}
                    />
                </div>

                {/* Right: Content Section */}
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between bg-white overflow-y-auto max-h-[90vh] md:max-h-full">
                    {view === "details" && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-3xl font-serif text-gray-900 mb-2">
                                {name}
                            </h2>
                            <span className="text-xl font-mono font-bold text-amber-600 bg-orange-50 px-4 py-1 rounded inline-block mb-6">
                                {formattedPrice}
                            </span>
                            <div className="h-px bg-orange-100 mb-6 w-full" />
                            <p className="text-gray-600 font-mono text-sm leading-relaxed mb-8">
                                {description || "Um presente especial para nosso novo lar."}
                            </p>

                            {!isSoldOut ? (
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => setView("choose")}
                                        className="w-3/4 bg-orange-100 font-mono text-xs px-8 py-4 hover:bg-orange-200 transition-all transform active:scale-95 shadow-sm hover:shadow-md tracking-widest uppercase font-bold"
                                    >
                                        Presentear agora
                                    </button>
                                </div>
                            ) : (
                                <button disabled className="w-full bg-gray-100 border border-gray-200 text-gray-400 font-mono text-xs px-8 py-4 rounded-full cursor-not-allowed tracking-widest uppercase">
                                    Item indisponível
                                </button>
                            )}
                        </div>
                    )}

                    {view === "choose" && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-2xl font-serif text-gray-900 mb-6">
                                Como deseja presentear?
                            </h2>
                            <div className="flex flex-col gap-4">
                                <a
                                    href={storeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-6 rounded-2xl border-2 border-orange-100 hover:border-amber-400 hover:bg-orange-50 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-xl transition-colors group-hover:bg-orange-200">
                                            <ExternalLink className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Comprar na Loja</p>
                                            <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Site oficial do produto</p>
                                        </div>
                                    </div>
                                </a>

                                {/* <button
                                    onClick={() => setView("pix")}
                                    className="flex items-center justify-between p-6 rounded-2xl border-2 border-orange-100 hover:border-amber-400 hover:bg-orange-50 transition-all group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-xl transition-colors group-hover:bg-orange-200">
                                            <QrCode className="text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Fazer um PIX</p>
                                            <p className="text-xs text-gray-500 font-mono uppercase tracking-tighter">Rápido e direto</p>
                                        </div>
                                    </div>
                                </button> */}

                                <button
                                    onClick={() => setView("details")}
                                    className="mt-4 text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-gray-600 text-center"
                                >
                                    Voltar aos detalhes
                                </button>
                            </div>
                        </div>
                    )}

                    {view === "pix" && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                            <h2 className="text-2xl font-serif text-gray-900 mb-2">
                                Pagamento via PIX
                            </h2>
                            <p className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-widest">
                                Valor: <span className="font-bold text-gray-900">{formattedPrice}</span>
                            </p>

                            <div className="bg-white p-4 rounded-2xl border-2 border-orange-100 inline-block mb-6 shadow-inner">
                                <QRCodeSVG value={pixPayload} size={180} />
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleCopyPix}
                                    className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-orange-50 border border-amber-200 hover:bg-orange-100 transition-all font-mono text-xs font-bold uppercase tracking-widest"
                                >
                                    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    {copied ? "Chave Copiada!" : "Copiar Chave PIX"}
                                </button>

                                <button
                                    onClick={() => setView("choose")}
                                    className="text-[10px] font-mono uppercase tracking-widest text-gray-400 hover:text-gray-600"
                                >
                                    Voltar às opções
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 border-t border-gray-50 pt-4">
                        <p className="text-[10px] text-gray-300 text-center uppercase tracking-[0.3em] font-mono">
                            Guilherme & Isadora
                        </p>
                    </div>
                </div>
            </div>

            {/* Backdrop Click Area */}
            <div className="absolute inset-0 -z-10" onClick={handleClose} />
        </div>
    );
}
