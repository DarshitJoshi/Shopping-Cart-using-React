import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  console.log(search);
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined")
      setfilteredProducts(products);
    if (category != "undefined") {
      setfilteredProducts(products.filter((p) => p.category == category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav />
      <div className="w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              key={i}
              to={`/details/${p.id}`}
              className="mb-3 mr-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex-col flex justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="hover:text-blue-300">{p.title}</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loading></Loading>
  );
};

export default Home;
