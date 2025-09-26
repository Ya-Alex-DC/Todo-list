import { useState } from "react";

export const Modal = ({ isClosed, setTasks, modal }) => {
	const [count, setCount] = useState(0)

	const [value, setValue] = useState(modal.value )

	const handleNameChange = (e) => {
		setValue(e.target.value)
	}



	const handleSave = () => {
		setTasks(prevTask => {
			const index = prevTask.findIndex(item => item.id === modal.id) 
			prevTask[index].value = value
			return [...prevTask ] })
			isClosed()
	}


		const addCount = () => {
		setCount(count + 1)
		console.log(count)
	}

	const removeCount = () => {
		setCount(count - 1)
	}

	return (
		<div className="overlay">
			<div className="modal">
				<h2>Modal window</h2>
				<button onClick={isClosed} >Закрыть</button>
				<input
					value={value}
					className="input-edit"
					type="text"
					placeholder="Введите текст..."
					onChange={handleNameChange}
				/>

				<button onClick={handleSave} className="save-btn">Сохранить</button>

				<h1>{`Счет: ${count}`}</h1>
				<button onClick={addCount}>увеличить</button>
				<button onClick={removeCount}>уменьшить</button>

			</div>
		</div>

	)
}

