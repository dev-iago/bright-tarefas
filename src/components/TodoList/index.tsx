import React, { useEffect, useState } from 'react';
import './styles.css';
import { TextField } from '@material-ui/core';
import Check from '@material-ui/icons/Check';

interface ItemList {
  value: string,
  id: number,
  checked: boolean,
}

let counter = 1;

export default function TodoList(): JSX.Element {
  const [newTaskText, setNewTaskText] = useState('');
  const [listTasks, setListTasks] = useState<ItemList[]>([{ value: '', id: 0, checked: true }]);
  const [listFilteredTasks, setListFilteredTasks] = useState<ItemList[]>([{ value: '', id: 0, checked: true }]);
  const [activeButton, setActiveButton] = useState('All');

  function handleCheckChange(checked: boolean, item: ItemList) {
    if (listTasks !== undefined) {
      const newItem = listTasks.map((prevItem) => (prevItem.id === item.id ? { ...item, checked } : prevItem));
      setListTasks(newItem);
    }
  }

  function getItemsLeft(): number {
    const numberItemsLeft = listTasks.length - listTasks.filter((item) => item.checked === true).length;
    return numberItemsLeft;
  }

  useEffect(() => {
    if (activeButton === 'All') {
      setListFilteredTasks(listTasks);
    }
    if (activeButton === 'Active') {
      setListFilteredTasks(listTasks.filter((item) => item.checked === false));
    }
    if (activeButton === 'Completed') {
      setListFilteredTasks(listTasks.filter((item) => item.checked === true));
    }
  }, [activeButton, listTasks]);

  return (
    <div className="list-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (listTasks !== undefined) {
            setListTasks([...listTasks, { value: newTaskText, checked: false, id: counter++ }]);
          }
        }}
        className="list-container-input"
      >
        <TextField
          value={newTaskText}
          placeholder="What needs to be done?"
          required
          onChange={(e): void => setNewTaskText(e.target.value)}
        />
      </form>

      <div className="list-container-item">
        {
            listFilteredTasks.map((item, index) => (item.id !== 0
            && (
            <div onClick={(e) => handleCheckChange(!item.checked, item)} className="list-item" key={item.id}>
              <div className="list-item-check">
                {item.checked && <Check style={{ background: 'white' }} fontSize="small" /> }
              </div>
              <span style={item.checked ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{item.value}</span>

            </div>
            )
            ))
}
      </div>

      <div className="list-container-bottom">
        <span>
          {getItemsLeft()}
          {' '}
          items left
        </span>

        <button style={activeButton === 'All' ? { border: '1px solid' } : { border: 'none' }} onClick={(e) => setActiveButton('All')}>All</button>
        <button style={activeButton === 'Active' ? { border: '1px solid' } : { border: 'none' }} onClick={(e) => setActiveButton('Active')}>Active</button>
        <button style={activeButton === 'Completed' ? { border: '1px solid' } : { border: 'none' }} onClick={(e) => setActiveButton('Completed')}>Completed</button>

      </div>

    </div>
  );
}
