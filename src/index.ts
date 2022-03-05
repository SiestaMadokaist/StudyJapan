import { IPCServer } from "./IPCServer";
import { MainWindow } from "./MainWindow";

async function StudyJapan() {
  const main = new MainWindow();
  const ipcServer = new IPCServer(main);
  ipcServer.start();
}

StudyJapan();