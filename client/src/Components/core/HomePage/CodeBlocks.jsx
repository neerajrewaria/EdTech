import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa6'
import { TypeAnimation } from 'react-type-animation';
import '../../../pages/Home.css';
const CodeBlocks = (
    { position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codecolor }) => {
    return (
        <div className='code-block-main-div'
            style={{ flexDirection: position }}>
            {/* section 1 */}
            <div className='code-block-section1'>
                {heading}
                <div className='code-block-section1-subheading'>
                    {subheading}
                </div>
                <div className='CTA-BUTTON-DIV'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                        <div className='cta-btn-content'>
                            {ctabtn1.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className='cta-btn-content'>
                            {ctabtn2.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>

          {/* section2 */}
          <div className='code-block-section2-main-div'>

            {/* window titlebar with index.html tab */}
            <div className='codeblock-section2-titlebar'>
              <span className='codeblock-dot dot-red'></span>
              <span className='codeblock-dot dot-yellow'></span>
              <span className='codeblock-dot dot-white'></span>
              <p className='codeblock-filename'>index.html</p>
            </div>

            <div className='codeblock-section2-body'>
              <div className='codeblock-section2-index-div'>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
              </div>
              <div className='codeblock-section2-codearea'
              style={{color:codecolor}}>
              <TypeAnimation
                     sequence={[codeblock, 5000, ""]}
                       repeat={Infinity}
                    style={{ whiteSpace: "pre-line", lineHeight: "1.8"}}
                     cursor={true}
                  omitDeletionAnimation={true}
               />
              </div>
            </div>
          </div>

        </div>
    )
}
export default CodeBlocks
