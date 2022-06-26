import React from 'react';
import '../styles/WaterMarkStyle.css';
import watermark1 from '../sampleIcons/watermark.svg';

const Watermark = ({ history }) => {
    const backToTop = () => {
        // Scroll | button show/hide
        window.addEventListener('scroll', () => {
          if (document.querySelector('html').scrollTop > 100) {
            document.getElementById('Icon-watermark').style.display = "block";
          }
        });
        // back to top
        document.getElementById('Icon-watermark').addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        })
    };
    

    return (
        <div className = 'container-watermark' onClick = {backToTop} >
            <img id = 'Icon-watermark' src = {watermark1} />
        </div>
    );
}



export default Watermark;