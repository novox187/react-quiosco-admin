import React from 'react'
import { useAuth } from "../hooks/useAuth"
import useGeneralContext from "../hooks/useGeneralContext";
import { formatearTextoVista } from "../helpers";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, DropdownSection } from "@nextui-org/react";
import RelojIcon from './icons/RelojIcon';
import EntrarIcon from './icons/EntrarIcon';
import { Link } from 'react-router-dom';
import Conf from './icons/ConfIcon';
import ConfIcon from './icons/ConfIcon';
export default function Usuario() {

    const { setModalAuth, modalAuth, userActual } = useGeneralContext();
    const { logout, user } = useAuth({ middleware: '' });

    let email = 'usuario@guest.com'
    let nombre = 'Usuario'
    return (
        <div className="flex items-center gap-4 z-0">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <User
                        avatarProps={{
                            showFallback:true,
                            size: 'sm',
                            src: "https://res.cloudinary.com/dfrsffngq/image/upload/v1723750593/UserDefault.png",
                            
                        }}

                        className="transition-transform text-white"
                        description={
                            <p className=' text-white'>
                               { userActual.email ? userActual.email : user ? user.email : email}
                            </p>
                        }
                        name={userActual.name ? userActual.name : user ? user.name : nombre}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownSection showDivider>
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">{user?.rol ? 'Cargo' : 'Fama'}</p>
                            <p className=" text-green-400 opacity-60">{user?.rol ? user.rol : 'Persona de buen gusto'}</p>
                        </DropdownItem>
                    </DropdownSection >
                    <DropdownSection>
                        {user &&
                            (
                                <DropdownItem key="opciones" startContent={<ConfIcon className='size-5' />} className={`${!user && 'hidden'}`}>
                                    <Link to='/admin/conf'>
                                        <p className="text-white">Configuracion</p>
                                    </Link>
                                </DropdownItem>
                            )}
                        <DropdownItem
                            key="logout"
                            color={!user ? "default" : "danger"}
                            onClick={() => {
                                if (!user) {
                                    setModalAuth(!modalAuth);
                                } else {
                                    logout();
                                }
                            }}
                            startContent={
                                <EntrarIcon />
                            }
                        >
                            {!user ? (
                                'Inicia sesion'
                            ) : (
                                'Cerrar sesion'
                            )
                            }
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div >
    )
}
