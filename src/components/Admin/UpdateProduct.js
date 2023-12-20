import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,updateProduct,getProductDetails} from "../../actions/productAction";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from './SideBar';
import { useNavigate,useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate=useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);

  const {
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      
      <div className="flex flex-col sm:flex-row  bg-white w-full h-auto">
        <SideBar />
        <div className="h-auto flex  justify-center bg-white w-full sm:w-2/3 md:w-9/12 lg:w-4/5">
        <div className="newProductContainer bg-[#C2EFD4] w-4/5 sm:w-2/4 flex flex-col items-center gap-2 h-auto mb-4 mt-4">
       
        <h1 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Update Product</h1>

          <form
            className="createProductForm flex flex-col items-center p-2 gap-4"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
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
                value={price}
              />
            </div>

            <div className="flex w-full items-center">
              <DescriptionIcon />

              <textarea className='w-full box-border h-10 pl-4 pt-1 border-solid border-2'
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div className="flex w-full items-center">
              <AccountTreeIcon />
              <select className='w-full box-border h-10 border-solid border-2'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                value={Stock}
              />
            </div>

            <div id="createProductFormFile" className="flex w-full items-center">
              <input className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 
               file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
             file:bg-[#267D49] file:text-white hover:file:bg-[#224F34]s'
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage" className="flex flex-row gap-2">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" className="h-10 w-10"/>
                ))}
            </div>

            <div id="createProductFormImage" className="flex flex-row gap-2">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" className="h-10 w-10"/>
              ))}
            </div>

            <input
              id="createProductBtn"
              type="submit"
              value='Update'
              className="bg-[#224F34] text-white w-full p-3 cursor-pointer rounded-2xl "
            />
          </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
