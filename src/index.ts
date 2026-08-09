interface Book {
  readonly id: number; // Завдання 3: readonly поле
  title: string;
  author: Author;       // Обов'язкове завдання: вкладений об'єкт
  year: number;
  pages: number;
  genre?: string;       // Завдання 2: опціональні поля
  rating?: number;    
}

interface Author {
  name: string;
  country: string;
}

const fullBook: Book = {
  id: 1,
  title: "1984",
  author: {
    name: "George Orwell",
    country: "United Kingdom"
  },
  year: 1949,
  pages: 328,
  genre: "Dystopian",
  rating: 4.8
};

const minimalBook: Book = {
  id: 2,
  title: "The Hobbit",
  author: {
    name: "J.R.R. Tolkien",
    country: "United Kingdom"
  },
  year: 1937,
  pages: 310
};

// Завдання 1: Вивід у консоль
console.log(`"${fullBook.title}" — ${fullBook.author.name}`);

// Завдання 2: Функція printBook з перевіркою опціональних полів
function printBook(book: Book): void {
  console.log(`\nНазва: "${book.title}", Автор: ${book.author.name}`);
  
  if (book.genre) {
    console.log(`Жанр: ${book.genre}`);
  }
  
  if (book.rating !== undefined) {
    console.log(`Рейтинг: ${book.rating}`);
  }
}

printBook(fullBook);
printBook(minimalBook);

// Завдання 3: Спроба змінити readonly поле 
// fullBook.id = 99; // Error: Cannot assign to 'id' because it is a read-only property.

// Завдання 4: Масив книг та функція фільтрації
const library: Book[] = [
  fullBook,
  minimalBook,
  {
    id: 3,
    title: "Project Hail Mary",
    author: { name: "Andy Weir", country: "USA" },
    year: 2021,
    pages: 496,
    rating: 4.9
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    author: { name: "J.K. Rowling", country: "United Kingdom" },
    year: 1997,
    pages: 223
  }
];

function getRecentBooks(books: Book[], afterYear: number): string[] {
  return books
    .filter((book) => book.year > afterYear)
    .map((book) => book.title);
}

const publishedAfter = 2000;
const recentBooks = getRecentBooks(library, publishedAfter);
console.log(`\nКнижки, видані пізніше ${publishedAfter} року:`, recentBooks);
// Має бути: ["Project Hail Mary"]