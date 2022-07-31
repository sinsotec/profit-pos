import React, {useState, useEffect} from 'react'
import web from '../utils/web'
import {priceFormat} from '../utils/helper'
import ContentLoader from 'react-content-loader'

const ProductMode = (props) => {
    const [products, setProducts] = useState([]);
    const [tasa, setTasa] = useState([]);
    const [search, setSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { addToCart } = props

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await web('/products')
            setProducts(result.data[1])
            setTasa(result.data[0].tasa)
            setIsLoading(false)
        }
        fetchData()
         //setProducts(result.data)
    }, [])

    const ProductLoading = props => (
        <ContentLoader
        //   width={450}
          height={300}
        //   viewBox=""
          backgroundColor="#ffffff"
          foregroundColor="#f0f0f0"
          {...props}
        >
          <rect x="0" y="235" rx="4" ry="4" width="100" height="9" />
          <rect x="160" y="235" rx="3" ry="3" width="100" height="9" />
          <rect x="0" y="10" rx="10" ry="10" width="300" height="217" />
        </ContentLoader>
      )

    return (
        <div className="w-5/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <div className="flex px-2 flex-row relative">
                    <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Filtrar menu ..." />
                </div>
                    <div className="h-full overflow-hidden mt-4">
                        <div className="h-full overflow-y-auto px-2">
                            
                            {/* Caso de no existir ningun producto */}
                            { (products.length === 0 && isLoading === false) &&
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

                            { (products.length === 0 && isLoading === true) &&

                            <div className="grid grid-cols-4 gap-4 pb-1">
                                {
                                    [1,2,3,4,5,6,7,8,9,10,11,12].map((item) => (
                                        <ProductLoading key={item} className="w-full" />
                                    ))
                                }
                            </div>

                            }

                            {/* Si el resultado de la busqueda esta vacio */}
                            { ( products.filter((data)=>{
                                    if(search == null)
                                        return data
                                    else if(data.art_des.toString().toLowerCase().includes(search.toLowerCase()) || data.cod_art.toString().toLowerCase().includes(search.toLowerCase())){
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

                            {/* Lista con productos */}
                            
                            <div className="gap-4 pb-3">
                                { products.filter((data)=>{
                                        if(search == null)
                                            return data
                                        else if(data.art_des.toString().toLowerCase().includes(search.toLowerCase()) || data.cod_art.toString().toLowerCase().includes(search.toLowerCase())){
                                            return data
                                        }
                                    }).map(item => (
                                    <div onClick={() => addToCart(item)} key={item.cod_art} role="button" className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg mb-1" >
                                        {/* <div className="w-full h-72">
                                            <img src={item.image} alt={item.art_des} />
                                        </div> */}
                                        <div className="pb-3 px-3 text-sm mt-3">
                                            <p className="flex-grow truncate mr-1">{ item.art_des + `  (${item.cod_art})`}</p>
                                            <p className="nowrap font-semibold">{ `${priceFormat(item.priceOM)} IVA ${priceFormat(item.ivaOM)} PVP ${priceFormat(item.total_priceOM)}` }</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMode
