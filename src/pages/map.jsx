import Footer from "@/components/Footer";
import NavBar from "@/components/navbar";

export default function Map() {
    return (
        <>
            <NavBar />
            <div className="mt-25 mb-30 p-6 md:p-10 max-w-4xl mx-auto flex flex-col gap-10">
                <div className="text-center flex flex-col gap-4">
                    <h1 className="font-serif text-4xl md:text-5xl text-black/80 uppercase tracking-widest">Local do <span className="text-black/50">Evento</span></h1>
                    <div className="w-20 h-px bg-black/20 mx-auto"></div>
                    <p className="text-sm md:text-base opacity-70 max-w-lg mx-auto leading-relaxed">
                        Preparamos tudo com muito carinho e mal podemos esperar para ver você lá.
                    </p>
                </div>

                <div className="bg-white p-2 rounded-2xl shadow-xl border border-black/5 overflow-hidden ring-8 ring-black/5">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1850.9053103205775!2d-48.358212!3d-21.5866492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b91e4afaf4c92d%3A0x94cb8eb0f34752fd!2sEventos+Fest!5e0!3m2!1spt-BR!2sbr!4v1704481000000!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-xl"
                    ></iframe>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-orange-100/50 p-8 rounded-2xl border border-black/5">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Endereço</span>
                        <h2 className="font-serif text-2xl text-black/80">Eventos Fest</h2>
                        <p className="text-sm opacity-60 leading-relaxed">
                            Rua João Cecheto, 261 - Vila Cardim<br />
                            Matão - SP, 15997-459
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <a
                            href="https://www.google.com/maps/dir//Eventos+Fest,+Av.+Trolesi,+3051+-+Jardim+Primavera,+Mat%C3%A3o+-+SP,+15990-264/@-21.5866492,-48.3568646,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white text-center py-4 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-black/80 transition-all shadow-lg hover:shadow-black/20"
                        >
                            Como Chegar
                        </a>

                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 w-full z-40">
                <Footer />
            </div>
        </>
    )
}