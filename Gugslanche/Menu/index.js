import styles from './menu.module.css'
import React, {useState} from 'react'
import Modal from '../Modal/Modal'
import formatarPreco from '../utils/formatarPreco';
import Image from 'next/image'
import ImageLoader from '../utils/ImageLoader';

export default function Menu({ products, produtosPedido, setProdutosPedido } ) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [product, setProduct] = useState({})

  const adicionarProdutoCarrinho = (product) => {
    let index = 0
    for (index = 0; index < produtosPedido.length; index++) {
      if (produtosPedido[index].id === product.id) {
        produtosPedido[index].quantidade++
        index = -1
        setProdutosPedido([...produtosPedido])
        localStorage.setItem('pedidos', JSON.stringify(produtosPedido))
        break
      }
    }

    if (index !== -1) {
      product.quantidade = 1
      const pedidos = [...produtosPedido, product]
      setProdutosPedido(pedidos)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    }
  }

  return (
    <div className={styles.container}>
      {products.length === 0 && (
        <p className={styles.alerta}>Nenhum produto encontrado nessa categoria ):</p>
      )}
      {products.map(product => {
        return ( 
          <div 
            className={styles.card} 
            key={product.id}>
            <Image 
              loader={ImageLoader}
              width={200}
              height={200}
              className={styles.imageBorderRadius}
              src={product.image.url}
              alt={product.name}/>
            <div className={styles.cardDescription}>
              <h4><b>{product.name}</b></h4> 
              <label>Preço: {formatarPreco(product.price)}</label>
              <div>
                <button
                  className={styles.buttonShowModal}
                  onClick={() => {
                    setIsModalVisible(true)
                    setProduct(product)
                  }}>
                    <label>Detalhes</label>
                    <i className="fas fa-info-circle"></i>
                </button>
            </div>
          </div>
        </div>
      )})}

      {isModalVisible && (
        <Modal onClose={()=> setIsModalVisible(false)}>
          <div className={styles.modalTitle}>
            <h2>Detalhes do Produto</h2>
            <button className={styles.close} onClick={()=> setIsModalVisible(false)}>
            <Image
              width={20}
              height={20}
              className={styles.imageModal}
              src={'/fechar.svg'}
              alt={product.name}/>
            </button>
          </div>
          <Image
            loader={ImageLoader} width={180} height={160}
            className={styles.imageModal}
            src={product.image.url} alt={product.name}/>
          <div className={styles.itemDescription}>
            <p className={styles.productName}><strong>{product.name}</strong></p>
            <p className={styles.productDescription}>{product.description}</p>
            <label>Preço: {formatarPreco(product.price)}</label>
            <button onClick={() => adicionarProdutoCarrinho(product)} className={styles.buttonAddItemModal}>
              <label>Adicionar</label>
              <i className="fas fa-plus-circle"/>
            </button>
          </div>
      </Modal> )}
    </div>
  )
}


  
               