import React from 'react'
import { FaFile } from 'react-icons/fa'
import { LiaFileDownloadSolid } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

function Resumegenerator() {
  return (
    <div>
      <div className='row my-5 d-flex justify-content-evenly text-center'>
        <h3 className='text-center my-5'>Create a job-winning Resume in minutes</h3>
        <div className='col-4 border shadow p-5 text-cen'>
          <FaFile className='fs-1 my-3 text-primary'/>
          <h4>Add your information</h4>
          <p>Add pre-written examples to each section</p>
          <h5>Step 1</h5>
        </div>
        <div className='col-4 border shadow p-5 text-center'>
          <LiaFileDownloadSolid className='fs-1 my-3 text-danger'/>
          <h4>Download your Resume</h4>
          <p>Download and start appliying</p>
          <h5>Step 2</h5>
        </div>
        <Link to={'/form'}>
          <Button sx={{ backgroundColor: 'rgb(53, 4, 99)'}}
          className='my-5' variant='contained'>Let's Start</Button>
        </Link>
      </div>
    </div>
  )
}

export default Resumegenerator
