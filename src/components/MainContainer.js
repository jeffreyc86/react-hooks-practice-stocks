import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [ stocks, setStocks ] = useState([])
  const [sortBy, setSortBy] = useState("None")
  const [filter, setFilter] = useState("")

  useEffect(()=>{
    fetch('http://localhost:3001/stocks')
    .then(r => r.json())
    .then(stockArr => {
      const stockArray = stockArr.map((s)=>{
        return {...s, bought: false}
      })
      setStocks(stockArray)
    })
  },[])


  function updateStock(stock){
    const newArr = stocks.map((s)=> {
      if (s.id === stock.id){
        return stock
      } else {
        return s
      }
    })

    setStocks(newArr)
  }

  const filteredArr = stocks.sort((a, b) => {
    if (sortBy === "None") {
      return 0
    } else if (sortBy === "Alphabetically") {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    } else {
      return a.price - b.price
    }
  }).filter(stock => {
    return stock.type.toLowerCase().includes(filter.toLocaleLowerCase())
  })





  const purchasedStocks = filteredArr.filter((s)=>{return s.bought})
  
  return (
    <div>
      <SearchBar setSortBy={setSortBy} filter={filter} setFilter={setFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredArr} updateStock={updateStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={purchasedStocks} updateStock={updateStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
