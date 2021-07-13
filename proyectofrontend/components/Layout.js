import React, { useEffect } from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useRouter } from 'next/router';

const Layout = ({children}) => {

    const router = useRouter();

    return ( 
        <>
            <Head>
                <title>Sistema de Administracion de ventas</title>
            </Head>

            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    <div>
                        {children}
                    </div>
                    
                </div>
            ) : (
                <div className=" min-h-screen">
                    <div className="sm:flex min-h-screen">
                        <Sidebar />
                        

                        <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen">
                            <Header />
                            <div className="p-5">
                            {children}
                            </div>
                        </main>
                        
                    </div>
                </div>
            )}
        </>
     );
}
 
export default Layout;