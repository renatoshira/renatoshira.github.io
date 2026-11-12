#!/usr/bin/env python3
"""Make the claude.ai artifact copy of the built essay.

Takes ../como-resetar-a-dopamina.html (run build.py first) and writes a copy
without Google Tag Manager and without the document skeleton, which the
artifact viewer adds itself. Usage: python3 make_artifact.py <out.html>
"""
import pathlib
import re
import sys

SRC = pathlib.Path(__file__).resolve().parent.parent / "como-resetar-a-dopamina.html"


def main():
    s = SRC.read_text(encoding="utf-8")
    s = re.sub(r"<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->\n", "", s, flags=re.S)
    for t in ["<!DOCTYPE html>\n", '<html lang="pt">\n', "<head>\n", "</head>\n", "<body>\n", "</body>\n", "</html>\n", "</html>"]:
        s = s.replace(t, "", 1)
    s = re.sub(r'<meta charset="utf-8">\n<meta name="viewport"[^>]*>\n', "", s)
    s = s.replace('<title data-i18n="meta.title">Como resetar seu sistema de dopamina</title>\n', "")
    s = "<title>Como resetar seu sistema de dopamina</title>\n" + s
    out = pathlib.Path(sys.argv[1])
    out.write_text(s, encoding="utf-8")
    print("wrote %s (%d KB)" % (out, len(s.encode("utf-8")) // 1024))


if __name__ == "__main__":
    main()
