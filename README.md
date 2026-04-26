# ai-proxy

[amator.tr](https://github.com/amator-tr/amator-tr) icin Cloudflare Workers AI proxy'si.

Sunucu IP'sinden gelen istekleri CF Workers AI'a iletir. Diger tum IP'lere `404 Not Found` doner — worker'in varligi bile belli olmaz.

Token veya API key gerektirmez. Erisim kontrolu tamamen IP whitelist ile yapilir.

## Kullanim

```bash
npm install
npx wrangler deploy
```

## Yapilandirma

`wrangler.toml` icindeki `ALLOWED_IPS` degerini sunucunun IPv4 ve IPv6 adresleriyle doldur.

## Detaylar

Kurulum, test ve entegrasyon detaylari icin ana repoyu incele: [amator-tr/amator-tr](https://github.com/amator-tr/amator-tr)
