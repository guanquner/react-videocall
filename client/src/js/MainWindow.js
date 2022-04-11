import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socket from './socket';

function useClientID() {
  const [clientID, setClientID] = useState('');

  useEffect(() => {
    socket
      .on('init', ({ id }) => {
        document.title = `${id} - VideoCall`;
        setClientID(id);
      });
  }, []);

  return clientID;
}

function MainWindow({ startCall }) {
  const clientID = useClientID();
  const [friendID, setFriendID] = useState(null);

  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };

  return (
    <div className="container main-window">
      <div>
        <h3>
          你好小可爱！你的ID是
          <input
            type="text"
            className="txt-clientId"
            defaultValue={clientID}
            readOnly
          />
        </h3>
        <h4>欢迎来到quner的WebRtc通话，使用端到端技术，确保安全私密！</h4>
      </div>
      <div>
        <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="输入你朋友的ID通话吧"
          onChange={(event) => setFriendID(event.target.value)}
        />
        <div>
          <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          />
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          />
        </div>
      </div>
    </div>
  );
}

MainWindow.propTypes = {
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
