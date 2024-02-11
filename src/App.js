import { useState } from "react"

function AddTodoBar({ items, setItems }) {
  const [todoItem, setTodoItem] = useState('');

  function handleAddClick() {
    if (todoItem == '') return;

    //preapre the newItem
    const newItem = {
      id: items[items.length - 1].id + 1, item: todoItem, status: 'active'
    };
    console.log({ newItem });

    // add to items 
    setItems([...items, newItem]);

    setTodoItem('');
  }

  return (
    <>
      <h1>Add an Item</h1>
      {/* <form> */}
      <input type="text" value={todoItem} onChange={e => setTodoItem(e.target.value)} placeholder="Type item here..." ></input>
      <button onClick={handleAddClick}> Add </button>
      {/* </form> */}
      <p>new todo item: {todoItem}</p>
    </>
  );
}

function ItemRow({ item, items, setItems }) {

  function onEditClick(item) {
    console.log(item);

    // find index of the item to be edited
    const index = items.indexOf(item);
    console.log("edit index: " + index);

    // prepare the new status, and newItem
    const newItems = items.slice();

    //preapre the newItem
    var newItem = null;
    if (items[index].status == 'active') {
      newItem = { id: items[index].id, item: items[index].item, status: 'edit' }
    } else {
      newItem = { id: items[index].id, item: items[index].item, status: 'active' };
    }

    // update edit status
    newItems.splice(index, 1, newItem);
    setItems(newItems);

  }


  function onDeleteClick(item) {

    console.log(items);

    // find index of the item to be deleted
    const index = items.indexOf(item);
    console.log("delete index: " + index);

    // delete the item from items and update through setItems
    const newItems = items.slice();
    newItems.splice(index, 1);
    setItems(newItems);

  }

  function onEditTyped(items, item, value) {

    // find index of the item to be edited
    const index = items.indexOf(item);
    console.log("edit index: " + index);

    // prepare the new status, and newItem
    const newItems = items.slice();

    //preapre the newItem
    var newItem = { id: items[index].id, item: value, status: 'edit' }

    // update edit status
    newItems.splice(index, 1, newItem);
    setItems(newItems);

  }

  return (
    <tr>
      <td>{item.id}</td>
      <td>
        {item.status == "active" ? item.item : <input type="text" onChange={e => onEditTyped(items, item, e.target.value)} defaultValue={item.item} />}
      </td>
      <td>{item.status}</td>
      <td>
        <button onClick={() => onEditClick(item)}> Edit </button>
        <button onClick={() => onDeleteClick(item)}> Delete </button>
      </td>
    </tr>
  );

}

function ListTable({ items, setItems }) {
  const rows = [];

  items.forEach((item) => {
    rows.push(
      <ItemRow item={item} items={items} setItems={setItems} key={item.id} />
    )
  }
  )

  return (
    <>
      <h2>Todo List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Item</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

export default function App() {
  const [items, setItems] = useState([{ id: 0, item: "example", status: "active" }, { id: 1, item: "another example", status: "active" }]);
  return (
    <>
      <AddTodoBar items={items} setItems={setItems} />
      <hr></hr>
      <ListTable items={items} setItems={setItems} />
    </>
  );
}
