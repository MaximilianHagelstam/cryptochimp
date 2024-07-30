<div align="center">
  <a href="https://cryptochimp.vercel.app/">
    <img src="./public/logo.svg" height="128px" width="128px"/>
  </a>
  <h1>CryptoChimp</h1>
  <a href="https://github.com/MaximilianHagelstam/cryptochimp/actions">
    <img src="https://github.com/MaximilianHagelstam/cryptochimp/actions/workflows/tests.yml/badge.svg" alt="actions" />
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
pnpm install
```

Create a `.env` file and fill it out as per `.env.example`:

```bash
cp .env.example .env
```

Run a local CockroachDB instance with Docker:

```bash
pnpm db:up
```

Create the database tables:

```bash
pnpm db:push
```

Start the development server:

```bash
pnpm dev
```

### 🧪 Testing

Run unit tests:

```bash
pnpm test
```

### 👾 Built with

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [CockroachDB](https://www.cockroachlabs.com/)
- [Docker](https://www.docker.com/)

### 🎓 License

This project is licensed under the terms of the [MIT](https://choosealicense.com/licenses/mit/) license.
