import React, { Suspense, createContext, useState } from 'react';
import AppNavbar from './components/AppNavbar';
import Home from './Pages/HomePage';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CartDetails from './Pages/cartPages/CartDetails';
import PageNotFound from './Pages/PageNotFound';
import Footer from './Pages/Footer';
import { history } from './util/history';
import { Loader } from './styledComponents/Loader.style';
const SuccessPage = React.lazy(() => import("./Pages/checkoutPages/SuccessPage"));


export const SearchTermContext = createContext(null); // creating context for PageNumber and search Term

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  history.navigate = useNavigate();

  const data = {
    searchTerm,
    setSearchTerm,
    pageNumber,
    setPageNumber,
  };
  
  if (process.env.NODE_ENV !== 'development') {
    console.log = () => {};
  }
  return (
    <SearchTermContext.Provider value={data}>
        <AppNavbar />
        <div>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<CartDetails />} />
              <Route path='/successPage/:orderId' element={<SuccessPage success={true} />} />
              <Route path='/failurePage/:orderId' element={<SuccessPage success={false} />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
    </SearchTermContext.Provider>
  );
}

export default App;
