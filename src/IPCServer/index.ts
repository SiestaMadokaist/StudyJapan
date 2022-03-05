import { MainWindow } from "../MainWindow";
import ipc from 'node-ipc';

export class IPCServer {
  static CONFIG_ID = 'STUDY_JAPAN';
  constructor(private window: MainWindow) {
  }

  async start(): Promise<void> {
    // ipc.config.appspace = IPCServer.CONFIG_ID;
    ipc.config.id = IPCServer.CONFIG_ID;
    console.log(ipc);
    ipc.serve(() => {
      ipc.server.on('message', (data, socket) => {
        ipc.log(`got a message: ${data}`);
        this.window.onMessage(data);
        ipc.server.emit(socket, 'OK');
      });  
    });
    ipc.server.start();
    this.window.start();
  }
}