import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { FaEdit } from 'react-icons/fa';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { getResumeAPI, editResumeAPI } from '../services/allAPI';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  height: 'auto',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  '&:focus': {
    outline: 'none'
  }
};

function Edit({ resumeId, setUpdateResume }) {
  const [userInput, setUserInput] = React.useState({
    personalDetails: {
      name: '',
      jobTitle: '',
      location: '',
      email: '',
      phone: '',
      github: '',
      linkedIn: '',
      portfolio: ''
    },
    education: {
      course: '',
      college: '',
      university: '',
      year: ''
    },
    experience: {
      job: '',
      company: '',
      location: '',
      duration: ''
    },
    skills: [],
    summary: ''
  });
  const [userSkill, setUserSkill] = React.useState('');
  const userSkillRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    // Fetch resume data before opening the modal so fields are populated
    if (resumeId) {
      getEditResumeDetails();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  // Fetch resume details from backend
  const getEditResumeDetails = async () => {

    try {
      const result = await getResumeAPI(resumeId);
      console.log('Fetched resume data:', result);
      if (result?.data) {
        setUserInput(result.data);
      }
    } catch (err) {
      console.error('Error fetching resume:', err);
      swal("Error", "Failed to load resume data", "error");
    }
  };

  // Add skill
  const addSkill =()=>{
    if(userSkill){
      if(userInput.skills.includes(userSkill)){
        alert("Skill already exist...add another");
      }else{
        setUserInput({...userInput, skills:[...userInput.skills,userSkill]});
    }
  }

  //  to clear the textbox
  setUserSkill("")
};

  // Remove skill
  const removeSkill = (skill) => {
    setUserInput({
      ...userInput,
      skills: userInput.skills.filter(item => item !== skill)
    });
  };

  // Update resume
  const handleUpdate = async () => {
    try {
      const result = await editResumeAPI(userInput?.id,userInput)
      console.log(result)
      setUpdateResume(result?.data);
      swal("Success", "Resume updated successfully", "success");
      handleClose();

    } catch (err) {
      console.error('Error updating resume:', err);
      swal("Error", "Failed to update resume", "error");
    }
  };

  return (
    <div>
      <button onClick={handleOpen} className='btn text-primary fs-2'>
        <FaEdit />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 3 }}>
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Personal Details */}
            <Box sx={{ mb: 4 }}>
              <h3>Personal Details</h3>
              <div className="d-flex row p-3">
                <TextField
                  label="Full Name"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, name: e.target.value }
                  })}
                  value={userInput.personalDetails?.name}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Job Title"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, jobTitle: e.target.value }
                  })}
                  value={userInput.personalDetails?.jobTitle}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Location"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, location: e.target.value }
                  })}
                  value={userInput.personalDetails?.location}
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </div>
            </Box>

            {/* Contact Details */}
            <Box sx={{ mb: 4 }}>
              <h3>Contact Details</h3>
              <div className="d-flex row p-3">
                <TextField
                  label="Email"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, email: e.target.value }
                  })}
                  value={userInput.personalDetails?.email}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, phone: e.target.value }
                  })}
                  value={userInput.personalDetails?.phone}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Github Profile Link"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, github: e.target.value }
                  })}
                  value={userInput.personalDetails?.github}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="LinkedIn Profile Link"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, linkedIn: e.target.value }
                  })}
                  value={userInput.personalDetails?.linkedIn}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Portfolio Link"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    personalDetails: { ...userInput.personalDetails, portfolio: e.target.value }
                  })}
                  value={userInput.personalDetails?.portfolio}
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </div>
            </Box>

            {/* Educational Details */}
            <Box sx={{ mb: 4 }}>
              <h3>Educational Details</h3>
              <div className="d-flex row p-3">
                <TextField
                  label="Course Name"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    education: { ...userInput.education, course: e.target.value }
                  })}
                  value={userInput.education?.course}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="College Name"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    education: { ...userInput.education, college: e.target.value }
                  })}
                  value={userInput.education?.college}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="University"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    education: { ...userInput.education, university: e.target.value }
                  })}
                  value={userInput.education?.university}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Year of Passout"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    education: { ...userInput.education, year: e.target.value }
                  })}
                  value={userInput.education?.year}
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </div>
            </Box>

            {/* Professional Details */}
            <Box sx={{ mb: 4 }}>
              <h3>Professional Details</h3>
              <div className="d-flex row p-3">
                <TextField
                  label="Job or Internship"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    experience: { ...userInput.experience, job: e.target.value }
                  })}
                  value={userInput.experience?.job}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Company Name"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    experience: { ...userInput.experience, company: e.target.value }
                  })}
                  value={userInput.experience?.company}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Location"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    experience: { ...userInput.experience, location: e.target.value }
                  })}
                  value={userInput.experience?.location}
                  sx={{ mb: 2 }}
                  fullWidth
                />
                <TextField
                  label="Duration"
                  variant="standard"
                  onChange={e => setUserInput({
                    ...userInput,
                    experience: { ...userInput.experience, duration: e.target.value }
                  })}
                  value={userInput.experience?.duration}
                  sx={{ mb: 2 }}
                  fullWidth
                />
              </div>
            </Box>

            {/* Skills */}
            <Box sx={{ mb: 4 }}>
              <h3>Skills</h3>
              <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
                <TextField
                  inputRef={userSkillRef}
                  label='Add Skill'
                  variant='standard'
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(userSkillRef.current?.value);
                    }
                  }}
                  fullWidth
                />
                <Button
                  onClick={() => addSkill(userSkillRef.current.value)}
                  variant='contained'
                >
                  Add
                </Button>
              </Stack>

              {/* Added Skills */}
              <Box sx={{ mt: 2 }}>
                <h5>Added Skills:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {userInput.skills?.length > 0 ? (
                    userInput.skills.map((skill, index) => (
                      <span
                        key={index}
                        className='btn btn-primary d-flex align-items-center justify-content-center'
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className='btn text-light ms-2'
                          type="button"
                        >
                          X
                        </button>
                      </span>
                    ))
                  ) : (
                    <p>No skills added yet</p>
                  )}
                </div>
              </Box>
            </Box>

            {/* Professional Summary */}
            <Box sx={{ mb: 4 }}>
              <h3>Professional Summary</h3>
              <div className="d-flex row p-3">
                <TextField
                  label="Write a short summary of yourself"
                  multiline
                  rows={4}
                  placeholder="E.g., I'm a passionate full-stack developer with hands-on experience in React, Node..."
                  variant="standard"
                  onChange={e => setUserInput({ ...userInput, summary: e.target.value })}
                  value={userInput.summary || ''}
                  fullWidth
                />
              </div>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;