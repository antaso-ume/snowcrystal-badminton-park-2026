"""index.html を1コマずつ撮影して mp4 に書き出すスクリプト

使い方:
    python render.py                     # → out/item_cards.mp4
    python render.py --notext            # 文字なし版 → out/item_cards_notext.mp4
    python render.py --out ~/Desktop/test.mp4

必要なもの（最初に1回だけ）:
    pip install playwright
    playwright install chromium
    brew install ffmpeg
"""
import argparse
import pathlib
import subprocess

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--notext", action="store_true", help="文字なし版を書き出す")
    ap.add_argument("--out", help="出力ファイル名")
    args = ap.parse_args()

    out = pathlib.Path(args.out or HERE / "out" / ("item_cards_notext.mp4" if args.notext else "item_cards.mp4")).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)
    url = (HERE / "index.html").as_uri() + "?render" + ("&notext" if args.notext else "")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1920})
        page.goto(url)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(300)
        duration = page.evaluate("CONFIG.duration")
        fps = page.evaluate("CONFIG.fps")
        total = round(duration * fps)

        ff = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error",
             "-f", "image2pipe", "-framerate", str(fps), "-c:v", "png", "-i", "-",
             "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo", "-shortest",   # 無音トラック（Instagram用）
             "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "17",
             "-c:a", "aac", "-movflags", "+faststart", str(out)],
            stdin=subprocess.PIPE)
        for i in range(total):
            page.evaluate(f"render({i / fps})")
            ff.stdin.write(page.screenshot(type="png"))
            print(f"\r{i + 1}/{total} コマ", end="", flush=True)
        ff.stdin.close()
        ff.wait()
        browser.close()
    print(f"\n書き出し完了: {out}")


if __name__ == "__main__":
    main()
