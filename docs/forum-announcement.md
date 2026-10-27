# Forum announcement (draft)

Suggested subforum: **Cheetah3D Scripting › Script downloads**. You could also add a short reply to the "Master List of Scripts" thread (#5752) that links to the new post.

---

**Title:** Cheetah3D scripting knowledge base: every script from this forum, the 8.1.1 API docs, and a guide for using AI to write scripts

Hi all,

Some of you will remember me from years of answering scripting questions here, and from the "Master List of Scripts" thread. I mostly use other tools these days, but I wanted to leave something useful behind for anyone who still scripts Cheetah3D.

I've put together a knowledge base on GitHub: **https://github.com/tonioloewald/c3d-scripting-kb**

**What's in it**

- **Every script posted in the two Scripting subforums** (Script downloads + General): about 270 script files from 539 threads, pulled from code blocks and zip attachments. Each file credits its author and links back to the original post. tg_jp's scripts are linked to his site, not copied: please download them from tres-graficos.jp and consider supporting him.
- **A catalog** sorted by category. For each script it shows what it does, whether people in the thread said it **worked**, **broke** or was **fixed later**, which Cheetah3D versions were mentioned, and links to the evidence.
- **The official 8.1.1 scripting reference** and the example scripts that ship with Cheetah3D, converted to plain text.
- **A "gotchas" guide**: about 450 hard-won lessons from these threads, merged into one cited document. It covers the things the docs don't tell you, for example:
  - leaving off the trailing arguments to `addParameterBool` can crash Cheetah3D;
  - `setParameter` inside `buildObject` without `false` causes an infinite rebuild loop;
  - a script in the wrong folder fails silently;
  - the light constants changed in 5.x;
  - `doc.selectedObject()` never returns null.
- **Working templates** for every script type (Macro, Tool, Tag, Polygonobj, Splineobj, Particle) and for common jobs like building meshes with UVs, keyframing through F-curves and including a shared library.

**Using it with an AI (ChatGPT, Claude, etc.)**

Most of the reason I built this is that AI assistants write *plausible-looking but wrong* Cheetah3D scripts, because there's so little accurate information about the API out there. The repo includes a guide written for the AI to fix that. You don't need to download anything: start a chat and begin your message with

> Read https://raw.githubusercontent.com/tonioloewald/c3d-scripting-kb/main/dist/c3d-context-short.md and follow it.

and then say what script you want, or paste in a broken one and the error from the Console. If your AI can't open links, download that file and attach it instead. There's also a complete version (`dist/c3d-context-full.md`) you can add to a ChatGPT or Claude project.

With the guide loaded, the AI knows the real API, the folder rules and the common traps. **Always test what it gives you**: it hasn't seen your Cheetah3D.

**How you can help**

1. **Tell us what works in 8.x.** Most "works" reports in the catalog date from versions 5–7. If you run an old script in 8.x, post here, with the script name, your version, and whether it works or what the error was. I'll fold your reports into the catalog.
2. **Help confirm the open questions.** The end of the gotchas guide has a short "verify in app" list, with things like which polygon winding faces outward and whether the old light constants still exist. Several are one-line tests in a Macro script.
3. **Fixes are welcome.** If you update an old script to work in 8.x, post it here or open a pull request on GitHub.

**About credit and licensing**

I've treated scripts posted publicly here as shared for others to use, under the Creative Commons Attribution (CC BY) license: every file names its author and links to the original post. **If you're an author and want your script removed or credited differently, tell me here, by PM, or with a GitHub issue, and I'll do it promptly.**

Thanks to everyone whose work is in there. tg_jp, hairball600, ToddWR, Herb, feloneouscat, Edward, filip c, frank beckmann, MrTAToad, crgreen, Martin himself and many others: this is really your collection.

— Tonio (podperson)
