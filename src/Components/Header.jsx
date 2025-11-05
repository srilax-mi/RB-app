import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
function Header() {

  const about = 'A Resume Builder App is an essential tool for job seekers looking to create polished and effective resumes. By combining ease of use with professional design options, these apps empower users to present their qualifications confidently and increase their chances of landing job interviews.'
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <img width={"50px"} src="https://imgs.search.brave.com/xAtzylcbixGZ3MxwMQnYC43bhni4NascCdE0M0Oykw0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9vbmxpbmUt/MTk4LTIyMjMzMS5w/bmc_Zj13ZWJwJnc9/MTI4" alt="Logo" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              <Link to={'/'} style={{textDecoration:"none",color:'white'}}>
              Resume-Builder
              </Link>
            </Typography>
            <Tooltip title={about}>
              <Button color="inherit">About</Button>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Header
