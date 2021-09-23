import React from 'react';
import {Link} from 'react-router-dom';

import './Footer.css'

function Footer() {
    return (
        <footer className='footer-container'>

                <div className='top-content'>
                    <a className='footer-links' href='https://github.com/itsvivrant/Touristr'>
                        <i className='fab fa-github'></i>
                    </a>
                    <a className='footer-links' href='https://www.linkedin.com/in/vivian-ngoc-che/'>
                        <i className='fab fa-linkedin'></i>
                    </a>
                    <a className='footer-links' href='https://angel.co/u/vivian-ngoc-che'>
                        <i className="fab fa-angellist"></i>
                    </a>
                </div>
                <div className='bottom-content'>Developed by Vivian Ngoc Che</div>
        </footer>
    )
}

export default Footer;
