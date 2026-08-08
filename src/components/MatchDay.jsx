export default function MatchDay({ matchDay, videos }) {
  const getVideo = (id) => videos.find((video) => video.id === id);

  return (
    <section className="match-section section-block" id="match-day">
      <div className="section-shell">
        <div className="section-kicker"><span>04</span><p>MATCH DAY / 比赛日</p></div>
        <div className="match-heading"><h2>Two moments.<br /><em>Still moving.</em></h2><p>两个真实的足球时刻：任意球之后的庆祝，和点球大战中的专注。</p></div>
        <div className="match-grid">
          {matchDay.map((moment, index) => {
            const video = getVideo(moment.videoId);
            return (
              <article className="match-card" key={moment.videoId}>
                <video src={video.src} poster={video.poster} muted loop playsInline autoPlay preload="none" style={{ objectPosition: video.position }} />
                <div className="match-card-shade" />
                <div className="match-card-content">
                  <p>{moment.kicker} <span>0{index + 1}</span></p>
                  <h3>{moment.title}</h3>
                  <h4>{moment.titleZh}</h4>
                  <div><span>{moment.body}</span><small>{moment.bodyZh}</small></div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
