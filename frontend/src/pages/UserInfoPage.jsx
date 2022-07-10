import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Container, Row, Col, Card, Button} from "react-bootstrap"
import avatar from "../assets/images/avatar.jpg"
import { useSelector, useDispatch} from 'react-redux'
import { getUserInfo, reset } from '../features/auth/userSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/shared/Spinner'
import moment from 'moment'
const UserInfoPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const {userInfo, isError, isLoading, isMessage} = useSelector(state => state.user)
    useEffect(() => {
        if(isError) {
            toast.error(isMessage, {autoClose:1000})
        }
        dispatch(getUserInfo(params.id))
        dispatch(reset)
    }, [isError, dispatch])

    if(isLoading) {
        return <Spinner />
    }
  return (
    <Container>
        <Row>
            <Col className="col-md-6 mx-auto text-center">
                {userInfo !== null && (<>
                    <Card>
                        <Card.Img className='profileImgDiv' src={userInfo.avatar ? userInfo.avatar  : avatar} />
                        <p className='mt-2'> Member Since: {moment(userInfo.createdAT).format("DD MMM YYYY")}</p>
                        <Card.Body>
                            <h2>Name: {userInfo.name}</h2>
                            <h5>Profession: {userInfo.profession}</h5>
                            <h5>Email: {userInfo.email}</h5>
                            <h5>Bio: {userInfo.bio}</h5>
                            <h5>Address: {userInfo.address}</h5>
                            <h5>Phone: {userInfo.phone}</h5>
                            <Button className='my-3' style={{width:"100%"}}>Add Friend</Button>
                        </Card.Body>
                    </Card>
                </>)}
            </Col>
        </Row>
    </Container>
  )
}

export default UserInfoPage