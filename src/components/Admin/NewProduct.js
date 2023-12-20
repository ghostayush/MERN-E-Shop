import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Samsung",
    "Apple",
    "oppo",
    "Xiaomi",
    "vivo",
    "Realme",
    "OnePlus"
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error,success,navigate]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  
  return (
    <Fragment>
    <div className="flex flex-col sm:flex-row bg-white w-full h-auto">
      <Sidebar/>

      <div className=" h-auto flex  justify-center bg-white w-full sm:w-2/3 md:w-9/12 lg:w-4/5">
      <div className="newProductContainer bg-[#C2EFD4] w-4/5 sm:w-2/4 flex flex-col items-center gap-2 h-auto mb-4 mt-4">
        <h1 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Create Product</h1>
        
        <form
          className="createProductForm flex flex-col items-center p-2 gap-4"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <div className="flex w-full items-center">
            <SpellcheckIcon />
            <input className='w-full box-border h-10 p-4 border-solid border-2'
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center">
            <AttachMoneyIcon />
            <input className='w-full box-border h-10 p-4 border-solid border-2'
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex w-full items-center">
            <DescriptionIcon />

            <textarea className='w-full box-border h-10 pl-4 pt-1 border-solid border-2'
              placeholder="Product Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div className="flex w-full items-center">
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)}
             className='w-full box-border h-10 border-solid border-2'
             required>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full items-center">
            <StorageIcon />
            <input className='w-full box-border h-10 p-4 border-solid border-2' 
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile" className="flex w-full items-center">
            <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 
               file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
             file:bg-[#267D49] file:text-white hover:file:bg-[#224F34]s'
              type="file"
              name="avatar"
              required
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage" className="flex flex-row gap-2">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" className="h-10 w-10"/>
            ))}
          </div>

          <input
            type="submit"
            value='Create'
            disabled={loading ? true : false}
            className="bg-[#224F34] text-white w-full p-3 cursor-pointer rounded-2xl "
          />
        </form> 
      </div>
      </div>

    </div>
  </Fragment>
  )
}

export default NewProduct