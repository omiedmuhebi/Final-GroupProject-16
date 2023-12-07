document.getElementById('checkout-form').addEventListener('submit', function(event){
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const paymentMethod = document.getElementById('paymentMethod').value;

  // Here you would normally handle the form submission, like sending data to a server
  console.log('Order Placed:', { fullName, address, phone, email, paymentMethod });

  window.location.href ='/order-success';
});
