import React, { useState } from 'react'
import {priceFormat, numberFormat} from '../utils/helper'

const RightSidebar = (props) => {
    const { cartItems, addToCart, clearCart, removeFromCart, getTotalPriceOM, getTotalIvaOM, getTotalPedidoOM, cleanCash, addCash, cash, change, submit, tasa } = props;
    const moneys = [1, 5, 10, 20, 50, 100]
    
    return (
      <div className="w-4/12 flex-grow flex flex-col bg-blue-gray-50 h-full bg-white pr-4 pl-2 py-4">
        
        <div className="flex flex-row relative">
                    <div  className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 px-4 transition-shadow">
                      
                          <div className="flex mb-1 text-lg font-semibold text-blue-gray-700">
                          <div>TASA BCV</div>
                          <div className="text-right w-full">
                            { priceFormat(tasa) }
                            
                          </div>
                        </div>  


                    </div>  
        </div>
        
        <div className="bg-white rounded-3xl flex flex-col h-full shadow  mt-4">

          { cartItems.length === 0 ?
          
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
                <div  className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
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
              { cartItems.map(item => (
                <div key={item.cod_art} className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                  {/* <img src={item.image} alt="" className="rounded-lg h-10 w-10 bg-white shadow mr-2" /> */}
                  <div className="flex-grow">
                    <h5 className="text-sm">{ item.art_des }</h5>
                    <span className="text-xs">{ "Precio " + priceFormat(item.priceOM) }</span>
                    <span className="ml-1 text-xs">{ 'IVA ' + priceFormat(item.ivaOM) }</span>
                    <span className="ml-1 text-sm">{ 'Total ' + priceFormat(item.total_priceOM) }</span>
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

          <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
            <div className="flex mb-1 text-lg font-semibold text-blue-gray-700">
              <div>BASE</div>
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalPriceOM()) 
                }
              </div>
            </div>

            <div className="flex mb-1 text-lg font-semibold text-blue-gray-700">
              <div>IVA</div>
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalIvaOM()) 
                }
              </div>
            </div>

            <div className="flex mb-1 text-lg font-semibold text-blue-gray-700">
              <div>TOTAL</div>
              <div className="text-right w-full">
                {cartItems.length === 0
                  ? priceFormat(0)
                  : priceFormat(getTotalPedidoOM()) 
                }
              </div>
            </div>
  
            <button onClick={() => submit()} disabled={cartItems.length <= 0} className={"text-white rounded-2xl text-lg w-full py-3 focus:outline-none "+(cartItems.length > 0 ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-gray-200")}>
              EMITIR
            </button>
          </div>
        </div>
      </div>
    )
}

export default RightSidebar
