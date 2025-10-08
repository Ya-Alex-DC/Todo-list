import { Header } from "./componets/Header";
import { InputTodo } from "./componets/InputTodo";
import { ListTodo } from "./componets/ListTodo";
import { Modal } from "./componets/Modal";

import './App.css';
import { useState, useEffect } from "react";

const tasksManeger = (storageKey = 'tasks') => {
	const get = () => {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	}
	const set = (tasks) => {
		localStorage.setItem(storageKey, JSON.stringify(tasks));
	}
	return {
		set, get
	}
}

function App() {
	const { set, get } = tasksManeger('jopa')
	const [tasks, setTasks] = useState(get)
	const [open, setOpen] = useState(false)
	const [modal, setModal] = useState(null)

	useEffect(() => {
		set(tasks)
	}, [tasks])

	const addValue = (value) => {
		const task = {
			id: Math.random(),
			value: value,
			completed: false,
		}
		setTasks((prevTask) => {
			return [task, ...prevTask]
		})
	}

	const editTodo = (id) => {
		isClosed()
		setTimeout(() => {
			setModal(tasks.find(item => item.id === id))
			setOpen(true)
		}, 0)
	}

	const removeTodo = (id) => {
		setTasks(tasks.filter(todo => todo.id !== id))
		isClosed()
	}

	const isClosed = (id) => {
		setOpen(false)
		setModal(null)
	}

	const toggleTask = (id, completed) => {
		let toggle = tasks.map(e => e.id === id ? { ...e, completed: !e.completed } :
			{ ...e })
		setTasks(toggle)
	}

	const [filter, setFilter] = useState('all');

	const filteredTasks = tasks.filter(task => {
		if (filter === 'active') return task.completed === false;
		if (filter === 'completed') return task.completed;
		return true;
	});

	return (
		<div className="container">
			<div className="container_list">
				<Header />
				<InputTodo addValue={addValue} />

				<div className="btn_filterblock ">
					<button className={`btn_filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All List</button>
					<button className={`btn_filter ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active List</button>
					<button className={`btn_filter ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed List</button>
				</div>

				<ListTodo
					tasks={filteredTasks}
					removeTodo={removeTodo}
					editTodo={editTodo}
					toggleTask={toggleTask}
				/>

				{open && <Modal isClosed={isClosed} modal={modal} setTasks={setTasks} />}


			</div>
		</div>
	);
}

export default App;