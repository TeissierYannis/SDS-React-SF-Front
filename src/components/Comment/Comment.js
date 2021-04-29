import React from "react"
import Moment from 'moment'

import {Card} from "react-bootstrap"

const Comment = ({comment, login, handleDeleteComment}) => {
  console.log(comment)
  return (
    <Card>
      <Card.Header>De <i>{comment.proprietaire === null ? (
        <>anonyme</>
      ) : (
        <>{comment.proprietaire.nomUtilisateur} {comment.proprietaire.prenomUtilisateur}</>
      )}</i> le {Moment(comment.date).format('DD/MM/YYYY à HH:mm')}

        {comment.proprietaire === null ?
          (<>  </>)
          : (<> {comment.proprietaire.login === login ?
            (
              <>
                <button
                  className="input-submit" onClick={e => handleDeleteComment(comment.id) }>
                  Supprimer
                </button>
              </>
            ) : (<></>)
          }
          </>)}
      </Card.Header>
      <Card.Body>
        <Card.Title> {comment.titre} </Card.Title>
        <Card.Text>
          {comment.message}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Comment