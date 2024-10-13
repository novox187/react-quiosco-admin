import React, { useEffect, useRef, useState } from 'react';

const ImageUploader = ({ onImageChange, imgSrcDB }) => {
    const imgProductoRef = useRef(null);
    const [imgSrc, setImgSrc] = useState('https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png');
    const [errorImg, setErrorImg] = useState(false);

    useEffect(() => {
        setImgSrc(imgSrcDB)
    }, [imgSrcDB])

    const formatoNombreImg = (nombre) => {
        const extension = nombre.split('.').pop().toLowerCase();
        return extension;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        previewImage(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        previewImage(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto para permitir el drop
    };


    const previewImage = (file) => {
        if (file) {
            const extension = formatoNombreImg(file.name);
            if (['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(extension)) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    setImgSrc(e.target.result);
                    onImageChange(file); // Llama a la función de cambio de imagen
                };
                reader.readAsDataURL(file);
                setErrorImg(false);
            } else {
                setErrorImg(true);
                setImgSrc('https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png'); // Imagen por defecto
            }
        } else {
            setImgSrc('https://res.cloudinary.com/dfrsffngq/image/upload/v1716986479/ddbooeqvr4fg7md8pz7f.png'); // Imagen por defecto
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <div
                className="relative p-4 cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <label
                    htmlFor={'imgProducto'}
                    className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </label>
                <input
                    type="file"
                    name={"imgProducto"}
                    id={"imgProducto"}
                    hidden
                    accept=".jpeg, .png, .webp, .svg"
                    ref={imgProductoRef}
                    onChange={handleFileChange}
                />
                <img
                    src={imgSrc}
                    alt="img logo"
                    className='w-[15rem] h-[15rem] xl:w-[20rem] xl:h-[20rem] rounded-full object-cover'
                />
            </div>
            {errorImg && <p className="text-red-500">Formato de imagen no válido. Por favor, selecciona una imagen válida.</p>}
            <span className='opacity-40 text-sm'>logo de tu negocio</span>
        </div>
    );
};

export default ImageUploader;