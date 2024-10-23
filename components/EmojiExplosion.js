import { useState, useEffect } from 'react';

const emojis = ['🐒', '🌹', '💐', '🧗🏻‍♀️', '🐨', '💆🏻‍♀️'];

const EmojiExplosion = ({ x, y }) => {
  const [particles, setParticles] = useState([]);
  const [selectedEmoji] = useState(() => emojis[Math.floor(Math.random() * emojis.length)]); // Select a random emoji once

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      emoji: selectedEmoji,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 10 - 5,
    }));
    setParticles(newParticles);

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [x, y]);

  const animate = () => {
    setParticles((prevParticles) =>
      prevParticles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.5,
        }))
        .filter((p) => p.y < window.innerHeight)
    );
    requestAnimationFrame(animate);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            fontSize: 20,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default EmojiExplosion;
