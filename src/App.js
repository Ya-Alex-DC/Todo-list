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


	// console.log('render')


	const editTodo = (id) => {
		isClosed()
		setTimeout(() => {
			setModal(tasks.find(item => item.id === id))
			setOpen(true)
		}, 0)

		// console.log(id)
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
		// console.log(toggle)
	}

	const [filter, setFilter] = useState('all');

	const filteredTasks = tasks.filter(task => {
		if (filter === 'active') return task.completed === false;
		if (filter === 'completed') return task.completed;
		return true;
	});

	// console.log(filter)
	// console.log(tasks)

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




	// useEffect(() => {
	// 	// 1 достаем из локалстардж наши туду 
	// 	//2 парсим их в js JSON**.parse(todos ?? '[]' ) 
	// 	//3 записать в setTasks  
	// try {
	// 	const savedTasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
	// 	setTasks(savedTasks);
	// } catch (e) {
	// 	console.error('Ошибка при загрузке задач:', e);
	// }
	// }, [])

	// добавить изменение статуса с помощью чекбокса у каждой задачи
	// 1 TodoJS добавить чекбокс и обработчик клика принимающий Айди как editTodo и removeTodo
	// 2 сделать функцию меняющую статус Todo
	// 3 Пробросить пропсами функцию из Апп до Todo
	// 4 рефактр модал  и сетмодал
	// 5 use efect
	// 6 (кнопки в одну сторону в одном контейнере туду элемента и изменить цвет рамки списка)
	// 7 добавить кнопку с выпадающим окном с фильтрацией списка
	// 8 перезаписать каунт через преф

	// написать свою функцию метода map (полифил) или filter "Саня"
	// в одной функции принимает что то в другой передает как понять где что происходит

	// function myFilter(array, callback, thisArg) {
	// 	if(!Array.isArray(array)) {
	// 		throw new TypeError('Это не массив')
	// 	}
	// 	if(typeof callback !== 'function') {
	// 		throw new TypeError('Это не функция')
	// 	}
	// 	const res = []

	// 	for(let i = 0; i<array.length; i++) {
	// 		if(i in array) {
	// 			const value = array[i];
	// 			if(callback.call(thisArg, value, i, array)) {
	// 				res.push(value)
	// 			}
	// 		}
	// 	}
	// 	return res
	// }

	// const ms = [
	// 	1, 2, 3, 'adfa', 10
	// ]

	// const filtter = ms.filter((item) => {
	// 	if(typeof item !== "number") {
	// 		return true
	// 	}
	// })

	// console.log(filtter)

	// самому ещё раз написать полифил на фильтр
	// список которые с Саньком делали 
	// подменить полифил фильтра где я использую метод фильтра




