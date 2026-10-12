// 📁 SizesSec.jsx
function SizesSec({ product }) {
    const CATEGORY_LABEL = {
        baby: "👶 بيبي",
        girl: "🎀 بنوتة",
    };

    return (
        <section className="sz-section">
            <style>{szCss}</style>

            {/* ── Head ── */}
            <div className="sz-head">
                <span className="sz-pill">📏 المقاسات</span>
                <h2>
                    من <em>البيبي</em> للبنوتة الكبيرة
                </h2>
                <svg
                    className="sz-squiggle"
                    viewBox="0 0 200 20"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M2 12 Q20 2 40 12 T80 12 T120 12 T160 12 T198 12"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* ── Table ── */}
            <div className="sz-table-wrap">
                <table className="sz-table">
                    <thead>
                        <tr>
                            <th>المقاس</th>
                            <th>العمر</th>
                            <th>الفئة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.sizes.map((s) => (
                            <tr key={s.size}>
                                <td>
                                    <span className="sz-size-pill" dir="ltr">
                                        {s.size}
                                    </span>
                                </td>
                                <td>{s.age}</td>
                                <td>
                                    <span className={`sz-cat ${s.category}`}>
                                        {CATEGORY_LABEL[s.category] || s.category}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── Note ── */}
            <div className="sz-note">
                <span className="sz-note-title">💌 ملاحظة صغيرة</span>
                <ul className="sz-note-list">
                    <li>📏 الطول بيتقاس من أعلى الخصر لأسفل القدم</li>
                    <li>✨ المقاسات تقريبية وقد تختلف شوية حسب جسم البنت</li>
                </ul>
                <p className="sz-note-strong">
                    محتارة بين مقاسين؟  محتارة بين مقاسين اكتبي في الملاحظات في تأكيد الاوردر طول البنت من الوسط لحد القدم
                </p>
            </div>
        </section>
    );
}

const szCss = `
.sz-section{
  --ink:#3A2E45;
  --ink-soft:#7C6E88;
  --paper:#FFFDF7;
  --paper-2:#FFF7EE;
  --line:#E8E0D4;
  --pink:#FF9EC4;
  --pink-d:#F06292;
  --lav:#B69CFF;
  --sun:#FFD166;
  --baby:#E9F3FF;
  --girl:#FFE7F1;
  position:relative;
  max-width:900px;
  margin:0 auto;
  padding:80px 22px;
  direction:rtl;
  font-family:'Cairo','Tajawal',system-ui,sans-serif;
  color:var(--ink);
}

/* ── Head ── */
.sz-head{
  text-align:center;
  margin:0 auto 36px;
}
.sz-pill{
  display:inline-flex;align-items:center;gap:6px;
  font-weight:700;font-size:13px;
  padding:7px 18px;border-radius:999px;
  background:#fff;border:2px solid var(--ink);
  margin-bottom:14px;
}
.sz-head h2{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(28px,4.5vw,44px);
  font-weight:400;line-height:1.25;margin:0;
}
.sz-head h2 em{
  font-style:normal;
  background:linear-gradient(120deg,var(--pink-d),var(--lav));
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  padding:0 6px;
}
.sz-squiggle{display:block;width:140px;height:14px;color:var(--pink);margin:10px auto 0}

/* ── Table ── */
.sz-table-wrap{
  overflow:hidden;
  border:2.5px solid var(--ink);
  border-radius:20px;
  background:#fff;
  box-shadow:8px 8px 0 rgba(58,46,69,.15);
}
.sz-table{
  width:100%;
  border-collapse:collapse;
  text-align:center;
}
.sz-table th{
  background:var(--ink);
  color:var(--paper);
  padding:16px 12px;
  font-family:'Lalezar','Cairo',sans-serif;
  font-weight:400;
  font-size:15px;
  letter-spacing:.02em;
}
.sz-table th:first-child{border-top-right-radius:17px}
.sz-table th:last-child{border-top-left-radius:17px}
.sz-table td{
  padding:14px 12px;
  border-top:1.5px dashed var(--line);
  font-size:14px;
  font-weight:600;
}
.sz-table tbody tr{transition:background .2s ease}
.sz-table tbody tr:hover{background:var(--paper-2)}
.sz-table tbody tr:last-child td:first-child{border-bottom-right-radius:17px}
.sz-table tbody tr:last-child td:last-child{border-bottom-left-radius:17px}

.sz-size-pill{
  display:inline-block;
  font-weight:800;
  padding:5px 14px;
  background:var(--sun);
  color:var(--ink);
  border:2px solid var(--ink);
  border-radius:8px;
  font-size:12.5px;
  min-width:52px;
}
.sz-cat{
  display:inline-block;
  padding:4px 12px;
  font-size:12px;
  font-weight:800;
  border:2px solid var(--ink);
  border-radius:999px;
}
.sz-cat.baby{background:var(--baby);color:#2b6cb0}
.sz-cat.girl{background:var(--girl);color:var(--pink-d)}

/* ── Note ── */
.sz-note{
  margin-top:26px;
  padding:20px 24px;
  background:#fff;
  border:2px dashed var(--pink);
  border-radius:16px;
  box-shadow:5px 5px 0 rgba(240,98,146,.15);
  position:relative;
}
.sz-note::before{
  content:"";
  position:absolute;top:-10px;right:26px;
  width:56px;height:18px;
  background:#F4E4B8;
  transform:rotate(-4deg);
  box-shadow:0 2px 4px rgba(0,0,0,.08);
  border-radius:2px;
}
.sz-note-title{
  display:inline-block;
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:17px;
  color:var(--pink-d);
  margin-bottom:8px;
}
.sz-note-list{
  list-style:none;padding:0;margin:0 0 10px;
  display:flex;flex-direction:column;gap:4px;
}
.sz-note-list li{
  font-size:13px;
  color:var(--ink-soft);
  font-weight:600;
}
.sz-note-strong{
  margin:0;
  padding:10px 14px;
  background:var(--girl);
  border-radius:10px;
  color:var(--pink-d);
  font-weight:800;
  font-size:13px;
  border-right:3px solid var(--pink-d);
}

/* ── Responsive ── */
@media(max-width:520px){
  .sz-section{padding:56px 14px}
  .sz-table-wrap{border-radius:16px;box-shadow:5px 5px 0 rgba(58,46,69,.15)}
  .sz-table th{padding:12px 8px;font-size:13px}
  .sz-table td{padding:10px 8px;font-size:12.5px}
  .sz-size-pill{padding:4px 10px;font-size:11.5px;min-width:46px}
  .sz-cat{padding:3px 9px;font-size:11px}
  .sz-note{padding:16px 18px;margin-top:20px}
  .sz-note-title{font-size:15px}
  .sz-note-list li{font-size:12px}
  .sz-note-strong{font-size:12px;padding:9px 12px}
}
`;

export default SizesSec;