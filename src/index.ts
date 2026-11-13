// Завдання 1 : Дженерик в інтерфейсі

interface Result<T> {
    success: boolean;
    data: T;
    timestamp: Date;
}

const varString: Result<string> = {
    success: true,
    data: "Hello, World!",
    timestamp: new Date(),
};

const varArray: Result<number[]> = {
    success: true,
    data: [42, 7, 13],
    timestamp: new Date(),
};

console.log(varString);
console.log(varArray);

//------------------------------------------------------
// Завдання 2 : Відповідь API

interface ApiResponse<T> {
    status: "success" | "error";
    data: T;
}

interface User {
    id: number;
    email: string;
}

interface Post {
    id: number;
    title: string;
}

const userResponse: ApiResponse<User> = {
    status: "success",
    data: {
        id: 1,
        email: "user@example.com"
    }
};

const postResponse: ApiResponse<Post[]> = {
    status: "success",
    data: [
        {
            id: 1,
            title: "How to use TypeScript"
        },
                
        { 
            id: 2, 
            title: "Understanding Generics" 
        }
    ]
};

//------------------------------------------------------
// Завдання 3 : Дженерик у класі

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
console.log(q.dequeue());   // "a"
console.log(q.size());      // 1

// q.enqueue(42);   // має бути помилка
// Таки є помилка: Error: Argument of type 'number' is not assignable to parameter of type 'string'.

//------------------------------------------------------
// Завдання 4 : Обгортка, що зберігає тип

async function fetchUser(): Promise<User> { 
    console.log("Fetching user...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, email: "user@example.com" });
        }, 1000);
    });
}
async function fetchPosts(): Promise<Post[]> { 
    console.log("Fetching posts...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "How to use TypeScript" },
                { id: 2, title: "Understanding Generics" }
            ]);
        }, 1000);
    });
 }

async function withLogging<T>(name: string, fn: () => Promise<T>): Promise<T> {
    console.log(`Початок: ${name}...`);
    const result = await fn();
    console.log(`Готово: ${name}.`);
    return result;
}

const user = await withLogging("fetchUser", () => fetchUser());
// user має бути типу User

const posts = await withLogging("fetchPosts", () => fetchPosts());
// posts має бути типу Post[]

//------------------------------------------------------
// Завдання 5:Знайдіть зайве

// А
// function logValue<T>(value: T): void {
//     console.log(value);
// }
// виглядає так що дженерік T тут зайвий, і можна просто використати unknown,
// бо ми нічого не повертаємо і з value нічого не робимо.
function logValue(value: unknown): void {
    console.log(value);
}

// Б
// тут вже трохи заплутався, бо дженерік T тут не зайвий, оскільки ми повертаємо значення типу T, 
// але таке рішення все ж неправильне, наприклад цей рядок console.log(userTask5.email) - поверне undefined
// а цей console.log(userTask5.email.length) - викличе runtime TypeError: Cannot read property 'length' of undefined.
// поки що не придумав як це виправити...
function parseJson<T>(json: string): T {
    return JSON.parse(json);
}

const userTask5 = parseJson<User>('{"id": 1}');  
console.log(userTask5.id);              // 1
console.log(userTask5.email);           // undefined
// console.log(userTask5.email.length);    // TypeError: Cannot read property 'length' of undefined