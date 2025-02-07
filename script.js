const algorithms = document.querySelector('#algorithms');
const btn_start = document.querySelector('#btn-start');
const container_hash = document.querySelector('#container-hash');
const hash_result = document.querySelector('#hash-result');
const compare = document.querySelector('#compare');
const inputText = document.querySelector('#inputText');
const inputHash = document.querySelector('#inputHash');

let $algorithm = '';

const verifyCheckAlgorithm = (label) => {
  try {
    const algorithm = label.toLowerCase();
    $algorithm = algorithm;
    const input = document.querySelector(`#algorithm-${algorithm}`) || null;
    input.checked = true;
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
  if($algorithm){
  compare.classList.remove('hidden');
  container_hash.classList.remove('hidden');
  container_hash.classList.add('flex');
  await fetch('https://encrypt-compare-sha256-md5.onrender.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: inputText.value, hash: inputHash.value, algorithm: $algorithm})
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      if(response.message == 'Match'){
        container_hash.classList.remove('shadow-red-600');  
        container_hash.classList.add('shadow-green-600');               
      }
      else{
        container_hash.classList.remove('shadow-green-600');  
        container_hash.classList.add('shadow-red-600');   
      }
      compare.textContent = response.message;
      hash_result.textContent = response.hash;
    });
    return;
  }
  alert('Select an algorithm');
});