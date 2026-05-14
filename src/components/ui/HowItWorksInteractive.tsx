'use client';

import { useState } from 'react';
import Image from 'next/image';
import ScrollToFormButton from './ScrollToFormButton';

type Step = {
  title: string;
  description: string;
  ariaLabel: string;
  dividerClass: string;
};

type CardData = {
  card1Cta: string;
  card1Desc: string;
  card2Title: string;
  card2Cta: string;
  card2Items: string[];
  corrected: string;
  card3Cta: string;
  creditLimit: string;
  autoLoans: string;
  approved: string;
  creditScore: string;
};

type Props = {
  steps: Step[];
  cardData: CardData;
};

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UpArrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M3 11L7 3L11 11" stroke="#22674b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HowItWorksInteractive({ steps, cardData }: Props) {
  const [active, setActive] = useState(0);

  const iconGroupClasses = [
    ['profit-card-icon-1--tl', 'profit-card-icon-1--bl', 'profit-card-icon-1--br'],
    ['profit-card-icon-2--tr', 'profit-card-icon-2--bl'],
    ['profit-card-icon-3--tl', 'profit-card-icon-3--br'],
  ];

  return (
    <div className="profit-text-img">
      <div className="profit-text-list">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`profit-text-item ${step.dividerClass}${active === idx ? ' active' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={step.ariaLabel}
            onClick={() => setActive(idx)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(idx); } }}
          >
            <h3 className="profit-item-title">{step.title}</h3>
            <p className="profit-item-description">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="profit-card-widget">
        {iconGroupClasses.map((group, gIdx) =>
          group.map((cls) => (
            <div
              key={cls}
              className={`profit-card-icon ${cls}`}
              style={{ display: active === gIdx ? 'flex' : 'none' }}
            >
              {cls.includes('graph') || cls.includes('1--tl') ? <i className="bi bi-graph-up" /> :
               cls.includes('1--bl') ? <i className="bi bi-bar-chart" /> :
               cls.includes('1--br') ? <i className="bi bi-graph-up-arrow" /> :
               cls.includes('2--tr') ? <i className="bi bi-pencil-square" /> :
               cls.includes('2--bl') ? <i className="bi bi-credit-card-2-front" /> :
               cls.includes('3--br') ? (
                 <i className="bi bi-lightning-charge-fill" aria-hidden="true" />
               ) :
               cls.includes('3--tl') ? (
                 <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                   <path d="M18 6L18 24" stroke="white" strokeWidth="3" strokeLinecap="round" />
                   <path d="M10 13L18 5L26 13" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M9 30H27" stroke="white" strokeWidth="3" strokeLinecap="round" />
                 </svg>
               ) : null}
            </div>
          ))
        )}

        <div className="profit-card-inner" id="profit-card-1" style={{ display: active === 0 ? 'flex' : 'none' }}>
          <div className="profit-card-score-ring">
            <svg className="profit-ring-svg" viewBox="0 0 160 160">
              <circle className="profit-ring-bg" cx="80" cy="80" r="66" />
              <circle className="profit-ring-fill profit-ring-fill--low" cx="80" cy="80" r="66" />
            </svg>
            <div className="profit-card-score-text">
              <span className="profit-score-number">560</span>
              <span className="profit-score-label">BAD<br />POTENTIAL</span>
            </div>
          </div>
          <ScrollToFormButton className="profit-card-cta scroll-to-form">
            {cardData.card1Cta} <ArrowIcon />
          </ScrollToFormButton>
          <p className="profit-card-desc">{cardData.card1Desc}</p>
        </div>

        <div className="profit-card-inner profit-card-fix" id="profit-card-2" style={{ display: active === 1 ? 'flex' : 'none' }}>
          <p className="profit-fix-title">{cardData.card2Title}</p>
          <ul className="profit-fix-list">
            {cardData.card2Items.map((item, idx) => (
              <li key={idx} className="profit-fix-item">
                <span className="profit-fix-label">{item}</span>
                {idx < 3 ? (
                  <span className="profit-fix-badge corrected">{cardData.corrected}</span>
                ) : idx === 3 ? (
                  <span className="profit-fix-badge loading">
                    <svg className="fix-spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#22674b" strokeWidth="2" strokeDasharray="28 16" strokeLinecap="round" />
                    </svg>
                  </span>
                ) : (
                  <span className="profit-fix-badge icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="5" width="20" height="14" rx="3" stroke="#888" strokeWidth="1.5" />
                      <path d="M2 10h20" stroke="#888" strokeWidth="1.5" />
                      <rect x="5" y="14" width="4" height="2" rx="1" fill="#888" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <ScrollToFormButton className="profit-card-cta scroll-to-form">
            {cardData.card2Cta} <ArrowIcon />
          </ScrollToFormButton>
        </div>

        <div className="profit-card-inner profit-card-pump" id="profit-card-3" style={{ display: active === 2 ? 'flex' : 'none' }}>
          <div className="pump-card-main">
            <div className="pump-card-main-top">
              <div className="pump-user-avatar">
                <Image src="/img/avatar1.png" alt="Alex B." width={36} height={36} />
              </div>
              <div className="pump-user-info">
                <p className="pump-user-name">Alex B.</p>
                <p className="pump-user-sub">{cardData.creditScore}</p>
              </div>
              <div className="pump-score-badge stacked">
                  <span className="pump-score-main">812</span>
                  <span className="pump-score-delta">
                    <UpArrow /> +140 points
                  </span>
              </div>
            </div>
            <div className="pump-card-main-details">
              <div className="pump-detail-row">
                <span className="pump-detail-label">{cardData.creditLimit}</span>
                <span className="pump-detail-value green">$45 000.00</span>
              </div>
              <div className="pump-detail-row">
                <span className="pump-detail-label">{cardData.autoLoans}</span>
                <span className="pump-detail-value green">{cardData.approved}</span>
              </div>
            </div>
          </div>
          <ul className="pump-users-list">
            {[
              { src: '/img/avatar2.png', name: 'Hannah W.', score: 780, points: 60 },
              { src: '/img/avatar3.png', name: 'Grigory F.', score: 750, points: 110 },
              { src: '/img/avatar4.png', name: 'Denis C.', score: 730, points: 130 },
            ].map((user) => (
              <li key={user.name} className="pump-user-row">
                <Image className="pump-user-ava" src={user.src} alt={user.name} width={32} height={32} />
                <div className="pump-user-row-info">
                  <p className="pump-user-row-name">{user.name}</p>
                  <p className="pump-user-row-sub">{cardData.creditScore}</p>
                </div>
                <div className="pump-score-badge small stacked">
                    <span className="pump-score-main">{user.score}</span>
                    <span className="pump-score-delta">
                      <UpArrow /> +{user.points} points
                    </span>
                </div>
              </li>
            ))}
          </ul>
          <ScrollToFormButton className="profit-card-cta scroll-to-form">
            {cardData.card3Cta} <ArrowIcon />
          </ScrollToFormButton>
        </div>
      </div>
    </div>
  );
}
