
export default function Alerta({children}) {
  return (
    <div className="w-full text-center my-2 bg-red-600 text-white text-mini md:text-base font-bold p-1 rounded md:p-3 uppercase">
        {children}
    </div>
  )
}
