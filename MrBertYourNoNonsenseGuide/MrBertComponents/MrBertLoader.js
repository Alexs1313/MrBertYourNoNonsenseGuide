import React from 'react';
import { View } from 'react-native';

import { WebView } from 'react-native-webview';

const PibboWaveLoader = () => {
  const waveLoaderHtml = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          .loading-wave {
            width: 300px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
          }

          .loading-bar {
            width: 20px;
            height: 10px;
            margin: 0 5px;
            background-color: #3498db;
            border-radius: 5px;
            animation: wave 1s ease-in-out infinite;
          }

          .loading-bar:nth-child(2) { animation-delay: 0.1s; }
          .loading-bar:nth-child(3) { animation-delay: 0.2s; }
          .loading-bar:nth-child(4) { animation-delay: 0.3s; }

          @keyframes wave {
            0% { height: 10px; }
            50% { height: 50px; }
            100% { height: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="loading-wave">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1, backgroundColor: '#14243E' }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: waveLoaderHtml }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default PibboWaveLoader;
