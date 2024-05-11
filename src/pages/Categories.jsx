import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesData, getProductByCategory, getProductsOnCategory } from "../Action/Data";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
  const productByCategory = useSelector((state) => state.GetProductByReducer?.getProductByCategory);
  const productsOnCategory = useSelector((state) => state.GetProductOnCategoryReducer?.getProductsOnCategory);
  const allProductsData = useSelector((state) => state.GetAllCategoriesReducer?.getallCategories);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [, setFilteredItems] = useState(productsOnCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // const DiscountedPrice = () => {
  //   let discountedPrice = ((selectedFilters.length === 0 ? allProductsData : productsOnCategory).map((product) => (product?.price) - (product?.price * (product?.discountPercentage / 100))));
  //   console.log("Discounted Price", discountedPrice, "All category ", productsOnCategory);
  // }


  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);

  useEffect(() => {
    if (!JSONformatData) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    dispatch(getProductsOnCategory(selectedFilters));
    dispatch(getProductByCategory());
  }, [selectedFilters]);

  const handleFilterButtonClick = (selectedCategory) => {
    setSelectedFilters([selectedCategory]);
  };

  useEffect(() => {
    handleCategories();
    dispatch(getAllCategoriesData());
  }, [selectedFilters]);

  const AllProducts = () => {
    setSelectedFilters([]);
  }

  const handleCategories = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = productsOnCategory.filter((item) => item.category === selectedCategory);
        return temp;
      });
      setFilteredItems(tempItems);
    }
    // console.log("Categories", selectedFilters)
  }

  return (
    <>
      <div className="bg-gray-100 mx-auto px-6 text-xs cursor-pointer gap-x-1 gap-y-1 overflow-auto grid grid-cols-2 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 py-2">
        <button onClick={AllProducts} className={`w-fit group-active:bg-gray-300 whitespace-nowrap group relative rounded-md px-2 py-0.5 items-center text-sm font-semibold text-black bg-gray-300 hover:bg-gray-400 ${selectedFilters.length === 0 ? 'bg-gray-400' : ''}`}>
          All Categories
        </button>
        {productByCategory.map((category, index) => (
          <button onClick={() => handleFilterButtonClick(category)} key={index} className={`w-fit whitespace-nowrap group relative rounded-md px-2 py-0.5 items-center text-black bg-gray-300 text-sm font-semibold hover:bg-gray-400 ${selectedFilters.includes(category) ? 'bg-gray-400' : ''} `}>
            {category}
          </button>
        ))}
      </div>
      <div className='bg-gray-100 text-gray-900 text-xl p-6'>
        <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  xl:gap-x-8">
          {(selectedFilters.length === 0 ? allProductsData : productsOnCategory).map((product, index) => (
            <div key={index} className="group relative cursor-pointer bg-gray-200 hover:bg-slate-300 hover:rounded-e-lg hover:rounded-s-lg rounded-s-lg rounded-e-lg"  >
              <Link to={`/products/${product?.id}`} state={product}>
                <div className="w-full overflow-hidden lg:aspect-none group-hover:opacity-75 h-52 rounded-ss-lg rounded-t-lg ">
                  <img
                    src={product?.thumbnail}
                    alt={product?.category}
                    title={product?.category}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="px-3 py-2 justify-between">
                  <p className="pb-1 text-sm flex justify-center border-b-[0.5px]  border-gray-500 text-gray-500">Brand: {product?.brand}</p>

                  <div className=''>
                    <h3 className="text-base py-1 text-gray-700 text-center">
                      {product?.title}
                    </h3>
                  </div>
                  <div className='flex justify-center gap-2'>
                    <p className="text-xs font-semibold pr-2 border-r-2 border-gray-400 items-center flex text-gray-500 line-through">${product?.price}</p>
                    <p className="text-lg font-medium pr-2 border-r-2 border-gray-800 text-gray-700">${((product?.price) - (product?.price * (product?.discountPercentage / 100))).toFixed(2)}</p>
                    <p className="text-base font-medium flex items-center text-zinc-700">({(product?.discountPercentage).toFixed(1)}% Off)</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories;
