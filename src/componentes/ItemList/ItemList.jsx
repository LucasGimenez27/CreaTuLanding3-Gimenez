import Item from "../Item/Item"

const ItemList = ({productos}) => {
  return (
    <div>
        {productos.map(item => <Item key={item.id} {...Item} />)}
    </div>
  )
}

export default ItemList