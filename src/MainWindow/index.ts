import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon, QWindow, FocusReason, WindowState, WindowType, Component, QScrollArea, NodeLayout } from '@nodegui/nodegui';
import logo from '../../assets/logox200.png';
import { MemoizeV3 } from '@cryptoket/ts-memoize';
import { ToRomaji } from '../ToRomaji';
export class MainWindow {
  #window = new QMainWindow();
  #rootLayout = new FlexLayout();
  #component = new MemoizeV3<Record<string, any>>();
  #toRomaji = new ToRomaji();
  constructor() {
  }

  private labelKanji(): QLabel {
    return this.#component.memoize('labelKanji', () => {
      const label = new QLabel();
      label.setInlineStyle('padding:5px; font-size:25px;');
      label.setText('kanji');
      return label;
    });
  }

  private labelRomaji(): QLabel {
    return this.#component.memoize('labelRomaji', () => {
      const label = new QLabel();
      label.setInlineStyle('padding:5px; font-size:25px;');
      label.setText('romaji');
      return label;
    });
  }

  private labelEn(): QLabel {
    return this.#component.memoize('labelEn', () => {
      const label = new QLabel();
      label.setInlineStyle('padding:5px; font-size:25px;');
      label.setText('en');
      return label;
    });
  }

  async start(): Promise<void> {
    const window = this.#window;
    window.setWindowFlag(WindowType.WindowStaysOnTopHint, true);
    window.setGeometry(0,0, 300, 300);
    const centralWidget = new QWidget();
    centralWidget.setObjectName("myroot");
    window.setCentralWidget(centralWidget);
    const rootLayout = this.#rootLayout;
    centralWidget.setLayout(rootLayout);
    rootLayout.addWidget(this.labelKanji());
    rootLayout.addWidget(this.labelRomaji());
    rootLayout.addWidget(this.labelEn());
    window.show();
  }

  async fallback(): Promise<void> {
    this.labelKanji().setText('Failed to perform Task');
  }

  async onMessage(capture: string): Promise<void> {
    this.labelKanji().setText('loading...');
    const [kanji, en] = capture.split(' xXXx ');
    if (!kanji) { return this.fallback(); }
    if (!en) { return this.fallback(); }
    const romaji = await this.#toRomaji.tl(kanji);
    this.labelKanji().setText(kanji);
    this.labelRomaji().setText(romaji);
    this.labelEn().setText(en);
  }
}