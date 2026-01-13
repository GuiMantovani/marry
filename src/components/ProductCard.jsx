export default function ProductCard({ gift, onClick }) {
    if (!gift) return null;

    const { name, price, image, isSoldOut } = gift;
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(price || 0);

    return (
        <div
            onClick={onClick}
            className={`cursor-pointer relative group bg-white overflow-hidden hover:shadow-xl transition-all duration-300 border ${isSoldOut ? 'opacity-75 grayscale' : 'border-gray-100 hover:border-amber-200'}`}
        >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden bg-gray-50 p-4">
                <img
                    src={image}
                    alt={name}
                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-800 px-6 py-2 rounded-full text-xs font-mono font-bold tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg uppercase">
                        Ver detalhes
                    </span>
                </div>
                {isSoldOut && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="bg-orange-50 text-gray-800 border border-amber-400 px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest shadow-sm transform -rotate-12">
                            Esgotado
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 text-center">
                <h3 className="text-xl font-serif text-gray-900 mb-2 truncate group-hover:text-amber-600 transition-colors">
                    {name}
                </h3>
                <div className="flex flex-col items-center gap-4 mt-4">
                    <span className="text-lg font-mono font-bold text-gray-700 bg-orange-50 px-3 py-1 rounded">
                        {formattedPrice !== "R$ 0,00" ? formattedPrice : "Consulte"}
                    </span>
                    {!isSoldOut ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                            className="bg-orange-100 font-mono text-xs px-8 py-3  hover:bg-orange-200 transition-all transform active:scale-95 shadow-sm hover:shadow-md tracking-widest uppercase font-bold"
                        >
                            Presentear
                        </button>
                    ) : (
                        <button
                            disabled
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-100 border border-gray-200 text-gray-400 font-mono text-xs px-8 py-3 rounded-full cursor-not-allowed tracking-widest uppercase"
                        >
                            Indisponível
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
