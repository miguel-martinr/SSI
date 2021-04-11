# **Seguridad en sistemas informáticos**

# [**El Cifrado de Vigenère**](sites/VigenereCipher/)
<a href="./sites/VigenereCipher" target="_blank"><strong>Ir al cifrador</strong></a>

## **Introducción**

El cifrado de Vigenére, también conocido durante un tiempo como *El cifrado indescifrable*, se basa en el funcionamiento del *cifrado César* y la aritmética modular para encriptar mensajes de una forma simple a la vez que robusta. 

La clave está constituida por una secuencia de símbolos del alfabeto K = {k0, k1, ... ,kd-1}, de longitud d, y que emplea la siguiente transformación congruente lineal de cifrado:
```
Ek (mi) = mi + k (i mod d) (mod n)
```


siendo mi el i-ésimo símbolo del texto claro y n el cardinal (longitud) del alfabeto de entrada

Es polialfabético, por lo que la sustitución aplicada a cada caracter varía en función de la posición que ocupe este dentro del texto claro.  

Esta implementación utiliza el alfabeto inglés estándar: de la 'a' a la 'z'.

```
a, b, c, d, e, f, g, h, i, j, k, l, m, n, o , q, r, s, t, u, v, w, x, y, z
```

## **Instrucciones**
Haga click en <a href="./vigenere-site/index.html" target="_blank"><strong>VigenereCipher</strong></a> para ir al cifrador. 


![Cipher-gui](./media/cipher-gui.png)

- Todos los mensajes se transforman a minúsculas antes de ser procesados
- Todos los acentos se eliminan, por ejemplo: `à` se transforma en `a`
- Los espacios, saltos de línea, signos de puntuación o signos no pertenecientes al alfabeto son ignorados.
- **Clave**: Por defecto es mision. Para cambiarla modifique el campo correspondiente y presione el botón `Actualizar`
- **Cifrar un mensaje:** Redacte el mensaje a cifrar en el campo `Mensaje` y presione el botón `Cifrar` para que aparezca el mensaje cifrado en el campo `Mensaje Cifrado`. Para copiar el mensaje cifrado al portapapeles presione el botón `Copiar`
- **Descifrar un mensaje:** Redacte el mensaje cifrado en el campo `Mensaje Cifrado` y presione el botón `Descifrar` para que apareza el mensaje descifrado en el campo `Mensaje`.

![Vigenere gui demo](media/gui-demo.gif)

# [**Generador RC4**](sites/RC4/)
<a href="./sites/RC4" target="_blank"><strong>Ir al cifrador</strong></a>
## **Introducción**
El cifrado RC4 ha sido históricamente el cifrado de flujo más utilizado en el mundo. Fue diseñado por Ronald Rivest en 1987 y fue mantenido en secreto, violando la segunda regla de Kerckhoffs.

Fue publicado de forma anónima en internet el año 1994. Actualmente se puede utilizar con los nombres ARCFOUR, ARC4 y Alledged-RC4.

Es orientado a operaciones con bytes por lo que es bastante rápido en operaciones en software(?).

Ha sido utilizado en diferentes tecnologías como:
- Wi-Fi (WEP y WPA en estándar IEEE 802.11)
- TLS/SSL (navegación segura por internet)
- SSH (intérprete para conexión a máquinas remotas)
- Kerberos (servidor centralizado para autenticación en redes)
- Whatsapp, Skype, cifrado de pdf, etc...


## **Implementación**
Esta implementación consta de un módulo llamado `RC4` cuyos métodos principales son:
- **`ksa`** *Key Scheduling Algorithm*: recibe la clave e inicializa y permuta el vector de estados del encriptador así como el vector k utilizado para generar la secuencia cifrante.
- **`prga`** *Pseudo Random Generation Algorithm*: Recibe el mensaje (en este caso tomaremos los mensaje como vectores de números enteros en base decimal, cada uno representará un byte) y aplica el algoritmo de encriptación.
- **`apply`** : Recibe el mensaje a ser procesado y la clave y aplica el algoritmo completo al mismo para luego devolverlo procesado.


## **Instrucciones**
La clave y el mensaje se presentan como una lista de números enteros en base decimal separados por coma. Pulse **Aplicar** para aplicar el cifrado RC4 al mensaje con la clave especificada.

En la ventana **Pasos** se imprime paso paso el proceso de encriptación RC4.
## **Ejemplo de uso**

![RC4 demo](./media/rc4-demo.gif)

# [**Rijndael**](sites/Rijndael/)
<a href="./sites/Rijndael" target="_blank"><strong>Ir al cifrador</strong></a>
## **Introducción**

El algoritmo Rijndael es un sistema simétrico de cifrado por bloques, por tanto utiliza la misma clave para el proceso de cifrado como para el proceso de descifrado. Su diseño permite la utilización de claves de sistema con longitud variable siempre que sea múltiplo de 4 bytes. La longitud de las claves utilizadas por defecto son 128 (AES-128), 192 (AES-192) y 256 (AES-256) bits. De la misma manera el algoritmo permite la utilización de bloques de información con un tamaño variable siempre que sea múltiplo de 4 bytes, siendo el tamaño mínimo recomendado de 128 bits (el tamaño mínimo de 16 bytes).

Este algoritmo opera a nivel de byte, interpretando éstos como elementos de un cuerpo de Galois GF(28), y a nivel de registros de 32 bits, considerándolos como polinomios de grado menor que 4 con coeficientes que son a su vez polinomios en GF(2 ).

## **Implementación**
Esta implementación funciona con bloques de 128 bits. Tiene como entrada el bloque del mensaje en claro y el bloque de la clave y da como resultado el bloque cifrado así como la subclaves y estado en cada una de las iteraciones. 

La disposición de los bytes de entrada es por columnas es decir: 
La matriz 
| 0 | 1 | 2 | 3 |
|:-:|:-:|:-:|:-:|
| 4 | 5 | 6 | 7 |
| 8 | 9 | a | b |
| c | d | e | f |

Sería introducida como: `0004080c0105090d02060a0e03070b0f`



