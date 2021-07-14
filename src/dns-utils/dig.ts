const dns = require('dns');
const net = require('net');

const dig = async (host: string, record: string, server?: string) => {
  dns.setServers(['8.8.8.8']);

  if (server) {
    dns.setServers([server]);
  }

  return new Promise<string[] | object[] | object>((resolve, reject) => {
    console.log(`Come to Promise with ${host} for ${record} record`);
    dns.resolve(
      host,
      record,
      (err: NodeJS.ErrnoException, records: string[] | object[] | object) => {
        if (err) reject(err.code);
        resolve(records);
      }
    );
  });
};

export default dig;
