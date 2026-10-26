"""Reproduce Veritasium's astronaut toy model (skill + luck weighted score, top-k selected)."""
import numpy as np
rng = np.random.default_rng(42)

def sim(N=18300, k=11, w=0.05, runs=1000, dist="uniform"):
    luck_sel, overlap = [], []
    for _ in range(runs):
        if dist == "uniform":
            skill = rng.uniform(0, 100, N)
        else:  # normal skill, mean 50 sd 15, NOT clipped (clipping would create ties at 100)
            skill = rng.normal(50, 15, N)
        luck = rng.uniform(0, 100, N)
        score = (1 - w) * skill + w * luck
        top = np.argpartition(-score, k)[:k]
        topskill = np.argpartition(-skill, k)[:k]
        luck_sel.append(luck[top].mean())
        overlap.append(len(np.intersect1d(top, topskill)))
    return np.mean(luck_sel), np.mean(overlap)

out = []
out.append("## Baseline (N=18300, k=11, w=5%, uniform, 1000 runs)")
l, o = sim()
out.append(f"avg luck of selected = {l:.1f}; avg overlap with top-11-by-skill = {o:.2f} of 11")
out.append("\n## Sensitivity: luck weight x pool size (uniform skill, k=11, 1000 runs) -> luck / overlap")
ws = [0.01, 0.02, 0.05, 0.10, 0.20]
Ns = [100, 1000, 18300, 100000]
out.append("| N \\ w | " + " | ".join(f"{int(w*100)}%" for w in ws) + " |")
out.append("|---|" + "---|" * len(ws))
for N in Ns:
    runs = 300 if N == 100000 else 1000
    row = []
    for w in ws:
        l, o = sim(N=N, w=w, runs=runs)
        row.append(f"{l:.1f} / {o:.1f}")
    out.append(f"| {N} | " + " | ".join(row) + " |")
out.append("\n## Normal skill (mean 50, sd 15, unclipped), N=18300, k=11 -> luck / overlap")
out.append("| w | luck | overlap |\n|---|---|---|")
for w in ws:
    l, o = sim(w=w, dist="normal")
    out.append(f"| {int(w*100)}% | {l:.1f} | {o:.1f} |")
txt = "\n".join(out)
print(txt)
open(__file__.replace("luck_sim.py", "luck_sim_results.md"), "w").write(txt + "\n")

# Extra: skill cost of luck (how much less skilled are the selected vs. the true top-11?)
def skill_gap(N=18300, k=11, w=0.05, runs=1000, dist="uniform"):
    sel, best, rank = [], [], []
    for _ in range(runs):
        skill = rng.uniform(0, 100, N) if dist == "uniform" else rng.normal(50, 15, N)
        luck = rng.uniform(0, 100, N)
        score = (1 - w) * skill + w * luck
        top = np.argpartition(-score, k)[:k]
        sel.append(skill[top].mean()); best.append(np.sort(skill)[-k:].mean())
        order = np.argsort(-skill); r = np.empty(N, int); r[order] = np.arange(1, N + 1)
        rank.append(r[top].max())
    return np.mean(sel), np.mean(best), np.mean(rank)
extra = ["\n## Skill cost (N=18300, k=11, w=5%)", "| dist | avg skill selected | avg skill true top-11 | worst skill-rank among selected |", "|---|---|---|---|"]
for d in ["uniform", "normal"]:
    s, b, r = skill_gap(dist=d)
    extra.append(f"| {d} | {s:.2f} | {b:.2f} | {r:.0f} |")
print("\n".join(extra))
open(__file__.replace("luck_sim.py", "luck_sim_results.md"), "a").write("\n".join(extra) + "\n")
