import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Button({
    label,
    color = "bg-orange-100",
    textColor = "text-stone-500",
    border = "border border-transparent",
    icon = "",
    link = "",
}) {

    const pathname = usePathname();
    const isActive = pathname === link;

    return (
        <div
            className={`${isActive
                ? "bg-stone-500 text-orange-50"
                : `${color} ${textColor} border-solid-2 border-black `
                } ${border} flex items-center my-2 px-3 rounded-full`}
        >
            <Link href={link}>
                {icon}
            </Link>
        </div>
    );
}
