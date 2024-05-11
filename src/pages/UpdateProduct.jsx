import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteProductswithTextCategory, updateProductswithTextCategory } from "../Action/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const UpdateProduct = ({ product }) => {

  const location = useLocation();
  product = location.state;

  const [updateData, setUpdateData] = useState(product);
  const updateProducts = useSelector((state) => state.UpdateProductWithTextReducer?.updateWithTextProduct);
  const deletedProduct = useSelector((state) => state.DeleteProductWithTextReducer?.deleteWithTextProduct);
  const [deletedState, setDeletedState] = useState(false);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductswithTextCategory(product.id, [updateData]));
    // console.log("Log Updated Data", updateProducts, "Updated State ", updateData);
  };

  const handleOnDelete = () => {
    dispatch(deleteProductswithTextCategory(product?.id))
    setDeletedState(true)
    // console.log("Deleted State", deletedState, deletedProduct)
  }
  return (
    <div className="w-auto">
      <div key={updateData?.id} className="flex relative px-4  py-5  bg-gray-100 ">

        <div className="aspect-h-1 aspect-w-1 py-3  w-[40%] overflow-hidden  lg:aspect-none group-hover:opacity-75  md:h-[420px]">
          <img alt={updateData?.category}
            src={updateData?.thumbnail}
            className="h-full w-full rounded-2xl object-cover object-center  lg:h-full lg:w-full" />
        </div>

        <form className="flex justify-center w-auto" onSubmit={handleSubmit}>
          <div className="">
            <input type="text" className="hidden" value={updateData?.id} id="id" name="id" />
            <div className="flex">
              <div className="px-4">
                <div className=" py-3 ">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Title
                  </label>
                  <input required value={updateData?.title} id="title" name="title" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Title" />
                </div>

                <div className=" py-3">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Description
                  </label>
                  <input required value={updateData?.description} id="description" name="description" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="Write a Description" />
                </div>

                <div className=" py-3">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Price
                  </label>
                  <input required value={updateData?.price} id="price" name="price" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" placeholder="how much Price?" />
                </div>

                <div className=" py-3">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Discount Percentage
                  </label>
                  <input required value={updateData?.discountPercentage} id="disPercentage" name="discountPercentage" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Discount Percentage" />
                </div>
              </div>
              <div className="px-4 ">
                <div className=" py-3 ">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Rating
                  </label>
                  <input required value={updateData?.rating} id="rating" name="rating" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Rating in Float value" />
                </div>
                <div className=" py-3 ">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Stock
                  </label>
                  <input required value={updateData?.stock} id="stock" name="stock" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="How much stock do you have?" />
                </div>

                <div className=" py-3 ">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Brand
                  </label>
                  <input required value={updateData?.brand} id="brand" name="brand" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="from which Brand?" />
                </div>

                <div className=" py-3 ">
                  <label className="block text-gray-500 font-bold text-start mb-1 md:mb-0 pr-4">
                    Category
                  </label>
                  <input required value={updateData?.category} id="category" name="category" onChange={handleChange} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-96 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Category" />
                </div>
              </div>
            </div>
            <div className=" justify-center flex flex-1 flex-row gap-10">
              <div className="flex flex-col">
                <button className="bg-gray-300 w-fit px-3 py-1 mt-2 rounded-full cursor-pointer">
                  Update a Product
                </button>
                <span className="text-blue-400 text-xs  select-none mt-2">do you want&nbsp;<Link className="hover:underline" to={"/add_product"} >Add a product</Link></span>
              </div>
              <div>
                <div className="text-center">|</div>
                <span className="text-xl">Or</span>
                <div className="text-center">|</div>
              </div>
              <div className="cursor-pointer">
                <MdDelete onClick={handleOnDelete} className="w-10 p-0.2 bg-gray-100 rounded-full h-full hover:bg-gray-800 hover:text-white" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>



  )
}

export default UpdateProduct