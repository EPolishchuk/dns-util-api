const netPing = require('net-ping');
import net from 'net';
import dig from './dig';

const A = 'A';

const ping = async (host: string) => {
  interface pingResult {
    host: string,
    originalHost?: string,
    recivedTime: number,
    sentTime: number,
    delta: number,
  }

  let originalHost:null|string = null;

  if (net.isIP(host) === 0) {
    try {    
      let result;
      result = await dig(host, A);

  console.log(result);
      if (Array.isArray(result)) {
        const random = Math.floor(Math.random() * result.length);
        originalHost = host;
        host = String(result[random]);
      }
    } catch (error) {
      throw error;
    }
  }

  let session = netPing.createSession();
  return new Promise<object>((resolve, reject) => {
    session.pingHost(
      host,
      function (
        error: NodeJS.ErrnoException,
        host: string,
        sent: number,
        rcvd: number
      ) {
        if (error) reject(error.toString());
        else {
          let result: pingResult = {
            host: host,
            recivedTime: rcvd,
            sentTime: sent,
            delta: rcvd - sent,
          };
          if (originalHost) result.originalHost = originalHost;
          resolve(result);
        }
      }
    );
  });
};

export default ping;
