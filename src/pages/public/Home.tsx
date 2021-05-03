import './styles.css';
import TodoList from '../../components/TodoList';

function Home() {
  return (
    <div className="component-list">
      <h2>Todos</h2>
      <TodoList />
    </div>
  );
}

export default Home;
