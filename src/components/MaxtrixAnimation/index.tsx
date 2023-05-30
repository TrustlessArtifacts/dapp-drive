import React, { useEffect, useRef } from 'react';
import s from './styles.module.scss';

const MatrixAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const columns = Array(256).fill(1);
    let character = 0;

    // Set the canvas to take the entire screen
    canvas.height = window.screen.height;
    canvas.width = window.screen.width;

    const step = () => {
      if (!ctx) return;
      // Slightly darkens the entire canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green
      ctx.fillStyle = '#0F0';

      // For each column
      columns.forEach((value, index) => {
        // Draw the character
        ctx.fillText(
          character.toString(),
          index * 10, // x
          value // y
        );

        if (character === 0) character = 1;
        else character = 0;

        // Move down the character
        // If the character is lower than 758, there is a random chance of it being reset
        columns[index] =
          value > 758 + Math.random() * 1e4 ? 0 : value + 10;
      });
    };

    // Call the step function repeatedly at an interval of 33ms (~30 times a second)
    const interval = setInterval(step, 33);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(interval);
    };
  }, []);

  return <canvas className={s.matrixAnimation} ref={canvasRef} />;
};

export default MatrixAnimation;
