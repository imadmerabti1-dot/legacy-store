# LEGACY.STORE — Drop 001

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
- Missing/uncertain delivery values remain marked as needing confirmation.
- Product revenue and delivery fees remain separate in the order summary.

## Open locally

Open `index.html` in a browser. The prototype does not yet send orders to a backend; it saves the last order locally in the browser so the flow can be tested safely.

## Before publishing

1. Connect checkout to the selected order channel or backend.
2. Confirm the allocation of the 18 total pairs between SH001 and SH002, including the two extra pairs not represented in the earlier size lists.
3. Confirm DHD rates for wilayas 50, 54, and 56, plus office rates currently shown as `000` in the supplied sheets.
4. Replace the local order handoff with a secure order-management connection.

## Email activation

The first successful order submission may trigger a FormSubmit confirmation email to `imad.merabti1@gmail.com`. Confirm it once so future order notifications can arrive automatically.
