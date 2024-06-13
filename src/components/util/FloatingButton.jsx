import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function FloatingButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // 스크롤 위치가 300px 이상이면 버튼 표시
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 스크롤
  };

  return (
      <Zoom in={showButton}>
        <Fab
            onClick={scrollToTop}
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            color="primary"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
  );
}

export default FloatingButton;
