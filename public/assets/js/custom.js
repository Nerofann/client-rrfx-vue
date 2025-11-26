// Required label
const requiredLabels = document.querySelectorAll('label.required');
requiredLabels.forEach((el) => {
    if(el.classList.contains('required')) {
        el.innerHTML = `${el.textContent} <span class="text-danger">*</span>`;  
    }
})

$(document).ready(function() {
    $('.amount-formatter').on('keyup', function(evt) {
        let input = $(evt.currentTarget);

        input.val( formatter( $(evt.currentTarget).val() ) )
        if(input.data('max')) {
            let max = parseFloat(input.data('max'));
            if(parseFloat(input.val().replaceAll(',', '')) > max && max > 0) {
                return input.get(0).setCustomValidity("Max " + formatter(max.toString()));
            }

            input.get(0).setCustomValidity("");
            return input.get(0).reportValidity();
        }
    })
})

function formatter(angka, prefix = null){
    var number_string = angka.replace(/[^\.\d]/g, '').toString(),
    split   		= number_string.split('.'),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if(ribuan){
        separator = sisa ? ',' : '';
        rupiah += separator + ribuan.join(',');
    }

    rupiah = split[1] != undefined ? rupiah + '.' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? prefix + rupiah : '');
}