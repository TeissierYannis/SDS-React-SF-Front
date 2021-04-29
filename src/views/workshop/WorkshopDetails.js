import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import axios from "../../plugins/AxiosInterceptor"
import {Card, Table} from "react-bootstrap"

import Comment from "../../components/Comment/Comment"

const WorkshopDetails = props => {

  const [workshop, setWorkshop] = useState([])
  const [title, setTitle] = useState('')
  const [msg, setMsg] = useState('')

  const {id} = useParams()

  const handleAddComment = e => {
    e.preventDefault()
    axios.post('/api/commentaire/atelier/' + id, {
      titre: title,
      message: msg
    }).then((res) => {
      workshop.commentaires.push(res.data)
      setWorkshop(workshop)
      setTitle('')
      setMsg('')
    }, (err) => {
      console.log('Workshop Comment : ' + err)
    })
  }

  const handleDeleteComment = id => {
    axios.delete('/api/commentaire_ateliers/' + id)
      .then((res) => {
        setWorkshop({
          ...workshop,
          commentaires: workshop.commentaires.filter(
            commentaire => {
              return commentaire.id !== id
            }
          )
        })
      }, (err) => {
        console.log('Workshop delete error: ' + err)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = '/api/ateliers/' + id
      await axios.get(url)
        .then((res) => {
          setWorkshop(res.data)
        }, (err) => {
          console.log('Workshop Details: ' + err)
        })
    }
    fetchData()
  }, [])

  if (workshop) {
    return (
      <div className="container">
        <h3>Atelier : {workshop.titre} </h3>
        <Table> {
        }
          <tbody>
          <tr>
            <td>Description</td>
            <td>{workshop.description}</td>
          </tr>
          <tr>
            <td>Unité d'intensité</td>
            <td>{workshop.unitedintensite}</td>
          </tr>
          <tr>
            <td>Unité de performance</td>
            <td>{workshop.unitedeperformance}</td>
          </tr>
          </tbody>
        </Table>

        <form onSubmit={handleAddComment}>
          <Card>
            <Card.Header>Nouveau commentaire</Card.Header>
            <Card.Body>
              <Card.Title>
                <input type="text" placeholder="Titre de mon commentaire" name="Titre" value={title} onChange={e => { setTitle(e.target.value)}} />
              </Card.Title>
              <Card.Text>
                <textarea placeholder="Mon commentaire" name="Message" value={msg} cols="50" rows="25" onChange={e => { setMsg(e.target.value)}} />
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <button className="input-submit">Ajouter</button>
            </Card.Footer>
          </Card>
        </form>

        <h3>Commentaires</h3>

        { workshop.commentaires === undefined ? (
          <>
            Aucun commentaires
          </>
        ) : (
          <>
            { workshop && workshop.commentaires.map(comment => (
              <Comment key={comment.id} comment={comment} login={props.login} handleDeleteComment={handleDeleteComment}/>
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

export default WorkshopDetails