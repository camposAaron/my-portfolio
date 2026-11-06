# Grabador de demos

Graba recorridos guionizados de FastGym y Autogestion con Playwright y deja los
videos listos para el portafolio: `.webm` (VP9, 1280×630) y su póster `-poster.jpg`.

Cada flujo inicia sesión en un navegador aparte (esa parte no se graba), abre la
primera pantalla y graba solo el recorrido, con un cursor visible y ritmo humano.

## Preparar (una vez)

```bash
cd recorder
npm install
npx playwright install chromium
cp .env.example .env   # y llena las credenciales
```

## Grabar

```bash
node record.mjs --list            # ver los flujos
node record.mjs fg-pos            # uno
node record.mjs "fg-*"            # todos los de FastGym
node record.mjs --all             # todo
node record.mjs aut-ai --headed   # ver el navegador mientras graba
```

El comando imprime la duración (`0:23`) que va en `data/projects.ts`.

| Flujo | Salida | Necesita |
|---|---|---|
| fg-pos | public/projects/fg/pos | abre "Caja Principal FCM" (debe estar cerrada) y registra una venta |
| fg-members | public/projects/fg/members | crea a Valeria Rodríguez con pago inicial en esa caja |
| fg-attendance | public/projects/fg/attendance | marca el ingreso de ese socio; usa una cámara simulada |
| fg-dashboard | public/projects/fg/dashboard | grabar después de los anteriores |

Los flujos de FastGym van encadenados: graba `"fg-*"` completo, en ese orden. Al
terminar queda abierta la sesión de "Caja Principal FCM"; ciérrala (Arqueo y cierre)
antes de volver a grabar.
| aut-home | public/projects/aut/home | usuario colaborador |
| aut-vacations | public/projects/aut/vacations | `AUT_SUBMIT=1` para enviar; `AUT_SHOW_APPROVALS=1` si es supervisor |
| aut-letters | public/projects/aut/letter-settings | usuario admin |
| aut-ai | public/projects/aut-ai/chat | flag `ai_mode` (o `AUT_FORCE_AI_FLAG=1`) |

## FastGym limpio

`pnpm prisma:seed` en el repo de fastgym **borra y recrea** la base: úsalo antes
de grabar para partir siempre del mismo estado. El cliente usa el puerto 3001 y
la API el 3000. Si el 3000 está ocupado, arranca la API en otro puerto
(`PORT=3002 pnpm --filter api dev`) y pon `FG_API_URL=http://localhost:3002` en
`.env`: el navegador del grabador manda ahí las llamadas a `/api`.

## Escribir o ajustar un flujo

Los flujos están en `flows/`. Cada uno exporta `{ id, output, login?, setup?, run }`
y usa las acciones de `lib/director.mjs`: `click`, `type`, `hover`, `pick` (dropdowns),
`scroll`, `scrollTo`, `pause`, `waitFor`, `waitForStable` (respuestas en streaming).
