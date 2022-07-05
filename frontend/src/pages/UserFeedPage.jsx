import React from 'react'
import {Container, Row, Col, } from "react-bootstrap"
import FeedItem from '../components/FeedItem'
import FeedForm from '../components/FeedForm'
import UserProfile from '../components/UserProfile'
const UserFeedPage = () => {
  return (
    <>
      <Container fluid>
        <Row className='px-2 my-3'>
          <Col md={3}>
            <UserProfile />
          </Col>
          <Col md={6} className="feedItem">
            <div className='py-3'>
              <h3>All Feeds</h3>
              <FeedItem />
            </div>
          </Col>
          <Col md={3}>
            <FeedForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserFeedPage