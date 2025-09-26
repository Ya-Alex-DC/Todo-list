import { Todo } from "../componets/Todo"


export const ListTodo = ({tasks, removeTodo, editTodo, modals, toggleTask}) => {

	return (
		<div className="list">
			<ul className="list_todo">
				{tasks.map(e => <Todo
					id={e.id}
					value={e.value}
					completed={e.completed}
					key={e.id}
					removeTodo={(xyi)=> removeTodo(xyi)}
					editTodo={editTodo}
					modals={modals}
					toggleTask={toggleTask}
					tasks={tasks}
					/>)}
			</ul>
		</div>
	)
}