import Image from "next/image"
import image2 from "../assets/images/image2.jpg"
export default function Hero() {
    return (
        <Image
            src={image2}
            alt="Hero Image"
            width={700}
            height={700}
        />
    )
}