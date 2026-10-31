// Envía datos al Apps Script sin pasar por la pantalla de cuentas de Google.
// text/plain evita la verificación previa (CORS preflight) que Apps Script no soporta.
async function apiPost(datos, intento) {
  intento = intento || 1;
  try {
    const r = await fetch(window.AVATAR.api, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(datos),
      redirect: 'follow'
    });
    const j = await r.json();
    if (!j.ok && j.validacion) return j;           // error de datos: no reintentar
    if (!j.ok) throw new Error(j.error || 'Error');
    return j;
  } catch (e) {
    if (intento < 4) {
      await new Promise(res => setTimeout(res, 1500 + Math.random() * 3000));
      return apiPost(datos, intento + 1);
    }
    return { ok: false, error: 'No pudimos completar tu registro. Revisa tu conexión e intenta de nuevo.' };
  }
}

async function apiNombreEmbajador(ref) {
  try {
    const r = await fetch(window.AVATAR.api + '?api=emb&ref=' + encodeURIComponent(ref));
    const j = await r.json();
    return j.nombre || '';
  } catch (e) { return ''; }
}
