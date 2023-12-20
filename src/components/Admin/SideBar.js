import React from 'react'
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const SideBar = () => {
  return (
    <div className="sidebar p-8 flex flex-col gap-8 border-r-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 bg-[#C2EFD4]">
      <Link to="/">
        <h1 className='text-center sm:text-start text-6xl sm:text-5xl lg:text-6xl text-[#224F34]'>ESHOP</h1>
      </Link>
      <Link to="/admin/dashboard">
        <p className='text-center sm:text-start text-xl sm:text-lg text-[#267D49]'>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
      <div className='flex justify-center sm:justify-start text-[#267D49]'>
        <TreeView 
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
        </div>
      </Link>
      <Link to="/admin/orders">
        <p className='text-center sm:text-start text-xl sm:text-lg text-[#267D49]'>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p className='text-center sm:text-start text-xl sm:text-lg text-[#267D49]'>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p className='text-center sm:text-start text-xl sm:text-lg text-[#267D49]'>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default SideBar