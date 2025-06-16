import React, { useState, useEffect, Suspense } from 'react';
import { Container } from './style/styled_contrainer';
import { Flex } from './style/styled_flex';
import { Typography } from './style/styled_typography';
import { Input } from './style/styled_input';
import { PrimaryButton } from './style/styled_button';
import { Label } from './style/styled_label';
import { Center } from './style/styled_center';

const ImageCaptcha = ({setOpen=()=>{}, setValidCaptcha=()=>{}}) => {
    const [imageSrc, setImageSrc] = useState('');
    const [userInput, setUserInput] = useState('');
    const [isRight, setIsRight] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const generateCaptcha = () => {
        // Generate a random string (you can customize this)
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < 4; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Create a canvas element to draw the text
        const canvas = document.createElement('canvas');
        canvas.width = 150;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');

        // Draw the text on the canvas
        ctx.fillStyle = 'black';
        ctx.font = 'bold 50px monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fontStyle = 'oblique';
        ctx.fillText(randomString, 75,40);

        // Add some noise to the image (optional)
        for (let i = 0; i < 50; i++) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.51)';
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 3);
        }

        // Add some noise to the image (optional)
        for (let i = 0; i < 40; i++) {
            ctx.fillStyle = 'rgba(91, 92, 91, 0.81)';
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 5, 5);
        }

        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL('image/png');
        setImageSrc(dataURL);
        setCorrectAnswer(randomString);
    };


    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
            console.log('Captcha verified!');
            setOpen(false);
            setValidCaptcha(true);
            setUserInput('');
            setIsRight("right");
        } else {
            setIsRight("");
            setValidCaptcha(false);
            setErrorMessage('Incorrect captcha. Please try again.');
        }
    };

    return (<Suspense>
        <Flex row="">
            <Flex md={12}>
                <Typography fntsize="dsTextFontSize" fntweight="bold" >{'Text Challenge'}</Typography>
            </Flex>
            <Flex md={12}>
                <Center> <img src={imageSrc} alt="Captcha" /></Center>
                {errorMessage && <Label color={isRight ? 'success' : 'error'}>{errorMessage}</Label>}
            </Flex>
            <Flex md={12}>
                <Input
                    type="text"
                    placeholder="Enter Captcha"
                    value={userInput}
                    onChange={handleInputChange}
                />
                <PrimaryButton full="true" type="button" onClick={handleSubmit}>Verify</PrimaryButton>

            </Flex>
        </Flex>
    </Suspense>
    );
};

export default ImageCaptcha;