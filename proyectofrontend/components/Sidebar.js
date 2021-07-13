import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Sidebar = () => {

    const router = useRouter();


    return ( 
        <aside className="bg-gris sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5" >
            <div>
                <p className="text-gray-600 text-2xl font-black">Administracion de Ventas</p>
            </div>

            <nav className="mt-5 list-none">
                <li className={router.pathname === "/" ? "bg-verde text-white p-2" : "text-gray-600 p-2"}>
                    <Link href="/">
                        <a className="block">
                            Clientes
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/pedidos" ? "bg-verde text-white p-2" : " text-gray-600 p-2"}>
                    <Link href="/pedidos">
                        <a className=" block">
                            Pedidos
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/productos" ? "bg-verde text-white p-2" : "text-gray-600 p-2"}>
                    <Link href="/productos">
                        <a className="block">
                            Productos
                        </a>
                    </Link>
                </li>
            </nav>

            <div className="sm:mt-10">
                <p className="text-gray-600 text-2xl font-black">Reportes</p>
            </div>
            <nav className="mt-5 list-none">
                <li className={router.pathname === "/mejoresvendedores" ? "bg-verde text-white p-2" : "text-gray-600 p-2"}>
                    <Link href="/mejoresvendedores">
                        <a className="block">
                            Mejores Vendedores
                        </a>
                    </Link>
                </li>
                <li className={router.pathname === "/mejoresclientes" ? "bg-verde text-white p-2" : "text-gray-600 p-2"}>
                    <Link href="/mejoresclientes">
                        <a className="block">
                            Mejores Clientes
                        </a>
                    </Link>
                </li>
            </nav>

        </aside>
     );
}
 
export default Sidebar;