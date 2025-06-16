import React, { useState, useEffect, useRef } from 'react'; 

const SliderCaptcha = ({ image, gridSize = 3, onVerify }) => {
  const [pieces, setPieces] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(null);
  const [shuffled, setShuffled] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pieceSize = canvas.width / gridSize;

    const newPieces = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      const x = (i % gridSize) * pieceSize;
      const y = Math.floor(i / gridSize) * pieceSize;
      newPieces.push({ x, y, index: i });
    }

    setPieces(newPieces);
    setEmptyIndex(gridSize * gridSize - 1); // Bottom right corner initially

    // Load the image and then shuffle
    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      shufflePieces(newPieces);
    };

  }, [image, gridSize]);


  const shufflePieces = (initialPieces) => {
    const newPieces = [...initialPieces];
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];
    }
    setPieces(newPieces);
    setShuffled(true);
  };

  const handlePieceClick = (index) => {
    if (!shuffled) return; // Prevent interaction before shuffle

    const pieceSize = canvasRef.current.width / gridSize;
    const clickedRow = Math.floor(pieces[index].y / pieceSize);
    const clickedCol = Math.floor(pieces[index].x / pieceSize);
    const emptyRow = Math.floor(pieces[emptyIndex].y / pieceSize);
    const emptyCol = Math.floor(pieces[emptyIndex].x / pieceSize);

    if (
      (Math.abs(clickedRow - emptyRow) + Math.abs(clickedCol - emptyCol) === 1)
    ) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setEmptyIndex(index);

      // Check for completion
      if (isSolved(newPieces)) {
        onVerify(true); // Call the onVerify callback
        setShuffled(false); // Prevent further interaction after solve
      }
    }
  };

    const isSolved = (currentPieces) => {
    for (let i = 0; i < currentPieces.length; i++) {
        if (currentPieces[i].index !== i) {
            return false;
        }
    }
    return true;
};

  const drawPieces = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pieceSize = canvas.width / gridSize;

      if(canvas) ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear before redrawing

    const img = new Image();
    img.src = image;
    img.onload = () => {
      currentPieces.forEach((piece) => {
        const x = piece.x;
        const y = piece.y;
        const sx = pieces[piece.index].x; // Source x for the image slice
        const sy = pieces[piece.index].y; // Source y for the image slice

        ctx.drawImage(
          img,
          sx,
          sy,
          pieceSize,
          pieceSize,
          x,
          y,
          pieceSize,
          pieceSize
        );
        if (piece.index === emptyIndex) {
          ctx.fillStyle = "lightgray"; // Or any other styling for the empty space
          ctx.fillRect(x, y, pieceSize, pieceSize);
        }
        ctx.strokeStyle = 'black'; // Add grid lines
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, pieceSize, pieceSize);
      });
    }

    const currentPieces = pieces.map((p) => ({...p}));
  }

  useEffect(() => {
    if (canvasRef.current && image && shuffled) {
      drawPieces();
    }
  }, [pieces, image, shuffled]);

  return (
    <div className="slider-captcha-container">
      <canvas
        ref={canvasRef}
        width="300" // Set your desired width
        height="300" // Set your desired height
        className="slider-captcha-canvas"
        style={{ border: '1px solid black' }}
      />
       {!shuffled && <p>Solved!</p>}
      <button onClick={() => shufflePieces(pieces)} disabled={shuffled}>
        {shuffled ? 'Reshuffle' : 'Shuffle'}
      </button>
    </div>
  );
};

export default SliderCaptcha;