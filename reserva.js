// Bot\u00f3n "Reserva tu lugar" -> WhatsApp del Contact Center con mensaje prellenado.
// Uso en cualquier p\u00e1gina de avatar.danteeludier.com:
//   <script src="/reserva.js" defer></script>
//   y agregar class="js-reservar" a cada bot\u00f3n o link de reservar.
(function () {
  var TEL = '525595490082'; // Contact Center: 55 9549 0082
  var TALLER = 'Avatar Financiero Xalapa (22 al 24 de enero 2027)';

  function datos() {
    var d = {};
    try { d = JSON.parse(localStorage.getItem('avatar_reg') || '{}') || {}; } catch (e) { d = {}; }
    try { var r = new URLSearchParams(location.search).get('ref'); if (r && !d.r) d.r = r; } catch (e) {}
    return d;
  }

  function mensaje(d) {
    var canal = !d.r || /^XAL-(WADIF|MAIL|DEMO)$/i.test(d.r);
    if (d.n && !canal && d.a) {
      return '\u00a1Hola! \u{1F44B} Acabo de registrarme al taller ' + TALLER + ' y quiero apartar mi lugar.\n' +
        'Nombre: ' + d.n + '\n' +
        'Me invit\u00f3: ' + d.a + ' (' + d.r + ')\n' +
        '\u00bfMe pueden dar informaci\u00f3n de precios y formas de pago?';
    }
    if (d.n) {
      return '\u00a1Hola! \u{1F44B} Me registr\u00e9 al taller ' + TALLER + ' y quiero apartar mi lugar. Soy ' + d.n +
        (d.r ? ' (' + d.r + ')' : '') + '. \u00bfMe comparten precios y formas de pago?';
    }
    return '\u00a1Hola! \u{1F44B} Quiero apartar mi lugar en el taller ' + TALLER +
      (d.r ? ' (' + d.r + ')' : '') + '. \u00bfMe comparten precios y formas de pago?';
  }

  function link() { return 'https://wa.me/' + TEL + '?text=' + encodeURIComponent(mensaje(datos())); }

  function aplicar() {
    var els = document.querySelectorAll('.js-reservar');
    for (var i = 0; i < els.length; i++) {
      els[i].setAttribute('href', link());
      els[i].setAttribute('target', '_blank');
      els[i].setAttribute('rel', 'noopener');
      // por si el bot\u00f3n es <button> y no <a>
      if (els[i].tagName !== 'A') els[i].onclick = function (e) { e.preventDefault(); window.open(link(), '_blank'); };
    }
  }

  window.AvatarReserva = { link: link, mensaje: function () { return mensaje(datos()); }, aplicar: aplicar };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', aplicar); else aplicar();
})();
