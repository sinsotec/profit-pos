import React, { useState } from 'react'
import { priceFormat, priceFormatOM, numberFormat } from '../utils/helper'

const RightSidebar = (props) => {
  const { cartItems,
    addToCart,
    clearCart,
    removeFromCart,
    getTotalPrice,
    getTotalIva,
    getTotalPedido,
    getTotalPriceOM,
    getTotalIvaOM,
    getTotalPedidoOM,
    tasa,
    agregarCliente,
    cliente,
    setCliente,
    submit } = props;

  return (
    <div className="w-4/12 flex-grow flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">

      
      <button onClick={() => agregarCliente()} className="flex flex-row relative">

        <div className="absolute left-3 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 16 16" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <input type="text" className="rounded-3xl text-lg full w-full h-16 py-4 pl-16 cursor-pointer shadow transition-shadow hover:shadow-2xl" readOnly="readonly" placeholder={cliente} />
      </button>


      


      {/* <div className="flex flex-row justify-around items-center w-full bg-cyan-500 rounded-3xl h-16 py-4">
        <div>
        <button onClick={() => cliente()} className="flex items-center focus:outline-none">
          <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 16 16" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
            </span>
        </button>
          <a href="#"
            className="flex items-center">
            
          </a>
        </div>
        <div>
          <a href="#"
            className="flex items-center">
            <span className="flex items-center justify-center h-12 w-12 rounded-2xl bg-cyan-300 shadow-lg text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </span>
          </a>
        </div>
        <div>
          <a href="#"
            className="flex items-center">
            <span className="flex items-center justify-center text-cyan-100 hover:bg-cyan-400 h-12 w-12 rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </span>
          </a>
        </div>
        
      </div> */}



      {/* <div className="flex flex-row relative">
        <div className="bg-cyan-500 rounded-3xl shadow text-lg full w-full h-16 py-4 px-4 transition-shadow">
        <a href="#"
                        >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex items-center justify-center h-12 w-12 rounded-2xl bg-cyan-300 shadow-lg text-whit" fill="none" viewBox="0 0 16 16" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            
                        </svg>
                        
                        </a>
          <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
            
            
          </div>
          
           <div className="flex mb-1 text-lg font-semibold text-blue-gray-700">
                        </div> 
        </div>
      </div> */}

      <div className="bg-white rounded-3xl flex flex-col h-full shadow  mt-4 overflow-auto">

        {cartItems.length === 0 ?

          <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>
              CESTA VACIA!
            </p>
          </div>

          :

          <div className="flex-1 flex flex-col overflow-auto">
            <div className="h-16 text-center flex justify-center">
              <div className="pl-8 text-left text-lg py-4 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                  {cartItems.reduce((a, b) => a + (b['qty'] || 0), 0)}
                </div>
              </div>
              <div className="flex-grow px-8 text-right text-lg py-4 relative">
                <button onClick={clearCart} className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 w-full px-4 overflow-auto">
              {cartItems.map(item => (
                <div key={item.cod_art} className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                  {/* <img src={item.image} alt="" className="rounded-lg h-10 w-10 bg-white shadow mr-2" /> */}
                  <div className="flex-grow">
                    <h5 className="text-sm">{item.art_des}</h5>
                    <span className="text-xs">{"Precio " + priceFormat(item.price)}</span>
                    <span className="ml-1 text-xs">{'IVA ' + priceFormat(item.iva)}</span>
                    <span className="ml-1 text-xs">{'Total ' + priceFormat(item.total_price)}</span>
                    <span className="ml-1 text-xs">  /  </span>
                    <span className="text-xs">{"Ref " + priceFormatOM(item.priceOM)}</span>
                    <span className="ml-1 text-xs">{'Ref IVA ' + priceFormatOM(item.ivaOM)}</span>
                    <span className="ml-1 text-xs">{'Ref Total ' + priceFormatOM(item.total_priceOM)}</span>
                  </div>
                  <div className="py-1">
                    <div className="w-28 grid grid-cols-3 gap-2 ml-2">
                      <button onClick={() => removeFromCart(item)} className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                      <input readOnly onChange={() => item.qty} value={item.qty} type="text" className="bg-white rounded-lg text-center shadow focus:outline-none focus:shadow-lg text-sm" />
                      <button onClick={() => addToCart(item)} className="rounded-lg text-center py-1 text-white bg-blue-gray-600 hover:bg-blue-gray-700 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-3 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        }
        <div className='flex'>
          <div className="select-none h-auto w-full text-center py-1 px-4">
            <div className="flex text-lg font-semibold text-blue-gray-700">
              <p>Tasa BCV</p>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              <p>{priceFormat(tasa)}</p>
            </div>

          </div>
          <div className="select-none h-auto w-full text-center py-1 px-4">
            <div className="flex text-lg font-semibold text-blue-gray-700">
              <p>BASE</p>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              <p>IVA</p>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              <p>TOTAL</p>
            </div>
          </div>
          <div className="select-none h-auto w-full text-center py-1 px-4">
            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <p>BASE</p> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalPrice())
                }
              </div>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <div>IVA</div> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalIva())
                }
              </div>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <div>TOTAL</div> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalPedido())
                }
              </div>
            </div>
          </div>
          <div className="select-none h-auto w-full text-center py-1 px-4">
            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <div>BASE</div> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormatOM(0)
                  : priceFormatOM(getTotalPriceOM())
                }
              </div>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <div>IVA</div> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormatOM(0)
                  : priceFormatOM(getTotalIvaOM())
                }
              </div>
            </div>

            <div className="flex text-lg font-semibold text-blue-gray-700">
              {/* <div>TOTAL</div> */}
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormatOM(0)
                  : priceFormatOM(getTotalPedidoOM())
                }
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => submit()} disabled={cartItems.length <= 0} className={"text-white rounded-2xl text-lg w-full py-3 focus:outline-none " + (cartItems.length > 0 ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-gray-200")}>
          EMITIR
        </button>
      </div>
    </div>
  )
}

export default RightSidebar
