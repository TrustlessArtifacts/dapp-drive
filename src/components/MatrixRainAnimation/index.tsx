import { sleep } from '@/utils';
import React, { useRef } from 'react';
import useAsyncEffect from 'use-async-effect';

interface IProps {
  width: number;
  height: number;
}

const MatrixRainAnimation: React.FC<IProps> = ({ width, height }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useAsyncEffect(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    // Setting the width and height of the canvas
    canvas.width = width - 2;
    canvas.height = height - 2;

    // Setting up the letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
    const lettersArray = letters.split('');

    // Setting up the columns
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);

    // Setting up the drops
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Setting up the draw function
    const draw = async () => {
      await sleep(60);
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(draw);

    // Clean up
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, padding: 1, borderRadius: 12 }} />;
};

export default React.memo(MatrixRainAnimation);