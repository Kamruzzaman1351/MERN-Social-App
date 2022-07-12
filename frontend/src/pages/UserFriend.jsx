import React, {useEffect} from 'react'
import { Container, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import { getAllFriend, reset } from '../features/friend/friendSlice'
import Spinner from "../components/shared/Spinner"
import FriendList from '../components/FriendList'
import FriendItme from '../components/FriendItme'
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
                {friends[0] && (<>
                    <Row className="mx-auto">
                        {friends[0].map(friend =>(<FriendList key={friend.id} friend={friend} />))}                
                    </Row>
                </>)}   

                <Row className="my-4">
                  {friends[1] && <>
                    <h2 className="my-3">Friend Request Recived</h2>
                    {friends[1].map(friend=> (<FriendItme key={friend.id} friend={friend} />))}
                  </>}
                </Row>              
            </Row>
        </Container>
    </>
  )
}

export default UserFriend