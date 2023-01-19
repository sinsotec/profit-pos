import React, {useState, useEffect} from 'react'
import web from '../utils/web'
import {priceFormat, priceFormatOM} from '../utils/helper'
import ContentLoader from 'react-content-loader'

const PedidoMode = (props) => {
    const [search, setSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const {showPedidoMode, setPedidos, pedidos} = props

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const result = await web('/pedidos') //trycath
                setPedidos(result.data)
                //setTasa(result.data[0][0].tasa)
                setIsLoading(false)
            } catch (error) {
                alert(error);
                setIsLoading(false)
            }
        }
        fetchData()
         //setProducts(result.data)
    }, [])

   
    return (

            <>
                {showPedidoMode &&
                    <>
                    <div className="w-5/12 flex-grow flex">
                        <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                            <div className="flex px-2 flex-row relative">
                                <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Filtrar pedidos..." />
                            </div>
                                <div className="h-full overflow-hidden mt-4">
                                    <div className="h-full overflow-y-auto px-2">
                                        
                                        {/* Caso de no existir ningun producto */}
                                        { (pedidos.length === 0 && isLoading === false) &&
                                        <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                            <div className="w-full text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                                </svg>
                                                <p className="text-xl">
                                                NO HAY
                                                <br/>
                                                PRODUCTOS PARA MOSTRAR
                                                </p>
                                            </div>
                                        </div>
                                        }

                                        { (pedidos.length === 0 && isLoading === true) &&

                                        <div className="gap-4 pb-3"/* "grid grid-cols-4 gap-4 pb-1" */>
                                            <h2>Cargando articulos...</h2>
                                            {/* {   
                                                [1,2,3,4,5,6,7,8,9,10].map((item) => (
                                                    <ProductLoading key={item} className="w-full" />
                                                ))
                                            } */}
                                        </div>

                                        }

                                        {/* Si el resultado de la busqueda esta vacio */}
                                        { ( pedidos.filter((data)=>{
                                                if(search == null)
                                                    return data
                                                else if(data.doc_num.toString().toLowerCase().includes(search.toLowerCase()) || data.co_cli.toString().toLowerCase().includes(search.toLowerCase())){
                                                    return data 
                                                }
                                            }).length === 0 && search != null) &&
                                            <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                                <div className="w-full text-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                    <p className="text-xl">
                                                    RESULTADO BUSQUEDA VACIA
                                                    <br/>
                                                    "<span className="font-semibold"></span>"
                                                    </p>
                                                </div>
                                            </div>
                                        }

                                        {/* Lista con Pedidos */}
                                        
                                        <div className="gap-4 pb-3">
                                            { pedidos.filter((data)=>{
                                                    if(search == null)
                                                        return data
                                                    else if(data.doc_num.toString().toLowerCase().includes(search.toLowerCase()) || data.co_cli.toString().toLowerCase().includes(search.toLowerCase())){
                                                        return data
                                                    }
                                                }).map(pedido => (
                                                <div onClick={() => addPedidoToCart(pedido)} key={pedido.doc_num} role="button" className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg mb-1" >
                                                    {/* <div className="w-full h-72">
                                                        <img src={pedido.image} alt={pedido.doc_num} />
                                                    </div> */}
                                                    <div className="pb-3 px-3 text-sm mt-3">
                                                        <p className="flex-grow truncate mr-1">{ pedido.doc_num + `  (${pedido.co_cli})`}</p>
                                                        <p className="nowrap font-semibold">{ `Total ${priceFormatOM(pedido.total_neto_$)}  Total ${priceFormat(pedido.total_neto_bs)}` }</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PedidoMode
