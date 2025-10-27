# Vercel Deployment Guide

## Deployment Steps

### Yöntem 1: Vercel Dashboard (Önerilen)

1. **Vercel'e Git**:
   - https://vercel.com adresine gidin
   - "Sign Up" ile GitHub hesabınızla giriş yapın

2. **Project Import**:
   - "Add New" → "Project" tıklayın
   - GitHub repository'nizi seçin: `enliven17/push-playground`
   - "Import" tıklayın

3. **Project Settings**:
   - Framework Preset: Next.js (otomatik algılanır)
   - Root Directory: `./` (root)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)

4. **Environment Variables** (Eğer gerekirse):
   - Settings → Environment Variables
   - Aşağıdaki değişkenleri ekleyin (isteğe bağlı):
     - `PUSH_TESTNET_RPC_URL`: `https://evm.rpc-testnet-donut-node2.push.org/`
     - `PUSH_TESTNET_CHAIN_ID`: `42101`
     - `NEXT_PUBLIC_APP_NAME`: `Push Playground`

5. **Deploy**:
   - "Deploy" butonuna tıklayın
   - Build tamamlanınca URL'i alın: `https://push-playground.vercel.app`

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI kur
npm install -g vercel

# Vercel'e giriş yap
vercel login

# Deploy et
vercel

# Production'a deploy
vercel --prod
```

## Vercel Özellikleri

✅ **Next.js Native Desteği**:
- SSR/SSG desteği
- API Routes çalışır
- Middleware desteği
- Image Optimization

✅ **Otomatik Deploys**:
- GitHub push → otomatik deploy
- Preview deployments (PR'lar için)
- Instant rollbacks

✅ **Gelişmiş Özellikler**:
- Edge Functions
- Serverless Functions
- CDN desteği
- Analytics

## API Routes

Vercel'de API routes otomatik çalışır:
- `/api/compile` → Serverless Function
- `/api/deploy` → Serverless Function
- `/api/ai-assistant` → Serverless Function

## Environment Variables

Vercel Dashboard → Project Settings → Environment Variables:
- Production, Preview, Development ortamları için ayrı değişkenler
- Encrypted storage
- Easy management

## Build Logs

Build loglarını görmek için:
- Vercel Dashboard → Deployments → Build log
- Real-time streaming logs

## Domains

Custom domain eklemek için:
- Project Settings → Domains
- Domain ekleyin
- DNS kayıtlarını güncelleyin
- SSL otomatik

## Rollback

Önceki deployment'a dönmek için:
- Deployments listesinde "..." → "Promote to Production"

## Troubleshooting

**Build Failures**:
- Build logs'u kontrol edin
- Environment variables'ı kontrol edin
- Node.js version'ı kontrol edin (20.x)

**API Routes Not Working**:
- Environment variables gerekliyse ekleyin
- Function timeout'ları kontrol edin

**Environment Variables Not Loading**:
- Restart deployment
- Check variable names
- Ensure proper prefixes

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Check API routes
3. ✅ Test wallet integration
4. ✅ Test contract compilation
5. ✅ Test deployment feature
6. ✅ Add custom domain (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Vercel Discord: https://vercel.com/discord

