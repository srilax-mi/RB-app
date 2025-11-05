import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addResumeAPI } from '../services/allAPI';
import swal from 'sweetalert';

function Steps({ userInput, setUserInput, setFinish, setResumeId }) {
  const steps = [
    'Basic Information',
    'Contact Details',
    'Education Details',
    'Work Experience',
    'Skills & Certification',
    'Review & Submit'
  ];

  const suggestionSkills = [
    'REACT', 'ANGULAR', 'NODE', 'EXPRESS',
    'MONGODB', 'JAVASCRIPT', 'GIT', 'UI/UX'
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const userSkillRef = React.useRef();

  // Validation Schema for each step
  const validationSchemas = [
    // Step 0: Basic Information
    Yup.object({
      personalDetails: Yup.object({
        name: Yup.string()
          .min(3, 'Name must be at least 3 characters')
          .required('Full name is required'),
        jobTitle: Yup.string()
          .min(2, 'Job title must be at least 2 characters')
          .required('Job title is required'),
        location: Yup.string()
          .min(2, 'Location must be at least 2 characters')
          .required('Location is required'),
      }),
    }),
    // Step 1: Contact Details (Optional step)
    Yup.object({
      personalDetails: Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .notRequired(),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
          .notRequired(),
        github: Yup.string()
          .url('Must be a valid URL')
          .notRequired(),
        linkedIn: Yup.string()
          .url('Must be a valid URL')
          .notRequired(),
        portfolio: Yup.string()
          .url('Must be a valid URL')
          .notRequired(),
      }),
    }),
    // Step 2: Education Details
    Yup.object({
      education: Yup.object({
        course: Yup.string()
          .min(2, 'Course name must be at least 2 characters')
          .required('Course name is required'),
        college: Yup.string()
          .min(2, 'College name must be at least 2 characters')
          .required('College name is required'),
        university: Yup.string()
          .min(2, 'University name must be at least 2 characters')
          .required('University is required'),
        year: Yup.string()
          .matches(/^[0-9]{4}$/, 'Year must be 4 digits')
          .required('Year is required'),
      }),
    }),
    // Step 3: Work Experience
    Yup.object({
      experience: Yup.object({
        job: Yup.string()
          .min(2, 'Job title must be at least 2 characters')
          .required('Job title is required'),
        company: Yup.string()
          .min(2, 'Company name must be at least 2 characters')
          .required('Company name is required'),
        location: Yup.string()
          .min(2, 'Location must be at least 2 characters')
          .required('Location is required'),
        duration: Yup.string()
          .min(2, 'Duration must be at least 2 characters')
          .required('Duration is required'),
      }),
    }),
    // Step 4: Skills
    Yup.object({
      skills: Yup.array()
        .min(1, 'Add at least one skill')
        .required('Skills are required'),
    }),
    // Step 5: Summary
    Yup.object({
      summary: Yup.string()
        .min(20, 'Summary must be at least 20 characters')
        .max(500, 'Summary must not exceed 500 characters')
        .required('Professional summary is required'),
    }),
  ];

  // Initialize Formik
  const formik = useFormik({
    initialValues: userInput,
    validationSchema: validationSchemas[activeStep],
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (activeStep === steps.length - 1) {
        await handleAddResume(values);
      } else {
        handleNext();
      }
    },
  });

  //  KEY FIX: Sync Formik values to parent state in real-time
  React.useEffect(() => {
    setUserInput(formik.values);
  }, [formik.values]);

  // Sync parent state to Formik when step changes
  React.useEffect(() => {
    formik.setValues(userInput);
  }, [activeStep]);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    formik.resetForm();
  };

  const addSkill = (inputSkill) => {
    if (inputSkill) {
      const trimmedSkill = inputSkill.trim().toUpperCase();
      if (formik.values.skills.includes(trimmedSkill)) {
        swal("Duplicate", "Skill already exists", "warning");
      } else {
        formik.setFieldValue('skills', [...formik.values.skills, trimmedSkill]);
        if (userSkillRef.current) {
          userSkillRef.current.value = '';
        }
      }
    }
  };

  const removeSkill = (skill) => {
    formik.setFieldValue(
      'skills',
      formik.values.skills.filter((item) => item !== skill)
    );
  };

  const handleAddResume = async (values) => {
    const { name, jobTitle, location } = values.personalDetails;

    if (name && jobTitle && location) {
      try {
        const result = await addResumeAPI(values);
        console.log(result);
        swal("Success", "Resume added successfully!", "success");
        setFinish(true);
        setResumeId(result?.data?.id || result?.data?._id || null);
      } catch (err) {
        console.log(err);
        swal("Error", "Failed to add resume. Please try again.", "error");
      }
    } else {
      swal("Error", "Please fill all required fields", "error");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3>Personal Details</h3>
            <div className="d-flex row p-3">
              <TextField
                id="name"
                name="personalDetails.name"
                label="Full Name"
                variant="standard"
                value={formik.values.personalDetails.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.name &&
                  Boolean(formik.errors.personalDetails?.name)
                }
                helperText={
                  formik.touched.personalDetails?.name &&
                  formik.errors.personalDetails?.name
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="jobTitle"
                name="personalDetails.jobTitle"
                label="Job Title"
                variant="standard"
                value={formik.values.personalDetails.jobTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.jobTitle &&
                  Boolean(formik.errors.personalDetails?.jobTitle)
                }
                helperText={
                  formik.touched.personalDetails?.jobTitle &&
                  formik.errors.personalDetails?.jobTitle
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="location"
                name="personalDetails.location"
                label="Location"
                variant="standard"
                value={formik.values.personalDetails.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.location &&
                  Boolean(formik.errors.personalDetails?.location)
                }
                helperText={
                  formik.touched.personalDetails?.location &&
                  formik.errors.personalDetails?.location
                }
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <h3>Contact Details</h3>
            <div className="d-flex row p-3">
              <TextField
                id="email"
                name="personalDetails.email"
                label="Email"
                variant="standard"
                value={formik.values.personalDetails.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.email &&
                  Boolean(formik.errors.personalDetails?.email)
                }
                helperText={
                  formik.touched.personalDetails?.email &&
                  formik.errors.personalDetails?.email
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="phone"
                name="personalDetails.phone"
                label="Phone Number"
                variant="standard"
                value={formik.values.personalDetails.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.phone &&
                  Boolean(formik.errors.personalDetails?.phone)
                }
                helperText={
                  formik.touched.personalDetails?.phone &&
                  formik.errors.personalDetails?.phone
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="github"
                name="personalDetails.github"
                label="Github Profile Link"
                variant="standard"
                value={formik.values.personalDetails.github}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.github &&
                  Boolean(formik.errors.personalDetails?.github)
                }
                helperText={
                  formik.touched.personalDetails?.github &&
                  formik.errors.personalDetails?.github
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="linkedIn"
                name="personalDetails.linkedIn"
                label="LinkedIn Profile Link"
                variant="standard"
                value={formik.values.personalDetails.linkedIn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.linkedIn &&
                  Boolean(formik.errors.personalDetails?.linkedIn)
                }
                helperText={
                  formik.touched.personalDetails?.linkedIn &&
                  formik.errors.personalDetails?.linkedIn
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="portfolio"
                name="personalDetails.portfolio"
                label="Portfolio Link"
                variant="standard"
                value={formik.values.personalDetails.portfolio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.personalDetails?.portfolio &&
                  Boolean(formik.errors.personalDetails?.portfolio)
                }
                helperText={
                  formik.touched.personalDetails?.portfolio &&
                  formik.errors.personalDetails?.portfolio
                }
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3>Education Details</h3>
            <div className="d-flex row p-3">
              <TextField
                id="course"
                name="education.course"
                label="Course Name"
                variant="standard"
                value={formik.values.education.course}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.education?.course &&
                  Boolean(formik.errors.education?.course)
                }
                helperText={
                  formik.touched.education?.course &&
                  formik.errors.education?.course
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="college"
                name="education.college"
                label="College Name"
                variant="standard"
                value={formik.values.education.college}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.education?.college &&
                  Boolean(formik.errors.education?.college)
                }
                helperText={
                  formik.touched.education?.college &&
                  formik.errors.education?.college
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="university"
                name="education.university"
                label="University"
                variant="standard"
                value={formik.values.education.university}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.education?.university &&
                  Boolean(formik.errors.education?.university)
                }
                helperText={
                  formik.touched.education?.university &&
                  formik.errors.education?.university
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="year"
                name="education.year"
                label="Year of Passout"
                variant="standard"
                value={formik.values.education.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.education?.year &&
                  Boolean(formik.errors.education?.year)
                }
                helperText={
                  formik.touched.education?.year &&
                  formik.errors.education?.year
                }
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h3>Professional Details</h3>
            <div className="d-flex row p-3">
              <TextField
                id="job"
                name="experience.job"
                label="Job or Internship"
                variant="standard"
                value={formik.values.experience.job}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience?.job &&
                  Boolean(formik.errors.experience?.job)
                }
                helperText={
                  formik.touched.experience?.job &&
                  formik.errors.experience?.job
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="company"
                name="experience.company"
                label="Company Name"
                variant="standard"
                value={formik.values.experience.company}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience?.company &&
                  Boolean(formik.errors.experience?.company)
                }
                helperText={
                  formik.touched.experience?.company &&
                  formik.errors.experience?.company
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="exp-location"
                name="experience.location"
                label="Location"
                variant="standard"
                value={formik.values.experience.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience?.location &&
                  Boolean(formik.errors.experience?.location)
                }
                helperText={
                  formik.touched.experience?.location &&
                  formik.errors.experience?.location
                }
                fullWidth
                margin="normal"
              />
              <TextField
                id="duration"
                name="experience.duration"
                label="Duration"
                variant="standard"
                value={formik.values.experience.duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience?.duration &&
                  Boolean(formik.errors.experience?.duration)
                }
                helperText={
                  formik.touched.experience?.duration &&
                  formik.errors.experience?.duration
                }
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h3>Skills</h3>
            <div className="d-flex row p-3">
              <Box sx={{ width: '100%' }}>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ flexWrap: 'wrap', gap: '10px', padding: '10px' }}
                >
                  <input
                    ref={userSkillRef}
                    type="text"
                    className="form-control"
                    placeholder="Add skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill(userSkillRef.current.value);
                      }
                    }}
                  />
                  <Button
                    onClick={() => addSkill(userSkillRef.current.value)}
                    className="me-3"
                    variant="text"
                    sx={{ maxWidth: '40px' }}
                  >
                    Add
                  </Button>
                </Stack>

                {formik.touched.skills && formik.errors.skills && (
                  <Typography color="error" variant="caption" sx={{ ml: 2 }}>
                    {formik.errors.skills}
                  </Typography>
                )}

                <div>
                  <h5>Suggestions</h5>
                  <div className="d-flex flex-wrap justify-content-between my-3">
                    {suggestionSkills.map((userSkill, index) => (
                      <Button
                        key={index}
                        onClick={() => addSkill(userSkill)}
                        variant="outlined"
                        sx={{ m: 0.5 }}
                      >
                        {userSkill}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h5>Added Skills</h5>
                  <div className="d-flex flex-wrap">
                    {formik.values.skills.length > 0 ? (
                      formik.values.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="btn btn-primary d-flex align-items-center justify-content-center m-1"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="btn text-light ms-2"
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
                </div>
              </Box>
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h3>Professional Summary</h3>
            <div className="d-flex row p-3">
              <TextField
                id="summary"
                name="summary"
                label="Write a short summary about yourself"
                multiline
                rows={4}
                placeholder="E.g., I'm a passionate full-stack developer with experience in React and Node.js..."
                variant="standard"
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.summary && Boolean(formik.errors.summary)}
                helperText={formik.touched.summary && formik.errors.summary}
                fullWidth
                margin="normal"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you're finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box>{renderStepContent(activeStep)}</Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={!formik.isValid && formik.submitCount > 0}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </form>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}

export default Steps;