import React, { useEffect, useState } from 'react';

export function LoadingSpinner({ initialText, rate }: { initialText?: string; rate?: number }) {
  const speed = rate || 100;
  const text = initialText || 'Loading...';
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    let cursor = 0;
    const interval = setInterval(() => {
      cursor = (cursor + 1) % text.length;

      setCurrentText(text.substr(cursor) + text.substr(0, cursor));
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{currentText}</span>;
}
