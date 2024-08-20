import { Button } from "@nextui-org/react"


export default function BotonCarga({loading,texto}) {
    return (
        <Button
            type="submit"
            className='bg-cuarto text-tercero w-full mt-5 p-5 uppercase font-bold cursor-pointer'
            isDisabled={loading}
        >
            {loading ? (
                <svg className="mr-3 h-7 w-7 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className=" text-white opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : 
                texto
            }
        </Button>
    )
}
