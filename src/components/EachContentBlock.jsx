import React from 'react';
import './EachContentBlock.css';
import AudioPlayer from './AudioPlayer';

const EachContentBlock = ({ type, data }) => {
  console.log('data is', data)
  switch (type) {
    case 'text':
      return <div className="bubble text-bubble">{data}</div>;

    case 'audio':
      return (
        <div className="bubble audio-bubble">
          <AudioPlayer audioFile={data} />
          {/* <audio controls>
            <source src={data} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio> */}
        </div>
      );

    case 'quiz':
      return <div className="bubble quiz-bubble">{data}</div>;

    default:
      return null;
  }
};

export default EachContentBlock;
