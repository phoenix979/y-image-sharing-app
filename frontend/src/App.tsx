import React from 'react';
import GlobalStyles from './globalStyles';
import ImageUpload from './components/ImageUpload';

function App() {
  return (
    <>
      <GlobalStyles />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Y Image Sharing</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Upload your image, set how long it should stay valid, and get a shareable link!
        </p>

        <ImageUpload />
      </div>
    </>
  );
}

export default App;
