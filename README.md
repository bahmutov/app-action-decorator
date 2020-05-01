# app-action-decorator
> Example exposing an instance of an object automatically to Cypress via TS decorator

A TypeScript class decorator overrides constructor function to automatically set a new instance of an object onto `window` where it can be accessed from test. Summary of the decorator:

```ts
function AppActionClass(name?: string) {
  return function (target: Function) {
    if (!window.Cypress) {
      // do nothing if not inside Cypress
      return target
    }

    // override constructor to save each instance (assumes singleton)
    const instance = construct(original, args);
    window[name || target.name] = instance
    return instance
  }
}

// app code
@AppActionClass()
class O {
  foo: string
}

@AppActionClass('Person')
class Person {
  name: string

  constructor(n) {
    this.name = n
  }
}
new Person('Mike')
```

From test

```js
/// <reference types="cypress" />
describe('Decorator', () => {
  it('has app action via decorator', () => {
    cy.visit('/')

    // the page automatically sets created singleton instances
    // via TypeScript decorator

    // an instance of class "O"
    cy.window().its('O').should('deep.equal', {
      foo: 'nice'
    })

    // another instance from class "Person"
    cy.window().its('Person')
      .should('have.property', 'name', 'Mike')
  })
})
```

Nice
