import React, {useEffect, useState} from 'react'
import {Container, Row, Col, Spinner} from "react-bootstrap"
import {FaSearch} from "react-icons/fa"
import UserItem from '../components/UserItem'
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import { getAllUsers, reset } from '../features/auth/userSlice'
const UserLists = () => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState("")
    const {allUsers, isLoading, isError, isMessage} = useSelector(state => state.user)
    useEffect(() => {
        if(isError) {
            toast.error(isMessage, {autoClose:1000})
        }
        dispatch(getAllUsers())
        dispatch(reset())
    }, [isError, dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(searchText)
    }



  return (
    <>
        <Container>
            <div className="mx-auto text-center userSearch my-4">
                <h2>All Users</h2>
                <Row>
                    <Col md={6} className="mx-auto text-center">
                        <form onSubmit={onSubmit}>
                            <div className="input-group my-3">
                                <input 
                                    type="text"  
                                    className="form-control" 
                                    placeholder="Search For User..." 
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    id="search"
                                    />
                                <button type="submit" className="btn btn-primary"><FaSearch /></button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
            <div className='my-2'>
                {isLoading && <Spinner animation="border" />}
                {(allUsers.length) > 0 ? (<>
                    <Row className="mx-auto">
                        {allUsers.map(user =>(<UserItem key={user._id} user={user} />))}                
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