import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import EmojiExplosion from '../components/EmojiExplosion';

const styles = `
@keyframes moveAround {
  0% { transform: translate(0, 0); }
  25% { transform: translate(10px, -10px); }
  50% { transform: translate(-10px, 10px); }
  75% { transform: translate(10px, 10px); }
  100% { transform: translate(0, 0); }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default function Home() {
  const hippoImages = [
    'https://assets.vogue.com/photos/66ec4c5ce2bfab747e30541f/1:1/w_3024,h_3024,c_limit/GettyImages-2172117605.jpg',
    'https://compote.slate.com/images/629e9285-a8ea-40b6-bb1a-0e65737cfe34.jpeg?crop=1560%2C1040%2Cx0%2Cy0',
    'https://www.pedestrian.tv/wp-content/uploads/2024/09/Untitled-design-2024-09-20T140140.876.png?quality=75&w=1200&h=675&crop=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsKL80bt5QBuOmyMuru7Bm8wqGsw2c_ux7hg&s',
    'https://static01.nyt.com/images/2024/09/26/multimedia/24styles-moodeng-bite-bfmh/24styles-moodeng-bite-bfmh-videoSixteenByNineJumbo1600.jpg',
    'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2024-09/moo-deng-Hippo-mc-240926-02-753f17.jpg',
    'https://helios-i.mashable.com/imagery/articles/071URX83lVrolB9pmnaNjFW/hero-image.fill.size_1248x702.v1726688729.jpg',
  ];

  const kimLukeImages = [
    'https://storage.googleapis.com/sine-svc/kim-sleepy.png',
    'https://storage.googleapis.com/sine-svc/luke-pole.png',
    'https://storage.googleapis.com/sine-svc/kim-hike.png',
    'https://storage.googleapis.com/sine-svc/luke-kim.png',
    'https://storage.googleapis.com/sine-svc/kim-pole.png',
    'https://storage.googleapis.com/sine-svc/luke-footy.png',
    'https://storage.googleapis.com/sine-svc/kim-vv.png',
    'https://storage.googleapis.com/sine-svc/kim-socks.png',
    'https://storage.googleapis.com/sine-svc/kim-squish.png',
    'https://storage.googleapis.com/sine-svc/kim-luke-vv.png',
    'https://storage.googleapis.com/sine-svc/kim-slipper.png',
    'https://storage.googleapis.com/sine-svc/kim-luke-kindle-hipz.png',
  ];

  const songUrl = 'https://storage.googleapis.com/sine-svc/Marigold.mp3';

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const [positions, setPositions] = useState({ top: 0, left: 0 });
  const [klPositions, setKlPositions] = useState([]);

  const [showEmoji, setShowEmoji] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const [play] = useSound(songUrl);

  useEffect(() => {
    const generatePositions = () => {
      const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 150 : 0;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 150 : 0;
      const newPositions = hippoImages.map(() => ({
        top: Math.random() * maxHeight,
        left: Math.random() * maxWidth,
      }));
      setPositions(newPositions);
    };

    generatePositions();
  }, []);

  useEffect(() => {
    if (showFinalMessage) {
      const updatePositions = () => {
        const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 100 : 0;
        const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 100 : 0;
        const newPositions = kimLukeImages.map(() => ({
          top: Math.random() * maxHeight,
          left: Math.random() * maxWidth,
        }));
        setKlPositions(newPositions);
      };

      const intervalId = setInterval(updatePositions, 2000);

      return () => clearInterval(intervalId);
    }
  }, [showFinalMessage]);

  const handleClick = (event, index) => {
    if (index !== currentImageIndex) return;

    setClickPosition({ x: event.clientX, y: event.clientY });
    setShowEmoji(true);
    setTimeout(() => setShowEmoji(false), 1000);

    if (currentImageIndex < hippoImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      play();
      setShowFinalMessage(true);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f0f0f0', position: 'relative' }}>
      {!showFinalMessage ? (
        <div>
          {hippoImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Hippo ${index}`}
              onClick={(event) => handleClick(event, index)}
              style={{
                position: 'absolute',
                top: positions[index]?.top || 0,
                left: positions[index]?.left || 0,
                width: 150,
                height: 150,
                objectFit: 'cover',
                borderRadius: '10px',
                cursor: index === currentImageIndex ? 'pointer' : 'default',
                transition: 'opacity 0.5s ease-in-out',
                opacity: index === currentImageIndex ? (showEmoji ? 0 : 1) : 0,
                userSelect: 'none',
              }}
            />
          ))}
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <div
            style={{
              zIndex: 1000,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '200px',
              height: '200px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.querySelector('img').style.opacity = '0';
              e.currentTarget.querySelector('h1').style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.querySelector('img').style.opacity = '1';
              e.currentTarget.querySelector('h1').style.opacity = '0';
            }}
          >
            <img
              src="https://storage.googleapis.com/sine-svc/moo-deng-main-1.png"
              alt="Hover to reveal"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                transition: 'opacity 0.5s ease-in-out',
                userSelect: 'none',
              }}
            />
            <h1
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                margin: '0',
                opacity: '0',
                transition: 'opacity 0.5s ease-in-out',
                userSelect: 'none',
              }}
            >
              will u be my gf :-)
            </h1>
          </div>

          <div
            style={{
              zIndex: 1000,
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              transform: 'translate(50%, 50%)',
              textAlign: 'center',
              width: '64px',
              height: '64px',
              userSelect: 'none',
            }}
            onMouseOver={(e) => {
              e.currentTarget.querySelector('img').style.opacity = '0';
              e.currentTarget.querySelector('h1').style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.querySelector('img').style.opacity = '1';
              e.currentTarget.querySelector('h1').style.opacity = '0';
            }}
          >
            <img
              src="https://storage.googleapis.com/sine-svc/moo-deng-main-2.png"
              alt="Hover to reveal"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                transition: 'opacity 0.5s ease-in-out',
                userSelect: 'none',
              }}
            />
            <h1
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                margin: '0',
                opacity: '0',
                transition: 'opacity 0.5s ease-in-out',
                userSelect: 'none',
              }}
            >
              xo
            </h1>
          </div>

          {kimLukeImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`KimLuke ${index}`}
              style={{
                position: 'absolute',
                top: klPositions[index]?.top || 0,
                left: klPositions[index]?.left || 0,
                width: 100,
                height: 100,
                transition: 'opacity 0.5s ease-in-out, top 4s ease, left 4s ease',
                userSelect: 'none',
                opacity: 0,
              }}
              onLoad={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
              }}
            />
          ))}
        </div>
      )}

      {showEmoji &&
        <EmojiExplosion x={clickPosition.x} y={clickPosition.y} />
      }
    </div>
  );
}
