import { authenticator, totp } from 'otplib';
import { json } from '@sveltejs/kit';

export async function GET({url}: {url: URL}) {
  const secret = url.searchParams.get('secret')
  if (!secret) {
    return json({ error: 'Secret is required' }, { status: 400 });
  }
    
  // Código OTP actual
  const code = totp.generate(secret);
  
  // Tiempo restante hasta el próximo código (en segundos)
  const timeRemaining = totp.timeRemaining();
  
  // Tiempo total del período (normalmente 30 segundos)
  const period = totp.options.step || 30;
  
  // Timestamp actual del período
  const epoch = Math.floor(Date.now() / 1000);
  const currentPeriod = Math.floor(epoch / period);
  
  // Generar códigos para otros períodos usando época específica
  const nextCode = totp.generate(secret);
  const previousCode = totp.generate(secret);
  
  // Verificar si el código actual es válido
  const isValid = totp.check(code, secret);
  
  // Ventana de tiempo actual
  const window = Math.floor(Date.now() / 1000 / period);
  
  // URL para QR code (útil para configurar en apps móviles)
  const issuer = 'MiApp';
  const account = 'usuario@ejemplo.com';
  const otpauthUrl = authenticator.keyuri(account, issuer, secret);
  
  // Progreso del tiempo (0-1, donde 1 significa que el código está a punto de cambiar)
  const timeProgress = 1 - (timeRemaining / period);
  
  return json({ 
    code,
    timeRemaining,
    period,
    nextCode,
    previousCode,
    isValid,
    window,
    otpauthUrl,
    timeProgress,
    metadata: {
      currentTimestamp: Date.now(),
      currentPeriod,
      algorithm: totp.options.algorithm || 'SHA1',
      digits: totp.options.digits || 6,
      issuer,
      account
    }
  });
}