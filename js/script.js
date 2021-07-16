"use strict";

window.addEventListener('DOMContentLoaded', function() {

	/* Copy link*/

	const copyLink = document.querySelector('.referal__link'),
	copyBtn = document.querySelector('.referal__copy');

  	copyBtn.addEventListener("click", copyRefLink);

	function copyRefLink() {
		let textArea = document.createElement('textarea');
		textArea.value = copyLink.textContent;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand("Copy");
		textArea.remove();
	}


	/* Count */

	const countBtn = document.querySelector('.btn__ref');
	let total = document.querySelector('.reward__total'),
		referalCount = document.querySelector('.reward__referals-count');

	countBtn.addEventListener('click', () => {
		let totalRub = parseInt(total.textContent),
			totalReferalCount = +referalCount.textContent;
			
		totalReferalCount += 1;
		referalCount.textContent = totalReferalCount;
		totalRub += 25600;
		total.textContent = `${totalRub} ₽`;
	});


    /* Accordion */

	const accordion = document.querySelectorAll('.accordion');

    accordion.forEach(item => {
		item.addEventListener('click', () => {
			item.querySelector('.accordion__bottom').classList.toggle('accordion__bottom_hidden');
            item.querySelector('.accordion__arrow').classList.toggle('accordion__arrow_rotate');
		});
	});


	/* Popup & Form */

	const popup = document.querySelector('.popup'),
		  closePopupBtn = document.querySelector('.popup__close'),
		  popupInner = document.querySelector('.popup__form'),
		  form = document.querySelector('.form'),
	      emailField = document.getElementById('email'),
		  sendBtn = document.querySelector('.btn__send'),
		  inviteBtn = document.querySelector('.btn__invite');
	let popupForm = document.querySelector('.popup__form');

	/* popup */

	inviteBtn.addEventListener('click', () => {
		popup.classList.remove('popup__hidden');
		document.body.style.overflow = 'hidden';
	});

	function closePopup () {
		document.body.style.overflow = '';
		form.reset();
		popup.classList.add('popup__hidden');
	}

	popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

	closePopupBtn.addEventListener('click', () => {
		closePopup();
	});


    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && !(popup.classList.contains('popup__hidden'))) { 
            closePopup();
        }
    });

	/* Email check */

	function checkEmailField() {
		if (emailField.value.length > 0) {
			sendBtn.disabled = false;
			sendBtn.classList.remove('btn__send_disabled');
		} else {
			sendBtn.classList.add('btn__send_disabled');
			sendBtn.disabled = true;
		}
	}

	emailField.addEventListener('input', checkEmailField);

	/* Form submit */

	let successMsg = document.createElement('div');
		
	function resetPopup () {
		successMsg.textContent = '';
		successMsg.remove();
		popupForm.style.height = '';
		form.style.display = '';
		closePopup();
	}

	sendBtn.addEventListener('click', (e) => {
		const email = emailField.value,
			  emailFilter =  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

		if (emailFilter.test(email)) {
			e.preventDefault();
			form.style.display = 'none';
			if (document.body.clientWidth < 992) {
				popupForm.style.height = 48 + "px";
				successMsg.insertAdjacentHTML('afterBegin', `<div class="success-div"><span class="black-text">Успешно отправлено на</span> ${emailField.value}</div>`);
			} else {
				successMsg.textContent = 'Успешно отправлено';
			}
			popupInner.append(successMsg);
			setTimeout(resetPopup, 2000);
		}
	});


	/* Burger */

	let burger = document.querySelector('.burger'),
		menu = document.querySelector('.header__nav');

	burger.addEventListener('click', () => {
		burger.classList.toggle('active');
		menu.classList.toggle('header__nav_show');
	});

});	
