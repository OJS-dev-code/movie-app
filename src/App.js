import {Route, Routes} from 'react-router-dom';
import './App.scss';
import Home from './routes/Home';
import Comedy from './routes/Comedy';
import ComedyDetail from './routes/ComedyDetail.jsx';
import Drama from './routes/Drama.jsx';
import MoviesDetail from './routes/MoviesDetail.jsx';
import DramaDetail from './routes/DramaDetail.jsx';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickBtn from './components/QuickBtn';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/comedy" element={<Comedy />} />
                <Route path="/comedy/:id" element={<ComedyDetail />} />
                <Route path="/drama" element={<Drama />} ></Route>
                <Route path="/drama/:id" element={<DramaDetail/>}></Route>
                <Route path="/movies/:id" element={<MoviesDetail />} />
            </Routes>
            <Footer/>
            <QuickBtn/>
        </div>
    );
}

export default App;
