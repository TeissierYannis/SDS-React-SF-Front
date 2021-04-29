import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "../../plugins/AxiosInterceptor"
import {Card, Table} from "react-bootstrap";
import Comment from "../../components/Comment/Comment";

const DrinkList = props => {

  const [drink, setDrink] = useState([])
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')

  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const url = '/api/boissons/' + id

      await axios.get(url)
        .then((res) => {
          setDrink(res.data)
        }, (err) => {
          console.error('Drink Details: ' + err)
        })
    }
    fetchData()
  }, [])


  const handleAddComment = e => {
    e.preventDefault()
    axios.post('/api/commentaire/boisson/' + id, {
      titre: title,
      message: msg
    }).then((res) => {
      console.log(res)
      drink.commentaires.push(res.data)
      setDrink(drink)
      setTitle('')
      setMsg('')
    }, (err) => {
      console.error('Drink Comment : ' + err)
    })
  }
  console.log(drink)

  if (drink) {
    return (
      <div>
        <h1>{drink.titre}</h1>
        <img src={`http://127.0.0.1:8000/image/${drink.image}`} alt=""/>

        <Table>
          <tbody>
          <tr>
            <td>Description</td>
            <td>{drink.description}</td>
          </tr>
          </tbody>
        </Table>

        <form onSubmit={handleAddComment}>
          <Card>
            <Card.Header>Nouveau commentaire</Card.Header>
            <Card.Body>
              <Card.Title>
                <input type="text" placeholder="Titre de mon commentaire" name="Titre" value={title} onChange={e => {
                  setTitle(e.target.value)
                }}/>
              </Card.Title>
              <Card.Text>
                <textarea placeholder="Mon commentaire" name="Message" value={msg} cols="50" rows="25" onChange={e => {
                  setMsg(e.target.value)
                }}/>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <button className="input-submit">Ajouter</button>
            </Card.Footer>
          </Card>
        </form>

        <h3>Commentaires</h3>

        {drink.commentaires === undefined ? (
          <>
            Aucun commentaires
          </>
        ) : (
          <>
            {drink && drink.commentaires.map(comment => (
              <Comment key={comment.id} comment={comment} login={props.login}/>
            ))}
          </>
        )}

      </div>
    )
  } else {
    return <div className="container">
      En chargement...
    </div>
  }

}

export default DrinkList