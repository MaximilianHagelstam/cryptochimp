<div align="center">
  <img src="./public/logo.svg" height="128px" width="128px"/>
  <h1>CryptoChimp</h1>
  <a href="https://github.com/MaximilianHagelstam/cryptochimp/actions">
    <img src="https://github.com/MaximilianHagelstam/cryptochimp/actions/workflows/ci.yml/badge.svg" alt="actions" />
  </a>
  <a href="https://github.com/MaximilianHagelstam/cryptochimp/commits/main">
    <img src="https://img.shields.io/github/last-commit/MaximilianHagelstam/cryptochimp" alt="last commit" />
  </a>
  <a href="https://github.com/MaximilianHagelstam/cryptochimp/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/MaximilianHagelstam/cryptochimp.svg" alt="license" />
  </a>
</div>

### 📷 Screenshot

<a href="https://cryptochimp.vercel.app/">
  <img src="screenshot.png" alt="screenshot" width="800"/>
</a>

### ⚙️ Run Locally

```bash
git clone https://github.com/MaximilianHagelstam/cryptochimp
cd cryptochimp

# Create a .env file in the root of the project and fill it out as per .env.example

pnpm install
pnpm db:push
pnpm dev
```

### 👾 Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)
- [PlanetScale](https://planetscale.com/)
