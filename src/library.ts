//-----------------------------------------------------------------
// Завдання 1: Enum і базова модель

enum ItemStatus {
	Available = "доступно",
	Borrowed = "видано",
	Lost = "втрачено",
}

interface LibraryItemData {
	id: number;
	title: string;
	year: number;
	status: ItemStatus;
	internalNote: string;
}

//-----------------------------------------------------------------
// Завдання 2: Три похідні типи

type PublicItem = Omit<LibraryItemData, "internalNote">;
type ItemPreview = Pick<LibraryItemData, "id" | "title">;
type ItemUpdate = Partial<Omit<LibraryItemData, "id">>;

const publicItemExample: PublicItem = {
	id: 1,
	title: "Кобзар",
	year: 1840,
	status: ItemStatus.Available,
};

const itemPreviewExample: ItemPreview = {
	id: 1,
	title: "Кобзар",
};

const itemUpdateExample: ItemUpdate = {
	status: ItemStatus.Borrowed,
};

//-----------------------------------------------------------------
// Завдання 3 : Абстрактний клас

abstract class LibraryItem {
	#status: ItemStatus = ItemStatus.Available;

	protected constructor(protected title: string, protected year: number) 
    {}

	get status(): ItemStatus {
		return this.#status;
	}

	borrow(): void {
		if (this.#status === ItemStatus.Borrowed) {
			console.log("Цей предмет уже видано.");
			return;
		}

		this.#status = ItemStatus.Borrowed;
	}

	abstract describe(): string;
}

//-----------------------------------------------------------------
// Завдання 4: Два нащадки

class Book extends LibraryItem implements Searchable {
	constructor(title: string, year: number, public author: string) {
		super(title, year);
	}

	describe(): string {
		return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
	}

	matches(query: string): boolean {
		const normalizedQuery = query.toLowerCase();
		return (
			this.title.toLowerCase().includes(normalizedQuery) ||
			this.author.toLowerCase().includes(normalizedQuery)
		);
	}
}

class Magazine extends LibraryItem {
	constructor(title: string, year: number, public issueNumber: number) {
		super(title, year);
	}

	describe(): string {
		return `Журнал: ${this.title}, випуск №${this.issueNumber}`;
	}
}

// new LibraryItem("Назва", 2024); // Constructor of class 'LibraryItem' is protected and only accessible within the class declaration.

//-----------------------------------------------------------------
// Завдання 5: implements

interface Searchable {
	matches(query: string): boolean;
}

//-----------------------------------------------------------------
// Завдання 6: Поліморфізм

const libraryItems: LibraryItem[] = [
	new Book("Кобзар", 1840, "Тарас Шевченко"),
	new Book("Лісова пісня", 1911, "Леся Українка"),
	new Magazine("Наука і життя", 2024, 5),
];

for (const item of libraryItems) {
	console.log(item.describe());
}
