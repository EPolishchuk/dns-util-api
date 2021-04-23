const dns = require('dns');

const dig = async (host: string, record: string) => {
  return new Promise<string[] | object[] | object>((resolve, reject) => {
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
