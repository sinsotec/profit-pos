import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {dateFormat} from './utils/helper'

import Layout from './components/Layout'
import LeftSidebar from './components/LeftSidebar'
import ReceiptModal from './components/ReceiptModal'
import PedidoModal from './components/PedidoModal'
import RightSidebar from './components/RightSidebar'
import ProductMode from './pages/ProductMode'


const App = () => {

    const [cartItems, setCartItems] = useState([])
    const [cash, setCash] = useState(0)
    const [change, setChange] = useState(0)
    const [showReceiptModal, setShowReceiptModal] = useState(false)
    const [receipt, setReceipt] = useState({})

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

    const addToCart = (product) => {
        const exist = cartItems.find((item) => item.cod_art === product.cod_art)
        if(exist) {
            setCartItems(
                cartItems.map((item) =>
                    item.cod_art === product.cod_art ? { ...exist, qty: exist.qty + 1 } : item 
                )
            )
        }else{
            setCartItems([...cartItems, {...product, qty: 1}])
        }

        beep();
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

    const submit = () => {
        //console.log(cartItems);
        const time = new Date();
        setShowReceiptModal(true)
        setReceipt({
            receiptNo : `ACPOS-KS-${Math.round(time.getTime() / 1000)}`,
            receiptDate : dateFormat(time)
        })
    }

    const clearAll = () => {
        setShowReceiptModal(false)
        setCartItems([])
        setReceipt({})
        setCash(0)
        setChange(0)
    }

    return (
        <>
            <Layout>
                <LeftSidebar />
                <ProductMode addToCart={addToCart} />
                <RightSidebar
                    clearCart={clearCart}
                    removeFromCart={removeFromCart}
                    addToCart={addToCart}
                    cartItems={cartItems}
                    getTotalPriceOM={getTotalPriceOM}
                    getTotalIvaOM={getTotalIvaOM}
                    getTotalPedidoOM={getTotalPedidoOM}
                    cleanCash={cleanCash}
                    addCash={addCash}
                    cash={cash}
                    change={change}
                    submit={submit}
                />
            </Layout>
            <ReceiptModal
                showReceiptModal={showReceiptModal}
                setShowReceiptModal={setShowReceiptModal}
                receipt={receipt}
                cartItems={cartItems}
                getTotalPedidoOM={getTotalPedidoOM}
                cash={cash}
                change={change}
                clearAll={clearAll}
            />
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)