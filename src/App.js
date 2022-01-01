import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/pages/Home';
import View from './components/studentes/View';
import Edit from './components/studentes/Edit';


function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/view/:id" element={<View/>}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
        </Routes>

       </BrowserRouter>
    </>
  );
}

export default App;
