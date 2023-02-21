# Módulo 1 - Fundamentos de testing

### Reglas del código sostenible

- El código está bien cubierto por baterías de test automáticos.
- Esos test son sostenibles: útiles y fáciles de mantener.
- Las abstracciones son adecuadas y precisas.
- Hay una notable intención, bien explícita, en cada línea de código escrita.

## Tipos de tests

### Tests funcionales

- **Test unitarios**: comprueban elementos básicos de nuestro software de forma aislada. Son los test más importantes a la hora de validar las reglas de negocio que hemos desarrollado.
- **Test de integración**: aquellos que prueban conjuntos de elementos básicos. Normalmente, suelen incluirse en este tipo de pruebas algunos elementos de infraestructura, como base de datos o llamadas a APIs.
- **Test de sistema**: también denominados end-to-end o de extremo a extremo. Estos test prueban múltiples elementos de nuestra arquitectura simulando el comportamiento de un usuario con una parte de nuestro sistema.
- **Test de regresión**: se encargan de verificar la funcionalidad ya entregada, es decir, son pruebas que se usan para detectar que en los cambios introducidos en nuestro sistema no se genera un comportamiento inesperado. En esencia, cualquier tipo de test funcional de los que hemos visto podría ser un test de regresión, siempre y cuando hayan pasado correctamente en algún momento y, tras realizar un cambio en el sistema, empiezan a fallar. También se le suele denominar test de regresión a aquellos test funcionales o manuales, que se realizan para comprobar que un bug que se ha sido corregido no se ha vuelto a reproducir.

### Tests no funcionales

- **Test de carga**: mediante este tipo de test comprobamos el correcto comportamiento de nuestro sistema bajo diferentes números de peticiones durante un tiempo determinado. Por ejemplo, cuando probamos una web con un servicio que envía cientos o miles de peticiones por minuto o por segundo, dependiendo de nuestras necesidades. Una plataforma que me gusta mucho para realizar este tipo de pruebas es loader.io, incluso la versión gratuita es muy potente.
- **Test de velocidad**: comprueban si el sistema genera los resultados en un tiempo aceptable. Volviendo al ejemplo de una web en este caso podría ser la herramienta de Google, PageSpeed.
- **Test de usabilidad**: son pruebas en las que se trata de evaluar la experiencia de usuario (UX) del sistema.
- **Test de seguridad**: se trata de un conjunto de pruebas en las que evaluamos si el sistema desarrollado está expuesto a vulnerabilidades conocidas. Es decir, en este tipo de pruebas se trata de intentar detectar posibles debilidades o vulnerabilidades para que sean corregidas y no puedan ser explotadas. A estas prácticas también se le conoce como pentesting.

## Distribución de los test

### Pirámide del testing

La pirámide de Cohn nos propone organizar la cantidad de test que tenemos en base a su velocidad de ejecución y al coste de crearlos y mantenerlos.

![](https://cdn.fs.teachablecdn.com/b9B0acaKQAOreQaFhCnH)

### Trofeo del testing

El trofeo del testing, "testing trophy" en inglés, es una propuesta de mejora a la pirámide del testing acuñada Kent C. Dodds en el año 2018 y está focalizada en el testing de aplicaciones frontend.

![](https://cdn.fs.teachablecdn.com/InCnQ7w1RjW9pXbJpPFX)

### Iceberg del testing

Los test del iceberg por encima de la línea de flotación son los test legibles por el negocio, mientras que las pruebas que están por debajo no lo son.

![](https://cdn.fs.teachablecdn.com/mngqJSDqTMCvbVDGalBk)

## Frameworks the testing

### Framework vs librería

Se dice que un framework es aquel código que se encarga de invocar a nuestro código, mientras que en el caso de una librería es al revés: nuestro código se encarga de invocar a la librería.

### xUnit vs RSpec

En los frameworks tipo xUnit, como es el caso de JUnit en Java, los test son un método de una clase o módulo del propio lenguaje de programación, que se suele decorar con algún atributo o anotación para que el framework sepa identificarlo como tal.

El otro estilo popular hoy en día es el de RSpec, con bloques tipo describe y bloques tipo it, refiriéndose a la tercera persona del singular en inglés, que sí pueden anidar test. Se importó de Ruby a JavaScript con gran éxito y es el estilo por el que han apostado frameworks modernos como Jest, y, anteriormente, también Mocha y Jasmine.

### Jest

Jest es un framework de testing basado en RSpec desarrollado y mantenido por el equipo de Facebook. Aunque nace en el contexto de React, es un framework de testing generalista que podemos utilizar en cualquier situación. Se trata de un framework flexible, rápido, con un output sencillo y comprensible, que nos permite completar un ciclo de feedback y con la máxima información en cada momento.

```
npm i -D jest ts-jest @types/jest
```

```
npx ts-jest config:init
```

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

### Anatomía de un test

Un test mantenible no se parece a un script repleto de líneas de comandos. A ser posible sólo tiene tres bloques: la preparación, la ejecución y la validación.

1. **Preparación** (Arrange, Given)
   Es la parte del test donde preparamos el contexto para poder realizar la prueba. Por ejemplo, si probamos un método de una clase, primero tendremos que instanciar dicha clase para probarlo. Además, una parte de la preparación puede estar contenida en el método setUp (before, en el caso de Jest), si es común a todos los test de la clase.

2. **Actuación** (Act, When)
   Una vez preparado el contexto, el siguiente paso es la acción, actuar: ejecutamos la acción que queremos probar. Por ejemplo, invocar un método con unos parámetros.

3. **Aserción** (Assert, Then)
   Verificamos si el resultado de la acción es el esperado. Por ejemplo, el resultado de la invocación al método anterior tiene que devolver un valor determinado.
