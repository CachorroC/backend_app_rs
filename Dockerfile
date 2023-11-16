FROM node:latest AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /api

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
 #RUN apk add --update --no-cache openssl1.1-compat
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

RUN pnpm add typescript-plugin-css-modules prisma
COPY . .
COPY src ./src
COPY public ./public
COPY prisma ./prisma
COPY next.config.js .
COPY tsconfig.json .
RUN npx prisma generate

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
#ARG MONGODB_URI
#ENV MONGODB_URI=${MONGODB_URI}
#ARG NEXT_PUBLIC_MONGODB_URI
#ENV NEXT_PUBLIC_MONGODB_URI=${NEXT_PUBLIC_MONGODB_URI}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN pnpx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /api

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /api/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /api/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /api/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG PREFIX
ENV PREFIX=${PREFIX}
ARG PORT
ENV PORT=${PORT}
ARG MONGODB_URI
ENV MONGODB_URI=${MONGODB_URI}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_MONGODB_URI
ENV NEXT_PUBLIC_MONGODB_URI=${NEXT_PUBLIC_MONGODB_URI}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]
