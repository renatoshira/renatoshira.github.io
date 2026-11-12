#!/usr/bin/env python3
"""Inline the dopamine essay into one HTML file.

Reads dopamina-src/shell.html and replaces four markers:
  <!--WIDGETS_CSS-->  all widgets/*.css, in one <style>
  <!--RUNTIME_JS-->   runtime.js
  <!--WIDGETS_JS-->   each widgets/*.js in its own <script> (companion first)
  <!--EN_JS-->        en.js (defines window.EN), if present
Writes ../como-resetar-a-dopamina.html.
"""
import pathlib

SRC = pathlib.Path(__file__).resolve().parent
OUT = SRC.parent / "como-resetar-a-dopamina.html"


def order(p):
    return (0 if p.stem == "companion" else 1, p.stem)


def main():
    shell = (SRC / "shell.html").read_text(encoding="utf-8")
    wdir = SRC / "widgets"
    css = "\n".join(p.read_text(encoding="utf-8") for p in sorted(wdir.glob("*.css"), key=order))
    js = "\n".join(
        "<script>\n/* ---- %s ---- */\n%s\n</script>" % (p.name, p.read_text(encoding="utf-8"))
        for p in sorted(wdir.glob("*.js"), key=order)
    )
    en = SRC / "en.js"
    html = (
        shell.replace("<!--WIDGETS_CSS-->", "<style>\n%s\n</style>" % css)
        .replace("<!--RUNTIME_JS-->", (SRC / "runtime.js").read_text(encoding="utf-8"))
        .replace("<!--WIDGETS_JS-->", js)
        .replace("<!--EN_JS-->", en.read_text(encoding="utf-8") if en.exists() else "window.EN={};")
    )
    OUT.write_text(html, encoding="utf-8")
    print("wrote %s (%d KB)" % (OUT.name, len(html.encode("utf-8")) // 1024))


if __name__ == "__main__":
    main()
