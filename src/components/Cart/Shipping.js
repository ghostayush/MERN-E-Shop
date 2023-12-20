import React,{ Fragment, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>

    <CheckoutSteps activeStep={0} />

    <div className="shippingContainer h-auto min-h-screen flex sm:items-center justify-center">
      <div className="shippingBox w-4/5 sm:w-2/4 lg:w-1/4 h-full flex flex-col items-center gap-2 bg-[#C2EFD4] mb-10">
        <h2 className=" text-2xl text-[#224F34] text-center font-medium pt-5">Shipping Details</h2>

        <form
          className="shippingForm flex flex-col items-center  p-4 gap-4"
          encType="multipart/form-data"
          onSubmit={shippingSubmit}
        >
          <div className='flex w-full items-center'>
            <HomeIcon />
            <input className='w-full box-border h-16 p-4 border-solid border-2'
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className='flex w-full items-center'>
            <LocationCityIcon />
            <input className='w-full box-border h-16 p-4 border-solid border-2'
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className='flex w-full items-center'>
            <PinDropIcon />
            <input className='w-full box-border h-16 p-4 border-solid border-2'
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>

          <div className='flex w-full items-center'>
            <PhoneIcon />
            <input className='w-full box-border h-16 p-4 border-solid border-2'
              type="number"
              placeholder="Phone Number"
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              size="10"
            />
          </div>

          <div className='flex w-full items-center'>
            <PublicIcon />

            <select className='w-full box-border h-16 p-4 border-solid border-2'
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {country && (
            <div className='flex w-full items-center'>
              <TransferWithinAStationIcon />

              <select className='w-full box-border h-16 p-4 border-solid border-2'
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <input
            type="submit"
            value="Continue"
            className="shippingBtn bg-[#224F34] text-white m-0 w-full p-3 cursor-pointer rounded-2xl shadow-md"
            disabled={state ? false : true}
          />
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default Shipping