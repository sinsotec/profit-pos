import React, { useState } from 'react'
import { priceFormat } from '../utils/helper';
import web from '../utils/web'

const ClienteModal = (props) => {

    const { showClienteModal, setShowClienteModal, cliente, setCliente, clienteId, setClienteId, cartItems, getTotalPedidoOM, getTotalPedido, getTotalPrice, getTotalIva, cash, change, clearAll } = props;
    const [processing, setProcessing] = useState(false)
    //const [searchId, setSearchId] = useState('')

    

    const buscarCliente = async () => {
        //setProcessing(true)
        // Store to database
        
       
        //console.log(datos);
        await web(`/client/${clienteId}`)
        .then((response) => {
            setProcessing(false)
            if(response.status === 200 /* && response.data.success === 1 */) {
               setCliente(response.data.cli_des);
                console.log(cliente);                
                //const titleBefore = document.title
                //document.title = receipt.receiptNo
                //window.print()
                //clearAll();
                setShowClienteModal(false);
                //document.title = titleBefore
            }else{
                alert('Error. Please try again');
            }
        })
        .catch((error) => {
            setProcessing(false)
            alert('Cliente no existe');
        })
    }

    const Cliente = () => {
        const buscar = (e) => {
            setClienteId(e);
            console.log(clienteId);
        }
        return (
            <div className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                    <img src="img/logo-pedacito.png" className="w-10 m-auto filter grayscale" />
                    <h2 className="text-xl font-semibold">PI DIGITAL POS</h2>
                    <p>PEDACITO DE CIELO</p>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow">
                        ID :  
                        <input id='idCliente' type="text" 
                            className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" 
                            placeholder="ID Cliente" 
                            value={clienteId}
                            autoFocus
                            onChange={(event) => buscar(event.target.value)}
                        />
                    </div>
                    <div></div>
                </div>
                <hr className="my-2" />
            </div>
        )
    }

    return (
        <>
            {showClienteModal &&
                <>
                    <div className="hide-print fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
                        <div onClick={() => setShowClienteModal(false)} className="fixed glass w-full h-screen left-0 top-0 z-0 opacity-100"></div>
                        <div className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10 opacity-100 scale-100">
                            <Cliente />
                            <div className="p-4 w-full">
                                <button 
                                    disabled={processing} 
                                    onClick={() => buscarCliente()} 
                                    className="bg-cyan-500 hover:bg-cyan-400 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"
                                >    
                                    {processing ? 'BUSCANDO..' : 'BUSCAR CLIENTE'}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="print-area">
                        <Cliente />
                    </div> */}
                </>
            }
        </>
    )
}

export default ClienteModal
