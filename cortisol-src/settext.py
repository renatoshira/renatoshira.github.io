"""Helpers to edit widget instruction lines, captions and prose in shell.html + en.js."""
import re, json, sys
S='shell.html'; E='en.js'
def load(): return open(S,encoding='utf-8').read(), open(E,encoding='utf-8').read()
def save(s,e): open(S,'w',encoding='utf-8').write(s); open(E,'w',encoding='utf-8').write(e)
def set_wdo(s,e,w,pt,en):
    s,c=re.subn(r'(<span data-i18n="%s\.tag"><b class="wt">[^<]*</b><span class="wdo">)[^<]*(</span>)'%w, lambda m:m.group(1)+pt+m.group(2), s); assert c==1,w
    e,c=re.subn(r'("%s\.tag": "<b class=\\"wt\\">[^<]*</b><span class=\\"wdo\\">)[^<]*(</span>")'%re.escape(w), lambda m:m.group(1)+en+m.group(2), e); assert c==1,w
    return s,e
def set_wt(s,e,w,pt,en):
    s,c=re.subn(r'(<span data-i18n="%s\.tag"><b class="wt">)[^<]*(</b>)'%w, lambda m:m.group(1)+pt+m.group(2), s); assert c==1,w
    e,c=re.subn(r'("%s\.tag": "<b class=\\"wt\\">)[^<]*(</b>)'%re.escape(w), lambda m:m.group(1)+en+m.group(2), e); assert c==1,w
    return s,e
def rep(s,e,ptold,ptnew,enold,ennew):
    assert s.count(ptold)==1,ptold; assert e.count(enold)==1,enold
    return s.replace(ptold,ptnew), e.replace(enold,ennew)
def cap_append(s,e,w,pt,en):
    s,c=re.subn(r'(<div class="wcap" data-i18n="%s\.cap">.*?)(</div>)'%w, lambda m:m.group(1)+pt+m.group(2), s, flags=re.S); assert c==1,w
    e,c=re.subn(r'("%s\.cap": ".*?)(",\n)'%re.escape(w), lambda m:m.group(1)+en+m.group(2), e); assert c==1,w
    return s,e
def rep_plain(text, old, new, esc=False):
    """Replace a sentence matched on plain text (ignoring tags inside it)."""
    idx=[]; plain=''; i=0
    while i<len(text):
        if text[i]=='<': i=text.index('>',i)+1; continue
        idx.append(i); plain+=text[i]; i+=1
    k=plain.find(old); assert k>=0 and plain.find(old,k+1)<0, old[:60]
    a=idx[k]; b=idx[k+len(old)-1]+1
    return text[:a]+new+text[b:]
