import { BrowserRouter, Route, Routes } from "react-router-dom";
import './Styles.css';
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Registration />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;