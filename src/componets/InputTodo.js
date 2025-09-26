import { useState } from "react";

export const InputTodo = ({ addValue }) => {

	const [value, setValue] = useState('')

	const handleAddTodo = () => {
		addValue(value);
		setValue("");
	}

	return (
		<div className="input_todo">
			<input
				value={value}
				className="input"
				type="text"
				placeholder="Введите текст..."
				onChange={e => setValue(e.target.value)}

			/>
			<button onClick={handleAddTodo}
				className="btn_add" >
				Добавить
			</button>
		</div>
	)
}