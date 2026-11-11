// Завдання 1 : Останній елемент

function getLastElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

console.log(getLastElement([10, 20, 30]));             // поверне 30
console.log(getLastElement(['a', 'b', 'c']));          // поверне 'c'
console.log(getLastElement([true, false]));            // поверне false
console.log(getLastElement([]));                       // поверне undefined

//-----------------------------------------------------
// Завдання 2 : Обгортка в масив
function wrapInArray<T>(value: T): T[] {
  return [value];
}

console.log(wrapInArray(5));         // поверне [5]
console.log(wrapInArray('hello'));   // поверне ['hello']
console.log(wrapInArray(true));      // поверне [true]

//-----------------------------------------------------
// Завдання 3 : Дві комірки
function swap<T, U>(value1: T, value2: U): [U, T] {
  return [value2, value1];
}

const r = swap("Аліна", 26);   // має бути [number, string]  
console.log(r);                // поверне [26, "Аліна"]

//-----------------------------------------------------
// Завдання 4 : Полагодьте функцію

// початковий код функції filterAndTransform
// function filterAndTransform<T>(
//     arr: T[],
//     predicate: (item: T) => boolean,
//     transform: (item: T) => T
// ): T[] {
//     return arr.filter(predicate).map(transform);
// }

// потрібно змінити тип параметра transform, щоб він міг повертати будь-який тип U, а не обмежуватися типом T.
function filterAndTransform<T, U>(
    arr: T[],
    predicate: (item: T) => boolean,
    transform: (item: T) => U
): U[] {
    return arr.filter(predicate).map(transform);
}
// Після виправлення це має працювати:
const result = filterAndTransform(
    [1, 2, 3, 4],
    n => n % 2 === 0,
    n => `Число: ${n}`
);
console.log(result);    // result: string[]

//-----------------------------------------------------
// Завдання 5 : Обмеження

function printId<T extends { id: number }>(obj: T): T {
    console.log(obj.id);
    return obj;
}

const user = printId({ id: 1, email: "a@test.com" });
user.email;   // має працювати, тип не втрачено

// printId({ name: "Alice" });   // має бути помилка: немає id - Object literal may only specify known properties, and 'name' does not exist in type '{ id: number; }'
// printId({ id: "abc" });       // має бути помилка: id не число - Type 'string' is not assignable to type 'number'.
