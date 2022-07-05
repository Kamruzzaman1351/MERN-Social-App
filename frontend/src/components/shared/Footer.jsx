import React from 'react'
import {Container } from "react-bootstrap"
const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-secondary mx-auto text-center py-2 text-white mt-5' >
      <Container fluid>
        Created By: 
        <a className='menuItem' href='https://github.com/Kamruzzaman1351' target="_blank" rel="noopener noreferrer"> Kamruzzaman</a>
        <p>Copyright &copy; {currentYear} Social App</p>          
      </Container>
    </footer>
  )
}

export default Footer