import React, { useState } from 'react'
import Steps from '../Components/Steps'
import Preview from '../Components/Preview'


function Form() {

  const [userInput, setUserInput] = useState({
    personalDetails: {
      name: "",
      jobTitle: "",
      location: "",
      email: "",
      phone: "",
      github: "",
      linkedIn: "",
      portfolio: ""
    },
    education: {
      course: "",
      college: "",
      university: "",
      year: ""
    },
    experience: {
      job: "",
      company: "",
      location: "",
      duration: ""
    },
    skills: [],
    summary: ""
  })

  const [finish, setFinish] = useState(false)

  const [resumeId, setResumeId] = useState("")

  return (
    <div>
      <div className="row p-5">
        {finish ?<div className="row">
          <div className="col-3"></div>
          <div className="col-8">
            <Preview userInput={userInput} setUserInput={setUserInput} finish={finish} resumeId={resumeId} />
          </div>
          <div className="col-1"> </div>
        </div>:

        <div className='row p-5'>
          <div className="col-6">

            <Steps userInput={userInput} setUserInput={setUserInput} setFinish={setFinish} setResumeId={setResumeId} />

          </div>

          <div className="col-6">
            <Preview userInput={userInput} resumeId={resumeId} setUserInput={setUserInput} />

          </div>

        </div>
}
      </div>
    </div>
  )
}

export default Form