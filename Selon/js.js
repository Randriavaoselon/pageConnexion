var hostname = window.location.hostname;
if (hostname) document.getElementById('pageTitle').textContent = hostname + ' > login';

var currentMode = 'voucher';

function switchMode(mode) {
  currentMode = mode;
  ['tabVoucher','tabMember','tabQr'].forEach(function(id) {
    document.getElementById(id).classList.remove('active');
    document.getElementById(id).setAttribute('aria-selected','false');
  });
  document.getElementById('voucherSection').style.display = 'none';
  document.getElementById('memberSection').style.display  = 'none';
  document.getElementById('qrSection').style.display      = 'none';
  document.getElementById('connectBtn').style.display     = 'flex';
  var n = document.getElementById('notice');
  n.classList.remove('visible'); n.textContent = '';

  if (mode === 'voucher') {
    document.getElementById('tabVoucher').classList.add('active');
    document.getElementById('tabVoucher').setAttribute('aria-selected','true');
    document.getElementById('voucherSection').style.display = 'block';
    document.getElementById('voucherCode').focus();
  } else if (mode === 'member') {
    document.getElementById('tabMember').classList.add('active');
    document.getElementById('tabMember').setAttribute('aria-selected','true');
    document.getElementById('memberSection').style.display = 'block';
    n.textContent = 'Faites signe en cas de problème.';
    n.classList.add('visible');
    document.getElementById('memberUser').focus();
  } else {
    document.getElementById('tabQr').classList.add('active');
    document.getElementById('tabQr').setAttribute('aria-selected','true');
    document.getElementById('qrSection').style.display  = 'block';
    document.getElementById('connectBtn').style.display = 'none';
  }
}

function doLogin() {
  var username, password;
  if (currentMode === 'voucher') {
    var code = document.getElementById('voucherCode').value.trim();
    if (!code) { document.getElementById('voucherCode').focus(); return; }
    username = code; password = code;
  } else if (currentMode === 'member') {
    username = document.getElementById('memberUser').value.trim();
    password = document.getElementById('memberPass').value;
    if (!username) { document.getElementById('memberUser').focus(); return; }
    if (!password) { document.getElementById('memberPass').focus(); return; }
  } else { return; }

  document.sendin.username.value = username;
  document.sendin.password.value = typeof hexMD5 === 'function'
    ? hexMD5('(chap-id)' + password + '(chap-challenge)')
    : password;
  document.sendin.submit();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && currentMode !== 'qr') doLogin();
});

document.getElementById('voucherCode').focus();