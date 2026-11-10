# LEGACY.STORE — Online shop

This is the first working storefront prototype for LEGACY.STORE, using an English-first, product-first composition.

## Included

- Responsive LEGACY blue/purple product-first storefront.
- Cinematic homepage hero using the actual shoe photography as a low-opacity animated background.
- SH001 and SH002 product cards using the project photos.
- Simplified English shopping flow: product → size → “Order now” → checkout.
- Four separate selectable shoe-angle views from each supplied four-angle product image.
- Launch pricing for the first 10 submitted orders.
- Size selection and cart drawer.
- Cash-on-delivery checkout form.
- Order email delivery configured for `imad.merabti1@gmail.com` through FormSubmit AJAX.
- 58-wilaya delivery selector with separate home/office rates.
- All 58 wilayas remain selectable; missing agency rates are shown as `To confirm` and checked manually before dispatch.
- Product revenue and delivery fees remain separate in the order summary.
- Mobile-first shopping flow with large touch controls and a sticky cart/checkout bar.

## Open locally

Open `index.html` in a browser. Orders are sent to the configured FormSubmit email endpoint and the last order is also saved locally in the browser for testing.

## Before publishing

1. Connect checkout to the selected order channel or backend.
2. Keep inventory recorded as 16 pairs total: 8 SH001 and 8 SH002.
3. Keep all wilayas available for orders and verify any missing delivery rate with the agency when an order arrives.
4. For production, consider moving order handling to a secure order-management system as order volume grows.

## Email activation

The first successful order submission may trigger a FormSubmit confirmation email to `imad.merabti1@gmail.com`. Confirm it once so future order notifications can arrive automatically.
