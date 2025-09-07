import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-widget.component.html',
  styleUrl: './contact-widget.component.scss'
})
export class ContactWidgetComponent {
  private languageService = inject(LanguageService);
  protected readonly t = computed(() => this.languageService.getTranslations());

  protected isOpen = signal(false);
  protected contact = signal('');
  protected message = signal('');
  protected isSending = signal(false);
  protected success = signal<string | null>(null);
  protected error = signal<string | null>(null);

  toggle(): void {
    this.isOpen.update(v => !v);
  }

  private validate(): string | null {
    const contact = this.contact().trim();
    const message = this.message().trim();
    if (!contact) return 'Введите телефон или Telegram (@username)';
    if (message.length < 5) return 'Сообщение слишком короткое';
    return null;
  }

  async send(): Promise<void> {
    this.success.set(null);
    this.error.set(null);
    const validation = this.validate();
    if (validation) {
      this.error.set(validation);
      return;
    }
    this.isSending.set(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: this.contact(), message: this.message() })
      });
      if (!res.ok) throw new Error(await res.text());
      this.success.set('Сообщение отправлено! Я свяжусь с вами.');
      this.contact.set('');
      this.message.set('');
    } catch (e: any) {
      console.error(e);
      this.error.set('Не удалось отправить. Попробуйте позже.');
    } finally {
      this.isSending.set(false);
    }
  }
}


