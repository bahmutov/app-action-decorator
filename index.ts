// https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4
console.log('hello from index.ts')

function AppActionClass(name?: string) {
  return function (target: Function) {
    // save a reference to the original constructor
    const original = target;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        const c: any = function () {
            return constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
    }

    // the new constructor behavior
    const f: any = function (...args) {
      const instance = construct(original, args);
      // @ts-ignore
      window[name || target.name] = instance
      return instance
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    return f;
  }
}

@AppActionClass()
class O {
  foo: string
}

const o = new O()
o.foo = 'nice'

console.log('decorated foo', o.foo)


@AppActionClass('Person')
class Person {
  name: string

  constructor(n) {
    this.name = n
  }
}
new Person('Mike')
