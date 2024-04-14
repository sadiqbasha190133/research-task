

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import "./index.css"
import AcademicCard from '../AcademicCard';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const SearchResults = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let query = queryParams.get('query');
  const [academicData, setAcademic] = useState()
  const [nonAcademicData, setNonAcademic] = useState()
  const [academicStatus, setAcademicStatus] = useState(true)
  const [isLoading, setLoadingStatus] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [error, setError] = useState(false)

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchData(query)
  }, [query])

  const fetchData = async (keyword) => {
    setLoadingStatus(true)
    setError(false)
    try {
      const url = 'https://api.gyanibooks.com/search_publication/'
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "keyword": `${keyword}`,
          "limit": "10"
        })
      }

      const response = await fetch(url, options)
      const responseData = await response.json()
      const { data } = responseData
      console.log(data)
      const filterAcademicData = data.filter(eachObject => eachObject.openAccessPdf !== null)
      const filterNonAcademicData = data.filter(eachObject => eachObject.openAccessPdf === null)

      setAcademic(filterAcademicData)
      setNonAcademic(filterNonAcademicData)

      setLoadingStatus(false)

    }
    catch (error) {
      setLoadingStatus(false)
      setError(true)
      console.log(error)
    }

  }

  const onToggle = () => {
    setAcademicStatus(!academicStatus)
  }

  const tilteHeading = academicStatus ? "Academic Results" : "Web Results"

  const handleButtonClick = (event) => {
    console.log(keyword, "target value")
    query = event.target.value
    queryParams.set('query', keyword);
    navigate(`${location.pathname}?${queryParams.toString()}`);
    fetchData(keyword)
  };

  return (

    <div className="search-results-container">
      <div className='back-toggle-icons-container'>
        <div className="back-icon-container">
          <IconButton aria-label="back" onClick={handleBack}>
            <ArrowBackIcon />
            Back
          </IconButton>
        </div>
        <div className="toggle-icon-container">
          <Typography variant="body1" marginTop={'7px'}>
            Academic
          </Typography>
          <Switch
            color='success'
            onChange={onToggle}
            checked={academicStatus}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
                <IconButton
                  color="success"
                  onClick={handleButtonClick}
                  sx={{ backgroundColor: 'success.main' }}
                >
                  <ArrowForwardIcon style={{ color: 'white' }} />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: '30px',
              borderColor: 'green',
            },
          }}
          style={{ width: '50%' }}
        />
      </div>

      <div className='results-container'>
        <h1>{tilteHeading}</h1>
        <ul className='cards-container'>

          {
            isLoading ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="success" />
              </div>
              :

              !error ? academicStatus ? academicData?.map(eachObject => <AcademicCard key={eachObject.paperId} details={eachObject} />)
                : nonAcademicData?.map(eachObject => <AcademicCard key={eachObject.paperId} details={eachObject} />)
                : <h1 style={{ color: 'red' }}>Something went wrong! Click arrow button for retry</h1>

          }

        </ul>


      </div>

    </div>
  );
}

export default SearchResults;

