import HomeCardContent from "./HomeCardContent";

export default function Card({
    children,
    content,
    color,

}) {
    return (
        <div className="flex flex-col h-full overflow-y-scroll">
            {children}
        </div >
    )
}