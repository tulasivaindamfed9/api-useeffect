import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
function Homepage() {
  
  const [productList, setProductList] = useState([]);

  // creating usestate for category of products to display while selecting
  const [selectCategory,updatedCategory]=useState("")
  const [filterListData,setFilterListData]=useState([])
  // Fetching the fake products from api call using get method
  async function getProductList() {
    const url = await axios.get("https://api.escuelajs.co/api/v1/products");
    const response = url.data;
    console.log("reponse", response);
    setProductList(response);//updating the data in setProductList from where it goes to productList
  }
  // // Display all products without using filter at start
  // useEffect(()=>{
  //   getProductList();
  // },[])
  useEffect(() => {
    // passing getProductList function inside useeffect to show all products once
    getProductList();
    // filtering the product list based on catergory
    const filteredList=productList.filter((copyofProductList)=>{
      return copyofProductList.category.name===selectCategory
    })
    //storing the filtered data in usestate "setFilterListData" 
    setFilterListData(filteredList)
  }, [selectCategory]);

  function getitemList(event){
    console.log(event.target.value)
    updatedCategory(event.target.value)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <select onChange={getitemList}>
              <option>Electronics</option>
              <option>Clothes</option>
              <option>Furniture</option>
              <option>Miscellaneous</option>
              <option>Shoes</option>
            </select>
          </div>
         
              {filterListData.map((each) => {
                return (
                  <div className="col-3" key={each.id}>
                    <div className="card" style={{ width: "18rem" }}>
                      <img
                        className="card-img-top"
                        src={
                          each.images && each.images.length > 0
                            ? each.images[0]
                            : "https://via.placeholder.com/150"
                        }
                        alt={each.title}
                      />

                      <div className="card-body">
                        <h3>{each.category.name}</h3>
                        <h5 className="card-title">{each.title}</h5>
                       
                      </div>
                    </div>
                  </div>
                );
              })}
         
         

         
        </div>
      </div>
    </>
  );
}
export default Homepage;
