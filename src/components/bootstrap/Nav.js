import React from "react"
import {Navbar} from "react-bootstrap"
import {Link} from "react-router-dom"

const Nav = props => {

  let nav
  if (props.login === '' || props.login === '-1')
    nav = <Navbar.Brand as={Link} to="/login">Connexion</Navbar.Brand>
  else nav =
    <>
      <Navbar.Brand as={Link} to="/profile">Mes informations</Navbar.Brand>
      <Navbar.Brand as={Link} to="/logout">Déconnexion</Navbar.Brand>
      <Navbar.Text>Connecté : {props.login}</Navbar.Text>
    </>
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">Ma salle</Navbar.Brand>
      <Navbar.Brand as={Link} to="/workshops">Ateliers</Navbar.Brand>
      <Navbar.Brand as={Link} to="/drinks">Boissons</Navbar.Brand>
      <Navbar.Brand as={Link} to="/about">A propos</Navbar.Brand>
      {nav}
    </Navbar>
  )
}

export default Nav