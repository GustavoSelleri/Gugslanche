import styles from './order.module.css'
import ImageLoader from '../utils/ImageLoader';
import Image from 'next/image';
import formatarPreco from '../utils/formatarPreco';
import { useState, useEffect } from 'react';

export default function Order({pedidos, setProdutosPedido}) {

  const [totalPreco, setTotalPreco] = useState(0)

  useEffect(() => {
    let precoTotal = 0
    for(let pedido of pedidos) {
      precoTotal += (pedido.quantidade * pedido.price)
    }
    setTotalPreco(precoTotal)
  }, [pedidos])

  const incrementarQuantidadeProduto = (pedido) => {
    for (let index = 0; index < pedidos.length; index++) {
      if (pedidos[index].id === pedido.id) {
        pedidos[index].quantidade++
        setProdutosPedido([...pedidos])
        localStorage.setItem('pedidos', JSON.stringify(pedidos))
        break
      }
    }
  }

  const decrementarQuantidadeProduto = (pedido) => {
    for (let index = 0; index < pedidos.length; index++) {
      if (pedidos[index].id === pedido.id && pedido.quantidade > 1) {
        pedidos[index].quantidade--
        setProdutosPedido([...pedidos])
        localStorage.setItem('pedidos', JSON.stringify(pedidos))
        break
      }
    }
  }

  const removerProduto = (pedido) => {
    for (let index = 0; index < pedidos.length; index++) {
      if (pedidos[index].id === pedido.id) {
        pedidos.splice(index, 1)
        setProdutosPedido([...pedidos])
        localStorage.setItem('pedidos', JSON.stringify(pedidos))
        break
      }
    }
  }

  const finalizarPedido = async () => {
    const pedido = {
      price: totalPreco,
      amount: pedidos.length,
      products: pedidos
    }

    await fetch('http://localhost:1337/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    })

    setProdutosPedido([])
    localStorage.removeItem('pedidos')
  }

  return (
    <div className={styles.pedidos}>
     <h2 className={styles.pedidosTitle}>Pedidos</h2>
        <article>
          <ul className={styles.ulPedido}>
              <li className={styles.liItem}>Item</li>
              <li className={styles.liQnt}>Qtn</li>
              <li className={styles.liPreco}>Preço</li>
          </ul>
        </article>
        <div className={styles.pedidosContainer}>
          {
            pedidos.map(pedido => (
              <div key={pedido.id} className={styles.pedidosExterno}>
                <div className={styles.pedidoContainer}>   
                  <Image 
                    loader={ImageLoader}
                    width={50}
                    height={50}
                    className={styles.imageBorderRadius}
                    src={pedido.image.url}
                    alt={pedido.name}/>
                  <div className={styles.pedidoProdutoInfo}>
                    <span> {pedido.name}</span>
                    <span> {formatarPreco(pedido.price)}</span>
                  </div>
                  <div className={styles.pedidoProdutoVariavel}>
                    <span className={styles.pedidoQuantidade}>{pedido.quantidade}</span>
                    <span className={styles.pedidoPreco}> {formatarPreco(pedido.price * pedido.quantidade)}</span>
                  </div>
                </div>

                <hr className={styles.itemHorizontalLine}/>

                <div className={styles.pedidoAcoes}>
                  <div>
                    <button onClick={() => incrementarQuantidadeProduto(pedido)} className={styles.acaoIncrementar}>
                      <i className="fas fa-plus"></i>
                    </button>
                    <button onClick={() => decrementarQuantidadeProduto(pedido)} className={styles.acaoDecrementar}>
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                  <button onClick={() => removerProduto(pedido)} className={styles.acaoRemover}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.totalPedido}>
          <div className={styles.totalDesconto}>
            <label>Desconto</label>
            <label>0%</label>
          </div>
          <div className={styles.totalPreco}>
            <label>Preço</label>
            <label>{formatarPreco(totalPreco)}</label>
          </div>
          <button onClick={finalizarPedido} className={styles.finalizarBotao}>Finalizar Pedido</button>
        </div>
    </div>
  )
}
