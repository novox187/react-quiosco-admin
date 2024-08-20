import { useState } from "react";
import useAdmin from "../hooks/useAdmin";

export default function ImagenPreview() {
    const imgDefault = 'https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png';
    const [imgSrc, setImgSrc] = useState(imgDefault);

    const { setImagenNuevoProducto } = useAdmin();

    const imagenPreview = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setImgSrc(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0]);
            setImagenNuevoProducto(e.target.files[0])
        } else {
            setImgSrc(imgDefault);
        }

    };
    return (

        <div className='flex  justify-center  items-center space-x-2'>
            <div className="relative flex justify-center items-center">
                <label htmlFor={'imgProducto'} className="w-[50%] top-1.5 right-[25.5%] h-full rounded-full absolute hover:bg-[#dadada50] hover:text-gray-800 text-transparent flex justify-center items-center cursor-pointer transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
                <input
                    type="file"
                    name={"imgProducto"}
                    id={"imgProducto"}
                    hidden
                    onChange={imagenPreview}
                    accept=".jpeg, .png, .jpg, .gif, .webp, .svg" />

                <img
                    src={imgSrc}
                    alt="img logo"
                    className=' w-[50%] rounded' />
            </div>
        </div>

    )
}
