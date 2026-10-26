## Baseline (N=18300, k=11, w=5%, uniform, 1000 runs)
avg luck of selected = 94.7; avg overlap with top-11-by-skill = 1.62 of 11

## Sensitivity: luck weight x pool size (uniform skill, k=11, 1000 runs) -> luck / overlap
| N \ w | 1% | 2% | 5% | 10% | 20% |
|---|---|---|---|---|---|
| 100 | 50.6 / 10.9 | 51.9 / 10.7 | 54.1 / 10.2 | 58.5 / 9.5 | 67.5 / 7.9 |
| 1000 | 57.7 / 9.6 | 65.0 / 8.4 | 77.7 / 6.0 | 84.6 / 4.4 | 89.9 / 3.0 |
| 18300 | 88.2 / 3.5 | 91.7 / 2.5 | 94.8 / 1.6 | 96.4 / 1.1 | 97.6 / 0.8 |
| 100000 | 94.8 / 1.5 | 96.5 / 1.0 | 97.7 / 0.7 | 98.5 / 0.5 | 99.0 / 0.4 |

## Normal skill (mean 50, sd 15, unclipped), N=18300, k=11 -> luck / overlap
| w | luck | overlap |
|---|---|---|
| 1% | 51.7 | 10.6 |
| 2% | 53.8 | 10.3 |
| 5% | 59.9 | 9.3 |
| 10% | 69.7 | 7.6 |
| 20% | 83.4 | 5.1 |

## Skill cost (N=18300, k=11, w=5%)
| dist | avg skill selected | avg skill true top-11 | worst skill-rank among selected |
|---|---|---|---|
| uniform | 99.72 | 99.97 | 113 |
| normal | 102.18 | 102.44 | 15 |
