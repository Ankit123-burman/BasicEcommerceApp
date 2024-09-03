import { useEffect, useState } from 'react';
import axios from 'axios';
import Category from './components/Category';
import Navebar from './components/Navebar';

function App() {
  const [finalcategory, setFinalcategory] = useState([]);
  const [finalpro, setFinalproduct] = useState([]);
  const [catName, setCatname] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getCategory = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then((res) => res.data)
      .then((finalres) => {
        setFinalcategory(finalres); // Update the state with the fetched categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const getProducts = () => {
    axios.get('https://dummyjson.com/products')
      .then((prores) => prores.data)
      .then((finalRes) => {
        setFinalproduct(finalRes.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  useEffect(() => {
    console.log("Selected category:", catName); // Log the selected category
    if (catName !== "") {
      axios.get(`https://dummyjson.com/products/category/${catName}`)
        .then((prores) => {
          console.log("Products response:", prores.data); // Log the API response
          setFinalproduct(prores.data.products);
        })
        .catch((error) => {
          console.error("Error fetching products by category:", error);
        });
    } else {
      getProducts(); // Fetch all products if no category is selected
    }
  }, [catName]);

  const startIndex = (currentPage - 1)*itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProduct = finalpro.slice(startIndex,endIndex)

  const pitems = displayedProduct.map((product) => (
    <ProductItem key={product.id} pdata={product} />
  ));


  const handelNextclick=()=>{
    setCurrentPage((prevpage)=>prevpage+1)
  }
  const handelPreviousclick=()=>{
setCurrentPage((prevpage)=>Math.max(prevpage-1,1));
  }

  return (
    <>
    <Navebar/>
      <div className='py-[40px]'>
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-center text-[40px] font-bold md:text-[30px]'>Our Products</h1>
          <div className='grid grid-cols-[30%_70%] gap-[20px]'>
            <div>
              <Category finalcategory={finalcategory} setCatname={setCatname} />
            </div>
            <div>
              <div className='grid grid-cols-3 gap-4'>
                {finalpro.length >= 1 ? pitems : 'No products'}
              </div>
              <div className='flex justify-between'>
               
                <button disabled={currentPage<=1} className='text-white bg-black p-3 '  onClick={handelPreviousclick}>&larr; Privious </button>
                <button disabled={endIndex >= finalpro.length} className='text-white bg-black p-3 ' onClick={handelNextclick}>Next &rarr;</button>
             </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductItem({ pdata }) {
  return (
    <><div className='shadow-lg text-center pb-4'>
      <img src={pdata.thumbnail} alt={pdata.title} className='w-[100%] h-[220px]' />
      <h3>{pdata.title}</h3>
      <b>Rs {pdata.price}</b>
    </div>
   
    </>
  );
}

export default App;
