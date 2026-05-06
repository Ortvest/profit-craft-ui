'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function BurgerMenu() {
  useEffect(() => {
    const burger = document.getElementById('burger-menu') as HTMLButtonElement | null;
    const navList = document.getElementById('header-list');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-list-item a');

    if (!burger || !navList) return;

    const toggleMenu = () => {
      navList.classList.toggle('open');
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isExpanded));
      document.body.classList.toggle('no-scroll');
    };

    burger.addEventListener('click', toggleMenu);
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('open')) toggleMenu();
      });
    });

    return () => {
      burger.removeEventListener('click', toggleMenu);
    };
  }, []);

  return (
    <button
      id="burger-menu"
      aria-expanded="false"
      aria-controls="header-list"
      aria-label="Open menu"
    >
      <Image src="/img/burger-menu.svg" alt="" width={32} height={32} />
    </button>
  );
}
