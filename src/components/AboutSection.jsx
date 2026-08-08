export default function AboutSection({ profile }) {
  return (
    <section className="about section-shell section-block" id="about">
      <div className="section-kicker"><span>02</span><p>ABOUT ME / 关于我</p></div>
      <div className="about-grid">
        <h2>Built around<br /><em>the next touch.</em></h2>
        <div className="about-copy">
          <p className="lead">{profile.intro.en}<br />{profile.intro.zh}</p>
          <p>{profile.intro.body}<br />{profile.intro.bodyZh}</p>
          <dl className="fact-rail">
            <div><dt>Since</dt><dd>{profile.startedPlaying}</dd></div>
            <div><dt>Role</dt><dd>{profile.position}</dd></div>
            <div><dt>Why</dt><dd>{profile.reason}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
