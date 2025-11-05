import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import './landingpage.css'

function Landingpage() {
  return (
    <div>
      <section id='bg1'>
        <div className='row pt-5'>
          <div className='col-12 col-md-4'></div>
          <div className='col-12 col-md-4 box py-5 border rounded mt-5 text-center'>
            <h3>Designed to get hired.</h3>
            <h4>Your skills, your story, your next job - all in one</h4>
            <Link to={'/resume-generator'}>
              <Button sx={{ backgroundColor: 'rgb(53,4,99)' }}
                variant="contained">
                Make your Resume
              </Button>
            </Link>
          </div>
          <div className='col-12 col-md-4'></div>
        </div>
      </section>

      <section className='p-5'>
        <h3 className='text-center'>Tools</h3>
        <div className='row'>
          <div className='col-12 col-md-6 p-5'>
            <h4>Resume</h4>
            <p>Create unlimited new resumes and easily edit them afterwards.
            </p>
            <h4>Cover Letters</h4>
            <p>Easily write professional cover letters.
            </p>
            <h4>Jobs</h4>
            <p>Automatically receive new and relevant job postings.
            </p>
            <h4>Applications</h4>
            <p>Effortlessly manage and track your job applications in an organized manner.
            </p>
          </div>
          <div className='col-12 col-md-6'>
            <img src="https://imgs.search.brave.com/CBv0Vl0B_yI0Mr76OzGMtzA8df-ItEhlacAWhd6bDcM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aW1hZ2VzLnpldHku/Y29tL2ltYWdlcy96/ZXR5L2xhbmRpbmdz/L3RlbXBsYXRlcy90/ZW1wbGF0ZXNAMngu/d2VicA" width={'70%'} alt="" />
          </div>
        </div>
      </section>

      <section>
        <div className='row p-5'>
          <h3 className='text-center my-3'>Testimony</h3>
          <div className='col-12 col-md-6'>
            <h4>Trusted by professionals worlwide.</h4>
            <p>
              At LiveCareer, we don't just help you create résumés — we help you land the job. Whether you're a seasoned professional or just starting out, our tools are designed to get results.</p>
            <p>In fact, users who used LiveCareer reported getting hired an average of 48 days faster.
            </p>
            <p>Join thousands of job-seekers who’ve fast-tracked their careers with a résumé that truly stands out.
            </p>
          </div>
          <div className='col-12 col-md-6'>
            <div className="row">
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid1.png" alt="" />
              </div>
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid2.png" alt="" />
              </div>
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid7.png" alt="" />
              </div>
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid3.png" alt="" />
              </div>
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid7.png" alt="" />
              </div>
              <div className="col-3">
                <img src="https://assets.livecareer.co.uk/blobimages/lcintl-lp/luk/images/grid/grid3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landingpage
