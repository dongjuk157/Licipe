import './App.css';
import SearchAppBar from './components/common/SearchAppBar'
import Card from './components/common/Card'
import { height } from '@material-ui/system';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <div className="App">
      <SearchAppBar></SearchAppBar>
      <div style={{ height: 450 }}>Carousel</div>
      <Box display="flex">

        <Card></Card>
        <Card></Card>
        <Card></Card>
      </Box>
    </div>
  );
}

export default App;
