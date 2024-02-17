import React, { useRef, useState } from 'react';
import './imageGenerator.css';
import defaultImg from '../Assets/logo.png'; // Corrected import path for default image
import openai from 'openai'; // Import the openai module

const ImageGenerator = () => {
    const [imgUrl, setImgUrl] = useState(defaultImg); // State to hold the image URL
    const inputRef = useRef(null); // Ref for the input element

    const imageGenerator = async () => {
        if (!inputRef.current.value.trim()) {
            console.error('Input is empty');
            return; // Return early if input is empty
        }

        try {
            const response = await openai.createImage({
                model: "dall-e-3",
                prompt: inputRef.current.value.trim(), // Use the input value as the prompt
                n: 1,
                size: "1024x1024",
            });

            const imageUrl = response.data.data[0].url; // Extract the image URL from the response
            setImgUrl(imageUrl); // Update image URL in state
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <div className='aiImgGenerator'>
            <div className="header">Ai Image <span>Generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={imgUrl} alt="" />
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to generate' />
                <button className="generate" onClick={imageGenerator}>Generate</button>
            </div>
        </div>
    );
}

export default ImageGenerator;
