import './App.css'
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/navbar';
import Postcards from './components/postcards';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={(
          <>
          <Navbar></Navbar>
          <br></br>
          <br></br>
          <br></br>
          {/* <button className="createPost">➕  Create A New Post</button> */}
          <Postcards></Postcards>
          <Postcards></Postcards>
          <Postcards></Postcards>

          </>
        )} />

        <Route path="/post/:id" element={(
          <>
            
          </>
        )} />

      </Routes>
    </div>
  );
}

export default App
