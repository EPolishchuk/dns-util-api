# DNS utilities API

Node.js version of most useful diagnostic tools: dig, whois, nmap and etc. Endpoints works on any machine with any operating system.

Currently implemented routes

## nmap

Port scanning tool.

- /nmap/:host - checks port 80 (basic port for HTTP connection);
- /nmap/:host/:port - checks any port you provide.

## dig

Tool to check DNS records.

- /dig/:host - return A and NS records;
- /dig/:host/:record - returns any record you provide and NS records;
- /dig/:host/:record/:server - returns any record you provide and NS records from spesific NS server.

## ping

Tool to check if host is alive. Maybe be inconclusive, since that kind of request can be blocked on host side.

- /ping/:host - return delay time or error if host is unresponsive.
