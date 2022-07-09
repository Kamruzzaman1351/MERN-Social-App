import React, {useEffect} from 'react'
import {Container, Row, Col, Spinner} from "react-bootstrap"
import {FaSearch} from "react-icons/fa"
import UserItem from '../components/UserItem'
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
const UserLists = () => {
    const dispatch = useDispatch()
    const {allUsers, isLoading, isError, isSuccess} = useSelector(state => state.user)
    
  return (
    <>
        <Container>
            <div className="mx-auto text-center userSearch my-4">
                <h2>All Users</h2>
                <Row>
                    <Col md={6} className="mx-auto text-center">
                        <div className="input-group my-3">
                            <input type="text" className="form-control" placeholder="Search For User..." />
                            <span className="btn btn-primary"><FaSearch /></span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='my-2'>
                {isLoading && <Spinner animation="border" />}
                {allUsers.length > 0 ? (<>
                    <Row className="mx-auto">
                        {allUsers.map(user => (
                            <UserItem key={user._id} user={user} />
                        ))}                
                    </Row>
                </>) : (<>
                    <h2 className='text-center'>No User Yet!</h2>
                </>)}
            </div>
        </Container>
    </>
  )
}

export default UserLists