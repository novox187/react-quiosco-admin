import { Button, Image, Input } from '@nextui-org/react'

export default function Configuracion() {
    return (
        <div>
            <div className='mt-10 w-[60rem] m-auto space-y-16'>
                <h1 className='text-4xl font-black'>Informacion</h1>
                <form action="" method="post" className='space-y-10'>

                    <div className='flex flex-col justify-center items-center'>
                        <div className="relative">
                            <label
                                htmlFor={'imgProducto'}
                                className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                name={"imgProducto"}
                                id={"imgProducto"}
                                hidden
                                accept=".jpeg, .png, .webp, .svg"
                            />
                            <img
                                src={'https://res.cloudinary.com/dfrsffngq/image/upload/v1723837093/logo.png'}
                                alt="img logo"
                                className='w-[20rem] h-[20rem] rounded-full object-cover' // Ajusta el tamaño según tus necesidades
                            />
                        </div>
                            <span className=' opacity-40 text-sm '>logo de tu negocio</span>
                    </div>

                    <Input
                        label="Nombre del negocio" name="nombre"
                        placeholder="Nombre del negocio"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='Es el nombre de tu negocioa, tu marca o tu empresa en general' />

                    <Input
                        label="Eslogan del negocio"
                        name="eslogan" placeholder="Eslogan del negocio"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='Es el eslogan de tu negocio, tu marca o tu empresa en general' />

                    <Input
                        label="Direccion"
                        name="direccion"
                        placeholder="Direccion"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='Direccion de tu negocio, en donde pueden ser ubicados tus productos' />

                    <Input
                        label="Telefono"
                        name="telefono"
                        placeholder="Telefono"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='Telefono de tu negocio, en donde pueden ser contactados con tus clientes' />

                    <Input
                        label="Email"
                        name="email"
                        placeholder="Email"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='Email de tu negocio, en donde pueden ser contactados con tus clientes' />

                    <Input
                        label="RUC"
                        name="ruc"
                        placeholder="RUC"
                        className="w-full"
                        color='default'
                        variant='faded'
                        labelPlacement='outside'
                        description='RUC de tu negocio' />

                    <Button
                        type="submit"
                        className="w-full bg-zinc-700 ml-2 py-2 md:py-2.5 rounded-xl text-white px-2 md:px-3">
                        Guardar
                    </Button>
                </form>
            </div>
        </div>
    )
}
