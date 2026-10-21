# X Article draft: "I dissected X's algorithm"

> Draft for an X Article (long-form post). English. Every claim comes from `xai-org/x-algorithm` (commit 7f2ca2b, Oct 21 2026), same sources as the interactive essay. Video slots are marked `[VIDEO n]` and specified at the end. Cover image spec at the end.

## Title options (pick one)

1. **I dissected X's algorithm line by line. Here's exactly how it decides who sees your posts.** (recommended)
2. I dissected the X algorithm. Most growth advice is wrong, and the code proves it.
3. I dissected X's source code to find out what actually gets you reach. Here's the playbook.

---

## Article

[VIDEO 0: the factory, 20 s loop]

Everyone on this app has a theory about the algorithm.

Hashtags help. Links get punished. A reply is worth 27 likes. Posting too much kills your reach.

None of that has to be a theory anymore. X publishes the code that builds your For You feed, with the production parameters, in a public repo. So I read it. The weights, the thresholds, the filters, the file names. Then I rebuilt the whole pipeline as an interactive essay so I could poke at it.

This is what I found, turned into a playbook.

It's long. Bookmark it. The 7-day plan at the end is the part you'll actually use.

### The one rule before anything else

**You don't get a score. Every reader gives you one.**

For every post and every person who might see it, X predicts the probability of 64 different actions: like, reply, repost, copy the link, mute you, report you. Then it multiplies each probability by a weight and adds them up.

So the same post has a great score for someone who loves your topic and a negative score for someone who doesn't. Your job isn't to "beat the algorithm". It's to be the obvious yes for a specific group of people, and to never be the obvious no for anyone it shows you to.

Keep that in mind. Everything below follows from it.

Here's what we'll cover, in the order the algorithm actually runs:

- how your post gets into the race (and why the first like matters more than the hundredth)
- the filter that silently kills replies and AI-sounding accounts
- what each action is actually worth, straight from the code
- the negative signals that sink a post with likes
- why a good post loses to a similar one
- the cold start slot reserved for small accounts
- a 7-day plan

### How a feed gets built

Every time your For You refreshes, X runs the same five steps:

1. **Candidate sourcing.** Four sources pull up to 2,800 posts.
2. **Filter.** Old posts, posts you've seen, out-of-network replies and labeled accounts are removed.
3. **Phoenix ranking.** A Grok-based transformer reads your last 1,022 actions and predicts 64 probabilities per post.
4. **Weights and diversity.** A separate service turns the probabilities into a score and throws out posts that are too similar.
5. **Cold start.** One slot, #16, is reserved for a new post from a small account.

35 posts come out. That's your feed.

Now the playbook, step by step.

---

### 1. Get your first like fast. Then get to 32.

Your followers get your post through a source called Thunder. Everyone else can only find it through two out-of-network sources: Phoenix retrieval and SimClusters.

Phoenix retrieval only searches posts that are in its indexes. And the indexes have very honest names: **`1fav`** (posts with at least 1 like) and **`32fav`** (posts with at least 32).

Read that again. **Until your post gets its first like, it does not exist for anyone who doesn't follow you.** At 32 likes, it enters a second index.

[VIDEO 3: reach map, 0 → 1 → 32 likes]

And who likes it matters as much as how many. SimClusters pushes your post to the communities of the people who liked it. Ten likes from people in your niche send it to more people in your niche. Ten likes from random friends send it to people who will scroll past it.

**Do this:** post when the followers who actually engage with you are online. Reply to the first comments fast. Don't spread your best idea across five weak posts; put the attention on one.

### 2. Never get labeled. And never quote someone who is.

Before anything gets ranked, the Home Mixer (the service that runs the whole pipeline) applies fixed filters. Two of them matter.

**Out-of-network replies and reposts are dropped.** Your reply to a big account never shows up in the For You of people who don't follow you. Replies are for conversation and for your existing followers, not for reach to strangers.

**Labels cut you off from everyone who doesn't follow you.** Classifiers tag posts and accounts as spam, adult content, or generic AI text. The code literally calls the last one `llm_slop`, and that label lasts **30 days**. Three adult-flagged posts among your last five label the whole account for **7 days**.

The nasty one: **if you quote or reply to a labeled post, your post goes down with it**, even for your own followers.

**Do this:** write like a person. Specific numbers, your own opinions, your own voice. Don't paste generic AI text. Check X's "Under the Hood" page for your account. Be careful about what you quote.

### 3. Write for the actions that are worth 30 likes

This is the table every growth thread pretends to know. Here it is, from the code (`home-mixer/params/param.rs`):

| Action | Weight | Worth in likes |
|---|---|---|
| Copy link to post | 20 | 30× |
| Reply | 5 | 7.6× |
| Quote | 5 | 7.6× |
| Send via DM | 5 | 7.6× |
| Follow the author | 4 | 6× |
| Like | 0.66 | 1× |
| Bookmark, profile click, video view | 0 | 0 |
| Not interested | −52.3 | −79× |
| Mute | −58.8 | −89× |
| Report | −234 | −355× |

[VIDEO 1: the weights, bar by bar]

Two things jump out.

**A bookmark is worth zero.** **Copying the link is worth 20, about 30 likes.** It's the most valuable action in the system, because it means someone is about to send your post to somebody else.

And the famous "a reply is worth 27 likes"? That's from the 2023 code, when a reply weighed 13.5 and a like 0.5. It's dead.

But remember the one rule. These weights multiply *predicted probabilities for each reader*. Here's the same post scored for two people:

[VIDEO 2: same post, two readers]

For Bia, who follows coffee accounts, the biggest contribution isn't the like. It's the reply. For Caio, who only watches soccer, a 1.5% chance of "not interested" drags the score negative.

**Do this:** write posts people want to send to someone (data, lists, comparisons, things that settle an argument). End with a question your audience can actually answer, not "thoughts?".

### 4. Follow back the people who reply to you

One line in the code changes everything for small accounts: if the author and the reader follow each other, a reply on an original post gets a **+15 bonus**. It's worth **20** instead of 5.

The repo even documents the history: they tested values from 5 to 20, launched at 20, and cut it to 15 in July after complaints during the World Cup.

**Do this:** follow back the people who reply to you. It quadruples the weight of their replies on your posts. Following back people who never interact does nothing, because their probability of replying is close to zero.

### 5. Stop farming rage

The negative weights are huge: −52 for "not interested", −59 for mute. Counting only likes, a post with a 1% chance of "not interested" needs about an 80% chance of a like just to break even. Nothing gets 80%.

That's why rage bait backfires. It gets replies and likes, and it also gets muted. A negative score puts your post below every positive post in the feed.

The flip side: you've probably heard that "one report cancels 468 likes, so mass reports can kill any account". The engineers left a comment in the code saying exactly that this is wrong. The weight multiplies the *predicted probability* of a report, not the number of reports. Reports are over 1,000× rarer than likes, which is why the weight is so big. And predictions are personalized: a group of people reporting you changes what the model predicts for people like them, not for everyone.

**Do this:** be provocative about ideas, not about people. If your post makes your own audience mute you, the algorithm will notice before you do.

### 6. Have your own angle. Similar posts get a score of zero.

This is the part almost nobody talks about.

After scoring, the top 150 posts go through a diversity algorithm (a DPP). It picks **50** posts that have high scores *and* are far apart from each other in embedding space. **Everything it doesn't pick gets a score of zero.**

[VIDEO 5: 150 posts, 50 picked]

So you're not only competing with better posts. You're competing with *similar* posts. If you post the same take as everyone on today's topic, you're fighting dozens of near-duplicates for one spot. If you bring your own data, your own angle or a different format, you're alone in your corner of the map, and you get picked even with a lower score.

**Do this:** before you post on the topic of the day, ask what you can say that nobody else in your feed is saying.

### 7. Win the cold start slot

This is the rule that matters most for small accounts.

**In every feed, slot #16 can go to a post in cold start.** To compete, your post must be original (not a reply or repost), under **2 hours** old, under **200 views** in the feed, and your account must have at most **50k followers**.

The criterion is your **like-per-view rate**. To avoid trusting tiny samples, the code assumes every post starts at **1.5%**, weighted like 50 imaginary views.

So if your post has 3 likes in its first 20 views, the system doesn't think you're at 15%. It estimates **5.4%**. That's still more than triple the starting point, which is huge.

[VIDEO 4: cold start estimate and the slot-16 draw]

Then it doesn't just pick the highest estimate. On every feed it runs a random draw from each post's distribution (Thompson sampling), takes the top two and picks the one with the better score. Posts with little data sometimes win. That's how X tests new posts.

Two details from the code that change how you should post:

- **Views only count if they happen in the feed. Likes count from anywhere** (profile, notifications, a link), capped at your feed views.
- So the best time to post isn't when the most people are online. It's when your **most engaged** followers are online. Views from people who don't like your stuff burn through your first 200 views at a low rate.

### What the code debunks

| Claim | Verdict | In the code |
|---|---|---|
| Hashtags increase reach | Myth | No rule handles hashtags. They're plain text. |
| Bookmarks help | Myth | Zero weight. |
| External links are penalized | Myth | Opening a link is worth +0.2. No penalty. |
| Premium boosts ranking | Partly | No ranking bonus. But the badge goes into your post's embedding, and Premium gets priority in replies. |
| Profile clicks count | Myth | Zero weight. |
| Group chat likes help | Partly | Not for the score: only engagement on posts served in the feed counts. For cold start, the likes count. |
| Following back repliers helps | True | A mutual's reply is worth 20 instead of 5. |
| Posting a lot hurts reach | Myth | The author penalty only applies inside one feed refresh. Every new post gets its own cold start chance. |

### One more thing: none of these numbers are fixed

Almost every number above is a feature switch. The code ships a default, but the live value is read from a config file. The ranking service re-reads that config every **30 seconds**, and an A/B testing file splits users into groups. You and I can be on different versions of the algorithm right now.

The numbers will change. The mechanisms won't: a score per reader, heavy penalties for negative feedback, mandatory diversity, and a cold start that runs on likes per view.

### Your 7-day plan

**Day 1.** Check "Under the Hood" for labels. Read your last 20 posts and delete anything that reads like generic AI text.

**Day 2.** Find the 20 people who reply to you most. Follow back the ones you don't follow yet.

**Day 3.** Look at your analytics. Find the hour when your most engaged followers like your posts. That's your posting hour now.

**Day 4.** Write one post designed to be sent: a dataset, a comparison, a list that settles a debate. Post it at your hour. Reply to every comment in the first 30 minutes.

**Day 5.** Pick today's big topic. Write the angle nobody else in your feed has. If you can't find one, skip the topic.

**Day 6.** End two posts with a specific question your audience can answer from experience.

**Day 7.** Check like-per-view on each post at 200 views. Keep the formats above 2%. Drop the ones below.

Then repeat, and change one thing at a time, or you'll never know what worked.

---

If you want to see all of this moving, I built an interactive version where you can run the pipeline yourself: drag the probabilities, add likes, flood the feed with similar posts and watch your post get a score of zero.

**→ Dissecting the X algorithm (interactive essay):** https://renatoshira.github.io/dissecando-o-algoritmo-do-x.html

Everything here comes from `xai-org/x-algorithm` (commit 7f2ca2b, Oct 21 2026). File and line references are in the essay.

---

## Video specs

All videos: 1080×1080 (square, readable on phones in the X Article column), 30 fps, H.264 MP4, silent, 12–20 s, loop-friendly (last frame ≈ first frame). Visual language from the site and the factory: white or warm paper background, Space Mono, ink #141414, @ana orange #ef7d32, positive green #1f8a5f, negative red #d2483a, structure blue #3e4ea6. Text large enough to read at 390px width (minimum ~34px at 1080). Each video has one short title line on top and nothing that depends on reading body text.

- **VIDEO 0 · the factory (hero).** Screen recording of the isometric factory widget from the essay, EN, labels on, "Follow @ana's post" on, recorded at 2× pixel density and framed 16:9 or square crop. 20 s. Shows a post going through the 5 stages into slot 16.
- **VIDEO 1 · the weights.** Title "What each action is worth (in likes)". Horizontal bars grow one by one from zero, sorted: copy link 30×, reply 7.6×, quote 7.6×, DM 7.6×, follow 6×, like 1×, bookmark 0 (bar stays empty and gets a "0" stamp), then the negatives grow left in red: not interested −79×, mute −89×, report −355× (the report bar runs off-frame with an arrow). End card: "Bookmark: 0. Copy link: 30 likes."
- **VIDEO 2 · same post, two readers.** Title "Same post. Two scores." The @ana post card in the middle, two reader avatars (Bia ☕, Caio ⚽). For each, contribution bars (prob × weight) stack up and down; totals count up to +0.30 (green) and −1.02 (red). Highlight that Bia's biggest bar is the reply.
- **VIDEO 3 · reach map.** Title "Who can see your post". Same layout as the essay's reach map: @ana in the center, followers ring, four clusters. Three beats with a big counter: "0 likes: only followers" → "1 like: enters 1fav" (coffee cluster lights orange) → "32 likes: enters 32fav" (spreads to tech). 
- **VIDEO 4 · cold start.** Title "3 likes in 20 views = 5.4%". Squares fill (20 views, 3 orange likes), a naive "15%" appears and gets crossed out, the Beta curve rises with the estimate line at 5.4% and the 1.5% prior marked. Second half: five posts' distributions, dots flicker as draws, a "#16" slot badge jumps to the winner several times.
- **VIDEO 5 · diversity.** Title "Similar posts get a score of zero". 150 dots in clusters; greedy pick animation fills 50; the rest gray out with "0". Then 10 similar dots drop next to @ana and she grays out; then she slides to an empty region and lights up again.

## Cover image spec

5:2 (1500×600 or 2000×800), the factory still with "I dissected X's algorithm" in large type on the paper background.
