

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./index.css"
import { useNavigate } from 'react-router-dom';

function SearchInputWithToggle() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [userInput, setUserInput] = useState("")
  
  const navigate = useNavigate()

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInput = (event) =>{
    setUserInput(event.target.value)
  }

  const handleData = () =>{
    navigate(`/searchResult?query=${userInput}`)
  }

  return (
    <div className="home-main-container">
      <div className='home-fields-container'>
        <TextField
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div style={{ cursor: 'pointer' }}> 
                  <SearchIcon />
                </div>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body1" style={{ marginRight: '8px' }}>
                  Academic
                </Typography>
                <Switch
                  checked={isToggleOn}
                  onChange={handleToggle}
                  color="success"
                />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '30px', 
              borderColor: isFocused ? 'red' : 'text.disabled', 
            },
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleInput}
        />
        <Button variant="contained" color="success" 
        sx={{textTransform: 'none', borderRadius: '20px', marginTop: '40px'}}
        onClick={handleData}
        >
          Search the web
        </Button>
      </div>
    </div>
  );
}

export default SearchInputWithToggle;