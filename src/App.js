import { React, useState } from 'react';

const App = () => {
    const [text, setText] = useState("");
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(false);
    const [editId, setEditId] = useState(null);
    const [updateTodo, setUpdateTodo] = useState("");

    const addTodo = () => {
        if (text === "") return;
        const newTodos = [...todos, text];
        // console.log(`add: ${newTodos}`);
        setTodos(newTodos);
        setText("");
    };

    const delTodo = (id) => {
        setTodos(todos.filter((_, i) => i !== id));
        // console.log(`del: ${todos}`);
    };

    const openForm = (todo, id) => {
        setEditTodo(true)
        setEditId(id)
        setUpdateTodo(todo)
    }
    const closeForm = () => {
        setEditTodo(false)
        setEditId("")
    }

    const updateText = (e) => {
        setUpdateTodo(e.target.value)
    }

    const saveText = () => {
        const saveTodos = todos.map((todo, index) =>
            index === editId ? updateTodo : todo)
        // console.log(`id: ${editId}`)
        // console.log(`savetodo: ${saveTodos}`)
        setTodos(saveTodos)
        setEditId("")
        setUpdateTodo("")
        closeForm("")
    }

    return (
        <>
            <h1>Todo List</h1>
            {editTodo ?
                <div>
                    <input
                        type='text'
                        value={updateTodo}
                        onChange={updateText}
                        placeholder='テキストを編集'
                    />
                    <button onClick={saveText}>編集を保存</button>
                    <button onClick={closeForm}>キャンセル</button>
                </div>
                :
                <div>
                    <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='テキストを入力'
                    />
                    <button onClick={addTodo}>作成</button>
                </div>
            }
            <ul>
                {todos.map((todo, id) => (
                    <li key={id}>
                        {todo}
                        <button onClick={() => openForm(todo, id)}>編集</button>
                        <button onClick={() => delTodo(id)}>削除</button>
                    </li >
                ))}
            </ul >

        </>
    );
};

export default App;