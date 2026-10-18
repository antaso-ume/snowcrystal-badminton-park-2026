"""index.html のストーリーズ画像を PNG に書き出すスクリプト

使い方:
    python render.py            # → out/weekly_1019.png（1080×1920）
必要なもの: pip install playwright && playwright install chromium
"""
import pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent


def main():
    out = HERE / "out"
    out.mkdir(exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1200, "height": 2100})
        pg.on("pageerror", lambda e: print("ERROR:", e))
        pg.goto((HERE / "index.html").as_uri())
        pg.evaluate("document.fonts.ready")
        pg.wait_for_timeout(400)
        for i, el in enumerate(pg.query_selector_all("svg.slide"), 1):
            el.screenshot(path=str(out / "weekly_1019.png"))
            print(f"書き出し: out/weekly_1019.png")
        b.close()


if __name__ == "__main__":
    main()
