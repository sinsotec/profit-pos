import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {dateFormat} from './utils/helper'

import useSound from 'use-sound';

//import beepSound from '../../public/sound/beep.ogg'
import Layout from './components/Layout'
import LeftSidebar from './components/LeftSidebar'
import ClienteModal from './components/ClienteModal'
import PedidoModal from './components/PedidoModal'
import RightSidebar from './components/RightSidebar'
import ProductMode from './pages/ProductMode'
import PedidoMode from './pages/PedidoMode'



const App = () => {

    const [cartItems, setCartItems] = useState([])
    const [tasa, setTasa] = useState([])
    const [cash, setCash] = useState(0)
    const [change, setChange] = useState(0)
    const [showClienteModal, setShowClienteModal] = useState(false)
    const [showPedidoModal, setShowPedidoModal] = useState(false)
    const [showPedidoMode, setShowPedidoMode] = useState(false)
    const [showProductMode, setShowProductMode] = useState(true)
    const [cliente, setCliente] = useState('')
    const [clienteId, setClienteId] = useState('')
    const [receipt, setReceipt] = useState({})
    const [pedidos, setPedidos] = useState([])
    const [newPedido, setNewPedido] = useState(false)


    


    useEffect(() => {
        updateChange()
    }, [cash,cartItems])

    const playSound = (src) => {
        let sound = new Audio();
        sound.src = src;
        sound.play();
        sound.onended = () => sound = null;
    }

    const beep = () => {
       //useSound(beepSound);
         playSound("sound/beep-29.mp3");
    }

    const clearSound = () => {
        playSound("sound/button-21.mp3");
    }

    const getTotalPriceOM = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['priceOM'] || 0), 0
        ).toFixed(2)
    }

    const getTotalIvaOM = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['ivaOM'] || 0), 0
        ).toFixed(2)
    }

    const getTotalPedidoOM = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['total_priceOM'] || 0), 0
        ).toFixed(2)
    }

    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['price'] || 0), 0
        ).toFixed(2)
    }

    const getTotalIva = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['iva'] || 0), 0
        ).toFixed(2)
    }

    const getTotalPedido = () => {
        return cartItems.reduce(
            (total, item) => total + (item['qty']*item['total_price'] || 0), 0
        ).toFixed(2)
    }

    const addToCart = (product) => {
        console.log(product)
        const exist = cartItems.find((item) => item.cod_art === product.cod_art)
        beep();
        if(exist) {
            setCartItems(
                cartItems.map((item) =>
                    item.cod_art === product.cod_art ? { ...exist, qty: exist.qty + 1 } : item 
                )
            )
        }else{
            setCartItems([...cartItems, {...product, qty: 1}])
        }

        
    }


    const removeFromCart = (product) => {
        const exist = cartItems.find((item) => item.cod_art === product.cod_art)
        if(exist.qty === 1) {
            setCartItems(cartItems.filter((item) => item.cod_art !== product.cod_art))
            clearSound()
        }else{
            setCartItems(
                cartItems.map((item) =>
                    item.cod_art === product.cod_art ? { ...exist, qty: exist.qty - 1 } : item 
                )
            )
            beep()
        }
    }

    const updateChange = () => {
        setChange(cash-getTotalPedidoOM())
    }
    const cleanCash = () => {
        setCash(0)
        beep()
    }

    const addCash = (amount) => {
        setCash(cash+amount)
        beep()
    }

    const clearCart = () => {
        setCartItems([])
        clearSound()
    }

    const agregarCliente = () => {
        //console.log(cartItems);
        const time = new Date();
        setShowClienteModal(true)
        setCliente(/* {
            receiptNo : `ACPOS-KS-${Math.round(time.getTime() / 1000)}`,
            receiptDate : dateFormat(time)
        } */)
    }

    const submit = () => {
        //console.log(cartItems);
        const time = new Date();
        setShowPedidoModal(true)
        setReceipt({
            receiptNo : `ACPOS-KS-${Math.round(time.getTime() / 1000)}`,
            receiptDate : dateFormat(time)
        })
    }

    const clearAll = () => {
        setShowPedidoModal(false)
        setCartItems([])
        setReceipt({})
        setCliente('')
        setCash(0)
        setChange(0)
    }

    return (
        <>
            <Layout>
                <LeftSidebar 
                    setShowProductMode={setShowProductMode}
                    showProductMode={showProductMode}
                    setShowPedidoMode={setShowPedidoMode}
                    showPedidoMode={showPedidoMode} />
                <ProductMode addToCart={addToCart } setTasa={setTasa} showProductMode={showProductMode} />
                <PedidoMode 
                    showPedidoMode={showPedidoMode} 
                    setPedidos={setPedidos}
                    pedidos={pedidos}/>
                <RightSidebar
                    clearCart={clearCart}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    getTotalPrice={getTotalPrice}
                    getTotalIva={getTotalIva}
                    getTotalPedido={getTotalPedido}
                    getTotalPriceOM={getTotalPriceOM}
                    getTotalIvaOM={getTotalIvaOM}
                    getTotalPedidoOM={getTotalPedidoOM}
                    tasa={tasa}
                    cliente={cliente}
                    agregarCliente={agregarCliente}
                    submit={submit}
                />
            </Layout>
            <PedidoModal
                showPedidoModal={showPedidoModal}
                setShowPedidoModal={setShowPedidoModal}
                receipt={receipt}
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                getTotalIva={getTotalIva}
                getTotalPedido={getTotalPedido}
                getTotalPriceOM={getTotalPriceOM}
                getTotalIvaOM={getTotalIvaOM}
                getTotalPedidoOM={getTotalPedidoOM}
                cash={cash}
                change={change}
                tasa={tasa}
                clienteId={clienteId}
                clearAll={clearAll}
                setPedidos={setPedidos}
                pedidos={pedidos}
            />
            <ClienteModal
                showClienteModal={showClienteModal}
                setShowClienteModal={setShowClienteModal}
                receipt={receipt}
                cartItems={cartItems}
                getTotalPrice={getTotalPrice}
                getTotalIva={getTotalIva}
                getTotalPedido={getTotalPedido}
                getTotalPriceOM={getTotalPriceOM}
                getTotalIvaOM={getTotalIvaOM}
                getTotalPedidoOM={getTotalPedidoOM}
                cash={cash}
                change={change}
                cliente={cliente}
                setCliente={setCliente}
                setClienteId={setClienteId}
                clienteId={clienteId}
                clearAll={clearAll}
            />
            {/* agregar cliente modal */}
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)