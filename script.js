'use strict';
(() => {
/* ---------- Curriculum data (d=lesson, f=formula, mis=common mistake, ex=worked example) ---------- */
const M = [
 {t:'Mathematical Foundations',d:'Real numbers include integers, rationals (p/q) and irrationals such as √2 and π. Follow the order of operations: brackets, powers/roots, × ÷, then + −. The absolute value |x| is the distance of x from 0, so |x| = a means x = a or x = −a.',f:'|x| < a ⇔ −a < x < a',mis:'Writing √(a²+b²) = a+b. Roots do not distribute over addition.',ex:{q:'Solve |2x − 1| = 5.',s:['Understand: we need every x whose expression 2x−1 is 5 units from zero.','Method: split into two cases because |u| = 5 means u = 5 or u = −5.','Case 1: 2x − 1 = 5 → 2x = 6 → x = 3. Case 2: 2x − 1 = −5 → 2x = −4 → x = −2.','Verify: |2(3)−1| = |5| = 5 ✓ and |2(−2)−1| = |−5| = 5 ✓.'],a:'x = 3 or x = −2'}},
 {t:'Functions',d:'A function assigns exactly one output f(x) to each input x. The domain is the set of allowed inputs; the range is the set of outputs. Composite: (f∘g)(x) = f(g(x)). An inverse undoes f: swap x and y, then solve for y. In computing, a function is like a pure method: same input, same output.',f:'(f∘g)(x) = f(g(x)),  f⁻¹(f(x)) = x',mis:'Confusing f⁻¹(x) with 1/f(x).',ex:{q:'Find the inverse of f(x) = 2x + 1.',s:['Understand: we want a function that reverses f.','Method: write y = 2x + 1, swap x and y: x = 2y + 1.','Solve for y: x − 1 = 2y → y = (x − 1)/2.','Verify: f((x−1)/2) = 2·(x−1)/2 + 1 = x ✓.'],a:'f⁻¹(x) = (x − 1)/2'}},
 {t:'Linear Equations',d:'Solve by doing the same operation to both sides until x is isolated. Lines: y = mx + c where m = (y₂−y₁)/(x₂−x₁) is the gradient. Parallel lines have equal gradients; perpendicular gradients multiply to −1. Simultaneous equations: eliminate or substitute one variable.',f:'m = (y₂ − y₁)/(x₂ − x₁),  y − y₁ = m(x − x₁)',mis:'Forgetting to apply an operation to every term on one side.',ex:{q:'Solve x + y = 10 and x − y = 4.',s:['Understand: two unknowns, two equations.','Method: elimination, since adding cancels y.','Add: 2x = 14 → x = 7. Substitute: 7 + y = 10 → y = 3.','Verify: 7 − 3 = 4 ✓.'],a:'x = 7, y = 3'}},
 {t:'Inequalities',d:'Solve like equations, except multiplying or dividing by a negative reverses the sign. Why: 1 < 2, but multiplying by −1 gives −1 > −2, because negation reflects the number line. Use interval notation: [ ] for ≤ ≥ (closed), ( ) for < > (open).',f:'a < b and c < 0 ⇒ ac > bc',mis:'Keeping the original sign after dividing by a negative.',ex:{q:'Solve −2x > 6 and write the answer in interval notation.',s:['Understand: all x making −2x exceed 6.','Method: divide by −2 and reverse the inequality.','−2x > 6 → x < −3.','Verify: x = −4 gives −2(−4) = 8 > 6 ✓; x = 0 gives 0 > 6 ✗.'],a:'x < −3, i.e. (−∞, −3)'}},
 {t:'Quadratic Equations and Functions',d:'ax² + bx + c = 0 can be solved by factorising, completing the square or the formula. The discriminant Δ = b² − 4ac gives two real roots (Δ>0), one repeated (Δ=0) or two complex roots (Δ<0). The vertex is at x = −b/2a.',f:'x = (−b ± √(b² − 4ac)) / 2a',mis:'Forgetting the ± or dividing only part of the numerator by 2a.',ex:{q:'Solve x² − 5x + 6 = 0.',s:['Understand: find x where the parabola crosses the x-axis.','Method: factorise — find two numbers with product 6 and sum −5.','They are −2 and −3: (x − 2)(x − 3) = 0 → x = 2 or x = 3.','Verify: 2² − 10 + 6 = 0 ✓; 3² − 15 + 6 = 0 ✓.'],a:'x = 2 or x = 3'}},
 {t:'Graphs and Coordinate Geometry',d:'Points are plotted as (x, y). Intercepts: set x = 0 or y = 0. The solution of f(x) = g(x) is the x-coordinate where the graphs cross. The gradient is the rate of change.',f:'Distance = √((x₂−x₁)² + (y₂−y₁)²)',mis:'Swapping x and y when plotting.',ex:{q:'Find where y = x + 1 meets y = 2x − 3.',s:['Understand: the intersection satisfies both equations.','Method: set the right-hand sides equal.','x + 1 = 2x − 3 → 4 = x; y = 4 + 1 = 5.','Verify: 2(4) − 3 = 5 ✓.'],a:'(4, 5)'}},
 {t:'Interpreting Constraints and Modelling',d:'Translate: "at least" → ≥, "at most" → ≤, "more than" → >, "less than" → <, "exactly" → =. Each constraint is a half-plane; together they give a feasible region. Add x ≥ 0, y ≥ 0 when quantities cannot be negative, and whole-number restrictions for counts.',f:'Feasible region = intersection of all constraints',mis:'Using ≤ when the wording says "less than".',ex:{q:'Two apps use 2 GB and 3 GB of memory. With at most 24 GB, write the constraint for x copies of the first and y of the second.',s:['Understand: total memory must not exceed 24 GB.','Method: total = 2x + 3y; "at most" means ≤.','Constraint: 2x + 3y ≤ 24, with x, y ≥ 0 and whole numbers.','Verify: x = 6, y = 4 → 12 + 12 = 24 ✓ (boundary); x = 10, y = 2 → 26 ✗.'],a:'2x + 3y ≤ 24, x ≥ 0, y ≥ 0'}},
 {t:'Word Problems',d:'Method: (1) identify the unknown, (2) define a variable, (3) translate words to maths, (4) form the equation, (5) solve, (6) verify, (7) interpret in context.',f:'Consecutive integers: n, n+1, n+2',mis:'Not checking that the answer makes sense (e.g. a negative age).',ex:{q:'Three consecutive integers sum to 63. Find them.',s:['Unknown: the three integers. Variable: let the smallest be n.','Translate: n, n+1, n+2.','Equation: n + (n+1) + (n+2) = 63 → 3n + 3 = 63 → n = 20.','Verify: 20 + 21 + 22 = 63 ✓. Interpretation: the integers are 20, 21, 22.'],a:'20, 21, 22'}},
 {t:'Graph and Function Transformations',d:'y = f(x − h) + k shifts right h and up k. y = −f(x) reflects in the x-axis; y = f(−x) in the y-axis. y = a·f(x) stretches vertically by a; y = f(bx) compresses horizontally by 1/b.',f:'y = a·f(b(x − h)) + k',mis:'Thinking f(x + 3) moves the graph right; it moves left.',ex:{q:'Describe y = (x − 2)² + 1 compared with y = x².',s:['Understand: compare with y = f(x − h) + k.','Here h = 2 and k = 1.','Right 2, up 1.','Verify: the vertex moves from (0,0) to (2,1), and at x = 2 the value is 0 + 1 = 1 ✓.'],a:'Shift right 2, up 1; vertex (2, 1)'}},
 {t:'Trigonometry',d:'In a right triangle: sin = opposite/hypotenuse, cos = adjacent/hypotenuse, tan = opposite/adjacent (SOH-CAH-TOA). 180° = π radians. Identity: sin²θ + cos²θ = 1. Signal processing uses sin and cos for periodic waves.',f:'sin²θ + cos²θ = 1,  rad = deg × π/180',mis:'Calculator in degrees when the angle is in radians.',ex:{q:'A right triangle has opposite side 3 and hypotenuse 5. Find sin θ and the adjacent side.',s:['Understand: SOH relates opposite and hypotenuse.','sin θ = 3/5 = 0.6.','Pythagoras: adjacent = √(5² − 3²) = √16 = 4.','Verify: 3² + 4² = 25 = 5² ✓.'],a:'sin θ = 3/5, adjacent = 4'}},
 {t:'The Unit Circle',d:'A point on the unit circle at angle θ has coordinates (cos θ, sin θ). tan θ = sin θ / cos θ, undefined where cos θ = 0 (90°, 270°). Signs: Q1 all +, Q2 sin +, Q3 tan +, Q4 cos +. Reference angle: acute angle to the x-axis.',f:'(x, y) = (cos θ, sin θ)',mis:'Ignoring the sign from the quadrant.',ex:{q:'Find cos 120°.',s:['Understand: 120° is in Q2, where cos is negative.','Reference angle = 180° − 120° = 60°.','cos 60° = 1/2, so cos 120° = −1/2.','Verify: the point is (−½, √3/2); (−½)² + (√3/2)² = ¼ + ¾ = 1 ✓.'],a:'−1/2'}},
 {t:'Complex Numbers',d:'i is defined by i² = −1. Standard form a + bi. Conjugate of a + bi is a − bi. Modulus |a+bi| = √(a²+b²). Argument is the angle with the positive real axis. Used in signal processing and electrical engineering.',f:'(a+bi)(a−bi) = a² + b²',mis:'Forgetting i² = −1 when multiplying.',ex:{q:'Compute (2 + 3i)(1 − i).',s:['Understand: multiply two complex numbers.','Method: expand like binomials.','2 − 2i + 3i − 3i² = 2 + i − 3(−1) = 5 + i.','Verify: |2+3i|·|1−i| = √13·√2 = √26 = |5+i| ✓.'],a:'5 + i'}},
 {t:'Polynomials',d:'A polynomial has terms aₙxⁿ with a degree n. Remainder theorem: the remainder of p(x) ÷ (x − a) is p(a). Factor theorem: (x − a) is a factor iff p(a) = 0. A degree-n polynomial has at most n real roots.',f:'p(x) = (x − a)q(x) + p(a)',mis:'Using p(−a) for the divisor (x − a).',ex:{q:'Find the remainder when x³ − 2x + 1 is divided by x − 2.',s:['Understand: use the remainder theorem rather than long division.','a = 2, so remainder = p(2).','p(2) = 8 − 4 + 1 = 5.','Verify: x³−2x+1 = (x−2)(x²+2x+2) + 5; expanding gives x³ −2x +1 ✓.'],a:'5'}},
 {t:'Revision and Exam Preparation',d:'Checklist: can you solve linear/quadratic equations and inequalities, find domain and inverse, transform graphs, use exact trig values, do complex arithmetic and apply the remainder theorem? Revise by doing timed quizzes, then review every wrong answer.',f:'Use the Study Resources page for the formula sheet',mis:'Rereading notes instead of practising.',ex:{q:'Solve x² + 2x + 5 = 0.',s:['Understand: check the discriminant first.','Δ = 4 − 20 = −16 < 0, so the roots are complex.','x = (−2 ± √−16)/2 = −1 ± 2i.','Verify: (−1+2i)² + 2(−1+2i) + 5 = (1 − 4i − 4) + (−2 + 4i) + 5 = 0 ✓.'],a:'x = −1 ± 2i'}}
];
/* Question bank: type mc (a=index), num (a=number), tf (a=boolean) */
const Q = [
 {m:0,k:'tf',q:'√2 is a rational number.',a:false,e:'√2 cannot be written as p/q, so it is irrational.'},
 {m:0,k:'num',q:'Evaluate 2 + 3 × 4².',a:50,e:'Powers first: 4² = 16; then 3×16 = 48; then 2 + 48 = 50.'},
 {m:1,k:'mc',q:'Domain of f(x) = √(x − 2)?',o:['x ≥ 2','x > 2','x ≤ 2','All reals'],a:0,e:'The radicand must be ≥ 0, so x − 2 ≥ 0 → x ≥ 2.'},
 {m:1,k:'num',q:'f(x) = 2x + 1, g(x) = x². Find f(g(3)).',a:19,e:'g(3) = 9, then f(9) = 19.'},
 {m:2,k:'num',q:'Solve x + y = 10 and x − y = 4. Enter x.',a:7,e:'Adding gives 2x = 14, so x = 7.'},
 {m:2,k:'num',q:'Gradient of the line through (1, 2) and (3, 8)?',a:3,e:'(8 − 2)/(3 − 1) = 3.'},
 {m:3,k:'mc',q:'Solve −2x > 6.',o:['x > −3','x < −3','x > 3','x < 3'],a:1,e:'Divide by −2 and reverse the sign: x < −3.'},
 {m:4,k:'num',q:'Discriminant of x² + 2x + 5?',a:-16,e:'b² − 4ac = 4 − 20 = −16, so the roots are complex.'},
 {m:4,k:'num',q:'Minimum value of y = x² − 4x + 7?',a:3,e:'Vertex at x = 2: 4 − 8 + 7 = 3.'},
 {m:5,k:'num',q:'x-coordinate of the intersection of y = x + 1 and y = 2x − 3?',a:4,e:'x + 1 = 2x − 3 → x = 4.'},
 {m:6,k:'mc',q:'"The server handles at most 8 users" is:',o:['x < 8','x ≤ 8','x ≥ 8','x = 8'],a:1,e:'"At most" includes 8 and anything below it: x ≤ 8.'},
 {m:7,k:'num',q:'Three consecutive integers sum to 63. Smallest?',a:20,e:'3n + 3 = 63 → n = 20.'},
 {m:8,k:'mc',q:'y = (x + 3)² compared with y = x² is a shift:',o:['Left 3','Right 3','Up 3','Down 3'],a:0,e:'x + 3 = x − (−3), so h = −3: left 3.'},
 {m:9,k:'num',q:'sin 30°?',a:0.5,e:'Exact value: 1/2.'},
 {m:9,k:'tf',q:'180° equals π radians.',a:true,e:'rad = deg × π/180; 180° × π/180 = π.'},
 {m:10,k:'num',q:'cos 120°?',a:-0.5,e:'Q2, reference angle 60°, cos negative: −1/2.'},
 {m:11,k:'num',q:'|3 + 4i|?',a:5,e:'√(9 + 16) = 5.'},
 {m:12,k:'num',q:'Remainder of x³ − 2x + 1 divided by x − 2?',a:5,e:'p(2) = 8 − 4 + 1 = 5.'}
];
/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const view = $('#view');
const KEY = 'mf-progress';
const fresh = () => ({done: [], scores: [], recent: []});
const load = () => { try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY))); } catch (e) { return fresh(); } };
const save = s => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable: progress is not saved */ } };
const pct = () => Math.round(load().done.length / M.length * 100);
const bar = p => `<div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><i style="width:${p}%"></i></div>`;
/* Safe expression parser: recursive descent, no eval. Supports + - * / ^, implicit multiplication, sin cos tan sqrt abs ln log exp, pi, e. */
function compile(src) {
  const tk = src.toLowerCase().match(/\d*\.?\d+|[a-z]+|\S/g) || [];
  if (!tk.length) throw new Error('Enter an expression such as x^2 - 3x + 1.');
  const F = {sin: Math.sin, cos: Math.cos, tan: Math.tan, sqrt: Math.sqrt, abs: Math.abs, ln: Math.log, log: Math.log10, exp: Math.exp};
  const C = {pi: Math.PI, e: Math.E};
  let i = 0;
  const expr = () => { let v = term(); while (tk[i] === '+' || tk[i] === '-') { const o = tk[i++], l = v, r = term(); v = o === '+' ? x => l(x) + r(x) : x => l(x) - r(x); } return v; };
  const term = () => { let v = unary(); for (;;) { const p = tk[i]; let l = v, r; if (p === '*' || p === '/') { i++; r = unary(); v = p === '*' ? x => l(x) * r(x) : x => l(x) / r(x); } else if (p && (/^[\d.a-z]/.test(p) || p === '(')) { r = power(); v = x => l(x) * r(x); } else return v; } };
  const unary = () => { if (tk[i] === '-') { i++; const u = unary(); return x => -u(x); } if (tk[i] === '+') { i++; return unary(); } return power(); };
  const power = () => { const b = atom(); if (tk[i] === '^') { i++; const e = unary(); return x => Math.pow(b(x), e(x)); } return b; };
  const atom = () => {
    const p = tk[i++];
    if (p === undefined) throw new Error('Expression ended unexpectedly.');
    if (/^\d|^\./.test(p)) { const n = parseFloat(p); return () => n; }
    if (p === '(') { const v = expr(); if (tk[i++] !== ')') throw new Error('Missing closing bracket.'); return v; }
    if (F[p]) { if (tk[i++] !== '(') throw new Error('Write ' + p + '(...) with brackets.'); const v = expr(); if (tk[i++] !== ')') throw new Error('Missing closing bracket.'); const f = F[p]; return x => f(v(x)); }
    if (p === 'x') return x => x;
    if (p in C) { const c = C[p]; return () => c; }
    throw new Error('Unsupported symbol "' + p + '". Allowed: x, pi, e, + - * / ^ and sin cos tan sqrt abs ln log exp.');
  };
  const f = expr();
  if (i < tk.length) throw new Error('Unexpected "' + tk[i] + '".');
  return f;
}
/* ---------- views ---------- */
const views = {};
views.home = () => {
  const s = load(), last = s.recent[0] !== undefined ? s.recent[0] : (s.done.length < M.length ? s.done.length : 0);
  return `<h2>Welcome</h2><div class="card"><p>Learn the foundations of mathematics for computing: lessons, worked examples, quizzes and interactive tools. Progress is saved in this browser only.</p>
  <p>Overall progress: ${s.done.length}/${M.length} modules completed</p>${bar(pct())}
  <p><a class="btn" href="#lesson/${last}">Continue learning</a><a class="btn alt" href="#quiz">Take a quiz</a><a class="btn alt" href="#resources">Notes &amp; formulas</a></p></div>
  <h2>Search</h2><div class="card"><label>Search topics, formulas, examples <input id="q" type="search" placeholder="e.g. discriminant"></label><div id="res"></div></div>
  <h2>Recently studied</h2><p>${s.recent.length ? s.recent.map(i => `<a href="#lesson/${i}">${M[i].t}</a>`).join(' · ') : 'Nothing yet.'}</p>`;
};
views.topics = () => `<h2>All topics</h2><div class="grid">${M.map((m, i) => `<div class="card"><span class="tag">Module ${i + 1}</span> ${load().done.includes(i) ? '<span class="ok">✓</span>' : ''}<h3>${m.t}</h3><a class="btn" href="#lesson/${i}">Open lesson</a></div>`).join('')}</div>`;
function exampleHTML(i) {
  const e = M[i].ex;
  return `<div class="card" data-ex="${i}"><span class="tag">${M[i].t}</span><p><b>Question:</b> ${e.q}</p><div class="steps"></div><p class="ans" hidden><b>Answer:</b> ${e.a}</p>
  <button type="button" data-act="step">Reveal next step</button><button type="button" class="alt" data-act="all">Show full solution</button></div>`;
}
views.lesson = id => {
  const i = +id, m = M[i]; if (!m) return '<p>Topic not found.</p>';
  const s = load(); s.recent = [i].concat(s.recent.filter(x => x !== i)).slice(0, 5); save(s);
  return `<h2>Module ${i + 1}: ${m.t}</h2><div class="card"><h3>Explanation</h3><p>${m.d}</p><h3>Key formula</h3><p class="formula">${m.f}</p><h3>Common mistake</h3><p>${m.mis}</p></div>
  <h3>Worked example</h3>${exampleHTML(i)}
  <p><a class="btn alt" href="#quiz/${i}">Module quiz</a><button type="button" data-act="done" data-i="${i}">${s.done.includes(i) ? 'Mark as not completed' : 'Mark as completed'}</button></p>
  <p>${i > 0 ? `<a href="#lesson/${i - 1}">← ${M[i - 1].t}</a>` : ''} ${i < M.length - 1 ? `<a href="#lesson/${i + 1}">${M[i + 1].t} →</a>` : ''}</p>`;
};
views.examples = () => `<h2>Worked Examples</h2>${M.map((_, i) => exampleHTML(i)).join('')}`;
/* Quiz engine */
let qz = null;
views.quiz = id => {
  if (id === undefined || id === '') return `<h2>Quizzes</h2><div class="grid"><div class="card"><h3>Mixed quiz</h3><a class="btn" href="#quiz/all">All ${Q.length} questions</a></div>${M.map((m, i) => Q.some(q => q.m === i) ? `<div class="card"><h3>${m.t}</h3><a class="btn" href="#quiz/${i}">Start</a></div>` : '').join('')}</div>`;
  qz = {qs: id === 'all' ? Q.slice() : Q.filter(q => q.m === +id), i: 0, ans: [], id};
  if (!qz.qs.length) return '<p>No questions for this module yet.</p>';
  return '<div id="qbox"></div>';
};
function check(q, raw) {
  if (q.k === 'mc') return +raw === q.a;
  if (q.k === 'tf') return (raw === 'true') === q.a;
  let v; try { v = raw.includes('/') ? raw.split('/').map(compile).map(f => f(0)).reduce((a, b) => a / b) : compile(raw)(0); } catch (e) { return false; }
  return Math.abs(v - q.a) < 1e-6 * Math.max(1, Math.abs(q.a)); // tolerance; accepts 1/2 or 0.5
}
function showQ() {
  const box = $('#qbox'), q = qz.qs[qz.i];
  if (!q) {
    const sc = qz.ans.filter(a => a.ok).length, weak = [...new Set(qz.ans.filter(a => !a.ok).map(a => M[a.q.m].t))];
    const s = load(); s.scores.push({id: qz.id, sc, n: qz.qs.length, t: Date.now()}); save(s);
    box.innerHTML = `<div class="card"><h2>Score: ${sc}/${qz.qs.length}</h2><p>${weak.length ? 'Needs more practice: ' + weak.join(', ') : 'No weak topics — well done.'}</p>
    ${qz.ans.map((a, n) => `<p class="${a.ok ? 'ok' : 'bad'}">${n + 1}. ${a.q.q} — ${a.ok ? 'Correct' : 'Incorrect'}<br><span style="font-weight:400">${a.q.e}</span></p>`).join('')}
    <button type="button" data-act="retry">Retry</button><a class="btn alt" href="#quiz">All quizzes</a></div>`; return;
  }
  const inp = q.k === 'mc' ? q.o.map((o, n) => `<label class="opt"><input type="radio" name="a" value="${n}"> ${o}</label>`).join('')
    : q.k === 'tf' ? '<label class="opt"><input type="radio" name="a" value="true"> True</label><label class="opt"><input type="radio" name="a" value="false"> False</label>'
    : '<label>Your answer <input name="a" type="text" autocomplete="off"></label>';
  box.innerHTML = `<div class="card"><p>Question ${qz.i + 1} of ${qz.qs.length}</p>${bar(Math.round(qz.i / qz.qs.length * 100))}<h3>${q.q}</h3><div id="inp">${inp}</div><div id="fb" aria-live="polite"></div><button type="button" data-act="submit">Submit</button></div>`;
}
/* Tools */
views.tools = () => `<h2>Graph Plotter</h2><div class="card"><p>Enter one or more functions of x separated by commas, e.g. <code>x^2-4, 2x+1, sin(x)</code>.</p>
 <label>f(x) = <input id="fn" value="x^2-4, 2x+1" size="30"></label> <label>x min <input id="x0" type="number" value="-6" style="width:5em"></label> <label>x max <input id="x1" type="number" value="6" style="width:5em"></label>
 <button type="button" data-act="plot">Plot</button><button type="button" class="alt" data-act="resetplot">Reset</button><p id="gerr" class="bad"></p><canvas id="gc" width="640" height="400"></canvas><div id="ginfo"></div></div>
 <h2>Unit Circle Explorer</h2><div class="card"><label>Angle (°) <input id="ang" type="range" min="0" max="360" value="45"></label><div id="uinfo"></div><canvas id="uc" width="320" height="320"></canvas></div>
 <h2>Complex Number Explorer</h2><div class="card"><label>Real a <input id="ca" type="number" value="3" style="width:5em"></label> <label>Imaginary b <input id="cb" type="number" value="4" style="width:5em"></label><button type="button" class="alt" data-act="resetc">Reset</button><div id="cinfo"></div><canvas id="cc" width="320" height="320"></canvas></div>`;
function plot() {
  const cv = $('#gc'), g = cv.getContext('2d'), err = $('#gerr');
  const dark = document.documentElement.dataset.theme === 'dark';
  err.textContent = '';
  let x0 = parseFloat($('#x0').value), x1 = parseFloat($('#x1').value);
  if (!(x1 > x0)) { err.textContent = 'x max must be greater than x min.'; return; }
  const parts = $('#fn').value.split(','), fs = [];
  try { parts.forEach(p => fs.push(compile(p))); } catch (e) { err.textContent = e.message; return; }
  const W = cv.width, H = cv.height, sx = W / (x1 - x0), sy = sx, yc = 0, X = x => (x - x0) * sx, Y = y => H / 2 - (y - yc) * sy;
  g.fillStyle = dark ? '#0a1424' : '#fff'; g.fillRect(0, 0, W, H);
  g.font = '11px sans-serif'; g.lineWidth = 1;
  const step = Math.max(1, Math.round((x1 - x0) / 12));
  for (let x = Math.ceil(x0 / step) * step; x <= x1; x += step) { g.strokeStyle = dark ? '#27406a' : '#dde5f0'; g.beginPath(); g.moveTo(X(x), 0); g.lineTo(X(x), H); g.stroke(); g.fillStyle = dark ? '#a7b6cf' : '#4a5d78'; g.fillText(x, X(x) + 2, Y(0) + 12); }
  const ym = H / 2 / sy;
  for (let y = Math.ceil(-ym / step) * step; y <= ym; y += step) { g.strokeStyle = dark ? '#27406a' : '#dde5f0'; g.beginPath(); g.moveTo(0, Y(y)); g.lineTo(W, Y(y)); g.stroke(); if (y) { g.fillStyle = dark ? '#a7b6cf' : '#4a5d78'; g.fillText(y, X(0) + 3, Y(y) - 2); } }
  g.strokeStyle = dark ? '#e8eefb' : '#0b1f3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(X(0), 0); g.lineTo(X(0), H); g.moveTo(0, Y(0)); g.lineTo(W, Y(0)); g.stroke();
  const cols = ['#1d4ed8', '#0f766e', '#c2410c', '#7c3aed'];
  fs.forEach((f, n) => {
    g.strokeStyle = cols[n % 4]; g.lineWidth = 2; g.beginPath(); let pen = false, prev = null;
    for (let px = 0; px <= W; px++) { const y = f(x0 + px / sx); if (!isFinite(y) || Math.abs(y) > 1e4 || (prev !== null && Math.abs(Y(y) - Y(prev)) > H)) { pen = false; prev = isFinite(y) ? y : null; continue; } pen ? g.lineTo(px, Y(y)) : g.moveTo(px, Y(y)); pen = true; prev = y; }
    g.stroke();
  });
  // Info: y-intercept and approximate roots by sign change + bisection
  $('#ginfo').innerHTML = fs.map((f, n) => {
    const roots = []; let a = x0, fa = f(a);
    for (let k = 1; k <= 2000; k++) { const b = x0 + (x1 - x0) * k / 2000, fb = f(b); if (isFinite(fa) && isFinite(fb) && fa * fb <= 0 && fa !== fb) { let l = a, r = b; for (let j = 0; j < 40; j++) { const mid = (l + r) / 2; (f(l) * f(mid) <= 0) ? r = mid : l = mid; } if (Math.abs(f(l)) < 1e-3) roots.push(+l.toFixed(4)); } a = b; fa = fb; }
    const y0 = f(0);
    return `<p><b style="color:${cols[n % 4]}">${parts[n].trim()}</b>: y-intercept ${isFinite(y0) ? +y0.toFixed(4) : 'undefined'}; x-intercepts ≈ ${roots.length ? [...new Set(roots)].join(', ') : 'none in range'}</p>`;
  }).join('');
}
const frac = d => { const g = (a, b) => b ? g(b, a % b) : a, k = g(d, 180); return d === 0 ? '0' : (d / k === 1 ? '' : d / k) + 'π' + (180 / k === 1 ? '' : '/' + 180 / k); };
function unit() {
  const d = +$('#ang').value, r = d * Math.PI / 180, c = Math.cos(r), s = Math.sin(r), cv = $('#uc'), g = cv.getContext('2d'), R = 130, o = 160;
  const dark = document.documentElement.dataset.theme === 'dark', ink = dark ? '#e8eefb' : '#0b1f3a';
  g.fillStyle = dark ? '#0a1424' : '#fff'; g.fillRect(0, 0, 320, 320); g.strokeStyle = ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(10, o); g.lineTo(310, o); g.moveTo(o, 10); g.lineTo(o, 310); g.stroke();
  g.beginPath(); g.arc(o, o, R, 0, 2 * Math.PI); g.stroke();
  g.strokeStyle = '#1d4ed8'; g.lineWidth = 3; g.beginPath(); g.moveTo(o, o); g.lineTo(o + R * c, o - R * s); g.stroke();
  g.strokeStyle = '#0f766e'; g.beginPath(); g.moveTo(o + R * c, o); g.lineTo(o + R * c, o - R * s); g.stroke();
  const q = d === 0 || d === 360 ? 'on the +x axis' : d < 90 ? 'Quadrant I' : d === 90 ? 'on the +y axis' : d < 180 ? 'Quadrant II' : d === 180 ? 'on the −x axis' : d < 270 ? 'Quadrant III' : d === 270 ? 'on the −y axis' : 'Quadrant IV';
  const ref = d <= 90 ? d : d <= 180 ? 180 - d : d <= 270 ? d - 180 : 360 - d;
  const und = Math.abs(c) < 1e-9;
  $('#uinfo').innerHTML = `<p>θ = ${d}° = ${frac(d % 360 === 0 && d ? 360 : d)} rad (${r.toFixed(4)})<br>Coordinates (cos θ, sin θ) = (${c.toFixed(4)}, ${s.toFixed(4)})<br>sin θ = ${s.toFixed(4)}, cos θ = ${c.toFixed(4)}, tan θ = ${und ? 'undefined' : (s / c).toFixed(4)}<br>${q}; reference angle ${ref}°</p>`;
}
function argand() {
  const a = parseFloat($('#ca').value), b = parseFloat($('#cb').value), g = $('#cc').getContext('2d'), info = $('#cinfo');
  if (isNaN(a) || isNaN(b)) { info.innerHTML = '<p class="bad">Enter numeric real and imaginary parts.</p>'; return; }
  const dark = document.documentElement.dataset.theme === 'dark', ink = dark ? '#e8eefb' : '#0b1f3a', m = Math.max(5, Math.abs(a), Math.abs(b)) * 1.2, k = 150 / m;
  g.fillStyle = dark ? '#0a1424' : '#fff'; g.fillRect(0, 0, 320, 320); g.strokeStyle = ink; g.lineWidth = 1;
  g.beginPath(); g.moveTo(10, 160); g.lineTo(310, 160); g.moveTo(160, 10); g.lineTo(160, 310); g.stroke();
  g.fillStyle = ink; g.fillText('Re', 296, 154); g.fillText('Im', 166, 20);
  g.strokeStyle = '#1d4ed8'; g.lineWidth = 2; g.beginPath(); g.moveTo(160, 160); g.lineTo(160 + a * k, 160 - b * k); g.stroke();
  g.fillStyle = '#c2410c'; g.beginPath(); g.arc(160 + a * k, 160 - b * k, 5, 0, 7); g.fill();
  const mod = Math.hypot(a, b), arg = Math.atan2(b, a) * 180 / Math.PI;
  info.innerHTML = `<p>z = ${a} ${b < 0 ? '−' : '+'} ${Math.abs(b)}i; conjugate = ${a} ${b < 0 ? '+' : '−'} ${Math.abs(b)}i<br>|z| = ${mod.toFixed(4)}; arg z = ${mod ? arg.toFixed(2) + '°' : 'undefined'}<br>Polar: ${mod.toFixed(3)}(cos ${arg.toFixed(1)}° + i sin ${arg.toFixed(1)}°)</p>`;
}
/* Study resources: real content, printable and downloadable */
const FORMULAS = ['Indices: aᵐ·aⁿ = aᵐ⁺ⁿ; (aᵐ)ⁿ = aᵐⁿ; a⁻ⁿ = 1/aⁿ','Gradient m = (y₂−y₁)/(x₂−x₁); y = mx + c','Quadratic formula x = (−b ± √(b²−4ac))/2a; vertex x = −b/2a','Inequality: multiply/divide by a negative reverses the sign','Transformations: y = a·f(b(x−h)) + k','Trig: sin²θ + cos²θ = 1; rad = deg·π/180','Exact values: sin 30° = 1/2, sin 45° = √2/2, sin 60° = √3/2; cos is the reverse; tan = sin/cos','Complex: i² = −1; |a+bi| = √(a²+b²); (a+bi)(a−bi) = a²+b²','Polynomials: remainder of p(x)÷(x−a) is p(a); (x−a) is a factor iff p(a)=0'];
const notes = () => 'MATHFOUNDATIONS — STUDY NOTES\n\n' + M.map((m, i) => `MODULE ${i + 1}: ${m.t.toUpperCase()}\n${m.d}\nKey formula: ${m.f}\nCommon mistake: ${m.mis}\nExample: ${m.ex.q}\n  ${m.ex.s.join('\n  ')}\n  Answer: ${m.ex.a}\n`).join('\n') + '\nEXAM FORMULA SHEET\n' + FORMULAS.map(f => '• ' + f).join('\n') + '\n\nPRACTICE QUESTIONS\n' + Q.map((q, i) => `${i + 1}. ${q.q}${q.o ? ' (' + q.o.join(' / ') + ')' : ''}`).join('\n') + '\n\nANSWER KEY\n' + Q.map((q, i) => `${i + 1}. ${q.k === 'mc' ? q.o[q.a] : q.a} — ${q.e}`).join('\n');
views.resources = () => `<h2>Study Resources</h2><div class="card noprint"><p>Print / Save as PDF opens your browser print dialog (choose “Save as PDF” as the destination). The text download is a real .txt file.</p>
 <button type="button" data-act="print">Print / Save as PDF</button><button type="button" class="alt" data-act="dl">Download notes (.txt)</button></div><div class="card"><pre class="notes">${notes()}</pre></div>`;
views.progress = () => {
  const s = load();
  return `<h2>Progress</h2><div class="card">${bar(pct())}<p>${s.done.length}/${M.length} modules completed. Data is stored only in this browser.</p>
  <p>Completed: ${s.done.map(i => M[i].t).join(', ') || 'none'}</p><h3>Quiz history</h3>${s.scores.slice(-10).reverse().map(x => `<p>${new Date(x.t).toLocaleString()} — ${x.id === 'all' ? 'Mixed' : M[x.id].t}: ${x.sc}/${x.n}</p>`).join('') || '<p>No attempts yet.</p>'}
  <button type="button" class="alt" data-act="reset">Reset progress</button></div>`;
};
/* ---------- router and events ---------- */
function route() {
  const [name, arg] = (location.hash.slice(1) || 'home').split('/');
  const v = views[name] || views.home;
  view.innerHTML = v(arg);
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + name));
  if (name === 'quiz' && arg) showQ();
  if (name === 'tools') { plot(); unit(); argand(); }
  window.scrollTo(0, 0);
}
addEventListener('hashchange', route);
document.addEventListener('input', e => {
  if (e.target.id === 'ang') unit();
  if (e.target.id === 'ca' || e.target.id === 'cb') argand();
  if (e.target.id === 'q') {
    const t = e.target.value.toLowerCase().trim();
    $('#res').innerHTML = t.length < 2 ? '' : (M.map((m, i) => [m, i]).filter(([m]) => (m.t + m.d + m.f + m.ex.q + m.ex.s.join(' ')).toLowerCase().includes(t)).map(([m, i]) => `<p><a href="#lesson/${i}">${m.t}</a></p>`).join('') || '<p>No results.</p>');
  }
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act, card = b.closest('[data-ex]');
  if (act === 'step' || act === 'all') {
    const ex = M[card.dataset.ex].ex, box = card.querySelector('.steps'), n = box.children.length;
    const upto = act === 'all' ? ex.s.length : n + 1;
    for (let k = n; k < upto && k < ex.s.length; k++) { const d = document.createElement('div'); d.className = 'step'; d.textContent = 'Step ' + (k + 1) + ' — ' + ex.s[k]; box.appendChild(d); }
    if (box.children.length >= ex.s.length) card.querySelector('.ans').hidden = false;
  }
  if (act === 'done') { const s = load(), i = +b.dataset.i; s.done = s.done.includes(i) ? s.done.filter(x => x !== i) : s.done.concat(i); save(s); route(); }
  if (act === 'submit') {
    const q = qz.qs[qz.i], sel = q.k === 'num' ? document.querySelector('#inp input').value.trim() : (document.querySelector('#inp input:checked') || {}).value;
    if (!sel && sel !== 0) { $('#fb').innerHTML = '<p class="bad">Please give an answer first.</p>'; return; }
    const ok = check(q, sel); qz.ans.push({q, ok});
    $('#fb').innerHTML = `<p class="${ok ? 'ok' : 'bad'}">${ok ? 'Correct.' : 'Incorrect. Correct answer: ' + (q.k === 'mc' ? q.o[q.a] : q.k === 'tf' ? (q.a ? 'True' : 'False') : q.a)}</p><p>${q.e}</p>`;
    b.textContent = 'Next'; b.dataset.act = 'next';
  } else if (act === 'next') { qz.i++; showQ(); }
  if (act === 'retry') { qz.i = 0; qz.ans = []; showQ(); }
  if (act === 'plot') plot();
  if (act === 'resetplot') { $('#fn').value = 'x^2-4, 2x+1'; $('#x0').value = -6; $('#x1').value = 6; plot(); }
  if (act === 'resetc') { $('#ca').value = 3; $('#cb').value = 4; argand(); }
  if (act === 'print') window.print();
  if (act === 'dl') { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([notes()], {type: 'text/plain'})); a.download = 'MathFoundations-notes.txt'; a.click(); URL.revokeObjectURL(a.href); }
  if (act === 'reset' && confirm('Reset all progress? This cannot be undone.')) { save(fresh()); route(); }
});
/* theme */
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem('mf-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) { root.dataset.theme = 'light'; }
$('#theme').addEventListener('click', () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('mf-theme', root.dataset.theme); } catch (e) { /* ignore */ } if (location.hash === '#tools') { plot(); unit(); argand(); } });
route();
})();
