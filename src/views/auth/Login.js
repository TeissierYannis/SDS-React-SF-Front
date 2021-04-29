import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"
import {Alert, Table} from "react-bootstrap"
import axios from "../../plugins/AxiosInterceptor"

const Login = (props) => {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const [boolRefresh, setBoolRefresh] = useState(true)

  let history = useHistory()

  useEffect( () => {
    if (boolRefresh) {
      props.monitorSessionChange('-1', '-1', '-1')
      setBoolRefresh(false)
    }
  }, [props, boolRefresh]);


  const handleSubmit = e => {
    e.preventDefault()

    axios.post('authentication_token', {
        login: id,
        password: password
      }
    ).then((res) => {
      setMsg(<Alert variant='success'>Identification réussie</Alert>)
      props.monitorSessionChange(res.data.token, res.data.refresh_token, id)
      history.push('profile')
    }, (err) => {
      switch (err.response.status) {
        case 401:
          setMsg(<Alert variant='danger'>Identification non valide</Alert>)

          break
        default:
          setMsg(<Alert variant='danger'>Erreur inconnue</Alert>)
          break
      }
    })
  }

return (
  <div className="container">
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Connexion</h3>
      <Table>
        <tbody>
        <tr>
          <td>Identifiant</td>
          <td>
            <input
              type="text"
              placeholder="Votre identifiant : mail"
              name="identifiant"
              value={id}
              onChange={e => {
                setId(e.target.value)
              }}
            />
          </td>
        </tr>
        <tr>
          <td>Mot de passe</td>
          <td>
            <input
              type="password"
              placeholder="Votre mot de passe"
              name="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan="2" align='center'>
            <button className="input-submit">Valider</button>
          </td>
        </tr>
        </tbody>
      </Table>
    </form>
    {msg}
  </div>
)
}

export default Login