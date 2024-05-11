import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addProductswithTextCategory } from "../Action/Data";
import { Link, useNavigate } from "react-router-dom";

const AddProduct = () => {

  const [addData, setAddData] = useState();
  const addProduct = useSelector((state) => state.AddProductWithTextReducer?.addWithTextProduct);
  const dispatch = useDispatch()
  const stringLoginData = localStorage.getItem('sessionToken');
  const JSONformatData = JSON.parse(stringLoginData);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!JSONformatData) {
      navigate("/login")
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductswithTextCategory(addData));
    console.log("Log Added New Data", addProduct);
  };

  return (
    <div className="flex justify-center h-[810px] bg-zinc-50">
      <form onSubmit={handleSubmit}>
        <div className="flex ">

          <div className="px-4 ">
            <div className=" py-3 ">
              <input type="text" className="hidden" value={addData?.id} id="id" name="id" />
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Title
              </label>
              <input required value={addData?.title} id="title" name="title" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Title" />
            </div>

            <div className=" py-3">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Description
              </label>
              <input required value={addData?.desc} id="description" name="description" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Write a Description" />
            </div>

            <div className=" py-3">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Price
              </label>
              <input required value={addData?.price} id="price" name="price" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="how much Price?" />
            </div>

            <div className=" py-3">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Discount Percentage
              </label>
              <input required value={addData?.discountPer} id="disPercentage" name="discountPercentage" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Discount Percentage" />
            </div>
          </div>
          <div className="px-4 ">
            <div className=" py-3 ">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Rating
              </label>
              <input required value={addData?.rating} id="rating" name="rating" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Rating in Float value" />
            </div>
            <div className=" py-3 ">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Stock
              </label>
              <input required value={addData?.stock} id="stock" name="stock" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="How much stock do you have?" />
            </div>

            <div className=" py-3 ">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Brand
              </label>
              <input required value={addData?.brand} id="brand" name="brand" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="from which Brand?" />
            </div>

            <div className=" py-3 ">
              <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                Category
              </label>
              <input required value={addData?.category} id="category" name="category" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Category" />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-300 w-fit px-3 py-1 mt-2 rounded-full cursor-pointer">
            Add New Product
          </button>
          {/* <span className="text-blue-400 text-xs  select-none mt-2">do you want&nbsp;<Link className="hover:underline" to={"/update_product"} >Update a product</Link></span> */}
        </div>
      </form>

    </div>



  )
}

export default AddProduct