import {useWebSocket} from 'ahooks';
import React, {useMemo, useRef} from 'react';

const ReadyState = {
    Connecting: 0,
    Open: 1,
    Closing: 2,
    Closed: 3
};

const Websockets = props =>
{
    const {host} = props;

    const messageHistory = useRef([]);

    const {readyState, sendMessage, latestMessage, disconnect, connect} = useWebSocket(
        `ws://${host}/rt`
    );

    messageHistory.current = useMemo(() => messageHistory.current.concat(latestMessage), [
        latestMessage
    ]);

    return <div>
        <h1>Websockets Hook Example</h1>

        <hr/>

        <div className={'h-box'}>
            <button disabled={readyState === ReadyState.Open}
                    onClick={() => connect && connect()}>Connect
            </button>

            <button disabled={readyState !== ReadyState.Open}
                    onClick={() => disconnect && disconnect()}>Disconnect
            </button>

            <button disabled={readyState !== ReadyState.Open}
                    onClick={() => sendMessage && sendMessage(`${Date.now()}`)}>
                send
            </button>
        </div>

        <hr/>
        <div>
            {messageHistory.current.map((message, index) => (
                <p key={index}>{message?.data}</p>
            ))}
        </div>
    </div>;
};

Websockets.getInitialProps = async (server_props) =>
{
    const host = /(http|https):\/\/(?<host>.*)\//gi.exec(server_props.history.location.pathname).groups.host;
    return Promise.resolve({host});
};

export default Websockets;