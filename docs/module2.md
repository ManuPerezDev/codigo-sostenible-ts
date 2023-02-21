# Módulo 2 - Testing Sostenible

## Introducción

### Principios

En cada test buscamos un equilibrio en la combinación de atributos como:

- Velocidad
- Granularidad
- Independencia
- Inocuidad
- Acoplamiento
- Fragilidad
- Flexibilidad
- Fiabilidad
- Complejidad
- Expresividad
- Determinismo
- Exclusividad
- Trazabilidad

Existen varios acrónimos que nos pueden ayudar a recordar las características deseables de los test. Uno de ellos es FIRST:

- Fast (rápido)
- Independent (independiente)
- Repeatable (repetible)
- Self-validated (auto-validado)
- Timely (oportuno)

## Estructura y denominación

### Nombres que aportan poco

Por lo general debemos poner nombres a los tests que reflejen realidades de negocio y no simplemente que hace la función con respecto a código.

Esto serían ejemplos poco aconsejables:

- Returns 4 when the input is 2
- Empty string
- Returns null
- Throws exception if empty

### Especificaciones funcionales

Los nombres de los tests deberían reflejar la realidad de negocio. Una muestra de que un test tiene un buen nombre es que las personas pueden identificar el comportamiento del sistema con solo leer los nombres de los tests.

Por ejemplo:

- Removes duplicate items from the collection
- Counts characters in the document
- Registers a failure in the communication
- Calculates the net pay
- Finds patients by surname
- Is case insensitive
- Requires at least one number

### Anatomía de un test

Un test mantenible no se parece a un script repleto de líneas de comandos. A ser posible sólo tiene tres bloques: la preparación, la ejecución y la validación.

1. **Preparación** (Arrange, Given)
   Es la parte del test donde preparamos el contexto para poder realizar la prueba. Por ejemplo, si probamos un método de una clase, primero tendremos que instanciar dicha clase para probarlo. Además, una parte de la preparación puede estar contenida en el método setUp (before, en el caso de Jest), si es común a todos los test de la clase.

2. **Actuación** (Act, When)
   Una vez preparado el contexto, el siguiente paso es la acción, actuar: ejecutamos la acción que queremos probar. Por ejemplo, invocar un método con unos parámetros.

3. **Aserción** (Assert, Then)
   Verificamos si el resultado de la acción es el esperado. Por ejemplo, el resultado de la invocación al método anterior tiene que devolver un valor determinado.

## Fundamentos de mocking

### Introducción

Un mock o un doble de prueba es una pieza de código que suplanta el comportamiento de partes del código para simular comportamientos sin tener que ejecutar esas partes reales del código, como por ejemplo, el acceso a base de datos.

### Tipos de dobles

Para categorizar los tipos de mocks vamos a usar la nomenclatura creada por Gerard Meszaros.

> Hay que tener en cuenta que la industria no ha adoptado esta nomenclatura y es normal que muchos frameworks de testing no la sigan.

- Stubs
- Spies
- Mock estrictos
- Fake objects
- Dummy objects

### Stubs

Son aquellos dobles de prueba que devuelven una respuesta. 

```typescript
class User {
  constructor(readonly name: string) {}
}

export interface UserRepository {
  findUsersByName: (name: string) => User[];
}

class UserFinder {
  constructor(private repository: UserRepository) {}

  findUsers(name: string): User[] {
    const usersByName = this.repository.findUsersByName(name);
    if (usersByName != null && usersByName.length > 0) {
      return usersByName;
    }
    return [];
  }
}

describe('The User Finder', () => {
  it('searches user by name first', () => {
    const aName = 'irrelevant-name';
    const aUser = new User(aName);
    const repository = new Repository();
    repository.findUsersByName = () => [aUser];
    const usersFinder = new UserFinder(repository);
    
    const result = usersFinder.findUsers(aName);
    
    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(aUser);
  });
});


class RepositoryDouble implements UserRepository {
  findUsersByName(name: string): User[] {
    return [];
  }
}
```

### Spies

Son objetos que tienen la capacidad de registrar memoria para almacenar las llamadas que han sido hechas a un método.

```typescript
updatePassword(user: User, password: string) {
  user.updatePassword(password);
  this.repository.save(user);
}

class UserService {
  constructor(private repository: UserRepository) {}

  updatePassword(user:User, password:string) {
    user.updatePassword(password);
    this.repository.save(user);
  }
}

describe('The User Service', () => {
  it('saves user throughout the repository', () => {
    const repository = new RepositorySpy();
    const service = new UserService(repository);
    const user = new User('irrelevant-name', 'irrelevant-password');

    service.updatePassword(user, '1234');

    expect(repository.savedUser).toEqual(user);
  });
});


class RepositorySpy implements UserRepository {
  readonly savedUser: User;
  save(user: User): void {
    this.savedUser = user;
  }
}
```

### Mocks estrictos

Los spies y los mocks se encargan de saber cuando han sido llamados pero con la diferencia sutíl de que el spy no se preocupa del número de llamadas que se hacen y el mock estricto si.

```typescript
class RepositoryMock implements UserRepository {
  called = 0;
  save(user: User): void {
    this.called++;
  }

  verify() {
    if(this.called > 1) {
      throw new Error('Saved method was called more than once')
    }
  }
}

describe('The User Service', () => {
  it('saves user throught the repository', () => {
    const repository = new RepositoryMock();
    const service = new UserService(repository);
    const user = new User('irrelevant-name', 'irrelevant-password');

    service.updatePassword(user, '1234');

    repository.verify();
  });
});
```

### Dummies y fake objects

Son implementaciones completamente funcionales pero simplificadas.

```typescript
export class User {
  constructor(private readonly username: string, private name: string) {}

  updateName(name: string) {
    this.name = name;
  }

  hasTheSameName(name: string) {
    return this.name == name;
  }

  isEquals(user: User) {
    return this.username === user.username;
  }
}

export interface UserRepository {
  add(user: User): void;
  update(user: User): void;
  delete(user: User): void;
  findUsersBy(name: string): User[];
}

export class UserService {
  constructor(private repository: UserRepository) {}

  updateName(user: User, name: string) {
    user.updateName(name);
    this.repository.update(user);
  }
}

describe('The User Service', () => {
  it('saves user throughout the repository', () => {
    const repository = new InMemoryRepository();
    const service = new UserService(repository);
    const user = new User('irrelevant-username', 'irrelevant-name');
    repository.add(user);

    service.updateName(user, 'updated-name');

    expect(repository.findUsersBy('updated-name').length).toBe(1);
  });
});

class InMemoryRepository implements UserRepository {
  private users: User[] = [];

  findUsersBy(name: string): User[] {
    return this.users.filter((u: User) => u.hasTheSameName(name));
  }

  add(user: User): void {
    this.users.push(user);
  }

  update(user: User) {
    const userFiltered = this.userFiltered(user);
    filteredUsers[0] = user;
  }

  delete(user: User) {
    this.users = this.userFiltered(user);
  }

  private userFiltered(user: User) {
    return this.users.filter((u: User) => u.isEquals(user));
  }
}
```

### Mocking con Jest

- **jest.fn**: simula un método o función.
- **jest.spyOn**: igual que jest.fn y, además, permite restaurar la implementación original.
- **jest.mock**: simula un módulo entero, es decir, todo el contenido que tiene el fichero que se le pase.

### Errores típicos y buenas prácticas

- Simula sólo artefactos propios: es importante que sólo simulemos aquellos artefactos sobre los que tenemos el control del código, así que evita simular, directamente, dependencias externas. En todo caso, es recomendable envolverlas en un wrapper del que sí tenemos control.
- Simula lo imprescindible: evita abusar de los mocks y trata de restringir su uso a artefactos que hacen de frontera con la capa de negocio.
- No uses dobles para objetos sin dependencias: si un objeto no colabora con otros, no necesita ser probado con dobles.
- No añadas comportamiento extra a los dobles: estos no deberían agregar ninguna complejidad adicional al entorno de prueba. Su comportamiento debe ser obvio y auto-explicativo.
- Sólo debes simular los vecinos inmediatos del artefacto: muchas veces te puedes encontrar con un artefacto que esté implementado de tal manera que tiene que navegar por un árbol de dependencias para completar su tarea. Posiblemente, se esté incumpliendo la "Ley de Demeter". Típicamente, lo complicamos aún más cuando añadimos más dobles en las diferentes capas y acabamos perdiendo el foco de lo que estamos probando.
- En las consultas usa stubs, en los comandos mocks y spies: recuerda, los comandos alteran el estado y típicamente no devuelven nada, son void. Para poder probarlos necesitamos simular una salida indirecta con mocks o con spies. En cambio, las consultas no modifican el estado pero devuelven datos. Cuando esa fuente de datos es complicada de integrar en los tests debemos usar stubs.
