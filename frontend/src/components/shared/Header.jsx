import React from 'react'
import {Link} from "react-router-dom"
import {Container, Stack} from "react-bootstrap"
const Header = () => {
  return (
    <nav className="bg-primary p-3 text-white mb-3">
      <Container fluid>
        <div>
          <Stack direction="horizontal" gap={3}>
            <Link to={ false? "/feeds" : "/"}>
              <h2 className="text-white link">Social App</h2>
            </Link>
            {false ? (<>
              <div className="ms-auto">
                <Link to="/profile" className='text-white menuItem'>Profile</Link>
              </div>
              <div>
                <Link to="/feeds" className='text-white menuItem'>My Feed</Link>
              </div>
              <div>
                <h5 className='text-white menuItem'>Logout</h5>
              </div>
              
            </>) : (<>
              <div className="ms-auto">
                <Link to="/signin" className='text-white menuItem'>LogIn</Link>
              </div>
              <div>
                <Link to="/signup" className='text-white menuItem'>SignUp</Link>
              </div>
            </>
            )}
          </Stack>
        </div>
      </Container>
    </nav>
  )
}

export default Header