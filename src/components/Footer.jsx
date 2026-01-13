import { FaHeart } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="bg-orange-50 py-5 flex flex-col items-center gap-1">
            <FaHeart />
            <h1 className="font-serif text-xl">Guilherme & Isadora</h1>
            <h1 className="text-sm">Feito com carinho para para esse dia.</h1>
        </div>
    )
}