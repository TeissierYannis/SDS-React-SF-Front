import React, {useState, useEffect} from "react"
import {Table} from "react-bootstrap"
import axios from "axios";

const Profile = props => {

  const [user, setUser] = useState({})

  const token = props.token

  useEffect(async () => {

    if (token !== '-1' && token !== '') {
      const headers = 'Bearer ' + token
      await axios.get('getCurrentUser')
        .then((res) => {
          setUser(res.data)
        }, (err) => {
          console.log('Profile : ' + err)
        })
    }

  }, [props.token]);

  if (user) {
    return (
      <div className="container">
        <h1>Mon profil</h1>
        <Table>
          <tbody>
          <tr>
            <td>Identifiant</td>
            <td>{ user.id }</td>
          </tr>
          <tr>
            <td>Nom</td>
            <td>{ user.nomUtilisateur }</td>
          </tr>
          <tr>
            <td>Prénom</td>
            <td>{ user.prenomUtilisateur }</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{ user.email }</td>
          </tr>
          </tbody>
        </Table>

      </div>
    )
  } else {
    return <div className="container">
      En chargement...
    </div>
  }

}

export default Profile