import {useHistory} from 'react-router-dom'

const Logout = props => {

  let history = useHistory();
  const handleSubmitLogout = e => {
    e.preventDefault()
    props.monitorSessionChange("-1", "-1", "-1")
    history.push("/login")
  };

  const handleSubmitCancel = e => {
    e.preventDefault()
    history.push("/");
  };

  return (
    <div className="container">
      <h3>Confirmez-vous la déconnexion ?</h3>
      <table>
        <tbody>
        <tr>
          <td>
            <form onSubmit={handleSubmitLogout} className="form-container">
              <button className="input-submit">Oui</button>
            </form>
          </td>
          <td>
            <form onSubmit={handleSubmitCancel} className="form-container">
              <button className="input-submit">Non</button>
            </form>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
export default Logout