# 1. Executive Summary

## 1.1 Project Overview

`hello_world` is a single-file Node.js service publishing two plain-text endpoints on the loopback interface. Express supplies the path router: `GET /good-evening` answers `Good evening`, `GET /` keeps answering `Hello, World!`, both at status 200 with a bare `text/plain` type. The change touches `server.js` and `package.json` and adds `express` as the only third-party dependency. It is an internal smoke-and-reference endpoint, byte-exact on the wire.

## 1.2 Completion Status

```mermaid
pie title AAP-Scoped Completion
    "Completed Work" : 10
    "Remaining Work" : 10
```

Completed = Dark Blue (#5B39F3) · Remaining = White (#FFFFFF)

| Metric | Value |
|---|---|
| Total Hours | 20.0 |
| Completed Hours (Baseline: Human with agentic-assist) | 10.0 |
| Remaining Hours | 10.0 |
| Completion | 50.0% |

10.0 completed hours out of 20.0 total = **50.0% complete**. All three requested requirements are delivered and verified; the remaining ten hours are path-to-production work the agreed constraints deferred.

## 1.3 Key Accomplishments

- `GET /good-evening` answers 200 with a bare `text/plain` header and a byte-exact 13-byte body.
- `GET /` still answers 200 with the original 14 bytes; the only wire change is `X-Powered-By`.
- `express ^5.0.0` is the single dependency; a clean install resolves 5.3.0.
- The Express application is the existing server's listener; bind, port, listen block and log unchanged.
- Unspecified inputs follow Express defaults: stock 404, framework `HEAD`/`OPTIONS`, no custom handler.
- The listener is loopback-only: no wildcard bind, no IPv6 row, off-loopback connections refused.
- 55 assertions were executed against the delivered tree: 55 passed, 0 failed.
- `server.js` is 15 lines and the manifest 14, with no added file, no lockfile change, no placeholder.

## 1.4 Critical Unresolved Issues

Open items: **7**. Requested requirements outstanding: **0 of 3** — the new route (R1), the unchanged root route (R2) and the single dependency (R3) are all delivered.

| Issue | Impact | Owner | ETA |
|---|---|---|---|
| No automated test suite guards the two route contracts | A future edit to the response construction can silently reintroduce `charset=utf-8` or an `ETag` | Backend developer | 1 sprint (4.0 h) |
| Committed lockfile is not synchronised with the manifest; `npm ci` exits 1 | CI pipelines and clean images cannot install; installs are not reproducible | Backend developer / DevOps | 1 sprint (1.5 h) |
| No start script, process supervision or health check | A restart leaves the service down; a port conflict exits 1 unattended | DevOps | 1 sprint (2.0 h) |
| Written contract omits the explicit-header mechanism and states no `Content-Length` appears | Reconciling code with the contract can break the bare header; a literal acceptance test fails on correct code | Maintainer | Next documentation change (1.0 h) |
| Runtime bound undeclared (no `engines` field) | An older Node host fails at boot with a module error and no manifest signal | Backend developer | 1 day (0.5 h) |
| Install tree untracked with no ignore rule | A careless `git add -A` stages 65 packages | Backend developer | 1 day (0.5 h) |
| `"main": "index.js"` names a file that does not exist | Stale metadata pointing at a non-existent entry point | Backend developer | 1 day (0.5 h) |

## 1.5 Access Issues

No access issues identified. No credentials, environment variables, registry authentication or third-party API are needed: dependencies come from the public npm registry and the service binds only the loopback interface.

## 1.6 Recommended Next Steps

1. **[High]** Synchronise the lockfile and make `npm ci` the build's install step.
2. **[High]** Add a start script, process supervision and a health check.
3. **[Medium]** Add the route-contract suite covering status, bare content type, exact bodies, the default 404 and no `ETag`.
4. **[Medium]** Record the wire contract — header mechanism and `Content-Length` framing — in the project's documentation.
5. **[Low]** Declare `engines: node >=18`, ignore the install tree, and correct the stale `main`.

# 2. Project Hours Breakdown

## 2.1 Completed Work Detail

| Component | Hours | Description |
|---|---|---|
| `GET /good-evening` route and byte-exact response | 1.5 | Chained registration on the shared application returning 200 with a bare `text/plain` header and the 13-byte body, confirmed on the wire. Traces to R1 and the route contract in 0.8.1. |
| Preserved `GET /` response | 1.0 | Same status, same header value and the same 14 bytes as the pre-change service, produced on the same Node response object. Traces to R2 and the preservation table in 0.8.2. |
| `express` declaration, single require and resolution | 1.0 | One manifest entry, one require line beside the core `http` require, and a clean install resolving 5.3.0 with its transitive closure and nothing else. Traces to R3 and 0.3.1–0.3.4. |
| Application-as-listener integration with preserved bind and start-up log | 1.0 | The Express application replaces the inline listener; hostname, port, listen call and start-up line are byte-identical to the earlier build. Traces to 0.1.2 and 0.4.1–0.4.4. |
| Runtime verification of both route contracts and framework defaults | 4.0 | Header, byte, default-404, `HEAD`/`OPTIONS`, concurrency and adversarial-input checks, plus a comparison against the pre-change build. Traces to 0.8.1–0.8.5. |
| Static gate, manifest and lockfile discipline, tree integrity | 1.5 | `node --check`, both manifests parsed, committed lockfile blob unchanged, no file added, placeholder test script confirmed. Traces to 0.9.1–0.9.2. |
| **Total** | **10.0** | |

## 2.2 Remaining Work Detail

| Category | Hours | Priority |
|---|---|---|
| Automated route-contract test suite for both routes (status, bare content type, exact bytes, default 404, no `ETag`) | 4.0 | Medium |
| Reproducible install: synchronise the committed lockfile with the manifest so `npm ci` resolves `express` | 1.5 | High |
| Deployment start path: explicit start script, process supervision with restart policy, health check | 2.0 | High |
| Written contract alignment: record the explicit-header mechanism and Node's `Content-Length` framing | 1.0 | Medium |
| Declared runtime bound (`engines: node >=18`) | 0.5 | Low |
| Ignore rule for the install tree (`node_modules`) | 0.5 | Low |
| Corrected `main` entry point | 0.5 | Low |
| **Total** | **10.0** | |

Every remaining row is a path-to-production or maintainability need rather than undelivered functionality: all three requested requirements (R1, R2, R3) are complete, and the two partial verdicts recorded in Section 5.2 are contract-documentation gaps closed by the fourth row above. Completed 10.0 h + Remaining 10.0 h = 20.0 h total, which is the figure in Section 1.2 and Section 7.

# 3. Test Results

Every row below records checks that were executed against the delivered tree at commit `7a17d5e`, with the observed result. No coverage figure is reported because the project configures no coverage tool.

| Area / Category | Framework | Tests | Passed | Failed | Coverage | What This Proves |
|---|---|---|---|---|---|---|
| Static gate and structural integrity | `node --check`, `awk`, `grep` | 13 | 13 | 0 | Not measured — no coverage tool configured | The single module parses, the files have the contracted shape, and there is no placeholder, hidden configuration, extra route or error handler |
| HTTP route contract — `GET /` and `GET /good-evening` | `curl` with byte-for-byte comparison | 13 | 13 | 0 | n/a for shell assertions | Both routes answer 200 with a bare `text/plain` header, `Content-Length` 14 and 13, bodies identical to the contracted bytes, no `ETag` and no hardening header |
| Framework defaults for unspecified input | `curl` and raw HTTP | 14 | 14 | 0 | n/a | Unmatched paths and methods receive the stock 404 without leaking paths or stack frames; `HEAD` and `OPTIONS` behave as framework defaults; query strings, traversal paths and NUL bytes never change a response |
| Bind scope and process lifecycle | shell, `/proc/net/tcp`, signals | 11 | 11 | 0 | n/a | The service listens only on `127.0.0.1`, never on the wildcard address and never on port 3000, logs exactly one line, survives repeated and concurrent requests, and releases the port on `SIGTERM` |
| Dependency declaration and resolution | `npm` | 2 | 2 | 0 | n/a | `express` is declared once and resolves to 5.3.0 from the declared range |
| Manifest and lockfile integrity | `git hash-object`, `JSON.parse` | 2 | 2 | 0 | n/a | The committed lockfile content is unchanged and parses, so the commit carries no install artifact |
| Manifest test script | `npm test` | 1 | 0 | 1 | n/a | The repository declares no automated tests: the script is the untouched manifest placeholder `echo "Error: no test specified" && exit 1`, so nothing in the repository re-checks the contract |

Totals: 56 checks executed — 55 assertions passed with 0 assertion failures, plus the one manifest placeholder that exits 1 by design.

**Not Covered**

- **No automated test suite.** Every assertion above was executed by hand against the running service; none of it re-runs after a change. A human should add the route-contract suite (Section 2.2, first row) before anyone edits the response construction, because that is the only edit that can silently reintroduce `charset=utf-8` or an `ETag`.
- **No coverage measurement.** No coverage tool, linter, type checker or CI configuration exists, so no line or branch coverage figure can be reported.
- **No off-loopback behaviour is exercised.** There is no authentication, authorization, TLS, session or cookie logic to test — the loopback bind is the entire access model, and anything arriving from another host is simply refused.
- **No user interface.** Both routes return plain text; there is no screen, view, style or asset to render or compare.
- **No sustained load.** Concurrency was exercised in short bursts (repeated and parallel requests) with no soak test, memory profile or rate-limit behaviour to measure.
- **No deployment packaging.** No supervisor unit, start script or health endpoint exists, so the deployment path itself is unexercised.

# 4. Runtime Validation & UI Verification

Not applicable beyond plain-text responses: no screen, view, style or asset exists, and the attached design frame is not rendered by any file here.

- ✅ **Start-up** — with `express` installed, `node server.js` boots with a single log line and answers on the first request; with `node_modules` absent it fails fast naming the missing module and binds nothing.
- ✅ **`GET /good-evening`** — 200, bare `text/plain`, `Content-Length: 13`, body `Good evening` + LF, `X-Powered-By: Express`, no `ETag`.
- ✅ **`GET /`** — 200, bare `text/plain`, `Content-Length: 14`, body `Hello, World!` + LF, byte-identical to the pre-change response apart from the added `X-Powered-By`.
- ✅ **Unmatched path and method** — stock 404 page (`Cannot GET /nope`, `Cannot POST /`) with no stack frame, internal path or exception class in the body.
- ✅ **`HEAD` and `OPTIONS`** — 200 header-only and 200 with `Allow: GET, HEAD`, the framework's own responders, no handler added.
- ✅ **Loopback reachability** — one listening socket on `127.0.0.1`; no wildcard row, no IPv6 listener, connections to the container address refused.
- ✅ **Repeated and concurrent traffic** — 20 repeated and 20 parallel requests return identical bodies and the start-up log stays at exactly one line.
- ✅ **Shutdown and restart** — `SIGTERM` terminates cleanly and releases the port; a restart rebinds and serves the same bytes.
- ⚠ **Start-up log port** — the line always reports `http://127.0.0.1:3000/`, even when the listener runs on another port, so an operator trusting the log can probe the wrong port.
- ❌ **Install from the committed lockfile** — `npm ci` exits 1 with `Missing: express@5.3.0 from lock file`; `npm install` is the only working install command.

Never exercised at runtime: there is no authentication or authorization flow, no database or cache, no outbound integration, no user interface, no sustained load profile and no deployment packaging (supervisor unit, start script, health endpoint) anywhere in this project.

# 5. Compliance & Quality Review

## 5.1 Compliance Matrix

Completed = Dark Blue (#5B39F3) · Remaining = White (#FFFFFF)

| # | Deliverable | Benchmark | Verified Status | Progress |
|---|---|---|---|---|
| 1 | `GET /good-evening` route (R1) | Functional correctness and contract fidelity | ✅ Pass | 🟦 Complete |
| 2 | Preserved `GET /` route (R2) | Backward compatibility of the existing response | ✅ Pass | 🟦 Complete |
| 3 | Single `express` dependency (R3) | Dependency minimalism — one declaration, one require | ✅ Pass | 🟦 Complete |
| 4 | Response header contract — bare `text/plain`, no `ETag` | Wire-contract fidelity | ✅ Pass | 🟦 Complete |
| 5 | Default behaviour for unspecified input | Framework-default discipline — no handler added | ✅ Pass | 🟦 Complete |
| 6 | Bind and access model — loopback only | Security posture as specified | ✅ Pass | 🟦 Complete |
| 7 | Scope discipline — two files, no new file, no lockfile change | Change minimality | ✅ Pass | 🟦 Complete |
| 8 | Code quality — static gate, house style, no placeholders | Static analysis | ✅ Pass | 🟦 Complete |
| 9 | Input handling — injection, traversal, malformed frames | Security robustness | ✅ Pass | 🟦 Complete |
| 10 | Reproducible install | Build reproducibility via the committed lockfile | ⚠️ Fail — `npm ci` exits 1 | ⬜ 0% |
| 11 | Regression protection | Automated tests for the two contracts | ⚠️ Fail — no test suite | ⬜ 0% |
| 12 | Operational readiness | Start script, supervision, health check | ⚠️ Fail — none present | ⬜ 0% |

## 5.2 AAP & Rule Divergences and Gaps

| # | What the AAP/Rule Required | What Was Delivered Instead | Why It Diverged | Impact | Remediation |
|---|---|---|---|---|---|
| D1 | Both handlers answer with `res.set('Content-Type','text/plain').end(<literal>)` (AAP 0.4.1 listing, carried into 0.6 and 0.9.1) | `res.setHeader('Content-Type','text/plain').end(<literal>)` at `server.js:8-9` | On Express 5.3.0 `res.set` expands the value through the MIME helper and emits `text/plain; charset=utf-8`, which breaks the bare `text/plain` contract the same specification states in 0.8.1/0.8.2; the contract outranks the mechanism it is written with | Wire contract met exactly; the code does not match the specification's literal mechanism, so a reader reconciling the two can "correct" it and silently reintroduce the charset parameter | Record the mechanism in the written contract (Section 2.2, row 4); do not revert the handlers |
| D2 | `res.end` is used so "no `ETag` or `Content-Length` appears" (AAP 0.4.2) | No `ETag`; `Content-Length: 14` and `13` are present | Node 22 frames a single `res.end(buffer)` write with `Content-Length`, and the pre-change server emitted the same header; suppressing it needs manual chunked framing the specification forbids (0.8.5, 0.9.1) | Documentation-only: an acceptance check written literally from that sentence fails on correct code | Correct the contract wording (Section 2.2, row 4) |
| D3 | The user's manifest constraint names only `name`, `version` and the dependency | The `dependencies` block was added and the seven pre-existing fields (`description`, `main`, `scripts`, `author`, `license`, …) were kept | AAP 0.10.2 resolves the restriction to govern what is introduced; deleting existing fields would be the unrelated refactoring the same constraint forbids | None — the manifest gains only the dependency | Sanctioned; no action |
| D4 | "Modify only server.js" (user constraint, AAP 0.1.3) | `server.js` and `package.json` both changed | The same request requires `express` to be declared (R3) and AAP 0.9.1 scopes `package.json` as an update; a dependency cannot be declared without touching the manifest | None — the manifest edit is the requested change | Sanctioned; no action |

No divergence from either registered user rule was found: `QA-rules-0001` has an empty body and `ABK-4958 Rule editing` records provenance only, so neither states a requirement the tree could violate.

**D1 — handler mechanism.** `server.js:8-9` sets the header with `res.setHeader('Content-Type','text/plain')` and ends the response with the body literal. The specification's listing in AAP 0.4.1 shows `res.set(...)`, and on Express 5.3.0 that call rewrites the value to `text/plain; charset=utf-8` (the MIME helper appends the charset), which contradicts the contract the same document fixes in 0.8.1/0.8.2 and the value the pre-change service sent. The delivered form is the only one that produces the contracted header, and it is verified on the wire for both routes. The decision a maintainer must make is documentary rather than behavioural: state the explicit-header mechanism in the project's written contract so a future reader does not revert it, and keep the handlers as they are.

**D2 — absent `Content-Length`.** AAP 0.4.2 states that using `res.end` rather than `res.send` means "no `ETag` or `Content-Length` appears". The `ETag` half holds. The `Content-Length` half does not: `server.js:8-9` writes a single buffer, and Node 22 frames that write with `Content-Length: 14` and `13`. The pre-change service (commit `8bb4eb6`) emitted the same header from the same framing, so the change introduces nothing. Suppressing it would require chunked framing that the minimal-diff contract forbids. A maintainer should correct the written contract, and treat the header's presence as expected output in any acceptance check derived from it.

# 6. Risk Assessment

| Risk | Category | Severity | Probability | Mitigation | Status |
|---|---|---|---|---|---|
| An edit to the response construction reintroduces `charset=utf-8` or an `ETag`, and nothing catches it | Technical | High | Medium | Add the route-contract test suite (Section 2.2, row 1) and keep the explicit-header form | Open |
| A future 5.x release changes header or body framing under the unpinned `^5.0.0` range | Technical | Medium | Medium | Pin the resolved version or verify the contract on every upgrade; the suite makes the check automatic | Open |
| CI and clean images cannot install, because the committed lockfile carries no `express` node | Operational | High | High | Synchronise the lockfile so `npm ci` resolves the declared dependency (Section 2.2, row 2) | Open |
| No supervision or health check: a restart or a port conflict leaves the service down | Operational | Medium | Medium | Add the start script, supervisor unit and health check (Section 2.2, row 3) | Open |
| The start-up log always reports port 3000 even when the listener runs elsewhere | Operational | Low | Medium | Log the address actually bound | Open |
| The untracked install tree can be committed by a broad `git add` | Operational | Medium | Medium | Add the ignore rule (Section 2.2, row 6) | Open |
| Moving the bind address off loopback would expose an unauthenticated, unhardened service | Security | High | Low | Keep the loopback bind, or add authentication, security headers and rate limiting before any external exposure | Open |
| The default 404 echoes the requested path (escaped) and `X-Powered-By` discloses Express | Security | Low | Certain | Accepted framework defaults the contract requires; revisit only if the service is ever exposed | Accepted |

# 7. Visual Project Status

```mermaid
pie title Project Hours Breakdown
    "Completed Work" : 10
    "Remaining Work" : 10
```

Completed = Dark Blue (#5B39F3) · Remaining = White (#FFFFFF). Completed 10.0 h of 20.0 h = **50.0%**.

| Remaining Category | Hours |
|---|---|
| Automated route-contract tests | 4.0 |
| Reproducible install (lockfile) | 1.5 |
| Deployment start path | 2.0 |
| Written contract alignment | 1.0 |
| Runtime bound, ignore rule, entry point | 1.5 |
| **Total** | **10.0** |

# 8. Summary & Recommendations

The service now routes on path instead of answering every request with one body: `GET /good-evening` returns `Good evening`, `GET /` still returns `Hello, World!`, and both answer 200 with a bare `text/plain` header and byte-exact bodies of 13 and 14 bytes. Express is the only dependency, declared once and required once, and it replaces the inline listener while the bind address, port, listen call and start-up log stay exactly as they were. Everything unspecified — other paths, other methods, negotiation — is left to the framework's defaults, which is the behaviour the specification asks for.

The delivered work was exercised rather than assumed: 55 assertions were executed against the tree and all passed, covering the static gate, both route contracts, the framework's default responses, the bind scope and the process lifecycle. Measured against the agreed scope, all three requested requirements and every scope constraint are met, and none of the requested functionality is outstanding. The completion figure is **50.0%** (10.0 h of 20.0 h) because the denominator includes the path-to-production work the scope deliberately excluded: the request forbade tests, documentation, a lockfile change, extra manifest fields and any hardening, so those obligations remain open by design rather than by omission.

| Metric | Value |
|---|---|
| Requested requirements delivered | 3 of 3 (R1, R2, R3) |
| Assertions executed / passed | 55 / 55 |
| Wire fidelity | Byte-exact bodies, bare `text/plain`, no `ETag` |
| Added dependencies | 1 — `express` 5.3.0 from `^5.0.0` |
| Files changed | 2 (`server.js`, `package.json`) |
| Open items | 7, estimated 10.0 h |

The critical path to production is short and ordered: make the install reproducible by synchronising the lockfile, then give the process a supervised start path with a health check, then add the route-contract suite so the byte-exact behaviour cannot regress, and finally record the two contract details (the explicit-header mechanism and Node's `Content-Length` framing) in the project's own documentation. The last three items — a declared runtime bound, an ignore rule for the install tree and the stale `main` entry point — are housekeeping that can ride along with any of the above.

**Production readiness:** the code is ready for its stated purpose — a loopback-bound, dependency-light service with two byte-exact plain-text routes — and it behaves exactly as specified on every check that applies to it. It is not yet ready for a CI-driven or externally reachable deployment: `npm ci` cannot install from the committed lockfile, there is no supervision or health check, and nothing in the repository would catch a change that breaks the contracted headers. Those three gaps, totalling 7.5 of the 10.0 remaining hours, are what stands between this branch and a releasable service.

# 9. Development Guide

**System prerequisites**

- Node.js 18 or later (Express 5 requires it). Verified on Node v22.23.5 with npm 11.21.0.
- No database, cache, message broker, container runtime or cloud service is needed.
- No environment variable, credential or configuration file is read by the application.
- Disk footprint of the installed dependency tree is roughly 5 MB.

**Dependency installation**

Run from the repository root:

```bash
npm install --no-audit --no-fund
```

Expected output ends with `added 65 packages` (or `changed 65 packages` / `up to date` on repeat runs), and `express` resolves to 5.3.0 from the declared `^5.0.0` range. The command rewrites the working-tree `package-lock.json`; restore it so the committed content stays as it is:

```bash
git checkout -- package-lock.json
git status --porcelain        # expected: only "?? node_modules/"
```

`npm ci` does not work yet — see Section 2.2, row 2 — so `npm install` is the install command.

**Static check**

```bash
node --check server.js        # silent, exit 0
```

There is no compiler, bundler, linter, type checker or coverage tool in this project; `node --check` is the whole static gate.

**Application start-up**

Normal start, when `127.0.0.1:3000` is free:

```bash
node server.js
```

Expected output is one line: `Server running at http://127.0.0.1:3000/`. The bind address and port are constants in `server.js`; they are not configurable and must not be edited.

If port 3000 is already in use on the host, run the same file with the listen call overridden from outside the source:

```bash
PORT=31312 node -e 'const http=require("http");const o=http.Server.prototype.listen;http.Server.prototype.listen=function(p,...a){return o.call(this,Number(process.env.PORT)||p,...a)};require("./server.js")'
```

The service then listens on the port given in `PORT`, while the start-up log still prints the hard-coded 3000. Confirm the real listener rather than trusting the log — the port appears in the kernel's TCP table as four hex digits, so 31312 is `7A50`:

```bash
awk '$2 ~ /:7A50$/ && $4=="0A" {print $2}' /proc/net/tcp    # prints 0100007F:7A50; 0100007F means loopback-only
```

**Verification steps**

```bash
curl -s -D - http://127.0.0.1:3000/                 # 200, text/plain, Content-Length: 14
curl -s -D - http://127.0.0.1:3000/good-evening     # 200, text/plain, Content-Length: 13
curl -s http://127.0.0.1:3000/ | wc -c              # 14
curl -s http://127.0.0.1:3000/good-evening | wc -c  # 13
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/nope   # 404
```

Both responses carry `X-Powered-By: Express` and no `ETag`; the `Content-Type` value must be exactly `text/plain`, with no `charset` parameter. Stop the service with `Ctrl-C` or `kill <pid>`; the port is released immediately.

**Example usage**

```bash
$ curl -s http://127.0.0.1:3000/
Hello, World!
$ curl -s http://127.0.0.1:3000/good-evening
Good evening
$ curl -s -D - -o /dev/null http://127.0.0.1:3000/good-evening
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain
Content-Length: 13
```

Each body ends with exactly one newline; a consumer comparing bytes must expect 14 and 13 bytes respectively.

**Troubleshooting**

| Symptom | Cause | Resolution |
|---|---|---|
| `Error: Cannot find module 'express'` and exit 1 | Dependencies are not installed | Run `npm install --no-audit --no-fund` in the repository root |
| `Error: listen EADDRINUSE: address already in use 127.0.0.1:3000` and exit 1 | Another process owns the port; no error handler is permitted, so the process exits | Free the port, or start with the `PORT=` override shown above |
| `curl` prints `Failed to connect` or status `000` | The service is not running, or it is listening on a different port | Check the process, and confirm the listener with the `/proc/net/tcp` command above |
| `Content-Type: text/plain; charset=utf-8` appears | A handler was changed to `res.set(...)`, `res.type(...)` or `res.send(...)` | Restore `res.setHeader('Content-Type','text/plain').end(<literal>)`; the bare header is part of the contract |
| Every path except `/` and `/good-evening` returns 404 | Expected: the older build answered every path with the root body, and path routing replaced that behaviour | Consumer-side; the two documented routes are the entire surface |
| `npm test` exits 1 with `Error: no test specified` | The manifest carries only the placeholder test script | Expected; the project has no test suite until Section 2.2's first item is done |
| `npm ci` exits 1 with `Missing: express@5.3.0 from lock file` | The committed lockfile predates the dependency | Use `npm install`, or complete Section 2.2, row 2 |

# 10. Appendices

## A. Command Reference

| Command | Purpose | Expected result |
|---|---|---|
| `npm install --no-audit --no-fund` | Install the declared dependency | Exit 0; `express` 5.3.0 installed |
| `git checkout -- package-lock.json` | Restore the tracked lockfile after an install rewrites the working copy | Worktree matches the committed blob |
| `node --check server.js` | Static gate | Silent, exit 0 |
| `node server.js` | Start the service on the configured address | One log line, listening on `127.0.0.1:3000` |
| `PORT=<port> node -e '…listen override…;require("./server.js")'` | Start on a different port without editing the source | Listening on `<port>` |
| `curl -s -D - http://127.0.0.1:<port>/` | Inspect the root route's headers and body | 200, `text/plain`, `Content-Length: 14` |
| `curl -s -D - http://127.0.0.1:<port>/good-evening` | Inspect the new route | 200, `text/plain`, `Content-Length: 13` |
| `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:<port>/nope` | Confirm the default 404 | `404` |
| `awk '$2 ~ /:<hex port>$/ && $4=="0A" {print $2}' /proc/net/tcp` | Confirm the listening socket and that it is loopback-only | `0100007F:<hex port>` and nothing wildcard |
| `npm test` | Show that no test suite is configured | Exit 1 with `Error: no test specified` |
| `npm ci` | Check lockfile synchronisation | Currently exit 1 (`Missing: express@5.3.0 from lock file`) |

## B. Port Reference

| Port | Owner | Notes |
|---|---|---|
| 3000 | `server.js` constant (`127.0.0.1:3000`) | The application's configured address; the start-up log always reports it |
| Arbitrary high port | `PORT` environment variable with the external listen override | Use when 3000 is occupied; the source file is not edited |
| None | Database, cache, message broker, metrics or admin port | The project has no such components |

## C. Key File Locations

| Path | Role |
|---|---|
| `server.js` | The entire application: requires, route registrations, server construction, listen block and start-up log |
| `package.json` | Manifest: project metadata, the placeholder test script and the single `express` dependency |
| `package-lock.json` | Tracked lockfile, `lockfileVersion: 3`, committed content unchanged since the dependency was added |
| `node_modules/` | Install tree created by `npm install`; untracked and never committed |
| `.blitzyignore.txt`, `test.blitzyignore.txt`, `test1.blitzyignore.txt` | Empty placeholder files carried over from the repository's initial state |

## D. Technology Versions

| Component | Version |
|---|---|
| Node.js | v22.23.5 (runtime must be 18 or later for Express 5) |
| npm | 11.21.0 |
| express | 5.3.0, resolved from the declared `^5.0.0` (65 packages including transitive) |
| Lockfile format | `lockfileVersion: 3` |
| Build tooling | None — no compiler, bundler, linter, type checker, test runner or CI configuration |

## E. Environment Variable Reference

| Variable | Read by the application? | Effect |
|---|---|---|
| `PORT` | No | Only used by the external listen override shown in Section 9; the application itself reads no environment variable |
| `NODE_ENV`, `DEBUG`, `NODE_OPTIONS`, `NODE_PATH` | No | No effect on the bind, the headers or the bodies |
| Any other variable | No | None is required, and none is provided |

## F. Developer Tools Guide

| Tool | Use here |
|---|---|
| `node` | Runtime, `--check` static gate, and the one-liner listen override |
| `npm` | Install, the placeholder test script, and lockfile behaviour |
| `curl` | Every route, header and status check; `-D -` prints headers, `--raw` preserves bytes |
| `cmp`, `wc -c`, `od -c`, `sha256sum` | Byte-exact body verification against `printf 'Good evening\n'` and `printf 'Hello, World!\n'` |
| `awk` on `/proc/net/tcp` | Listener inspection; `ss`, `netstat`, `lsof` and `nc` are not present on every host |
| `git` | History, blob comparison (`git hash-object` vs `git rev-parse HEAD:<path>`) and restoring the lockfile |

## G. Glossary

| Term | Meaning in this project |
|---|---|
| Route | A method-and-path pair registered on the Express application; there are exactly two, both `GET` |
| Bare `Content-Type` | The header value `text/plain` with no `; charset=…` parameter; part of the contract |
| Path dispatch | Choosing a response from the request path, which the pre-Express listener could not do |
| Express defaults | Framework behaviour for anything the two routes do not match: stock 404, `X-Powered-By`, automatic `HEAD`/`OPTIONS` |
| `X-Powered-By` | Framework disclosure header Express adds; it is intentionally left in place |
| `ETag` | Validator header Express adds through `res.send`; absent here because responses end with `res.end` |
| `Content-Length` framing | The length header Node derives from a single `res.end(buffer)` write |
| Loopback bind | Listening on `127.0.0.1` only, which is the application's entire access model |
| Lockfile drift | The committed lockfile describing no dependency while the manifest declares one, which makes `npm ci` fail |
