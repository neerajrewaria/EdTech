import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button';
import cards from '../../../assests/Images/cards.png';

const Language = () => {
  return (
    <div>
      <div className='Language-section-main-div'>

        <div className="language-section-image-div">
          <img src={cards} alt="Language cards" />
        </div>

        <div className='button-language-section'  style={{marginLeft:"auto" ,  marginRight:"auto", marginTop:"2rem",
  marginBottom: "5rem"}}>
             <CTAButton active={true} linkto={"/signup"}>
              Learn More
             </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default Language