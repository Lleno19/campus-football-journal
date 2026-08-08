export default function JournalTimeline({ journal }) {
  return (
    <section className="journal-section section-block" id="journal">
      <div className="section-shell">
        <div className="section-kicker"><span>05</span><p>FOOTBALL JOURNAL / 足球日记</p></div>
        <div className="journal-heading"><h2>Keep the<br /><em>story editable.</em></h2><p>一条可以继续编辑的时间线，记录校园训练、朋友、比赛日，以及场下仍在延续的故事。</p></div>
        <ol className="journal-list">
          {journal.map((entry, index) => (
            <li key={`${entry.label}-${index}`}>
              <div className="journal-index"><span>{entry.year || `0${index + 2}`}</span><i /></div>
              <div className="journal-card">
                <p>{entry.label}</p>
                <h3>{entry.title}</h3>
                <h4>{entry.titleZh}</h4>
                <div><span>{entry.body}</span><small>{entry.bodyZh}</small></div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
