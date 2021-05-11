const netPing = require('net-ping');

const ping = (host: string) => {
  let session = netPing.createSession();
  return new Promise<string | object>((resolve, reject) => {
    session.pingHost(
      host,
      function (
        error: NodeJS.ErrnoException,
        host: string,
        sent: number,
        rcvd: number
      ) {
        if (error) reject(error.toString());
        else
          resolve({
            host: host,
            recivedTime: rcvd,
            sentTime: sent,
            delta: rcvd - sent,
          });
      }
    );
  });
};

export default ping;
