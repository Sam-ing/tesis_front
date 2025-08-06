import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
      <img src="/loading.png"className="w-24 h-24 animate-spin" />
    </div>
  );
}