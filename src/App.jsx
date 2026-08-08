import { useRef, useState } from 'react';
import profile from './data/profile';
import PillNav from './components/PillNav';
import HeroVideo from './components/HeroVideo';
import AboutSection from './components/AboutSection';
import FootballStyle from './components/FootballStyle';
import MatchDay from './components/MatchDay';
import DriftWallGallery from './components/DriftWallGallery';
import Lightbox from './components/Lightbox';
import JournalTimeline from './components/JournalTimeline';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const returnFocusRef = useRef(null);

  const openLightbox = (image, trigger) => {
    returnFocusRef.current = trigger;
    setSelectedImage(image);
  };

  const closeLightbox = () => setSelectedImage(null);

  return (
    <>
      <PillNav
        logo=""
        logoAlt="Campus Football Journal"
        activeHref="#top"
        items={[
          { href: '#top', label: 'Home' },
          { href: '#gallery', label: 'Gallery' },
          { href: '#about', label: 'About' },
          { href: '#style', label: 'Style' },
          { href: '#match-day', label: 'Match Day' },
          { href: '#journal', label: 'Journal' },
        ]}
        baseColor="#b8f75a"
        pillColor="#101918"
        pillTextColor="#f5f6f0"
        hoveredPillTextColor="#07100a"
      />
      <main>
        <HeroVideo profile={profile} />
        <DriftWallGallery groups={profile.galleryGroups} onSelectImage={openLightbox} />
        <AboutSection profile={profile} />
        <FootballStyle tags={profile.styleTags} />
        <MatchDay matchDay={profile.matchDay} videos={profile.videos} />
        <JournalTimeline journal={profile.journal} />
        <section className="closing-section" aria-label="Closing note">
          <img src={profile.closing.image} alt={profile.closing.imageAlt} />
          <div className="closing-shade" />
          <div className="closing-content section-shell">
            <p className="eyebrow"><span className="pulse-dot" /> JOURNAL CONTINUES</p>
            <h2>{profile.closing.title}</h2>
            <p>{profile.closing.titleZh}</p>
            <span>{profile.nickname} {'\u00b7'} No.{profile.number} {'\u00b7'} Since {profile.startedPlaying}</span>
          </div>
        </section>
      </main>
      <footer className="site-footer"><span>Campus Football Journal</span><span>Personal archive {'\u00b7'} local media only</span></footer>
      {selectedImage && <Lightbox image={selectedImage} onClose={closeLightbox} returnFocusRef={returnFocusRef} />}
    </>
  );
}
