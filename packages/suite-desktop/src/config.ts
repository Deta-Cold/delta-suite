import { TOR_URLS } from '@detahard/urls';

export const onionDomain = TOR_URLS['detahard.io'];

export const oauthUrls = [
    'https://accounts.google.com',
    'https://www.dropbox.com/oauth2/authorize',
];

export const allowedProtocols = ['http:', 'https:'];

export const allowedDomains = [
    'localhost',
    '127.0.0.1',
    'detahard.io',
    'invity.io',
    'api.github.com',
    'api.dropboxapi.com',
    'content.dropboxapi.com',
    'notify.dropboxapi.com',
    'o117836.ingest.sentry.io',
    'oauth2.googleapis.com',
    'googleapis.com',
    onionDomain,
    'detahard-cardano-mainnet.blockfrost.io',
    'detahard-cardano-preview.blockfrost.io',
    'blockfrost.dev',
];

export const cspRules = [
    // Default to only own resources
    "default-src 'self'",
    // Allow all API calls (Can't be restricted bc of custom backends)
    'connect-src *',
    // Allow images from detahard.io
    "img-src 'self' *.detahard.io",
];
