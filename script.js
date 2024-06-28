const algorithms = document.querySelector('#algorithms');
const btn_start = document.querySelector('#btn-start');
const container_hash = document.querySelector('#container-hash');
const hash_result = document.querySelector('#hash-result');
const compare = document.querySelector('#compare');
const inputText = document.querySelector('#inputText');
const inputHash = document.querySelector('#inputHash');

const verifyCheckAlgorithm = (label) => {
  try {
    const algorithm = label.toLowerCase();
    const input = document.querySelector(`#algorithm-${algorithm}`) || null;
    input.checked = true;
    input.ch
    return input.value;
  }
  catch (err) {
    console.log(err);
    return '';
  }
}

const setBgDiv = (label) => {
  try {
    const div_sha256 = document.querySelector(`#div-sha256`) || null;
    const div_md5 = document.querySelector(`#div-md5`) || null;
    const algorithm = verifyCheckAlgorithm(label);
    if (algorithm == 'sha256') {
      div_sha256.classList.toggle('bg-gray-500');
      div_md5.classList.remove('bg-gray-500');
      return;
    }
    if (algorithm == 'md5') {
      div_md5.classList.toggle('bg-gray-500');
      div_sha256.classList.remove('bg-gray-500');
      return;
    }
  }
  catch (err) {
    console.log(err);
    return;
  }
}

const encryptSHA256 = (text) => {
  return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
}

algorithms.addEventListener('mousedown', (e) => {
  if (e.target && e.target.tagName === 'LABEL') {
    setBgDiv(e.target.textContent);
  }
});

btn_start.addEventListener('click', async (e) => {
  e.preventDefault();

  compare.classList.remove('hidden');
  container_hash.classList.remove('hidden');
  container_hash.classList.add('flex');

  await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: inputText.value })
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
    });
});