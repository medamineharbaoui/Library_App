import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/service';
import { Book, BookCreateUpdateDTO } from '../../models/book';

function yearRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl) => {
    const v = control.value;
    if (v === null || v === '') return null;
    const year = Number(v);
    if (!Number.isInteger(year)) return { yearInteger: true };
    if (year < min || year > max) return { yearRange: { min, max } };
    return null;
  };
}

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  standalone: true,
  providers: [BookService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class BooksComponent implements OnInit {
  private svc = inject(BookService);
  private fb = inject(FormBuilder);

  books = signal<Book[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  formError = signal<string | null>(null);

  editingId = signal<number | null>(null);
  isEditing = computed(() => this.editingId() !== null);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    author: ['', [Validators.required, Validators.minLength(2)]],
    published_year: ['', [Validators.required, Validators.pattern(/^\d{4}$/), yearRange(1500, new Date().getFullYear())]],
    isbn: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
    pages: [1, [Validators.required, Validators.min(1)]]
  });

  currentYear = new Date().getFullYear();


  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading.set(true);
    this.error.set(null);
    this.svc.list().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set("Impossible de charger la liste des livres.");
        this.loading.set(false);
      }
    });
  }

  trackById = (_: number, b: Book) => b.id;

  startEdit(b: Book): void {
    this.openModal();
    this.editingId.set(b.id);
    this.form.setValue({
      title: b.title ?? '',
      author: b.author ?? '',
      published_year: String(b.published_year) ?? '',
      isbn: b.isbn ?? '',
      pages: b.pages ?? 1
    });
    this.success.set(null);
    this.formError.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form.reset();
    this.success.set(null);
    this.formError.set(null);

    this.closeModal();
  }

  remove(b: Book): void {
    if (!confirm(`Supprimer "${b.title}" ?`)) return;
    this.loading.set(true);
    this.svc.delete(b.id).subscribe({
      next: () => {
        this.books.set(this.books().filter(x => x.id !== b.id));
        this.success.set('Livre supprimé.');
        this.loading.set(false);
      },
      error: () => {
        this.formError.set("Suppression impossible.");
        this.loading.set(false);
      }
    });
  }


  showModal = signal(false);

openModal() {
  this.form.reset();
  this.editingId.set(null);
  this.success.set(null);
  this.formError.set(null);
  this.showModal.set(true);
}

closeModal() {
  this.showModal.set(false);
}


  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const { title, author, published_year, isbn, pages } = this.form.value as any;
    const dto: BookCreateUpdateDTO = {
      title,
      author,
      published_year: Number(published_year),
      isbn,
      pages: Number(pages)
    };

    this.loading.set(true);
    this.success.set(null);
    this.formError.set(null);

    const id = this.editingId();
    const obs = id === null ? this.svc.create(dto) : this.svc.update(id, dto);

    obs.subscribe({
      next: (saved) => {
        if (id === null) {
          this.books.set([saved, ...this.books()]);
          this.success.set('Livre ajouté avec succès.');
        } else {
          this.books.set(this.books().map(x => x.id === saved.id ? saved : x));
          this.success.set('Livre modifié avec succès.');
        }
        this.form.reset();
        this.editingId.set(null);
        this.loading.set(false);
      },
      error: () => {
        this.formError.set("Enregistrement impossible. Vérifie les champs.");
        this.loading.set(false);
      }
    });
  }

  invalid(controlName: keyof typeof this.form.controls): boolean {
    const c = this.form.get(controlName);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
