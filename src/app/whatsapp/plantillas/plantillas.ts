import { TipoPlantilla } from '../entities/plantilla-whatsapp.entity';

export const PLANTILLAS_WHATSAPP = {
  [TipoPlantilla.MUY_BUENO]: `📌 REPORTE DE AVANCE DE META

👩‍⚖️ Estimada {sexoJuez}. {nombreJuez}, se remite el reporte correspondiente al corte de avance de meta al {fechaCorte}.

Instancia: {instancia}

Indicadores:
🎯 Meta preliminar: {metaPreliminar}
📈 Resueltos: {resueltos}
📊 Avance de meta: {avanceMeta}%

Nivel productivo:
🟢🟢🟢 MUY BUENO 🟢🟢🟢
📬 Se felicita se compromiso y desempeño en favor del servicio de justicia.

Encuesta de retroalimentación:
🔗 {urlRetroalimentacion}

Atención al usuario:
📞 Consultas: {numeroConsulta}
💬 WhatsApp: {whatsappConsulta}

Atentamente,
⚖️ Justicia en Tiempo Real`,

  [TipoPlantilla.BUENO]: `📌 REPORTE DE AVANCE DE META

👩‍⚖️ Estimada {sexoJuez}. {nombreJuez}, se remite el reporte correspondiente al corte de avance de meta al {fechaCorte}.

Instancia: {instancia}

Indicadores:
🎯 Meta preliminar: {metaPreliminar}
📈 Resueltos: {resueltos}
📊 Avance de meta: {avanceMeta}%

Nivel productivo:
🟡🟡🟡 BUENO 🟡🟡🟡
📬 Se reconoce el esfuerzo reflejado en los resultados alcanzados. Con un impulso adicional, será posible alcanzar el nivel "Muy Bueno" en los próximos cortes.

Brecha de producción:
🟢 para "MUY BUENO": {brechaMuyBueno}

Encuesta de retroalimentación:
🔗 {urlRetroalimentacion}

Atención al usuario:
📞 Consultas: {numeroConsulta}
💬 WhatsApp: {whatsappConsulta}

Atentamente,
⚖️ Justicia en Tiempo Real`,

  [TipoPlantilla.BAJO]: `📌 REPORTE DE AVANCE DE META

👩‍⚖️ Estimada {sexoJuez}. {nombreJuez}, se remite el reporte correspondiente al corte de avance de meta al {fechaCorte}.

Instancia: {instancia}

Indicadores:
🎯 Meta preliminar: {metaPreliminar}
📈 Resueltos: {resueltos}
📊 Avance de meta: {avanceMeta}%

Nivel productivo:
🔴🔴🔴 BAJO 🔴🔴🔴
📬 Se valora el compromiso demostrado y se motiva a continuar fortaleciendo el trabajo diario para superar el nivel actual y avanzar hacia mejores resultados en el siguiente corte.

Brecha de producción:
🟢 para "MUY BUENO": {brechaMuyBueno}
🟡 para "BUENO": {brechaBueno}

Encuesta de retroalimentación:
🔗 {urlRetroalimentacion}

Atención al usuario:
📞 Consultas: {numeroConsulta}
💬 WhatsApp: {whatsappConsulta}

Atentamente,
⚖️ Justicia en Tiempo Real`
};

export function obtenerPlantilla(tipo: TipoPlantilla): string {
  return PLANTILLAS_WHATSAPP[tipo] || '';
}

export function obtenerTodasLasPlantillas() {
  return Object.keys(PLANTILLAS_WHATSAPP).map(tipo => ({
    tipo,
    plantilla: PLANTILLAS_WHATSAPP[tipo as TipoPlantilla]
  }));
}
