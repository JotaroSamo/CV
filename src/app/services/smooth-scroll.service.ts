import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToSelector(selector: string, durationMs: number = 600, offsetPx: number = 0): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = document.querySelector(selector) as HTMLElement | null;
    if (!target) return;
    this.scrollToElement(target, durationMs, offsetPx);
  }

  scrollToElement(target: HTMLElement, durationMs: number = 600, offsetPx: number = 0): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const startY = window.scrollY || window.pageYOffset;
    const rect = target.getBoundingClientRect();
    const header = document.querySelector('.header') as HTMLElement | null;
    const headerOffset = header ? header.offsetHeight : 0;
    const destinationY = rect.top + startY - headerOffset - offsetPx;
    
    // Prefer native smooth scroll when available
    try {
      (window as any).scrollTo({ top: destinationY, behavior: 'smooth' });
      return;
    } catch {
      // Fallback to JS animation
    }

    const startTime = performance.now();
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeInOutCubic(progress);
      const currentY = startY + (destinationY - startY) * eased;
      window.scrollTo(0, currentY);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}


