import React, {useState, useEffect} from 'react'
import { Card, Button, Spinner } from 'react-bootstrap'
import FileBase64 from 'react-file-base64'
import { updateProfile, reset } from '../features/auth/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"
const UserUpdateForm = ({user}) => {
    const dispatch = useDispatch()
    const {isError, isLoading, isSuccess, isMessage} = useSelector(state => state.user)
    useEffect(() => {
        if(isError) {
            toast.error(isMessage, {autoClose:1000})
        }
        if(isSuccess) {
            toast.success("Profile Updated", {autoClose:1000})
            dispatch(reset())
        }
    }, [isError, isSuccess, isMessage, dispatch])
    const [formData, setFormData] = useState(user)
    const {name, email, profession, avatar, bio, address, phone } = formData
    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(formData))
    }
    if(isLoading) {
        return <Spinner animation="border" />
    }
  return (
    <>
        <Card>
            <Card.Header className="text-center">
                <h3>Update Your Profile Information</h3>
            </Card.Header>
            <Card.Body>
                <form onSubmit={onSubmit}>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='name'>Your Name</label>
                        <input 
                            className="form-control" 
                            type="name" 
                            id='name' 
                            placeholder='Your Name'
                            value={name}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='email'>Your Email</label>
                        <input 
                            className="form-control" 
                            type="email" 
                            id='email' 
                            placeholder='Your Email' 
                            value={email}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='profession'>Your Profession</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            id='profession' 
                            placeholder='Your Profession' 
                            value={profession}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='phone'>Write something about yourself</label>
                        <textarea 
                            className="form-control"
                            id="bio" 
                            rows={3} 
                            value={bio} 
                            onChange={onChange}
                            placeholder= "About yourself"
                            
                        ></textarea>
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='phone'>Your Phone</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            id='phone' 
                            placeholder='Your Phone' 
                            value={phone}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor='address'>Your Address</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            id='address' 
                            placeholder='Your Address'
                            value={address}
                            onChange={onChange} 
                        />
                    </div>
                    <div className="form-group my-2">
                        <label className='my-2' htmlFor="avatar">Profile Picture</label> <br/>
                        <FileBase64
                            type="file" 
                            multiple={ false} 
                            onDone={({base64})=> setFormData({...formData, avatar: base64})}
                        />
                        {avatar && <Card.Img className='mt-3 profileImgDiv' variant="top" src={ avatar } />}
                    </div>
                    <Button className='my-4' type='submit' variant="primary" style={{width: "100%"}}>Update Profile</Button>
                </form>
            </Card.Body>
        </Card>
    </>
  )
}

export default UserUpdateForm