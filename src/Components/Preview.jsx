import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { FaFileDownload } from 'react-icons/fa';
import Edit from '../Components/Edit.jsx';
import { FaHistory } from 'react-icons/fa';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
import { addDownloadHistoryAPI } from '../services/allAPI.js';

function Preview({ userInput, finish, resumeId, setUserInput }) {
  const [downloadStatus, setDownloadStatus] = useState(false);

  console.log(userInput);

  const downloadCV = async () => {
    try {
      // Get element for screenshot
      const input = document.getElementById('result');
      
      if (!input) {
        console.error('Element with id "result" not found');
        return;
      }

      // Create canvas with higher quality
      const canvas = await html2canvas(input, { 
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgURL = canvas.toDataURL('image/png');

      // Create PDF with better quality
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate proper scaling
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgURL, 
        'PNG', 
        imgX, 
        imgY, 
        imgWidth * ratio, 
        imgHeight * ratio
      );
      
      pdf.save(`${userInput.personalDetails.name || 'resume'}.pdf`);

      // ✅ FIX 2: Correct timestamp with parentheses ()
      const localTimeDate = new Date();
      const dateString = localTimeDate.toLocaleDateString();
      const timeString = localTimeDate.toLocaleTimeString();
      const timeStamp = `${dateString}, ${timeString}`;
      
      console.log('Saving download history with timestamp:', timeStamp);

      // Save to download history
      try {
        const result = await addDownloadHistoryAPI({ 
          ...userInput, 
          imgURL, 
          timeStamp 
        });
        console.log('Download history saved:', result);
        setDownloadStatus(true);
      } catch (err) {
        console.error('Error saving download history:', err);
        setDownloadStatus(true); // Still show history button
      }

    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  return (
    <>
      <div>
        <div style={{ marginTop: '100px' }}>
          {/* ✅ FIX 3: Use !== instead of != */}
          {userInput.personalDetails.name !== "" && (
            <div className="flex-column">
              {finish && (
                <div className="d-flex justify-content-end align-items-center mb-3">
                  {/* download */}
                  <button 
                    onClick={downloadCV} 
                    className='btn fs-3 text-primary'
                    title="Download Resume"yayayay
                  >
                    <FaFileDownload />
                  </button>
                  
                  {/* edit */}
                  <div><Edit resumeId={resumeId} setUpdateResume={setUserInput} /></div>
                  
                  {/* history */}
                  {downloadStatus && (
                    <Link 
                      to={'/history'} 
                      className='btn fs-3 text-primary'
                      title="View History"
                    >
                      <FaHistory />
                    </Link>
                  )}
                  
                  {/* back to generator */}
                  <Link to={'/resume-generator'} className='text-primary'>
                    BACK
                  </Link>
                </div>
              )}

              <Box>
                {/* ✅ FIX 4: Add padding to Paper */}
                <Paper elevation={12} id='result' sx={{ padding: 3 }}>
                  {/* ✅ FIX 5: Use variant (not varient) and component prop */}
                  <Typography variant='h4' component='h1' align='center'>
                    Name: {userInput.personalDetails.name}
                  </Typography>
                  
                  <Typography variant='h6' component='h2' align='center' color="text.secondary">
                    Job Title: {userInput.personalDetails.jobTitle}
                  </Typography>
                  
                  <Typography variant='body2' align='center' sx={{ mt: 1 }}>
                    {userInput.personalDetails.location} | {userInput.personalDetails.email} | {userInput.personalDetails.phone}
                  </Typography>
                  
                  {/* ✅ FIX 6: Use <a> tags for external links, not <Link> */}
                  <Typography variant='body2' align='center' mb={4}>
                    {userInput.personalDetails.github && (
                      <>
                        <a 
                          href={userInput.personalDetails.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Github
                        </a>
                        {(userInput.personalDetails.linkedIn || userInput.personalDetails.portfolio) && ' | '}
                      </>
                    )}
                    {userInput.personalDetails.linkedIn && (
                      <>
                        <a 
                          href={userInput.personalDetails.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                        {userInput.personalDetails.portfolio && ' | '}
                      </>
                    )}
                    {userInput.personalDetails.portfolio && (
                      <a 
                        href={userInput.personalDetails.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Portfolio
                      </a>
                    )}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }}>Summary</Divider>
                  {/* ✅ FIX 7: Remove nested <p> tag */}
                  <Typography mb={3}>
                    {userInput.summary}
                  </Typography>
                  
                  <Divider sx={{ my: 2 }}>Education</Divider>
                  {/* ✅ FIX 8: Remove nested heading tags */}
                  <Typography variant='h6' component='h3' align='center'>
                    {userInput.education.course}
                  </Typography>
                  <Typography variant='body2' align='center' mb={2}>
                    {userInput.education.college} | {userInput.education.university} | {userInput.education.year}
                  </Typography>

                  {/* ✅ FIX 9: Fix typo "Proffessional" */}
                  <Divider sx={{ my: 2 }}>Professional Experience</Divider>
                  <Typography variant='h6' component='h3' align='center'>
                    {userInput.experience.job}
                  </Typography>
                  <Typography variant='body2' align='center' mb={2}>
                    {userInput.experience.company} | {userInput.experience.location} | {userInput.experience.duration}
                  </Typography>

                  <Divider sx={{ my: 2 }}>Skills</Divider>
                  {/* ✅ FIX 10: Add key prop to mapped items */}
                  <Stack spacing={2} direction="row" sx={{ flexWrap: 'wrap', gap: "10px", padding: '10px' }}>
                    {userInput.skills.map((skill, index) => (
                      <Button key={index} variant="contained" size="small">
                        {skill}
                      </Button>
                    ))}
                  </Stack>
                </Paper>
              </Box>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Preview;