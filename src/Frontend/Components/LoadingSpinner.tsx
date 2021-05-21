import React, { useEffect, useState } from 'react';

export function LoadingSpinner({ initialText }: { initialText?: string }) {
  const speed = 100;
  const text = initialText || 'Loading...';
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    let cursor = 0;
    const interval = setInterval(() => {
      cursor = (cursor + 1) % text.length;

      setCurrentText(text.substr(cursor) + text.substr(0, cursor));
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{currentText}</span>;
}
