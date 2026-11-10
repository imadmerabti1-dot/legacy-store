const PRODUCTS = [
  { id:'SH001', name:'LEGACY 001', subtitle:'Black everyday sneaker · Model 1', cost:2800, regular:4200, launch:3790, image:'assets/products/SH001.jpg', sizes:[40,41,42,44] },
  { id:'SH002', name:'LEGACY 002', subtitle:'Black everyday sneaker · Model 2', cost:2500, regular:3900, launch:3490, image:'assets/products/SH002.jpg', sizes:[40,41,42,44] }
];

const ORDER_EMAIL = 'imad.merabti1@gmail.com';
const ORDER_ENDPOINT = `https://formsubmit.co/ajax/${ORDER_EMAIL}`;

// Source: the DHD Tlemcen rate sheets supplied for this project.
// null means the source rate is still missing and must be confirmed before shipping.
const WILAYAS = [
  ['01','Adrar',1100,600],['02','Chlef',700,400],['03','Laghouat',900,500],['04','Oum El Bouaghi',900,500],
  ['05','Batna',900,500],['06','Bejaia',800,400],['07','Biskra',900,500],['08','Bechar',1300,600],
  ['09','Blida',500,400],['10','Bouira',800,400],['11','Tamanrasset',1300,800],['12','Tebessa',1000,500],
  ['13','Tlemcen',450,250],['14','Tiaret',700,400],['15','Tizi Ouzou',800,400],['16','Algiers',500,300],
  ['17','Djelfa',900,500],['18','Jijel',800,400],['19','Setif',800,400],['20','Saida',700,400],
  ['21','Skikda',900,400],['22','Sidi Bel Abbes',600,400],['23','Annaba',900,500],['24','Guelma',900,400],
  ['25','Constantine',800,400],['26','Medea',700,400],['27','Mostaganem',600,400],['28',"M'Sila",900,500],
  ['29','Mascara',600,400],['30','Ouargla',900,500],['31','Oran',600,400],['32','El Bayadh',700,500],
  ['33','Illizi',1300,600],['34','Bordj Bou Arreridj',800,400],['35','Boumerdes',700,400],['36','El Tarf',900,400],
  ['37','Tindouf',1300,600],['38','Tissemsilt',700,400],['39','El Oued',1000,500],['40','Khenchela',900,500],
  ['41','Souk Ahras',900,500],['42','Tipaza',700,400],['43','Mila',800,400],['44','Ain Defla',700,400],
  ['45','Naama',700,500],['46','Ain Temouchent',600,400],['47','Ghardaia',1000,500],['48','Relizane',700,400],
  ['49','Timimoun',1300,600],['50','Bordj Badji Mokhtar',null,null],['51','Ouled Djellal',900,500],['52','Beni Abbes',1300,null],
  ['53','In Salah',1300,600],['54','In Guezzam',null,null],['55','Touggourt',900,500],['56','Djanet',null,null],
  ['57',"El M'Ghair",900,null],['58','El Meniaa',1000,500]
].map(([code,name,home,office]) => ({code,name,home,office}));

const state = {
  cart: JSON.parse(localStorage.getItem('legacyCart') || '[]'),
  launchOrders: Number(localStorage.getItem('legacyLaunchOrders') || 0),
  selectedWilaya: null
};

const $ = (selector) => document.querySelector(selector);
const money = (value) => `${Number(value).toLocaleString('fr-DZ')} DZD`;
const currentPrice = (product) => state.launchOrders < 10 ? product.launch : product.regular;
const isLaunchActive = () => state.launchOrders < 10;

function renderProducts() {
  $('#productGrid').innerHTML = PRODUCTS.map(product => {
    const launch = isLaunchActive();
    return `<article class="product-card" data-product="${product.id}">
      <div class="product-image"><div class="main-crop" data-angle="0" role="img" aria-label="${product.name} — angle 1" style="background-image:url('${product.image}')"></div><button type="button" class="angle-arrow angle-prev" data-arrow="prev" aria-label="Previous product image">‹</button><button type="button" class="angle-arrow angle-next" data-arrow="next" aria-label="Next product image">›</button>${launch ? '<span class="product-badge">LAUNCH OFFER</span>' : ''}</div>
      <div class="product-info">
        <span class="product-code">${product.id} · MODEL ${product.id === 'SH001' ? '1' : '2'}</span>
        <h3>${product.name}</h3>
        <p class="muted">${product.subtitle}</p>
        <div class="product-price"><div><span class="unit-label">Price per pair</span><strong>${money(currentPrice(product))}</strong>${launch ? `<del>${money(product.regular)}</del>` : ''}</div></div>
        <div class="product-size-row" role="group" aria-label="Choose a size">${product.sizes.map((size,index) => `<button type="button" class="size-chip ${index === 0 ? 'selected' : ''}" data-size="${size}">${size}</button>`).join('')}</div>
        <div class="angle-thumbs" aria-label="Four product angles">${[0,1,2,3].map(angle => `<button type="button" class="angle-thumb ${angle === 0 ? 'selected' : ''}" data-angle="${angle}" aria-label="View angle ${angle + 1}" style="background-image:url('${product.image}')"></button>`).join('')}</div>
        <div class="product-quantity" aria-label="Choose quantity"><div class="quantity-left"><span>Quantity</span><div><button type="button" data-product-qty="-1" aria-label="Decrease quantity">−</button><strong class="product-qty-value">1</strong><button type="button" data-product-qty="1" aria-label="Increase quantity">+</button></div></div><div class="product-total"><small>YOUR TOTAL</small><strong class="product-qty-total">${money(currentPrice(product))}</strong>${launch ? `<b class="product-qty-discount">SAVE ${money(product.regular - product.launch)}</b>` : ''}</div></div>
        <button type="button" class="add-button buy-now-button" data-buy="${product.id}">Order now <span>→</span></button>
      </div>
    </article>`;
  }).join('');
}

function renderCart() {
  const hasItems = state.cart.length > 0;
  $('#cartEmpty').style.display = hasItems ? 'none' : 'grid';
  $('#cartItems').style.display = hasItems ? 'block' : 'none';
  $('#checkoutButton').disabled = !hasItems;
  $('#cartCount').textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  $('#cartSubtotal').textContent = money(cartSubtotal());
  $('#cartItems').innerHTML = state.cart.map((item,index) => `<div class="cart-row">
    <img src="${item.image}" alt="${item.name}" />
    <div><h4>${item.name}</h4><p>Size ${item.size}</p><div class="quantity-controls" aria-label="Quantity controls"><button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button></div><button type="button" class="remove-item" data-remove="${index}">Remove</button></div>
    <strong>${money(item.price * item.quantity)}</strong>
  </div>`).join('');
  localStorage.setItem('legacyCart', JSON.stringify(state.cart));
}

function cartSubtotal() { return state.cart.reduce((sum,item) => sum + item.price * item.quantity, 0); }

function addToCart(productId, size, quantity = 1) {
  const product = PRODUCTS.find(item => item.id === productId);
  const existing = state.cart.find(item => item.id === productId && item.size === size);
  if (existing) existing.quantity += quantity;
  else state.cart.push({ id:product.id, name:product.name, size, price:currentPrice(product), image:product.image, quantity });
  renderCart();
  showToast(`${product.name} — ${quantity} pair${quantity === 1 ? '' : 's'} added to cart`);
}

function changeQuantity(index, delta) {
  const item = state.cart[index];
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.cart.splice(index, 1);
  renderCart();
}

function setProductAngle(card, angle) {
  const positions = ['0% 0%','100% 0%','0% 100%','100% 100%'];
  const safeAngle = (angle + 4) % 4;
  const mainCrop = card.querySelector('.main-crop');
  mainCrop.style.backgroundPosition = positions[safeAngle];
  mainCrop.setAttribute('data-angle', safeAngle);
  mainCrop.setAttribute('aria-label', `${card.querySelector('h3').textContent} — angle ${safeAngle + 1}`);
  card.querySelectorAll('.angle-thumb').forEach(button => button.classList.toggle('selected', Number(button.dataset.angle) === safeAngle));
}

function updateProductQuantityDisplay(card) {
  const product = PRODUCTS.find(item => item.id === card.dataset.product);
  const quantity = Number(card.querySelector('.product-qty-value').textContent);
  const unitPrice = currentPrice(product);
  const total = card.querySelector('.product-qty-total');
  total.textContent = money(unitPrice * quantity);
  const discount = card.querySelector('.product-qty-discount');
  if (discount) discount.textContent = `SAVE ${money((product.regular - product.launch) * quantity)}`;
  total.classList.remove('total-pulse');
  requestAnimationFrame(() => total.classList.add('total-pulse'));
}

function populateWilayas() {
  $('#wilayaSelect').innerHTML = '<option value="">Select your wilaya</option>' + WILAYAS.map(item => `<option value="${item.code}">${item.code} — ${item.name}</option>`).join('');
}

function getDeliveryRate() {
  const wilaya = WILAYAS.find(item => item.code === state.selectedWilaya);
  if (!wilaya) return null;
  return $('#deliveryType').value === 'office' ? wilaya.office : wilaya.home;
}

function renderCheckout() {
  $('#checkoutItems').innerHTML = state.cart.map(item => `<div class="summary-item"><span>${item.name} · ${item.size} × ${item.quantity}</span><span>${money(item.price * item.quantity)}</span></div>`).join('');
  const subtotal = cartSubtotal();
  const delivery = getDeliveryRate();
  $('#checkoutSubtotal').textContent = money(subtotal);
  $('#deliveryFee').textContent = delivery === null ? (state.selectedWilaya ? 'Needs confirmation' : 'Select wilaya') : money(delivery);
  $('#checkoutTotal').textContent = delivery === null ? money(subtotal) : money(subtotal + delivery);
}

function openCart() { $('#cartDrawer').classList.add('open'); $('#cartDrawer').setAttribute('aria-hidden','false'); $('#overlay').classList.add('visible'); }
function closeCart() { $('#cartDrawer').classList.remove('open'); $('#cartDrawer').setAttribute('aria-hidden','true'); if (!$('#checkoutModal').classList.contains('open')) $('#overlay').classList.remove('visible'); }
function openCheckout() { if (!state.cart.length) return; closeCart(); renderCheckout(); $('#checkoutModal').classList.add('open'); $('#checkoutModal').setAttribute('aria-hidden','false'); $('#overlay').classList.add('visible'); }
function closeCheckout() { $('#checkoutModal').classList.remove('open'); $('#checkoutModal').setAttribute('aria-hidden','true'); $('#overlay').classList.remove('visible'); }

function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 2800); }

document.addEventListener('click', (event) => {
  const sizeButton = event.target.closest('.size-chip');
  if (sizeButton) { sizeButton.closest('.product-card').querySelectorAll('.size-chip').forEach(button => button.classList.remove('selected')); sizeButton.classList.add('selected'); }
  const angleButton = event.target.closest('.angle-thumb');
  if (angleButton) {
    const card = angleButton.closest('.product-card');
    setProductAngle(card, Number(angleButton.dataset.angle));
  }
  const angleArrow = event.target.closest('.angle-arrow');
  if (angleArrow) {
    const card = angleArrow.closest('.product-card');
    const currentAngle = Number(card.querySelector('.main-crop').dataset.angle || 0);
    setProductAngle(card, currentAngle + (angleArrow.dataset.arrow === 'next' ? 1 : -1));
  }
  const productQuantityButton = event.target.closest('[data-product-qty]');
  if (productQuantityButton) {
    const card = productQuantityButton.closest('.product-card');
    const value = card.querySelector('.product-qty-value');
    const nextValue = Math.max(1, Math.min(20, Number(value.textContent) + Number(productQuantityButton.dataset.productQty)));
    value.textContent = nextValue;
    updateProductQuantityDisplay(card);
  }
  const buyButton = event.target.closest('[data-buy]');
  if (buyButton) { const card = buyButton.closest('.product-card'); const size = card.querySelector('.size-chip.selected').dataset.size; const quantity = Number(card.querySelector('.product-qty-value').textContent); addToCart(buyButton.dataset.buy, Number(size), quantity); openCheckout(); }
  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) { state.cart.splice(Number(removeButton.dataset.remove), 1); renderCart(); }
  const quantityButton = event.target.closest('[data-qty]');
  if (quantityButton) { changeQuantity(Number(quantityButton.dataset.index), Number(quantityButton.dataset.qty)); }
});

$('#openCart').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
$('#startShopping').addEventListener('click', closeCart);
$('#checkoutButton').addEventListener('click', openCheckout);
$('#closeCheckout').addEventListener('click', closeCheckout);
$('#overlay').addEventListener('click', () => { closeCart(); closeCheckout(); });
$('#wilayaSelect').addEventListener('change', (event) => { state.selectedWilaya = event.target.value || null; renderCheckout(); });
$('#deliveryType').addEventListener('change', renderCheckout);
$('#continueShopping').addEventListener('click', () => { closeCheckout(); window.location.hash = 'shop'; });

$('#checkoutForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const delivery = getDeliveryRate();
  if (!state.selectedWilaya) { showToast('Select your wilaya first'); return; }
  if (delivery === null) { showToast('This delivery rate needs confirmation before shipping'); }
  const formData = Object.fromEntries(new FormData(event.target).entries());
  const reference = `LG-${Date.now().toString().slice(-6)}`;
  const wilaya = WILAYAS.find(item => item.code === state.selectedWilaya);
  const deliveryMethod = formData.deliveryType === 'office' ? 'Office pickup' : 'Home delivery';
  const itemsSummary = state.cart.map(item => `${item.name} | size ${item.size} | qty ${item.quantity} | ${money(item.price * item.quantity)}`).join('\n');
  const order = { reference, ...formData, wilaya: wilaya?.name || state.selectedWilaya, deliveryMethod, items:state.cart, subtotal:cartSubtotal(), deliveryFee:delivery, total:cartSubtotal() + (delivery || 0), createdAt:new Date().toISOString() };
  const emailPayload = {
    _subject: `LEGACY.STORE order ${reference}`,
    name: formData.name,
    phone: formData.phone,
    wilaya: `${state.selectedWilaya} — ${wilaya?.name || ''}`,
    delivery_method: deliveryMethod,
    address: formData.address,
    note: formData.note || '',
    items: itemsSummary,
    products_total: money(order.subtotal),
    delivery_fee: delivery === null ? 'Needs confirmation' : money(delivery),
    order_total: money(order.total),
    order_reference: reference
  };
  const submitButton = event.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending order…';
  try {
    const response = await fetch(ORDER_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(emailPayload) });
    if (!response.ok) throw new Error('Email service rejected the order');
    localStorage.setItem('legacyLastOrder', JSON.stringify(order));
  } catch (error) {
    submitButton.disabled = false;
    submitButton.textContent = 'Confirm order';
    showToast('Could not send the order email. Please try again.');
    return;
  }
  if (isLaunchActive()) { state.launchOrders += 1; localStorage.setItem('legacyLaunchOrders', String(state.launchOrders)); }
  state.cart = []; renderCart(); renderProducts();
  $('#checkoutForm').style.display = 'none'; $('#successMessage').classList.add('visible');
  $('#ordersLeft').textContent = Math.max(0, 10 - state.launchOrders);
});

renderProducts(); renderCart(); populateWilayas();
$('#ordersLeft').textContent = Math.max(0, 10 - state.launchOrders);

const revealTargets = document.querySelectorAll('.trust-row, .promo-strip, .shop, .delivery, .site-footer, .product-card');
revealTargets.forEach(element => element.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold:0.12 });
  revealTargets.forEach(element => revealObserver.observe(element));
} else {
  revealTargets.forEach(element => element.classList.add('is-visible'));
}

const heroShotOne = document.querySelector('.hero-media-one');
const heroShotTwo = document.querySelector('.hero-media-two');
if (heroShotOne && heroShotTwo) {
  setInterval(() => {
    const showingSecond = heroShotTwo.classList.toggle('active');
    heroShotOne.classList.toggle('inactive', showingSecond);
  }, 7000);
}
