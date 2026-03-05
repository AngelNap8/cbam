// Centralized EU ETS carbon price configuration
// Update `price` and `lastUpdated` manually when you check the current rate.
// Source: https://www.eex.com/en/markets/environmental-markets/eu-ets-auctions

export const EU_ETS_CONFIG = {
    price: 70.82,               // EUR per tonne CO₂ — verified March 4, 2026
    lastUpdated: '2026-03-04',
    source: 'EEX EU ETS Auctions',
    sourceUrl: 'https://www.eex.com/en/markets/environmental-markets/eu-ets-auctions',
};
