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

### 📷 Demo

<a href="https://cryptochimp.vercel.app/">
  <img src="screenshot.png" alt="screenshot" width="800"/>
</a>

### ⚙️ Getting started

Install dependencies:

```bash
npm install
```

Create e `.env` file and fill it out as per `.env.example`:

```bash
cp .env.example .env
```

Create database tables from Prisma schema:

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

### 👾 Built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [PlanetScale](https://planetscale.com/)

### 🎓 License

This project is licensed under the terms of the [MIT](https://choosealicense.com/licenses/mit/) license.
