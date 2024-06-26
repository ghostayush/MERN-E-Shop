import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors,getAllReviews,deleteReviews} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import SideBar from "./SideBar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();
  
    const { error: deleteError, isDeleted } = useSelector((state) => state.review);
    const { error, reviews} = useSelector((state) => state.productReviews);
  
    const [productId, setProductId] = useState("");
  
    const deleteReviewHandler = (reviewId) => {
      dispatch(deleteReviews(reviewId, productId));
    };
  
    const productReviewsSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
          dispatch(getAllReviews(productId));
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (deleteError) {
          alert.error(deleteError);
          dispatch(clearErrors());
        }
    
        if (isDeleted) {
          alert.success("Review Deleted Successfully");
          navigate("/admin/reviews");
          dispatch({ type: DELETE_REVIEW_RESET });
        }
      }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId]);

      const columns = [
        { field: "id", headerName: "Review ID", headerClassName: 'bg-[#C2EFD4] text-white', minWidth: 200, flex: 0.5 },
    
        {
          field: "user",
          headerName: "User",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 200,
          flex: 0.6,
        },
    
        {
          field: "comment",
          headerName: "Comment",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          headerClassName: 'bg-[#C2EFD4] text-white',
          type: "number",
          minWidth: 180,
          flex: 0.4,
    
          cellClassName: (params) => {
            return params.getValue(params.id, "rating") >= 3
              ? "greenColor"
              : "redColor";
          },
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          headerClassName: 'bg-[#C2EFD4] text-white',
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Fragment>
                <Button
                  onClick={() =>
                    deleteReviewHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon className="text-red-500"/>
                </Button>
              </Fragment>
            );
          },
        },
      ];

    const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <Fragment>
      <div className="flex flex-col sm:flex-row  bg-white w-full h-auto">
        <SideBar />
        <div className="productReviewsContainer w-full sm:w-2/3 md:w-9/12 lg:w-4/5 flex justify-center items-center flex-col">
          <form
            className="productReviewsForm bg-[#C2EFD4] w-4/5 mt-10 mb-5 sm:w-2/4 h-auto flex items-center flex-col p-4 gap-4"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading text-2xl">ALL REVIEWS</h1>

            <div className="flex flex-row justify-center items-center">
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                className="w-full h-10"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <input
              id="createProductBtn"
              type="submit"
              value='Search'
              className="bg-[#267D49] text-white w-40 h-10 rounded-md mb-4"
            />

          </form>
          
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable w-11/12 mb-10"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}

        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews