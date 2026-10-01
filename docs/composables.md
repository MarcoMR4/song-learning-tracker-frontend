# Composables: contexto y flujo

Los composables en `src/composables/` conectan las páginas con los servicios de Supabase y centralizan el estado reactivo y la respuesta visual de la interfaz. Las páginas no deben llamar directamente a los servicios de `src/services/supabase/`.

## Capas

```text
pages/components → composables → services/supabase → useSupabaseClient()
```

- `useSongCrud`, `useMusicInstrumentCrud` y `useSongTrackingCrud` exponen la colección, `isLoading` y las operaciones de lectura/escritura. Los servicios asociados contienen el nombre de la tabla y las consultas; `baseService.ts` proporciona las primitivas CRUD comunes.
- `useAuth` concentra `login`, `register`, `logout` y su estado `loading`. Las rutas protegidas usan el middleware `auth`.
- `useQuasarUi` centraliza las notificaciones de éxito/error/advertencia y los diálogos de confirmación de Quasar.

## Operaciones de creación

`addSong`, `addInstrument`, `addSongTracking` y sus operaciones `update*` usan `isLoading` como bloqueo de concurrencia. Si una creación o actualización ya está activa, devuelven `{ success: false, duplicate: true }` sin ejecutar otro `INSERT` o `UPDATE`. Esto protege tanto los clics repetidos como envíos repetidos del formulario y conserva un resultado seguro para los consumidores que desestructuran `success`.

Una creación o actualización exitosa muestra una notificación, actualiza la colección mediante `fetch*` y devuelve `{ success: true }`. Las páginas cierran el diálogo de inmediato al recibir ese resultado, por lo que el `QNotify` de éxito permanece visible sin dejar disponible el botón de guardado. Los fallos muestran una notificación y devuelven `{ success: false, error }`.

## Al añadir un flujo

1. Añade la consulta específica al servicio de Supabase; reutiliza `baseService.ts` cuando la operación sea CRUD estándar.
2. Encapsula el estado, manejo de errores y notificaciones en un composable.
3. Desde la página, consume el composable y vincula su `isLoading` a los componentes de Quasar que deban reflejar la operación.
4. Para operaciones que creen o actualicen registros, aplica el guard de concurrencia antes de establecer `isLoading` y enlaza ese estado al botón de guardado.
