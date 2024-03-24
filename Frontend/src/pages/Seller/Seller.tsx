import style from "./Seller.module.css";
import { Logo, Button, Input, Select } from "../../components";
import { useForm } from "react-hook-form";
import { registerSeller } from "../../api/seller.api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Seller = () => {
  const { register, handleSubmit, watch } = useForm();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const userId = useSelector((state) => state?.auth?.userData?._id);

  const handleRegisterSeller = async (data: any) => {
    try {
      const { storeLogo } = data;
      const formData = new FormData();
      formData.append("storeName", data.storeName);
      formData.append("whatsappNumber", data.whatsappNumber);
      formData.append("storeLogo", storeLogo[0]);
      formData.append("gstNumber", data.gstNumber);
      formData.append("street", data.street);
      formData.append("country", data.country);
      formData.append("state", data.state);
      formData.append("city", data.city);
      formData.append("pincode", data.pincode);
      formData.append("userId", userId);

      const response = await registerSeller(formData);
      if (response.statusCode === 200) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error calling registerSeller API:", error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      setCountries(data.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          country: watch("country"),
        }
      );
      setStates(data.data.states);
    })();
  }, [watch("country")]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          country: watch("country"),
          state: watch("state"),
        }
      );
      setCities(data.data);
    })();
  }, [watch("state")]);

  return (
    <div className={style.body}>
      <div className={style.CenterBody}>
        <div className={style.logo}>
          <Logo/>
        </div>
        <h2 className={style.heading}> SELLER REGISTERATION</h2>
        <form onSubmit={handleSubmit(handleRegisterSeller)}>
          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Store Name"
              label="Store Name"
              {...register("storeName", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Whatsapp Number"
              label="Whatsapp Number"
              {...register("whatsappNumber", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Store Logo"
              label="Store Logo"
              type="file"
              {...register("storeLogo", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="GST Number"
              label="GST Number"
              {...register("gstNumber", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="House No., Street, Area ..."
              label="Full Address"
              {...register("street", { required: true })}
            /></div>

          <div className={style.inputBox}>
            <Select
              style={{ marginTop: "5px" }}
              label="Country"
              options={countries.map((country) => country.name)}
              {...register("country", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Select
              style={{ marginTop: "5px" }}
              label="State"
              options={states.map((state) => state.name)}
              {...register("state", { required: true })}
            />
          </div>


          <div className={style.inputBox}>
            <Select
              style={{ marginTop: "5px" }}
              label="City"
              options={cities}
              {...register("city", { required: true })}
            />
          </div>



          <div className={style.inputBox}>
            <Input
              style={{ marginTop: "5px" }}
              placeholder="Pincode"
              label="Pincode"
              {...register("pincode", { required: true })}
            />
          </div>

          <Button className={style.button} type="submit">Submit</Button>
        </form>
      </div>

    </div>
  );
};

export default Seller;
