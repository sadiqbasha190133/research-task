
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import IconButton from '@mui/material/IconButton';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const SearchResults = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const queryParams = new URLSearchParams(location.search);
//     const query = queryParams.get('query');

//     const handleBack = () => {
//         // Implement your back logic here
//         // For example, navigate back to the previous page
//         navigate("/")

//     };

//     return (
//         <div>
//             <div>
//                 <IconButton aria-label="back" onClick={handleBack}>
//                     <ArrowBackIcon />
//                     Back
//                 </IconButton>
//             </div>
//         </div>
        
//     );
// }

// export default SearchResults;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import "./index.css"
import AcademicCard from '../AcademicCard';
import CircularProgress from '@mui/material/CircularProgress';


const SearchResults = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [academicData, setAcademic] = useState()
    const [nonAcademicData, setNonAcademic] = useState()
    const [academicStatus, setAcademicStatus] = useState(true)
    const [isLoading, setLoadingStatus] = useState(false)

    const handleBack = () => {
        // Implement your back logic here
        // For example, navigate back to the previous page
        navigate("/");
    };

    useEffect(()=>{
            const fetchData = async () =>{
                setLoadingStatus(true)
              try{
                const url = 'https://api.gyanibooks.com/search_publication/'
                const options = {
                  method:"POST",
                  headers: { 
                    'Content-Type': 'application/json'
                  },
                  body:JSON.stringify({
                    "keyword": `${query}`,
                    "limit": "10"
                  })
                }
        
                const response = await fetch(url, options)
                const responseData = await response.json()
                console.log(responseData)
                const {data} = responseData
                console.log(data)
                const filterAcademicData = data.filter(eachObject=>eachObject.openAccessPdf !== null)
                const filterNonAcademicData = data.filter(eachObject=>eachObject.openAccessPdf === null)

                setAcademic(filterAcademicData)
                setNonAcademic(filterNonAcademicData)

                setLoadingStatus(false)

              }
              catch(error){
                console.log(error)
              }
        
            }
        
            fetchData()
          }, [query])
        
          const onToggle = () =>{
            setAcademicStatus(!academicStatus)
          }

          const tilteHeading = academicStatus?"Academic Results":"Web Results"

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
            
            <div className='results-container'>
            <h1>{tilteHeading}</h1>
            <ul className='cards-container'>

                {
                    isLoading?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress color="success" />
                    </div>
                    :

                    academicStatus?academicData?.map(eachObject=><AcademicCard key={eachObject.paperId} details = {eachObject}/>)
                    : nonAcademicData?.map(eachObject=><AcademicCard key={eachObject.paperId} details = {eachObject}/>)

                }
                
                {/* {academicStatus?academicData?.map(eachObject=><AcademicCard key={eachObject.paperId} details = {eachObject}/>)
                : nonAcademicData?.map(eachObject=><AcademicCard key={eachObject.paperId} details = {eachObject}/>)} */}
                


                {/* {apiData?.map(eachObject=><AcademicCard key={eachObject.paperId} details = {eachObject}/>)} */}
                {/* {console.log("this is apiData:", apiData)} */}

            </ul>

                
            </div>
            
        </div>
    );
}

export default SearchResults;

