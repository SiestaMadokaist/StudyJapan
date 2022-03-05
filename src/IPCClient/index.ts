import ipc from 'node-ipc';
import { IPCServer } from '../IPCServer';
async function main(): Promise<void> {
  const message = process.argv[2];
  console.log({message});

  ipc.connectTo(IPCServer.CONFIG_ID, () => {
    const client = ipc.of[IPCServer.CONFIG_ID];
    client.on('OK', () => {
      console.log('received data');
      ipc.disconnect(IPCServer.CONFIG_ID);
    });
    client.on('connect', () => {
      console.log('connected');
      client.emit('message', message);
    });
  })
}

main();