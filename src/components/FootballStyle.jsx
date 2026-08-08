export default function FootballStyle({ tags }) {
  return (
    <section className="style-section section-block" id="style">
      <div className="section-shell">
        <div className="section-kicker"><span>03</span><p>MY FOOTBALL STYLE / 我的踢球方式</p></div>
        <div className="style-heading">
          <h2>Small details.<br /><em>Shared rhythm.</em></h2>
          <p>不靠虚构的数据定义自己，只记录脚下的触球、场上的交流，以及和朋友并肩踢球的节奏。</p>
        </div>
        <ul className="style-tags" aria-label="Football style qualities">
          {tags.map((tag, index) => (
            <li key={tag.en} style={{ '--tag-index': index }}>
              <span>0{index + 1}</span><strong>{tag.en}</strong><small>{tag.zh}</small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
