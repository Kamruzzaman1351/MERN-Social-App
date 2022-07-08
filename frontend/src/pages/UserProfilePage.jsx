import React from 'react'
import {Container, Row, Col} from "react-bootstrap"
import {useSelector} from "react-redux"
import UserProfile from '../components/UserProfile'
import UserUpdateForm from '../components/UserUpdateForm'
const UserProfilePage = () => {
  const {user} = useSelector(state => state.user)
  return (
    <>
      <Container>
        <Row>
          <Col md={3}>
            <UserProfile user={user} />
          </Col>
          <Col md={6}>
            <UserUpdateForm user={user} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserProfilePage