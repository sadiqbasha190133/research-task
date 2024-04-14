

import React from 'react';
import Typography from '@mui/material/Typography';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { green } from '@mui/material/colors';
import { useState } from 'react';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import bib2json from 'bib2json';
import Button from '@mui/material/Button';
import './index.css'; // Import CSS file for styling



const AcademicCard = (props) => {

    const {details} = props
    console.log("this is details data: ",details)
    const url = details.openAccessPdf?.url
    let totalDomain = null
    if(url){
        const domain = new URL(url).hostname;
        totalDomain = `${domain}.PDF`
        console.log(totalDomain); // Output: "arxiv.org"
    }
    

    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const bibtext = details.citationStyles.bibtex
    const citation = bib2json(bibtext);
    const {entries} = citation
    const citationData = entries[0].Fields
    const {author, booktitle, journal, pages, title, year} = citationData
    console.log(citationData)

    const websiteUrl = details.url

  return (
    <li className="card">
        <div className='flex-pdf-bookmark'>
            <a href={url} className='book-link-style'>{totalDomain}</a>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleBookmark}>
                {isBookmarked ? (
                    <BookmarkIcon sx={{ color: green[500], marginRight: '8px' }} />
                ) : (
                    <BookmarkBorderIcon sx={{ color: green[500], marginRight: '8px' }} />
                )}
                <Typography variant="body1" sx={{ color: green[500] }}>Bookmark</Typography>
                <MoreVertIcon sx={{ color: green[500] }} />
            </div>
        </div>
        <h2 className='title'>{details.title}</h2>
        <h3 className='citations'>{`${author}, ${journal} - ${year}`}</h3>
        <h2 className='abstract'>{details.abstract}</h2>
        <div className='card-footer-flex'>
            <div className='footer-links-flex'>
                <a href = {websiteUrl} style={{marginRight: '15px'}} className='cited-by'>Cited by {`${details.citationCount}`}</a>
                <a href={websiteUrl} >View all versions</a>
            </div>
            <div className='buttons-container'>
                <Button variant="contained" color="success" style={{ color: 'green', backgroundColor: 'white', marginRight: '10px', textTransform: 'none' }}>
                    Cite
                </Button>
                <Button variant="contained" color="success" style={{ color: 'white', textTransform: 'none' }}>
                    Explore
                </Button>
            </div>
        </div>
    </li>
  );
}

export default AcademicCard;


