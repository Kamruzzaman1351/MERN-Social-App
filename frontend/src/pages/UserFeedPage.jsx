import React, {useEffect} from 'react'
import {Container, Row, Col, Spinner } from "react-bootstrap"
import FeedItem from '../components/FeedItem'
import FeedForm from '../components/FeedForm'
import UserProfile from '../components/UserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { getAllFeeds, reset } from '../features/feed/feedSlice'
import { toast } from 'react-toastify'


const UserFeedPage = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
  const {feeds, isLoading, isError, isMessage} = useSelector(state => state.feeds)
  useEffect(() => {
    if(isError) {
      toast.error(isMessage, {autoClose:1000})
    }
    if(isMessage) {
      toast.info(isMessage, {autoClose:1000})
    }
    dispatch(getAllFeeds())
    dispatch(reset())
  }, [isError, dispatch, isMessage])
  return (
    <>
      <Container fluid>
        <Row className='px-2 my-3'>
          <Col md={3} className="my-3">
            <UserProfile user={user} />
          </Col>
          <Col md={6} className="feedItem my-3">
            <div className='py-3'>
              <h3>All Feeds</h3>
              {isLoading && <Spinner animation="border" role="status" />}
              {feeds.length > 0 ? (<>
                {feeds.map((feed) => (
                  <FeedItem key={feed._id} feed={feed} />
                ))}
                  </>) : (<>
                    <h3>No Feed Yet</h3>
                  </>)
              }
            </div>
          </Col>
          <Col md={3} className="my-3">
            <FeedForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default UserFeedPage