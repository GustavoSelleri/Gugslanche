import Header from '../Header'
import Order from '../Order'
import Menu from '../Menu'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

const categorias = ["Lanches", "Porcoes", "Sobremesas", "Bebidas", "Sale"]

export default function Home() {

    const [selectedItem, setSelectedItem] = useState(0)
    const [products, setProducts] = useState([])
    const [produtosPedido, setProdutosPedido] = useState([])

    useEffect(async () => {
      const pedidos = localStorage.getItem('pedidos')
      if (pedidos) {
        const pedidosJSON = JSON.parse(pedidos)
        setProdutosPedido(pedidosJSON)
      }
      await getProducts()
    }, [selectedItem])

    const getProducts = async () => {
      let res;
      if (categorias[selectedItem] !== "Sale") {
        res = await fetch(`http://localhost:1337/products?categoria=${categorias[selectedItem]}`)
      } else {
        res = await fetch(`http://localhost:1337/products?sale=true`)
      }

      const products = await res.json()
      setProducts(products)
    }


    return (
      <div className={styles.mainPage}>
          <Header
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}/>
          <Menu products={ products } setProdutosPedido={setProdutosPedido} produtosPedido={produtosPedido}/>
          <Order pedidos={produtosPedido} setProdutosPedido={setProdutosPedido}/>
      </div>
    )
  }    
