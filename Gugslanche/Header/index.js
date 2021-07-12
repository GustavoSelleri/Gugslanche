import styles from './header.module.css'

export default function Header({selectedItem, setSelectedItem}) {

  const selectItem = (item) => {
    setSelectedItem(item)
  }

  const isSelected = (position) => {
    if(selectedItem === position){
      return styles.liSelected
    }
  }

  return (
    <div className={styles.menu}>
      <header>
        <title>Gug's Lanche</title>
        <h2 className={styles.menuTitle}>Gug's Lanche</h2>
      </header>
      <ul className={styles.ulMenu}>
        <li className={`${styles.liMenu} ${isSelected(0)}`} onClick={() => selectItem(0)}>
          <a className={styles.aMenu}>Lanches</a></li>
        <li className={`${styles.liMenu} ${isSelected(1)}`} onClick={() => selectItem(1)}>
          <a className={styles.aMenu}>Porções</a></li>
        <li className={`${styles.liMenu} ${isSelected(2)}`} onClick={() => selectItem(2)}>
          <a className={styles.aMenu}>Sobremesas</a></li>
        <li className={`${styles.liMenu} ${isSelected(3)}`} onClick={() => selectItem(3)}>
          <a className={styles.aMenu}>Bebidas</a></li>
        <li className={`${styles.liMenu} ${isSelected(4)}`} onClick={() => selectItem(4)}>
          <a className={styles.aMenu}>Promoções</a></li>
      </ul>
    </div>
  )
}
