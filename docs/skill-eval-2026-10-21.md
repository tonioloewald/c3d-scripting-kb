# Skill evaluation, 2026-10-21

**What was tested:** an agent followed `skill/SKILL.md` using only this repo and wrote three scripts: Brick Wall (Polygonobj), Distribute Selected (Tool) and Wobble (Tag). They are in `examples/generated/`. All three pass lint; none has been run in Cheetah3D.

**Critique, and what changed as a result:**

| Critique | Change |
|---|---|
| Polygon winding and facing were not documented. | Added to gotchas §4 and to Verify #17. |
| The rotation component mapping (h/p/b and axes) was missing. | Added to gotchas §5 and to Verify #18. |
| There was no pattern for additive expression tags, so they fell into the read-back trap. | Added patterns A3b, gotchas §5 and SKILL rule 2. |
| The KB didn't say what tag scripts are allowed to do (buttons, writing their own parameters, undo). | Added to gotchas §5 and to Verify #19. |
| Undo across several objects wasn't covered. | Added patterns B12, gotchas §5 and Verify #20. |
| The skill didn't say which menu runs each script type. | Added a column to the SKILL type table. |
| The "Update Scripts Menu" advice conflicted with the book. | SKILL now says to relaunch, or use the menu item if present, and Verify #21 was added. |
| Rule 2 was worded wrongly for expression tags. | Reworded: always pass `false`, including in helpers. |
| The linter missed `setParameter` calls inside helpers called from hooks, and missed undo recorded in `performExpression`. | Fixed in `tools/c3d_lint.py`. |
| The linter's "ok" overstated what was checked. | It now prints "no static issues found (not run in Cheetah3D)". |
| The linter listed documented methods as forum-only. | Fixed. |
