import React, { useState, useContext } from 'react'
import { Button, TextField } from '@material-ui/core';
import { multiStepsContext } from './StepContext';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';


const TripInfoForm = () => {
  const [value, setValue] = useState([null, null]);
  const { setStep, userData, setUserData } = useContext(multiStepsContext)

  const handleNext = () => {
    if (userData.title && userData.start_date && userData.end_date) {
      setUserData({ ...userData, "creator_id": localStorage.getItem('user_id') })
      setStep(3)
    }
  }


  return (
    <>
      < div style={{
        zIndex: '1',
        position: 'absolute',
        top: '14vh',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40vw',
      }}>
        <h4 style={{ color: 'white' }}>Create a New Trip</h4>
        <div style={{ marginBottom: '2rem'}} >
          <TextField
            id="standard-basic"
            label="Title*"
            value={userData['title'] || ""}
            onChange={(e) => setUserData({ ...userData, "title": e.target.value })}
            margin="normal"
            variant="standard"
            color="secondary"
            fullWidth
          />
        </div>

        <div style={{ marginBottom: '3rem'}}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              disablePast
              calendars={2}
              startText="Start date*"
              endText="End date*"
              value={value}
              onChange={(e) => {
                if (e[1]) {
                  setUserData({ ...userData, "start_date": e[0], "end_date": e[1], "date": e })
                  setValue(e)
                }
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 3 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
  
            />
          </LocalizationProvider>

        </div>

        <div style={{ marginBottom: '2rem'}}>
          <TextField
            label="Description"
            value={userData['description'] || ""}
            onChange={(e) => setUserData({ ...userData, "description": e.target.value })}
            fullWidth
            id="fullWidth"
            margin="normal"
            variant="outlined"
            color="secondary"
            multiline
            rows={4}
          />
          <div style={{ padding: "2rem", display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setStep(1)}
              style={{marginRight: '2rem'}}
            >
              Back
            </Button> <span> </span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              style={{marginleft: '2rem'}}
            >
              Next
            </Button>
          </div >
        </div>
      </div>
    </>

  )
}

export default TripInfoForm;