import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import { getAllFriend, reset } from '../features/friend/friendSlice'
import Spinner from "../components/shared/Spinner"
import FriendList from '../components/FriendList'
import {toast} from "react-toastify"
const UserFriend = () => {
  const dispatch = useDispatch()
  const {friends, isError, isLoading, isMessage} = useSelector(state => state.friend)


  useEffect(() => {
    if(isError) {
      toast.error(isMessage, {autoClose:1000})
    }
    dispatch(getAllFriend())
    dispatch(reset())
  },[isError, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
        <Container className="mx-auto text-center my-4">
            <Row className="mx-auto">
                <h2>All Your Friends</h2>
                {(friends.length) > 0 ? (<>
                    <Row className="mx-auto">
                        {friends.map(friend =>(<FriendList key={friend.id} friend={friend} />))}                
                    </Row>
                </>) : (<>
                    <h2 className='text-center my-4'>No Friend Yet!</h2>
                    <Link to="/alluser">All User</Link>
                </>)}
            </Row>
        </Container>
    </>
  )
}

export default UserFriend