import React, {useEffect, useState} from "react"
import axios from "../../plugins/AxiosInterceptor"
import {Link} from "react-router-dom"

const DrinkList = params => {
  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('api/boissons')
        .then((res) => {
          setDrinks(res.data)
        }, (err) => {
          console.log('Drinks List: ' + err)
        })
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1>Nos boissons</h1>
      <ul>
        {drinks && drinks.map(drink => (
          <li key={drink.id}>
            <Link to={`/drink/${drink.id}`}>
              <img src={`http://127.0.0.1:8000/image/${drink.image}`} width="30" height="30" alt=""/>
              {drink.id} {drink.titre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DrinkList
