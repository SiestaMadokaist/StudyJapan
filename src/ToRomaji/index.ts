const { default: Kuroshiro } = require('kuroshiro');
const { default: KuromojiAnalyzer } = require("kuroshiro-analyzer-kuromoji");
console.log(KuromojiAnalyzer);

export class ToRomaji {
  #kuroshiro = new Kuroshiro();
  
  constructor() {
    // const analyzer = new KuromojiAnalyzer();
    this.#kuroshiro.init(new KuromojiAnalyzer());
  }

  tl(kanji: string): Promise<string> {
    return this.#kuroshiro.convert(kanji, { to: 'romaji' });
  }
}
