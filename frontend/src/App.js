import './App.css';
import Login from './components/user/Login'
import Main from './components/recipe/Main'
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Main}/>
      <Route exact path="/login" component={Login}/>
    </div>
  );
}

export default App;
