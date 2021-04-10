const net = require('net');

const nmap = async (port: number, host: string) => {
  const OPEN_PORT_STATUS = true;
  const CLOSE_PORT_STATUS = false;
  const TIMEOUT = 2000;

  return new Promise<boolean>((resolve, reject) => {
    const client = net.createConnection(
      {
        port: port,
        host: host,
        allowHalOpen: true,
        timeout: TIMEOUT,
      },
      () => {
        client.end();
        resolve(OPEN_PORT_STATUS);
      }
    );

    client.on('timeout', () => {
      client.destroy('Timeout');
    });

    client.on('error', (e: any) => {
      client.end();
      reject(CLOSE_PORT_STATUS);
    });
  });
};

export default nmap;
