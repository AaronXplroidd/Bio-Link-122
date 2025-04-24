import React from 'react';
import { SocialLink } from '../types';
import LinkCard from './LinkCard';
import '../styles/LinkSection.css';

const LinkSection: React.FC = () => {
  const links: SocialLink[] = [
    {
      id: '1',
      platform: 'GitHub',
      url: 'https://github.com/AaronXplroidd',
      icon: 'github',
      color: '#333'
    },
    {
      id: '2',
      platform: 'Discord',
      url: 'https://discord.com/users/878067785891188736',
      icon: 'Discord',
      color: '#5865F2'
    },
    {
      id: '3',
      platform: 'Instagram',
      url: 'https://instagram.com/legendryou_26',
      icon: 'instagram',
      color: '#E1306C'
    },
    {
      id: '4',
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@xoliosezz_',
      icon: 'tiktok',
      color: '#000000'
    }
  ];

  return (
    <div className="link-section">
      <h2 className="section-title">Connect With Me</h2>
      <div className="links-container">
        {links.map((link, index) => (
          <LinkCard key={link.id} link={link} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LinkSection;
