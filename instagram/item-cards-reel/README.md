# アイテムカード リール

写真から切り抜いたアイテムのシルエットを、カードにして右から左へ流す動画（1080×1920・10秒）です。

## ファイル

| ファイル | 中身 |
|---|---|
| `index.html` | 動画の本体。冒頭の `CONFIG` を書き換えて調整します |
| `silhouettes.js` | シルエットの形（SVGパス）。写真から自動で作ったもの |
| `silhouettes/*.png` | 同じシルエットの透過PNG（Canvaなどで使う用） |
| `render.py` | mp4に書き出すスクリプト |
| `out/` | 書き出した動画 |

## プレビュー

`index.html` をブラウザで開くと再生されます（VSCodeなら Live Server でも可）。
下のバーで一時停止・シークできます。保存してリロードすれば変更が反映されます。

## よく触るところ（`index.html` の `CONFIG`）

- `cards` … 流れる順番。並べ替え・削除はここ。`secret: true` で「最高難易度」カードになる
- `showNames` … `true` にするとラベルが「???」からアイテム名に変わる
- `speed` / `gap` / `startX` … 流れる速さ・カードの間隔・最初の位置
- `card.w` / `card.h` … カードの大きさ
- `scale`（各カード）… カードの中でのシルエットの大きさ
- `title1` / `title2` … 見出しの文字
- `backRow.show` … 奥の小さい列を出すかどうか

## mp4に書き出す

最初に1回だけ：

```bash
pip install playwright
playwright install chromium
brew install ffmpeg
```

書き出し：

```bash
python render.py            # → out/item_cards.mp4
python render.py --notext   # 文字なし版 → out/item_cards_notext.mp4
```

## シルエットを追加・差し替えたいとき

`silhouettes.js` に `{ w, h, d }` の形で足し、`CONFIG.cards` に `key` を追加します。
`d` はSVGのパスなので、Illustrator・Figma・Inkscape などで描いたパスをそのまま貼れます。
