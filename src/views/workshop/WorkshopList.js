import React, {useEffect, useState} from "react"
import axios from "../../plugins/AxiosInterceptor"
import {Link} from "react-router-dom"

const WorkshopList = props => {
  const [workshops, setWorkshops] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('api/ateliers')
        .then((res) => {
          setWorkshops(res.data)
        }, (err) => {
          console.log('WorkshopList: ' + err)
        })
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <h1>Nos ateliers</h1>
      <ul>
        {workshops && workshops.map(workshop => (
          <li key={workshop.id}>
            <Link to={`/workshop/${workshop.id}`}>
              <img src={`http://127.0.0.1:8000/image/${workshop.image}`} width="30" height="30" alt=""/>
              {workshop.id} {workshop.titre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WorkshopList
