import './default.css';
import './App.css';
import { createContext, useState, useRef, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './component/Header.js';
import Footer from './component/Footer.js';
import SubNav from './component/SubNav.js';

import data from './data/data.js';
import categories from './data/categories.js';

import Main from './pages/Main.js';

const Detail = lazy(() => import('./pages/Detail.js'));
const List = lazy(() => import('./pages/List.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

export const Context = createContext();
export const CategoryContext = createContext();

function App() {
    const [item] = useState(data);
    const [category] = useState(categories);
    const scrollRef = useRef(null);

    return (
        <Suspense fallback={<div className="loading">⟳</div>}>
            <div className="App" ref={scrollRef}>
                <Header category={category} />
                <SubNav />
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route
                        path="goods/detail/:id"
                        element={
                            <Context.Provider value={{ item }}>
                                <Detail item={item} />
                            </Context.Provider>
                        }
                    ></Route>
                    {category.map((category, i) => {
                        return (
                            <Route
                                path={`goods/list/${i}`}
                                key={i}
                                element={
                                    <CategoryContext.Provider value={{ item }}>
                                        <List category={category} />
                                    </CategoryContext.Provider>
                                }
                            />
                        );
                    })}
                    <Route path="/cart" component={Cart} element={<Cart />}></Route>
                </Routes>
                <Footer />
            </div>
        </Suspense>
    );
}

export default App;
