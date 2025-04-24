import React from 'react';
import { SocialLink } from '../types';
import '../styles/LinkCard.css';
import { FaGithub, FaDiscord, FaInstagram, FaTiktok } from 'react-icons/fa';

interface LinkCardProps {
  link: SocialLink;
  index: number;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, index }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <FaGithub />;
      case 'Discord':
        return <FaDiscord />;
      case 'instagram':
        return <FaInstagram />;
      case 'tiktok':
        return <FaTiktok />;
      default:
        return <FaTiktok />;
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
      style={{
        animationDelay: `${index * 0.1}s`,
        '--card-color': link.color
      } as React.CSSProperties}
    >
      <div className="link-icon" style={{ backgroundColor: link.color }}>
        {getIcon(link.icon)}
      </div>
      <span className="link-platform">{link.platform}</span>
      <div className="link-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
};

export default LinkCard;
